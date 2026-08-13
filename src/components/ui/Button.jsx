import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none rounded-xl";

  const variants = {
    primary: "bg-primary text-surface hover:bg-primary/90 active:scale-[0.98] shadow-sm hover:shadow",
    accent: "bg-accent text-ink hover:bg-accent/90 font-semibold active:scale-[0.98] shadow-sm hover:shadow",
    secondary: "bg-surface text-ink border border-line hover:bg-bg hover:border-muted/30 active:scale-[0.98]",
    outline: "border border-primary text-primary hover:bg-primary hover:text-surface active:scale-[0.98]",
    ghost: "text-ink hover:bg-surface hover:text-primary active:scale-[0.98]",
    danger: "bg-accent-2 text-surface hover:bg-accent-2/90 active:scale-[0.98]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 font-semibold",
    icon: "p-2 text-sm"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
