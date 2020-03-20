import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: string;
  disabled?: boolean;
}

const Button = ({
  label,
  onClick = () => {},
  variant = 'indigo'
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full w-20 h-20 bg-gray-900 border px-4 py-2 rounded text-${variant}-500 border-${variant}-500 hover:text-white hover:bg-${variant}-500`}
    >
      {label}
    </button>
  );
};

export default Button;
