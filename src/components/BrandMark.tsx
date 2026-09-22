import React from 'react';

export const BrandMark: React.FC<{ size?: number; light?: boolean }> = ({ size = 56, light }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: size * 0.42,
        letterSpacing: '-0.04em',
        background: light
          ? 'linear-gradient(145deg, #0f766e, #115e59)'
          : 'linear-gradient(145deg, #2dd4bf, #0f766e)',
        color: '#f8fffc',
        boxShadow: light ? '0 10px 28px rgba(13, 148, 136, 0.18)' : '0 12px 32px rgba(45, 212, 191, 0.18)',
        flexShrink: 0,
      }}
    >
      آ
    </div>
  );
};
