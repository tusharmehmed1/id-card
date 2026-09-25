import React from 'react';
import { CardData } from '../types/card';
import { CardBackgroundDecor } from './CardBackgroundDecor';
import { IctDivisionLogo, DoIctLogo, StepSkillBangladeshLogo, CardWatermarkEmblem } from './Logos';

interface IdCardBackProps {
  cardData: CardData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export const IdCardBack: React.FC<IdCardBackProps> = ({
  cardData,
  cardRef,
}) => {
  const isPortrait = cardData.orientation === 'portrait';

  // ----------------------------------------------------------------------
  // PORTRAIT ORIENTATION (CR-80 Vertical 378px x 600px)
  // ----------------------------------------------------------------------
  if (isPortrait) {
    return (
      <div
        ref={cardRef}
        id="card-back-container"
        className="relative w-[378px] h-[600px] bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 select-none flex flex-col justify-between p-5 shrink-0 print:border-none print:shadow-none print:rounded-none"
        style={{
          boxShadow:
            '0 10px 30px -5px rgba(2, 132, 199, 0.14), 0 4px 14px -2px rgba(15, 23, 42, 0.08)',
        }}
      >
        {/* Background Decorative Droplets */}
        <CardBackgroundDecor />

        {/* Central Faint Watermark Seal */}
        <CardWatermarkEmblem className="absolute inset-0 m-auto" />

        {/* Top: Official Logos Header */}
        <div className="relative z-10 pt-1">
          <div className="flex items-center justify-between gap-1 pb-2 border-b border-slate-100">
            <IctDivisionLogo scale={0.88} />
            <DoIctLogo scale={0.88} />
            <StepSkillBangladeshLogo scale={0.88} />
          </div>
        </div>

        {/* Center: Instructions and Contact Information */}
        <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center text-center space-y-4">
          <div className="space-y-1">
            <p className="font-serif-card text-[15px] font-bold text-[#1E293B] leading-snug">
              To verify this ID Card please
            </p>
            <p className="font-serif-card text-[15px] font-bold text-[#1E293B] leading-snug">
              scan the QR code.
            </p>
          </div>

          <div className="space-y-1 pt-1">
            <p className="font-serif-card text-[13px] text-[#334155] leading-normal">
              For any further assistance, please visit
            </p>
            <p className="font-sans text-[13px] font-bold text-[#0F172A] tracking-wide hover:text-[#0284C7] transition-colors">
              {cardData.verifyUrl ? cardData.verifyUrl.replace(/^https?:\/\//, '') : 'www.stepskill.com.bd/verify'}
              <span className="font-normal text-slate-500 font-serif-card"> or</span>
            </p>
            <p className="font-sans text-[12.5px] font-bold text-[#0F172A] tracking-wide">
              e-mail:{' '}
              <span className="text-[#0284C7] font-semibold underline decoration-slate-300 underline-offset-2">
                {cardData.supportEmail || 'support@stepskill.com.bd'}
              </span>
            </p>
          </div>

          {/* Terms & Regulations */}
          <div className="w-full text-left bg-slate-50/80 border border-slate-200/60 rounded-xl p-3 space-y-1 text-[10px] text-slate-600 font-sans leading-relaxed">
            <p className="font-bold text-slate-800 text-[10.5px]">Important Guidelines:</p>
            <p>• This card remains the property of StepSkill Bangladesh.</p>
            <p>• In case of loss, immediately report to support@stepskill.com.bd.</p>
            <p>• Unauthorized duplication or misuse is punishable by law.</p>
          </div>

          {/* Authorized Signature Stamp */}
          <div className="pt-2 flex flex-col items-center">
            {/* Signature flourish svg */}
            <svg width="120" height="34" viewBox="0 0 120 34" fill="none" className="text-sky-900 opacity-80">
              <path
                d="M10 24 C20 10 32 4 45 16 C55 26 48 30 62 12 C72 -2 80 18 95 20 C102 21 110 15 115 12"
                stroke="#0369A1"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M35 24 L75 24" stroke="#0369A1" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <div className="w-36 h-[1px] bg-slate-300 mt-0.5" />
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">
              Authorized Signatory
            </span>
          </div>
        </div>

        {/* Bottom Accreditation Note */}
        <div className="relative z-10 pt-1 pb-0.5 text-center border-t border-slate-100">
          <p className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider font-sans">
            Department of ICT &amp; StepSkill Bangladesh
          </p>
          <p className="text-[7.5px] text-slate-400 mt-0.5">
            Official Accreditation &amp; Freelancer Verification
          </p>
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
      id="card-back-container"
      className="relative w-[600px] h-[378px] bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 select-none flex flex-col justify-between p-6 shrink-0 print:border-none print:shadow-none print:rounded-none"
      style={{
        boxShadow:
          '0 10px 30px -5px rgba(2, 132, 199, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.08)',
      }}
    >
      {/* Background Decorative Droplets */}
      <CardBackgroundDecor />

      {/* Central Faint Watermark Seal */}
      <CardWatermarkEmblem className="absolute inset-0 m-auto" />

      {/* Verification Instructions Area */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-6 space-y-4">
        <div className="space-y-1">
          <p className="font-serif-card text-[15px] font-semibold text-[#1E293B] leading-snug">
            To verify this ID Card please
          </p>
          <p className="font-serif-card text-[15px] font-semibold text-[#1E293B] leading-snug">
            scan the QR code.
          </p>
        </div>

        <div className="pt-2 space-y-1">
          <p className="font-serif-card text-[14px] text-[#334155] leading-normal">
            For any further assistance, please visit
          </p>
          <p className="font-sans text-[13.5px] font-bold text-[#0F172A] tracking-wide hover:text-[#0284C7] transition-colors">
            {cardData.verifyUrl ? cardData.verifyUrl.replace(/^https?:\/\//, '') : 'www.stepskill.com.bd/verify'}
            <span className="font-normal text-slate-500 font-serif-card"> or</span>
          </p>
          <p className="font-sans text-[13.5px] font-bold text-[#0F172A] tracking-wide">
            e-mail:{' '}
            <span className="text-[#0284C7] font-semibold underline decoration-slate-300 underline-offset-2">
              {cardData.supportEmail || 'support@stepskill.com.bd'}
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Logos centered */}
      <div className="relative z-10 mt-auto pb-2 flex flex-col items-center">
        <div className="flex items-center justify-center gap-6 py-2 px-6 rounded-lg">
          <IctDivisionLogo scale={1.05} />
          <div className="w-[1px] h-6 bg-slate-200/80" />
          <DoIctLogo scale={1.05} />
          <div className="w-[1px] h-6 bg-slate-200/80" />
          <StepSkillBangladeshLogo scale={1.05} />
        </div>
        <p className="text-[7.5px] font-medium text-slate-400 tracking-wider uppercase font-sans mt-1">
          Official Accreditation &amp; Freelancer Verification
        </p>
      </div>
    </div>
  );
};
