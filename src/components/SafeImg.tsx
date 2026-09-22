import React, { useState } from 'react';

interface SafeImgProps {
  src: string;
  alt: string;
  fallbacks?: string[];
  className?: string;
  style?: React.CSSProperties;
}

export const SafeImg: React.FC<SafeImgProps> = ({ src, alt, fallbacks = [], className, style }) => {
  const chain = [src, ...fallbacks.filter((f) => f && f !== src)];
  const [index, setIndex] = useState(0);
  const current = chain[Math.min(index, chain.length - 1)];

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      style={style}
      draggable={false}
      onError={() => {
        if (index < chain.length - 1) setIndex(index + 1);
      }}
    />
  );
};
