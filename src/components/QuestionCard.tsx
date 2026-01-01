import { Button } from "@/components/ui/button";
import { Question } from "@/lib/questionGenerator";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";


interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  onNext,
  onSubmit,
  isFirst,
  isLast,
}: QuestionCardProps) => {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-2xl mx-auto animate-scale-in">
      {/* Question Card */}
      <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 mb-6">
        {/* Question header */}
        <div className="flex items-start gap-3 mb-6">
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            {questionNumber}
          </span>
          <div className="flex-1">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded-full mb-2">
              {question.emoji} {question.topic.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <h2 className="text-question text-foreground leading-relaxed">
              {question.question}
            </h2>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            return (
              <Button
                key={`${question.id}-${index}`}
                variant={isSelected ? "optionSelected" : "option"}
                className="w-full text-option p-4 h-auto"
                onClick={() => onSelectAnswer(index)}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 transition-colors ${
                  isSelected 
                    ? 'bg-accent-foreground/20 text-accent-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {optionLabels[index]}
                </span>
                <span className="flex-1 text-left">{option}</span>
                {isSelected && (
                  <span className="ml-2 text-lg">✓</span>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="nav"
          size="lg"
          onClick={onPrevious}
          disabled={isFirst}
          className="flex-1 max-w-[140px]"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </Button>

        {/* Question dots indicator (mobile friendly) */}
        <div className="hidden sm:flex items-center justify-center gap-1 flex-1">
          {Array.from({ length: Math.min(totalQuestions, 10) }).map((_, i) => {
            const dotIndex = Math.floor((questionNumber - 1) / 3) * 3 + i;
            if (dotIndex >= totalQuestions) return null;
            return (
              <div
                key={dotIndex}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  dotIndex === questionNumber - 1
                    ? 'bg-primary w-4'
                    : dotIndex < questionNumber - 1
                    ? 'bg-success'
                    : 'bg-secondary'
                }`}
              />
            );
          })}
        </div>

        {isLast ? (
          <Button
            variant="cta"
            size="lg"
            onClick={onSubmit}
            disabled={!selectedAnswer}
            className="flex-1 max-w-[140px]"
          >
            Submit
            <Send className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            variant="nav"
            size="lg"
            onClick={onNext}
            disabled={!selectedAnswer}
            className="flex-1 max-w-[140px]"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
