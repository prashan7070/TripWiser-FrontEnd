import React from 'react';
import { cn } from '../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', isLoading, className, ...props 
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg',
    secondary: 'bg-slate-800 text-white hover:bg-slate-900',
    outline: 'border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600',
    ghost: 'hover:bg-slate-100 text-slate-600',
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center px-6 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
        variants[variant],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};