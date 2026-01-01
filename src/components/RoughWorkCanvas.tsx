import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Trash2, Pencil } from "lucide-react";

interface RoughWorkCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuestion?: {
    questionNumber: number;
    question: string;
    emoji: string;
  };
}

export const RoughWorkCanvas = ({ isOpen, onClose, currentQuestion }: RoughWorkCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#1565C0");
  const [brushSize, setBrushSize] = useState(3);

  const colors = [
    "#1565C0", // Blue
    "#F44336", // Red
    "#4CAF50", // Green
    "#FF9800", // Orange
    "#9C27B0", // Purple
    "#333333", // Dark gray
  ];

  const getContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = getContext();
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  }, [getContext]);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure container is rendered
      setTimeout(resizeCanvas, 100);
      window.addEventListener("resize", resizeCanvas);
      return () => window.removeEventListener("resize", resizeCanvas);
    }
  }, [isOpen, resizeCanvas]);

  const getCoordinates = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const ctx = getContext();
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    setIsDrawing(true);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const ctx = getContext();
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Pencil className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg text-primary">Rough Work</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm" onClick={clearCanvas}>
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
          <Button variant="default" size="sm" onClick={onClose}>
            <X className="w-4 h-4 mr-1" />
            Close
          </Button>
        </div>
      </div>

      {/* Current Question Display */}
      {currentQuestion && (
        <div className="mx-4 mt-4 p-4 bg-secondary/50 rounded-xl border border-border">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {currentQuestion.questionNumber}
            </span>
            <div className="flex-1">
              <span className="text-lg mr-2">{currentQuestion.emoji}</span>
              <span className="text-sm font-medium text-foreground leading-relaxed">
                {currentQuestion.question}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-center gap-4 p-3 bg-card/80 border-b border-border">
        {/* Colors */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground mr-1">Color:</span>
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                brushColor === color ? "border-foreground scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setBrushColor(color)}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-border" />

        {/* Brush size */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Size:</span>
          {[2, 4, 8].map((size) => (
            <button
              key={size}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${
                brushSize === size ? "border-primary bg-secondary" : "border-border"
              }`}
              onClick={() => setBrushSize(size)}
              aria-label={`Select brush size ${size}`}
            >
              <div
                className="rounded-full bg-foreground"
                style={{ width: size * 2, height: size * 2 }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Canvas container */}
      <div className={`flex-1 p-4 overflow-hidden ${currentQuestion ? 'h-[calc(100vh-230px)]' : 'h-[calc(100vh-140px)]'}`}>
        <div className="w-full h-full bg-card rounded-xl shadow-card overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full touch-none cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      </div>

      {/* Hint */}
      <div className="text-center p-2 text-xs text-muted-foreground">
        ✏️ Draw your calculations here • Your work is saved while the canvas is open
      </div>
    </div>
  );
};
