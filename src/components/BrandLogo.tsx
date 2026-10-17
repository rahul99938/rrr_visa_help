import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  theme?: 'dark' | 'light';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  theme = 'light',
}) => {
  const heights = {
    sm: 'h-7 sm:h-8',
    md: 'h-8 sm:h-11',
    lg: 'h-12 sm:h-16',
    xl: 'h-16 sm:h-20',
  };

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#0f3260]';
  const subtextColor = theme === 'dark' ? 'text-neutral-300' : 'text-[#0f3260]';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Vector Emblem matching user-provided logo */}
      <svg
        viewBox="0 0 160 140"
        className={`${heights[size]} w-auto shrink-0 drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="RRR Visa Help Logo"
      >
        {/* Globe of Europe in Navy */}
        <circle cx="65" cy="40" r="32" stroke="#0f3260" strokeWidth="2.5" fill="#f8fafc" />
        <ellipse cx="65" cy="40" rx="16" ry="32" stroke="#0f3260" strokeWidth="1.5" strokeDasharray="2 2" fill="none" opacity="0.6" />
        <line x1="33" y1="40" x2="97" y2="40" stroke="#0f3260" strokeWidth="1.5" opacity="0.6" />
        <line x1="39" y1="23" x2="91" y2="23" stroke="#0f3260" strokeWidth="1.2" opacity="0.4" />
        <line x1="39" y1="57" x2="91" y2="57" stroke="#0f3260" strokeWidth="1.2" opacity="0.4" />
        
        {/* Europe Continent Silhouette stylized */}
        <path
          d="M52 28 C 55 25, 62 25, 66 29 C 70 32, 78 30, 80 34 C 82 38, 76 45, 71 44 C 67 43, 64 47, 60 46 C 56 45, 50 36, 52 28 Z"
          fill="#0f3260"
          opacity="0.85"
        />

        {/* Visa Passport Stamp with Airplane */}
        <g transform="translate(100, 15) rotate(12)">
          <rect x="0" y="0" width="34" height="42" rx="4" stroke="#0f3260" strokeWidth="2.2" fill="#ffffff" />
          <text x="17" y="14" fontSize="8" fontWeight="bold" fill="#0f3260" textAnchor="middle" fontFamily="sans-serif">VISA</text>
          {/* Airplane icon */}
          <path d="M17 19 L19 25 L24 26 L19 27 L18 31 L17 30 L16 31 L15 27 L10 26 L15 25 Z" fill="#0f3260" />
          <line x1="5" y1="35" x2="29" y2="35" stroke="#0f3260" strokeWidth="1" strokeDasharray="1.5 1.5" />
        </g>

        {/* Stylized Triple 'RRR' in brand colors */}
        {/* First 'R' - Navy #0f3260 */}
        <g id="first-R">
          <path
            d="M20 54 H44 C53 54 59 60 59 68 C59 75 54 80 47 82 L61 104 H46 L34 84 H32 V104 H20 V54 Z M32 64 V75 H43 C47 75 50 72 50 69 C50 66 47 64 43 64 H32 Z"
            fill="#0f3260"
          />
        </g>

        {/* Second 'R' - Golden Yellow/Amber #d59c19 */}
        <g id="second-R">
          <path
            d="M56 54 H78 C87 54 93 60 93 68 C93 75 88 80 81 82 L95 104 H80 L68 84 H68 V104 H56 V54 Z M68 64 V75 H77 C81 75 84 72 84 69 C84 66 81 64 77 64 H68 Z"
            fill="#d59c19"
          />
        </g>

        {/* Third 'R' - Emerald Green #0c7c45 */}
        <g id="third-R">
          <path
            d="M92 54 H114 C123 54 129 60 129 68 C129 75 124 80 117 82 L131 104 H116 L104 84 H104 V104 H92 V54 Z M104 64 V75 H113 C117 75 120 72 120 69 C120 66 117 64 113 64 H104 Z"
            fill="#0c7c45"
          />
        </g>

        {/* Upward Swooping Arrow Path (Gold & Green) */}
        <path
          d="M 18 88 C 45 78, 85 70, 138 72"
          stroke="#d59c19"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 24 94 C 55 83, 95 75, 142 74"
          stroke="#0c7c45"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrow Head */}
        <polygon points="140,65 156,73 140,82" fill="#0c7c45" />
      </svg>

      {/* Brand Title and Subtitle */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center text-base sm:text-xl md:text-2xl font-black tracking-tight leading-none whitespace-nowrap">
          <span className="text-[#0f3260]">RRR </span>
          <span className="text-[#d59c19] ml-1">Visa </span>
          <span className="text-[#0c7c45] ml-1">Help</span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`h-px w-2 sm:w-3 ${theme === 'dark' ? 'bg-neutral-500' : 'bg-[#0f3260]'}`} />
            <span className={`text-[7px] sm:text-[9px] font-bold tracking-[0.14em] uppercase whitespace-nowrap ${subtextColor}`}>
              YOUR JOB VISA PARTNER
            </span>
            <span className={`h-px w-2 sm:w-3 ${theme === 'dark' ? 'bg-neutral-500' : 'bg-[#0f3260]'}`} />
          </div>
        )}
      </div>
    </div>
  );
};
