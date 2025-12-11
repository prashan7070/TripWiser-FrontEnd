import React from 'react';
import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
    <input
      className={cn(
        "w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm",
        error ? "border-red-500 focus:ring-red-200" : "",
        className
      )}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);