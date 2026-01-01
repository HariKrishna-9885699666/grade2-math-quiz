interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      {/* Text indicator */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-primary">
          Question {current} of {total}
        </span>
        <span className="text-sm font-bold text-cta">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-secondary rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-cta rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>

      {/* Milestone markers */}
      <div className="relative h-2 mt-1">
        {[25, 50, 75, 100].map((milestone) => (
          <div
            key={milestone}
            className={`absolute top-0 w-1 h-1 rounded-full transition-colors duration-300 ${
              percentage >= milestone ? 'bg-cta' : 'bg-secondary'
            }`}
            style={{ left: `${milestone}%`, transform: 'translateX(-50%)' }}
          />
        ))}
      </div>
    </div>
  );
};
