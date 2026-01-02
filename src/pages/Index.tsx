import { useState, useCallback, useMemo } from "react";
import { StartScreen } from "@/components/StartScreen";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { RoughWorkCanvas } from "@/components/RoughWorkCanvas";
import { ConfirmSubmitDialog } from "@/components/ConfirmSubmitDialog";
import { ResultsScreen } from "@/components/ResultsScreen";
import { Button } from "@/components/ui/button";
import { generateQuestionSet, Question } from "@/lib/questionGenerator";
import { Pencil } from "lucide-react";

type AppState = "start" | "assessment" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("start");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const currentQuestion = questions[currentIndex];

  const answeredCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  const handleStart = useCallback(() => {
    const newQuestions = generateQuestionSet();
    setQuestions(newQuestions);
    setAnswers({});
    setCurrentIndex(0);
    setAppState("assessment");
  }, []);

  const handleSelectAnswer = useCallback((answerIndex: number) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex,
    }));
  }, [currentQuestion]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, questions.length]);

  const handleSubmitClick = useCallback(() => {
    setIsConfirmOpen(true);
  }, []);

  const handleConfirmSubmit = useCallback(() => {
    setIsConfirmOpen(false);
    setAppState("results");
  }, []);

  const handleRestart = useCallback(() => {
    setAppState("start");
    setQuestions([]);
    setAnswers({});
    setCurrentIndex(0);
  }, []);

  return (
    <>

      <div className="min-h-screen bg-background">
        {appState === "start" && (
          <StartScreen onStart={handleStart} />
        )}

        {appState === "assessment" && currentQuestion && (
          <div className="min-h-screen flex flex-col">
            {/* Header with progress */}
            <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
              <div className="container max-w-2xl py-4">
                <ProgressBar 
                  current={currentIndex + 1} 
                  total={questions.length} 
                />
              </div>
            </header>

            {/* Main content */}
            <main className="flex-1 container py-6 px-4">
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentIndex + 1}
                totalQuestions={questions.length}
                selectedAnswer={
                  typeof answers[currentQuestion.id] === 'number' ? answers[currentQuestion.id] : null
                }
                onSelectAnswer={handleSelectAnswer}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmitClick}
                isFirst={currentIndex === 0}
                isLast={currentIndex === questions.length - 1}
              />
            </main>

            {/* Floating rough work button */}
            <div className="fixed bottom-6 right-6 z-30">
              <Button
                variant="floating"
                size="iconLg"
                onClick={() => setIsCanvasOpen(true)}
                aria-label="Open rough work pad"
              >
                <Pencil className="w-6 h-6" />
              </Button>
            </div>

            {/* Rough work canvas */}
            <RoughWorkCanvas
              isOpen={isCanvasOpen}
              onClose={() => setIsCanvasOpen(false)}
              currentQuestion={currentQuestion ? {
                questionNumber: currentIndex + 1,
                question: currentQuestion.question,
                emoji: currentQuestion.emoji,
              } : undefined}
            />

            {/* Confirm submit dialog */}
            <ConfirmSubmitDialog
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={handleConfirmSubmit}
              answeredCount={answeredCount}
              totalQuestions={questions.length}
            />
          </div>
        )}

        {appState === "results" && (
          <ResultsScreen
            questions={questions}
            answers={Object.fromEntries(
              Object.entries(answers).map(([qid, idx]) => {
                const q = questions.find(q => q.id === qid);
                return [qid, q && typeof idx === 'number' ? q.options[idx] : 'Not answered'];
              })
            )}
            onRestart={handleRestart}
          />
        )}
      </div>
    </>
  );
};

export default Index;
