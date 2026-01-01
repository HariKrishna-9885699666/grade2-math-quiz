import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Question, topicNames, Topic, calculateTopicScores } from "@/lib/questionGenerator";
import { RefreshCw, Trophy, Target, CheckCircle2, XCircle } from "lucide-react";

interface ResultsScreenProps {
  questions: Question[];
  answers: Record<string, string>;
  onRestart: () => void;
}

export const ResultsScreen = ({ questions, answers, onRestart }: ResultsScreenProps) => {
  const hasConfettiFired = useRef(false);

  const correctCount = questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const totalQuestions = questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const passed = percentage >= 60;
  const excellent = percentage >= 80;

  const topicScores = calculateTopicScores(questions, answers);

  useEffect(() => {
    if (excellent && !hasConfettiFired.current) {
      hasConfettiFired.current = true;
      
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#FF9800', '#4CAF50', '#1565C0', '#FFC107'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#FF9800', '#4CAF50', '#1565C0', '#FFC107'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [excellent]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Score Header */}
        <div className={`text-center mb-8 p-8 rounded-3xl shadow-card animate-bounce-in ${
          excellent ? 'bg-gradient-success' : passed ? 'bg-gradient-primary' : 'bg-card'
        }`}>
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
            excellent ? 'bg-cta-foreground/20' : passed ? 'bg-primary-foreground/20' : 'bg-secondary'
          }`}>
            {excellent ? (
              <Trophy className="w-12 h-12 text-cta-foreground animate-celebration" />
            ) : passed ? (
              <Target className="w-12 h-12 text-primary-foreground" />
            ) : (
              <span className="text-4xl">📚</span>
            )}
          </div>

          <h1 className={`text-4xl font-extrabold mb-2 ${
            excellent || passed ? 'text-primary-foreground' : 'text-foreground'
          }`}>
            {excellent ? '🎉 Excellent! 🎉' : passed ? 'Well Done! 👏' : 'Keep Practicing! 💪'}
          </h1>

          <div className={`text-6xl font-black mb-2 ${
            excellent || passed ? 'text-primary-foreground' : 'text-primary'
          }`}>
            {correctCount}/{totalQuestions}
          </div>

          <div className={`text-2xl font-bold mb-4 ${
            excellent || passed ? 'text-primary-foreground/90' : 'text-muted-foreground'
          }`}>
            {percentage}%
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
            passed 
              ? 'bg-success text-success-foreground' 
              : 'bg-destructive text-destructive-foreground'
          }`}>
            {passed ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                PASSED
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                NEED MORE PRACTICE
              </>
            )}
          </div>
        </div>

        {/* Topic Breakdown */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-8 animate-slide-up">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            📊 Topic-wise Score
          </h2>
          <div className="grid gap-3">
            {(Object.entries(topicScores) as [Topic, { correct: number; total: number }][]).map(
              ([topic, score]) => {
                const topicPercentage = Math.round((score.correct / score.total) * 100);
                return (
                  <div key={topic} className="flex items-center gap-3">
                    <div className="w-28 text-sm font-medium text-muted-foreground">
                      {topicNames[topic]}
                    </div>
                    <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          topicPercentage >= 80
                            ? 'bg-gradient-success'
                            : topicPercentage >= 60
                            ? 'bg-gradient-cta'
                            : 'bg-destructive'
                        }`}
                        style={{ width: `${topicPercentage}%` }}
                      />
                    </div>
                    <div className="w-16 text-sm font-bold text-right">
                      {score.correct}/{score.total}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-8 animate-slide-up delay-100">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            📝 Question Review
          </h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {questions.map((q, index) => {
              const userAnswer = answers[q.id] || 'Not answered';
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border-2 ${
                    isCorrect
                      ? 'border-success bg-success/5'
                      : 'border-destructive bg-destructive/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCorrect
                        ? 'bg-success text-success-foreground'
                        : 'bg-destructive text-destructive-foreground'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground mb-2">{q.question}</p>
                      <div className="text-sm space-y-1">
                        <p className="flex items-center gap-2">
                          <span className="text-muted-foreground">Your answer:</span>
                          <span className={`font-semibold ${
                            isCorrect ? 'text-success' : 'text-destructive'
                          }`}>
                            {userAnswer}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="flex items-center gap-2">
                            <span className="text-muted-foreground">Correct answer:</span>
                            <span className="font-semibold text-success">{q.correctAnswer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-xl">
                      {isCorrect ? '✅' : '❌'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Try Again Button */}
        <div className="text-center animate-slide-up delay-200">
          <Button variant="cta" size="xl" onClick={onRestart}>
            <RefreshCw className="w-5 h-5" />
            Try Again with New Questions
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            A new set of questions will be generated
          </p>
        </div>
      </div>
    </div>
  );
};
