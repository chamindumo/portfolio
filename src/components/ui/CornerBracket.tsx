import React from 'react';

interface CornerBracketProps {
  className?: string;
  size?: number;
  color?: string;
}

export const CornerBracket: React.FC<CornerBracketProps> = ({
  className = '',
  size = 8,
  color,
}) => {
  const style = color ? ({ '--corner-color': color } as React.CSSProperties) : undefined;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <span
        className="corner-tl"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      <span
        className="corner-tr"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      <span
        className="corner-bl"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      <span
        className="corner-br"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  );
};
