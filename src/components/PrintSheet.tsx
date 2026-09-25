import React from 'react';
import { CardData } from '../types/card';
import { IdCardFront } from './IdCardFront';
import { IdCardBack } from './IdCardBack';

interface PrintSheetProps {
  cardData: CardData;
}

export const PrintSheet: React.FC<PrintSheetProps> = ({ cardData }) => {
  const isPortrait = cardData.orientation === 'portrait';

  return (
    <div id="printable-card-area" className="hidden print:block font-sans">
      <div className="text-center mb-6">
        <h1 className="text-lg font-bold text-slate-800">
          StepSkill Bangladesh — Official Freelancer ID Card (Print Master)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Standard CR-80 Specification (53.98mm × 85.6mm · {isPortrait ? 'Portrait Vertical' : 'Landscape Horizontal'}) · Ready for PVC Card Machine &amp; Lamination
        </p>
      </div>

      <div
        className={`flex ${
          isPortrait ? 'flex-row flex-wrap justify-center items-start' : 'flex-col items-center'
        } gap-8`}
      >
        {/* Front Card with cut guides */}
        <div className="relative border border-dashed border-slate-300 p-2 rounded-lg inline-block">
          <span className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Front Side
          </span>
          <IdCardFront cardData={cardData} />
        </div>

        {/* Back Card with cut guides */}
        <div className="relative border border-dashed border-slate-300 p-2 rounded-lg inline-block">
          <span className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Back Side
          </span>
          <IdCardBack cardData={cardData} />
        </div>
      </div>

      <div className="mt-8 text-center text-[10px] text-slate-400 border-t border-slate-200 pt-4">
        Official Credential of Department of ICT &amp; StepSkill Bangladesh · Online Verification: www.stepskill.com.bd/verify
      </div>
    </div>
  );
};
