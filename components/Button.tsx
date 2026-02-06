import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'glass';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  isLoading = false, 
  children, 
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 rounded-lg";
  
  const variants = {
    primary: `
      bg-gradient-to-r from-cyan-500 to-blue-600 
      text-white 
      shadow-[0_0_20px_rgba(6,182,212,0.4)] 
      hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] 
      border-t border-white/20
    `,
    ghost: "text-slate-400 hover:text-white hover:bg-white/5",
    glass: "bg-slate-800/50 backdrop-blur-md border border-white/10 text-slate-200 hover:bg-slate-700/50 shadow-lg hover:shadow-cyan-500/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} ${isLoading ? 'cursor-wait' : ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Initializing...
        </span>
      ) : children}
    </button>
  );
};
