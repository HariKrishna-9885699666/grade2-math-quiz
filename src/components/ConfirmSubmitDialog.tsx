import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Send } from "lucide-react";

interface ConfirmSubmitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  answeredCount: number;
  totalQuestions: number;
}

export const ConfirmSubmitDialog = ({
  isOpen,
  onClose,
  onConfirm,
  answeredCount,
  totalQuestions,
}: ConfirmSubmitDialogProps) => {
  const unanswered = totalQuestions - answeredCount;
  const allAnswered = unanswered === 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-xl">
            {allAnswered ? (
              <>
                <span className="text-2xl">🎯</span>
                Ready to Submit?
              </>
            ) : (
              <>
                <AlertTriangle className="w-6 h-6 text-cta" />
                Some Questions Unanswered!
              </>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {allAnswered ? (
              <span>
                You've answered all <strong className="text-primary">{totalQuestions}</strong> questions.
                Are you sure you want to submit your assessment?
              </span>
            ) : (
              <span>
                You've only answered <strong className="text-primary">{answeredCount}</strong> out of{" "}
                <strong className="text-primary">{totalQuestions}</strong> questions.
                <br />
                <span className="text-destructive font-medium">
                  {unanswered} question{unanswered > 1 ? "s" : ""} will be marked wrong.
                </span>
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel className="font-semibold">
            Go Back
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-gradient-cta text-cta-foreground font-bold hover:opacity-90"
          >
            <Send className="w-4 h-4 mr-1" />
            Submit Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
