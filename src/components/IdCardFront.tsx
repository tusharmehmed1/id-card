import React from 'react';
import { CardData } from '../types/card';
import { CardBackgroundDecor } from './CardBackgroundDecor';
import { IctDivisionLogo, DoIctLogo, StepSkillBangladeshLogo } from './Logos';
import { CardQrCode } from './CardQrCode';
import { formatCardDate } from '../utils/dateUtils';

interface IdCardFrontProps {
  cardData: CardData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  onQrClick?: () => void;
  scale?: number;
}

export const IdCardFront: React.FC<IdCardFrontProps> = ({
  cardData,
  cardRef,
  onQrClick,
}) => {
  const qrVerificationUrl = `${cardData.verifyUrl}?id=${encodeURIComponent(
    cardData.freelancerId
  )}&name=${encodeURIComponent(cardData.fullName)}`;

  const isPortrait = cardData.orientation === 'portrait';

  // Photo rendering helper
  const renderPhoto = (sizeClass: string) => (
    <div
      className={`${sizeClass} rounded-full overflow-hidden border-[3.5px] border-[#103E8E] bg-slate-100 shadow-md relative shrink-0`}
    >
      {cardData.photoUrl ? (
        <img
          src={cardData.photoUrl}
          alt={cardData.fullName}
          className="w-full h-full object-cover"
          style={{
            transform: `scale(${cardData.photoScale}) translate(${cardData.photoPositionX}px, ${cardData.photoPositionY}px)`,
            transformOrigin: 'center center',
          }}
        />
      ) : (
        /* Fallback Studio Portrait SVG */
        <svg viewBox="0 0 120 120" className="w-full h-full object-cover">
          <rect width="120" height="120" fill="#E2E8F0" />
          <path
            d="M25 60 C25 25 95 25 95 60 C95 85 92 105 88 115 L32 115 C28 105 25 85 25 60 Z"
            fill="#292524"
          />
          <ellipse cx="60" cy="56" rx="28" ry="32" fill="#E0A97E" />
          <path
            d="M34 45 C42 32 60 30 86 42 C78 30 65 24 45 28 C38 31 34 38 34 45 Z"
            fill="#1C1917"
          />
          <ellipse cx="49" cy="54" rx="3.5" ry="2.2" fill="#1C1917" />
          <ellipse cx="71" cy="54" rx="3.5" ry="2.2" fill="#1C1917" />
          <circle cx="50" cy="53" r="1" fill="#FFFFFF" />
          <circle cx="72" cy="53" r="1" fill="#FFFFFF" />
          <path
            d="M43 49 Q49 46 54 49"
            stroke="#1C1917"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M66 49 Q71 46 77 49"
            stroke="#1C1917"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M60 54 L59 62 L62 62"
            stroke="#C2875C"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M51 68 Q60 76 69 68"
            stroke="#991B1B"
            strokeWidth="2.2"
            fill="#FFFFFF"
            strokeLinecap="round"
          />
          <path d="M50 85 L50 95 L70 95 L70 85 Z" fill="#D4976C" />
          <path
            d="M30 115 C30 96 46 92 60 92 C74 92 90 96 90 115 Z"
            fill="#1E3A8A"
          />
          <path d="M52 92 L60 102 L68 92 Z" fill="#DC2626" />
        </svg>
      )}
    </div>
  );

  // ----------------------------------------------------------------------
  // PORTRAIT ORIENTATION (Default, Standard CR-80 Vertical 378px x 600px)
  // ----------------------------------------------------------------------
  if (isPortrait) {
    return (
      <div
        ref={cardRef}
        id="card-front-container"
        className="relative w-[378px] h-[600px] bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 select-none flex flex-col justify-between p-5 shrink-0 print:border-none print:shadow-none print:rounded-none"
        style={{
          boxShadow:
            '0 10px 30px -5px rgba(2, 132, 199, 0.14), 0 4px 14px -2px rgba(15, 23, 42, 0.08)',
        }}
      >
        {/* Background Decorative Cyan/Blue Droplets and Abstract Patterns */}
        <CardBackgroundDecor />

        {/* Top Header: Official Institutional Logos Bar */}
        <div className="relative z-10 pt-1">
          <div className="flex items-center justify-between gap-1 pb-2 border-b border-slate-100">
            <IctDivisionLogo scale={0.88} />
            <DoIctLogo scale={0.88} />
            <StepSkillBangladeshLogo scale={0.88} />
          </div>
        </div>

        {/* Middle Section: Centered Profile Photo, Name & Profession */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto py-1">
          {/* Circular Photo */}
          {renderPhoto('w-[124px] h-[124px]')}

          {/* Full Name in Classic Bold Serif */}
          <h2 className="font-serif-card font-bold tracking-[0.03em] text-[#0F172A] text-[18px] leading-snug uppercase mt-3 px-2 line-clamp-2">
            {cardData.fullName || 'FULL NAME HERE'}
          </h2>

          {/* Profession in Bold Royal Blue */}
          <p className="text-[#104193] font-bold text-[12px] tracking-wide mt-0.5 px-2 line-clamp-1 font-sans">
            {cardData.profession || 'Professional | Specialist'}
          </p>

          {/* User Info Details Table Box */}
          <div className="w-full mt-3 px-3 py-2.5 bg-slate-50/80 border border-slate-200/70 rounded-xl space-y-[5px] text-[11px] font-sans text-left shadow-2xs">
            {/* Freelancer ID */}
            <div className="flex items-center">
              <span className="w-[96px] text-[#475569] font-medium shrink-0">
                Freelancer ID
              </span>
              <span className="text-[#475569] font-semibold w-3 text-center shrink-0">:</span>
              <span className="text-[#0F172A] font-bold tracking-wider font-mono text-[11px] truncate">
                {cardData.freelancerId}
              </span>
            </div>

            {/* Date of Birth */}
            <div className="flex items-center">
              <span className="w-[96px] text-[#475569] font-medium shrink-0">
                Date of Birth
              </span>
              <span className="text-[#475569] font-semibold w-3 text-center shrink-0">:</span>
              <span className="text-[#0F172A] font-semibold truncate">
                {cardData.dateOfBirth ? formatCardDate(cardData.dateOfBirth) : '—'}
              </span>
            </div>

            {/* Issue Date */}
            <div className="flex items-center">
              <span className="w-[96px] text-[#475569] font-medium shrink-0">
                Issue Date
              </span>
              <span className="text-[#475569] font-semibold w-3 text-center shrink-0">:</span>
              <span className="text-[#0F172A] font-semibold truncate">
                {cardData.issueDate ? formatCardDate(cardData.issueDate) : '—'}
              </span>
            </div>

            {/* Expire Date */}
            <div className="flex items-center">
              <span className="w-[96px] text-[#475569] font-medium shrink-0">
                Expire Date
              </span>
              <span className="text-[#475569] font-semibold w-3 text-center shrink-0">:</span>
              <span className="text-[#0F172A] font-semibold truncate">
                {cardData.expireDate ? formatCardDate(cardData.expireDate) : '—'}
              </span>
            </div>

            {/* District */}
            <div className="flex items-center">
              <span className="w-[96px] text-[#475569] font-medium shrink-0">
                District
              </span>
              <span className="text-[#475569] font-semibold w-3 text-center shrink-0">:</span>
              <span className="text-[#0F172A] font-semibold truncate">
                {cardData.district || 'Dhaka'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: QR Code + Verification Stamp + Authority Subtitle */}
        <div className="relative z-10 pt-1 pb-0.5">
          <div className="flex items-center justify-between gap-3 bg-white/90 p-2 rounded-xl border border-slate-100">
            <div className="min-w-0 flex-1">
              <span className="inline-block px-1.5 py-0.5 text-[8.5px] font-bold text-sky-800 bg-sky-100/80 rounded uppercase tracking-wider mb-1">
                Official Credential
              </span>
              <p className="text-[10px] font-bold text-slate-800 leading-tight">
                Scan QR to Verify Authenticity
              </p>
              <p className="text-[8.5px] text-slate-500 font-mono mt-0.5 truncate">
                {cardData.verifyUrl ? cardData.verifyUrl.replace(/^https?:\/\//, '') : 'www.stepskill.com.bd/verify'}
              </p>
            </div>

            {/* QR Code Container */}
            <div
              className="shrink-0 cursor-pointer group"
              title="Click to preview verification page"
              onClick={onQrClick}
            >
              <div className="p-1 bg-white border border-slate-300 rounded-md shadow-2xs transition-transform group-hover:scale-105">
                <CardQrCode value={qrVerificationUrl} size={58} />
              </div>
            </div>
          </div>

          {/* Small footer note */}
          <div className="mt-2 text-center">
            <p className="text-[7.5px] font-medium text-slate-500 tracking-wide font-sans">
              Issued by Department of ICT, ICT Division &amp; StepSkill Bangladesh
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // LANDSCAPE ORIENTATION (CR-80 Horizontal 600px x 378px)
  // ----------------------------------------------------------------------
  return (
    <div
      ref={cardRef}
      id="card-front-container"
      className="relative w-[600px] h-[378px] bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 select-none flex flex-col justify-between p-6 shrink-0 print:border-none print:shadow-none print:rounded-none"
      style={{
        boxShadow:
          '0 10px 30px -5px rgba(2, 132, 199, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.08)',
      }}
    >
      {/* Background Decorative Cyan/Blue Droplets and Abstract Patterns */}
      <CardBackgroundDecor />

      {/* Main Top Section: Photo + User Information */}
      <div className="relative z-10 flex items-start gap-6 mt-1">
        {/* Profile Photo */}
        {renderPhoto('w-[124px] h-[124px]')}

        {/* User Info Details Table */}
        <div className="flex-1 min-w-0 pt-0.5">
          {/* Full Name in Classic Bold Serif */}
          <h2 className="font-serif-card font-bold tracking-[0.03em] text-[#0F172A] text-[21px] leading-snug uppercase truncate">
            {cardData.fullName || 'FULL NAME HERE'}
          </h2>

          {/* Profession in Bold Royal Blue */}
          <p className="text-[#104193] font-bold text-[13px] tracking-wide mt-0.5 truncate font-sans">
            {cardData.profession || 'Professional | Specialist'}
          </p>

          {/* Clean Key-Value Grid */}
          <div className="mt-3.5 space-y-[4px] text-[11px] font-sans">
            <div className="flex items-center">
              <span className="w-[105px] text-[#475569] font-medium shrink-0">
                Freelancer ID
              </span>
              <span className="text-[#475569] font-semibold w-4 text-center shrink-0">:</span>
              <span className="text-[#0F172A] font-bold tracking-wider font-mono text-[11.5px] truncate">
                {cardData.freelancerId}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-[105px] text-[#475569] font-medium shrink-0">
                Date of Birth
              </span>
              <span className="text-[#475569] font-semibold w-4 text-center shrink-0">:</span>
              <span className="text-[#0F172A] font-semibold truncate">
                {cardData.dateOfBirth ? formatCardDate(cardData.dateOfBirth) : '—'}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-[105px] text-[#475569] font-medium shrink-0">
                Issue Date
              </span>
              <span className="text-[#475569] font-semibold w-4 text-center shrink-0">:</span>
              <span className="text-[#0F172A] font-semibold truncate">
                {cardData.issueDate ? formatCardDate(cardData.issueDate) : '—'}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-[105px] text-[#475569] font-medium shrink-0">
                Expire Date
              </span>
              <span className="text-[#475569] font-semibold w-4 text-center shrink-0">:</span>
              <span className="text-[#0F172A] font-semibold truncate">
                {cardData.expireDate ? formatCardDate(cardData.expireDate) : '—'}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-[105px] text-[#475569] font-medium shrink-0">
                District
              </span>
              <span className="text-[#475569] font-semibold w-4 text-center shrink-0">:</span>
              <span className="text-[#0F172A] font-semibold truncate">
                {cardData.district || 'Dhaka'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Official Logos + QR Code + Footer Note */}
      <div className="relative z-10 mt-auto pt-3">
        <div className="flex items-end justify-between gap-3">
          <div className="flex items-center gap-4.5 pb-1">
            <IctDivisionLogo />
            <DoIctLogo />
            <StepSkillBangladeshLogo />
          </div>

          <div
            className="shrink-0 flex flex-col items-center cursor-pointer group"
            title="Click to preview verification page"
            onClick={onQrClick}
          >
            <div className="p-1 bg-white border border-slate-300 rounded shadow-xs transition-transform group-hover:scale-105">
              <CardQrCode value={qrVerificationUrl} size={66} />
            </div>
          </div>
        </div>

        <div className="mt-1 text-center">
          <p className="text-[7.5px] font-medium text-slate-500 tracking-wide font-sans">
            Issued by Department of ICT, ICT Division &amp; StepSkill Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};
