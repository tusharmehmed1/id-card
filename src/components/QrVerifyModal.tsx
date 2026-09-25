import React from 'react';
import { CardData } from '../types/card';
import { formatCardDate } from '../utils/dateUtils';
import { IctDivisionLogo, DoIctLogo, StepSkillBangladeshLogo } from './Logos';
import { CheckCircle2, ShieldCheck, X, ExternalLink, Calendar, MapPin, Award } from 'lucide-react';

interface QrVerifyModalProps {
  cardData: CardData;
  isOpen: boolean;
  onClose: () => void;
}

export const QrVerifyModal: React.FC<QrVerifyModalProps> = ({
  cardData,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-blue-900 text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sky-300 text-xs font-semibold tracking-wider uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Official Verification Portal
          </div>
          <h3 className="text-xl font-bold tracking-tight">StepSkill Bangladesh</h3>
          <p className="text-xs text-sky-200/90 mt-0.5">
            Credential Authenticity Verification Record
          </p>
        </div>

        {/* Verification Status Banner */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-900">VERIFIED OFFICIAL CREDENTIAL</p>
              <p className="text-[11px] text-emerald-700">Database match confirmed · Active Status</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase bg-emerald-600 text-white rounded-md">
            Active
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* User Profile Card */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sky-600 shrink-0 bg-white">
              {cardData.photoUrl ? (
                <img
                  src={cardData.photoUrl}
                  alt={cardData.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 font-bold text-lg">
                  {cardData.fullName ? cardData.fullName.charAt(0) : 'U'}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-base font-bold text-slate-900 uppercase truncate">
                {cardData.fullName || 'Member Name'}
              </h4>
              <p className="text-xs font-semibold text-sky-700 truncate">
                {cardData.profession || 'Freelance Specialist'}
              </p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                ID: {cardData.freelancerId}
              </p>
            </div>
          </div>

          {/* Verification Details Table */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-2xs">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> District
              </span>
              <span className="font-semibold text-slate-800">{cardData.district || 'Dhaka'}</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-2xs">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Award className="w-3.5 h-3.5 text-slate-400" /> Validity Term
              </span>
              <span className="font-semibold text-slate-800">2 Years Standard</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-2xs">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Issue Date
              </span>
              <span className="font-semibold text-slate-800">
                {cardData.issueDate ? formatCardDate(cardData.issueDate) : 'Today'}
              </span>
            </div>

            <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-2xs">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Expiry Date
              </span>
              <span className="font-semibold text-emerald-700">
                {cardData.expireDate ? formatCardDate(cardData.expireDate) : 'In 2 Years'}
              </span>
            </div>
          </div>

          {/* Institutional Partner Branding */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IctDivisionLogo scale={0.9} />
              <DoIctLogo scale={0.9} />
              <StepSkillBangladeshLogo scale={0.9} />
            </div>
            <a
              href="https://stepskill.com.bd"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1"
            >
              stepskill.com.bd <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            Support: <span className="font-medium text-slate-700">{cardData.supportEmail}</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
