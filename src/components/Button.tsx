import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children, disabled, type = 'button' }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Button;
