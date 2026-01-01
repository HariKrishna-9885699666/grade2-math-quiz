import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float opacity-30">📚</div>
        <div className="absolute top-20 right-16 text-5xl animate-float delay-200 opacity-30">🔢</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-float delay-300 opacity-30">✨</div>
        <div className="absolute bottom-20 right-10 text-6xl animate-float delay-100 opacity-30">🎯</div>
        <div className="absolute top-1/2 left-8 text-4xl animate-float delay-400 opacity-30">⭐</div>
        <div className="absolute top-1/3 right-8 text-4xl animate-float delay-200 opacity-30">🏆</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg mx-auto animate-bounce-in">
        {/* Logo/Icon area */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-primary shadow-hover">
            <span className="text-5xl">🧮</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3 leading-tight">
          Grade 2 Math
          <br />
          <span 
            className="bg-clip-text text-transparent" 
            style={{ backgroundImage: 'linear-gradient(135deg, hsl(36 100% 50%) 0%, hsl(25 100% 55%) 100%)' }}
          >
            Assessment
          </span>
        </h1>

        {/* School name */}
        <p className="text-lg text-muted-foreground mb-2 font-semibold">
          Canary The School, India
        </p>

        {/* Subtitle */}
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          Test your math skills with 30 fun questions! 🎯
          <br />
          Take your time and do your best! ✨
        </p>

        {/* Topics preview */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { emoji: "🔢", name: "Numbers" },
            { emoji: "➕", name: "Addition" },
            { emoji: "➖", name: "Subtraction" },
            { emoji: "📊", name: "Data" },
            { emoji: "🔷", name: "Shapes" },
            { emoji: "✖️", name: "Multiply" },
            { emoji: "📏", name: "Measure" },
          ].map((topic, i) => (
            <span
              key={topic.name}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-card rounded-full text-sm font-medium shadow-sm animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span>{topic.emoji}</span>
              <span className="text-muted-foreground">{topic.name}</span>
            </span>
          ))}
        </div>

        {/* Start button */}
        <Button
          variant="cta"
          size="xl"
          onClick={onStart}
          className="animate-bounce-gentle"
        >
          <Sparkles className="w-5 h-5" />
          Start Assessment
          <Sparkles className="w-5 h-5" />
        </Button>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-card/80 backdrop-blur-sm rounded-2xl shadow-card max-w-md mx-auto">
          <h3 className="font-bold text-primary mb-2 flex items-center justify-center gap-2">
            <span>📝</span> Instructions
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1 text-left">
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>30 multiple choice questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Use the rough work pad for calculations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>You can go back and change answers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              <span>Click Submit when you're done</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
