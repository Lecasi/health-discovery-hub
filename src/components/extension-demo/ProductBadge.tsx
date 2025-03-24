
import React from 'react';
import { cn } from '@/lib/utils';

type ProductBadgeProps = {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

const ProductBadge = ({ score, size = 'md', onClick }: ProductBadgeProps) => {
  // Determine color based on score
  const getColor = () => {
    if (score >= 7) return 'bg-[#10B981] border-[#10B981]';
    if (score >= 4) return 'bg-[#FBBF24] border-[#FBBF24]';
    return 'bg-[#EF4444] border-[#EF4444]';
  };

  // Size classes
  const sizeClasses = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  return (
    <div 
      className={cn(
        'rounded-full flex items-center justify-center text-white font-bold border-2 cursor-pointer transition-transform duration-200 hover:scale-105',
        getColor(),
        sizeClasses[size]
      )}
      onClick={onClick}
      role="button"
      title="Clique para análise detalhada"
    >
      {score}
    </div>
  );
};

export default ProductBadge;
