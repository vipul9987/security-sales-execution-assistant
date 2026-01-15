import React from 'react';

interface ScoreGaugeProps {
  score: number; // 0-10 or 0-100
  max?: number;
  label?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, max = 10, label = "Score" }) => {
  const percentage = (score / max) * 100;
  
  let colorClass = 'text-emerald-500 border-emerald-500';
  if (percentage < 50) colorClass = 'text-rose-500 border-rose-500';
  else if (percentage < 75) colorClass = 'text-amber-500 border-amber-500';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center ${colorClass} bg-slate-800/50 shadow-inner`}>
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-xs opacity-80 uppercase font-medium">/ {max}</span>
      </div>
      <span className="mt-2 text-sm font-medium text-slate-400">{label}</span>
    </div>
  );
};