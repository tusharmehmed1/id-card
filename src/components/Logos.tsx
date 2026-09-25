import React from 'react';

/**
 * ICT Division Logo (Government of the People's Republic of Bangladesh)
 */
export const IctDivisionLogo: React.FC<{ className?: string; scale?: number }> = ({ className = '', scale = 1 }) => {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
      {/* Govt Emblem Seal */}
      <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-xs">
        {/* Outer Red Ring */}
        <circle cx="50" cy="50" r="46" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#FEF08A" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Inner Green Field */}
        <circle cx="50" cy="50" r="38" fill="#15803D" />
        {/* Water Lily (Shapla) Emblem in Gold */}
        {/* Central Lily Petals */}
        <path d="M50 22 C48 34 44 42 50 56 C56 42 52 34 50 22 Z" fill="#FDE047" />
        <path d="M50 32 C41 38 34 48 40 58 C46 54 48 44 50 32 Z" fill="#FEF08A" />
        <path d="M50 32 C59 38 66 48 60 58 C54 54 52 44 50 32 Z" fill="#FEF08A" />
        {/* Water Ripple Waves */}
        <path d="M30 63 Q50 59 70 63 Q50 67 30 63 Z" fill="#FDE047" />
        <path d="M34 68 Q50 65 66 68 Q50 71 34 68 Z" fill="#FDE047" />
        {/* 4 Golden Stars on outer ring */}
        <polygon points="18,48 20,53 25,53 21,56 23,61 18,58 13,61 15,56 11,53 16,53" fill="#FEF08A" transform="scale(0.55) translate(4, 25)" />
        <polygon points="18,48 20,53 25,53 21,56 23,61 18,58 13,61 15,56 11,53 16,53" fill="#FEF08A" transform="scale(0.55) translate(4, 55)" />
        <polygon points="18,48 20,53 25,53 21,56 23,61 18,58 13,61 15,56 11,53 16,53" fill="#FEF08A" transform="scale(0.55) translate(145, 25)" />
        <polygon points="18,48 20,53 25,53 21,56 23,61 18,58 13,61 15,56 11,53 16,53" fill="#FEF08A" transform="scale(0.55) translate(145, 55)" />
      </svg>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span className="text-[12px] font-extrabold tracking-tight text-[#0A6836] uppercase font-sans">
          ICT
        </span>
        <span className="text-[8px] font-bold tracking-wider text-[#0A6836] uppercase font-sans -mt-0.5">
          DIVISION
        </span>
        <span className="text-[5.5px] font-semibold tracking-widest text-[#DC2626] uppercase font-sans mt-0.5">
          Future Is Here
        </span>
      </div>
    </div>
  );
};

/**
 * DoICT Logo (Department of Information and Communication Technology)
 */
export const DoIctLogo: React.FC<{ className?: string; scale?: number }> = ({ className = '', scale = 1 }) => {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
      {/* Icon: Signal Waves with Base */}
      <svg width="26" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-xs">
        {/* 3 Green Broadcast Waves */}
        <path d="M22 45 A32 32 0 0 1 78 45" stroke="#15803D" strokeWidth="8" strokeLinecap="round" />
        <path d="M34 53 A18 18 0 0 1 66 53" stroke="#15803D" strokeWidth="8" strokeLinecap="round" />
        <path d="M44 60 A6 6 0 0 1 56 60" stroke="#DC2626" strokeWidth="7" strokeLinecap="round" />
        {/* Red Transmitter Hub */}
        <circle cx="50" cy="62" r="5" fill="#DC2626" />
        {/* Vertical Signal Tower / Bars */}
        <rect x="36" y="70" width="7" height="18" rx="2" fill="#15803D" />
        <rect x="47" y="65" width="6" height="23" rx="2" fill="#15803D" />
        <rect x="57" y="72" width="7" height="16" rx="2" fill="#15803D" />
        {/* Base horizontal bar */}
        <rect x="30" y="88" width="40" height="4" rx="2" fill="#15803D" />
      </svg>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span className="text-[12px] font-black tracking-tight text-[#0A6836] font-sans">
          Do<span className="text-[#DC2626]">I</span>CT
        </span>
        <span className="text-[5.5px] font-semibold tracking-wider text-[#0A6836] uppercase font-sans mt-0.5">
          Dept. of ICT
        </span>
      </div>
    </div>
  );
};

/**
 * StepSkill Bangladesh Logo (Replaces Freelancers Bangladesh with requested StepSkill branding)
 */
export const StepSkillBangladeshLogo: React.FC<{ className?: string; scale?: number }> = ({ className = '', scale = 1 }) => {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
      {/* Modern High-Tech Emblem for StepSkill (Dynamic S-blocks in Cyan & Royal Blue) */}
      <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-xs">
        {/* Hexagonal / Rounded Tech Emblem Base */}
        <rect x="6" y="6" width="88" height="88" rx="22" fill="#0284C7" />
        <path
          d="M6 28 C6 15.85 15.85 6 28 6 L72 6 C84.15 6 94 15.85 94 28 L94 48 L6 48 Z"
          fill="#0369A1"
          opacity="0.3"
        />
        {/* Stylized Interlocking Steps / Forward Arrow 'S' mark */}
        {/* Top bar step */}
        <path
          d="M30 30 L68 30 C72.4 30 76 33.6 76 38 C76 42.4 72.4 46 68 46 L44 46 C39.6 46 36 49.6 36 54 L36 56 C36 60.4 39.6 64 44 64 L70 64"
          stroke="#FFFFFF"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Upward Growth Step Indicator */}
        <polygon points="66,22 78,30 66,38" fill="#38BDF8" />
        <circle cx="70" cy="64" r="5.5" fill="#38BDF8" />
      </svg>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center text-[12px] font-black tracking-tight font-sans">
          <span className="text-[#0284C7]">Step</span>
          <span className="text-[#0F172A]">Skill</span>
        </div>
        <span className="text-[6.5px] font-extrabold tracking-[0.16em] text-[#0369A1] uppercase font-sans mt-0.5">
          BANGLADESH
        </span>
      </div>
    </div>
  );
};

/**
 * Faint Watermark Emblem for Card Back / Background
 */
export const CardWatermarkEmblem: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none flex items-center justify-center ${className}`}>
      <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.07]">
        {/* Concentric rings */}
        <circle cx="50" cy="50" r="48" stroke="#0284C7" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="50" cy="50" r="42" stroke="#0284C7" strokeWidth="1" />
        <circle cx="50" cy="50" r="32" stroke="#0284C7" strokeWidth="1.5" />
        {/* Center Shapla & S-crest */}
        <path d="M50 20 C46 36 42 46 50 62 C58 46 54 36 50 20 Z" fill="#0284C7" />
        <path d="M50 32 C38 40 30 52 38 64 C45 60 48 48 50 32 Z" fill="#0284C7" />
        <path d="M50 32 C62 40 70 52 62 64 C55 60 52 48 50 32 Z" fill="#0284C7" />
        <path d="M26 70 Q50 65 74 70" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 76 Q50 72 70 76" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};
