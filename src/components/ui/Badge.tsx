import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'success' | 'danger' | 'muted' | 'white' | 'warning';
}

const Badge: React.FC<BadgeProps> = ({ children, className = '', variant = 'muted' }) => {
  const variantClasses = {
    primary: 'bg-primary-red/10 text-primary-red border-primary-red/20',
    success: 'bg-status-green/10 text-status-green border-status-green/30',
    danger: 'bg-status-red/10 text-status-red border-status-red/30',
    muted: 'bg-white/5 text-text-muted border-white/5',
    white: 'bg-white/10 text-white border-white/10',
    warning: 'bg-orange-500/10 text-orange-500 border-white/5',
  };

  return (
    <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border inline-flex items-center justify-center ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Badge;
