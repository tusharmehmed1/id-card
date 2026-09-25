import React from 'react';

/**
 * Recreates the exact decorative cyan/blue bubble and abstract geometric pattern
 * found on the official ID card borders in the reference image.
 */
export const CardBackgroundDecor: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Top-Left Corner Decorative Bubbles & Geometric Triangles */}
      <svg
        className="absolute top-0 left-0 w-36 h-36 opacity-75"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="18" r="42" fill="#BAE6FD" opacity="0.4" />
        <circle cx="70" cy="25" r="24" fill="#7DD3FC" opacity="0.3" />
        <polygon points="12,70 34,92 10,105" fill="#38BDF8" opacity="0.5" />
        <polygon points="45,45 65,30 55,60" fill="#0284C7" opacity="0.35" />
        <circle cx="10" cy="85" r="16" fill="#93C5FD" opacity="0.45" />
        <circle cx="120" cy="15" r="12" fill="#E0F2FE" opacity="0.6" />
      </svg>

      {/* Bottom-Left Corner Decorative Droplets & Bubbles */}
      <svg
        className="absolute bottom-0 left-0 w-44 h-44 opacity-80"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25" cy="155" r="55" fill="#7DD3FC" opacity="0.4" />
        <circle cx="75" cy="165" r="32" fill="#38BDF8" opacity="0.3" />
        <circle cx="30" cy="100" r="28" fill="#BAE6FD" opacity="0.5" />
        <circle cx="110" cy="170" r="18" fill="#93C5FD" opacity="0.4" />
        {/* Soft curving petal */}
        <path
          d="M10 110 C35 125 55 150 45 180 Z"
          fill="#0284C7"
          opacity="0.25"
        />
      </svg>

      {/* Top-Right Corner Decorative Droplets & Bubbles */}
      <svg
        className="absolute top-0 right-0 w-48 h-36 opacity-75"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="165" cy="20" r="50" fill="#BAE6FD" opacity="0.4" />
        <circle cx="115" cy="15" r="28" fill="#7DD3FC" opacity="0.35" />
        <circle cx="190" cy="75" r="36" fill="#38BDF8" opacity="0.4" />
        <circle cx="140" cy="60" r="16" fill="#93C5FD" opacity="0.3" />
        <polygon points="185,15 170,35 195,40" fill="#0284C7" opacity="0.35" />
      </svg>

      {/* Bottom-Right Corner Decorative Geometrics & Facets */}
      <svg
        className="absolute bottom-0 right-0 w-44 h-40 opacity-75"
        viewBox="0 0 180 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="160" cy="140" r="48" fill="#BAE6FD" opacity="0.4" />
        <polygon points="145,155 175,130 170,165" fill="#38BDF8" opacity="0.55" />
        <polygon points="120,135 140,115 150,145" fill="#0284C7" opacity="0.3" />
        <circle cx="125" cy="155" r="22" fill="#7DD3FC" opacity="0.35" />
      </svg>
    </div>
  );
};
