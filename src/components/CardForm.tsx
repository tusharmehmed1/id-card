import React, { useRef, useState } from 'react';
import { CardData, BANGLADESH_DISTRICTS, POPULAR_PROFESSIONS } from '../types/card';
import { calculateExpiryDate, generateFreelancerId } from '../utils/dateUtils';
import {
  User,
  Briefcase,
  MapPin,
  Calendar,
  CreditCard,
  Upload,
  RefreshCw,
  ZoomIn,
  Move,
  CheckCircle2,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface CardFormProps {
  cardData: CardData;
  onChange: (data: CardData) => void;
  onResetSample: () => void;
}

export const CardForm: React.FC<CardFormProps> = ({
  cardData,
  onChange,
  onResetSample,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [autoExpire, setAutoExpire] = useState<boolean>(true);
  const [districtQuery, setDistrictQuery] = useState<string>('');
  const [showDistrictList, setShowDistrictList] = useState<boolean>(false);

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds 8MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({
            ...cardData,
            photoUrl: event.target.result as string,
            photoScale: 1,
            photoPositionX: 0,
            photoPositionY: 0,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Issue Date Change -> automatically update Expire Date to +2 years
  const handleIssueDateChange = (newIssueDate: string) => {
    const updated: CardData = {
      ...cardData,
      issueDate: newIssueDate,
    };
    if (autoExpire) {
      updated.expireDate = calculateExpiryDate(newIssueDate, 2);
    }
    onChange(updated);
  };

  // Filter districts
  const filteredDistricts = BANGLADESH_DISTRICTS.filter((d) =>
    d.toLowerCase().includes((districtQuery || cardData.district || '').toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Form Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-sky-600" />
            Card Information
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in the details to customize your official StepSkill ID card.
          </p>
        </div>
        <button
          type="button"
          onClick={onResetSample}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          title="Restore sample details from reference image"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Load Sample
        </button>
      </div>

      {/* Card Orientation Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Card Orientation (কার্ড ফরম্যাট)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onChange({ ...cardData, orientation: 'portrait' })}
            className={`p-2.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
              cardData.orientation === 'portrait'
                ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-500/20 text-sky-900'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            {/* Portrait icon illustration */}
            <div className={`w-6 h-9 rounded-sm border-2 flex items-center justify-center shrink-0 ${
              cardData.orientation === 'portrait' ? 'border-sky-600 bg-sky-100' : 'border-slate-400 bg-slate-100'
            }`}>
              <div className="w-2.5 h-2.5 rounded-full bg-current opacity-70 mb-2" />
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1">
                Portrait (ভার্টিক্যাল)
                {cardData.orientation === 'portrait' && (
                  <span className="text-[10px] bg-sky-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Standard Vertical CR-80 PVC
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...cardData, orientation: 'landscape' })}
            className={`p-2.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
              cardData.orientation === 'landscape'
                ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-500/20 text-sky-900'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            {/* Landscape icon illustration */}
            <div className={`w-9 h-6 rounded-sm border-2 flex items-center justify-center shrink-0 ${
              cardData.orientation === 'landscape' ? 'border-sky-600 bg-sky-100' : 'border-slate-400 bg-slate-100'
            }`}>
              <div className="w-2.5 h-2.5 rounded-full bg-current opacity-70 mr-2" />
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1">
                Landscape (হরাইজন্টাল)
                {cardData.orientation === 'landscape' && (
                  <span className="text-[10px] bg-sky-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Horizontal CR-80 PVC
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Profile Photo Upload & Adjustment */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Profile Photo
        </label>
        
        <div className="flex items-start gap-4">
          {/* Photo Preview Circle */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-sky-600 bg-slate-100 shrink-0 shadow-xs">
            {cardData.photoUrl ? (
              <img
                src={cardData.photoUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${cardData.photoScale}) translate(${cardData.photoPositionX}px, ${cardData.photoPositionY}px)`,
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px]">
                <User className="w-6 h-6 mb-0.5" />
                No Photo
              </div>
            )}
          </div>

          {/* Upload Button & Controls */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Photo
              </button>

              {cardData.photoUrl && (
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...cardData,
                      photoUrl: '',
                      photoScale: 1,
                      photoPositionX: 0,
                      photoPositionY: 0,
                    })
                  }
                  className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-500">
              Recommended: Passport style square photo (JPG, PNG).
            </p>

            {/* Photo Adjustments (Zoom & Pan) */}
            {cardData.photoUrl && (
              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="flex items-center justify-between text-slate-600 mb-1">
                    <span className="flex items-center gap-1 text-[11px] font-medium">
                      <ZoomIn className="w-3 h-3 text-slate-400" /> Zoom
                    </span>
                    <span className="text-[10px] font-mono">{cardData.photoScale.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="2.5"
                    step="0.05"
                    value={cardData.photoScale}
                    onChange={(e) =>
                      onChange({ ...cardData, photoScale: parseFloat(e.target.value) })
                    }
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-600 mb-1">
                    <span className="flex items-center gap-1 text-[11px] font-medium">
                      <Move className="w-3 h-3 text-slate-400" /> Vertical Offset
                    </span>
                    <span className="text-[10px] font-mono">{cardData.photoPositionY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    step="1"
                    value={cardData.photoPositionY}
                    onChange={(e) =>
                      onChange({ ...cardData, photoPositionY: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Personal Info Grid */}
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={cardData.fullName}
              onChange={(e) => onChange({ ...cardData, fullName: e.target.value.toUpperCase() })}
              placeholder="e.g. TANHA TAMANNA SYED"
              className="w-full pl-9 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all uppercase placeholder:normal-case placeholder:font-normal"
            />
          </div>
        </div>

        {/* Profession */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Profession / Specialization <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={cardData.profession}
              onChange={(e) => onChange({ ...cardData, profession: e.target.value })}
              placeholder="e.g. Photographer | Digital Marketer"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
            />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {POPULAR_PROFESSIONS.slice(0, 4).map((prof) => (
              <button
                key={prof}
                type="button"
                onClick={() => onChange({ ...cardData, profession: prof })}
                className="px-2 py-0.5 text-[11px] text-slate-600 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors cursor-pointer"
              >
                {prof}
              </button>
            ))}
          </div>
        </div>

        {/* District */}
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            District / জেলা <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={cardData.district}
              onChange={(e) => {
                setDistrictQuery(e.target.value);
                onChange({ ...cardData, district: e.target.value });
                setShowDistrictList(true);
              }}
              onFocus={() => setShowDistrictList(true)}
              placeholder="e.g. Dhaka, Chittagong, Sylhet..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          {/* Dropdown suggestions */}
          {showDistrictList && (
            <div className="absolute z-30 left-0 right-0 mt-1 max-h-44 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg py-1">
              {filteredDistricts.length > 0 ? (
                filteredDistricts.map((dist) => (
                  <button
                    key={dist}
                    type="button"
                    onClick={() => {
                      onChange({ ...cardData, district: dist });
                      setShowDistrictList(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-sky-50 hover:text-sky-700 transition-colors flex items-center justify-between cursor-pointer ${
                      cardData.district === dist ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>{dist}</span>
                    {cardData.district === dist && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-slate-400">No matching district found</div>
              )}
            </div>
          )}
        </div>

        {/* Freelancer ID */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Freelancer / Member ID
            </label>
            <button
              type="button"
              onClick={() => onChange({ ...cardData, freelancerId: generateFreelancerId() })}
              className="inline-flex items-center gap-1 text-[11px] text-sky-600 hover:text-sky-700 font-semibold cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Generate ID
            </button>
          </div>
          <div className="relative">
            <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={cardData.freelancerId}
              onChange={(e) => onChange({ ...cardData, freelancerId: e.target.value.toUpperCase() })}
              placeholder="e.g. SSB-829140"
              className="w-full pl-9 pr-3 py-2 text-sm font-mono font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all uppercase"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={cardData.dateOfBirth}
              onChange={(e) => onChange({ ...cardData, dateOfBirth: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>
        </div>

        {/* Validity Period: Issue Date (Today) & Expire Date (Next 2 Years) */}
        <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              2-Year Validity Rule
            </span>
            <label className="flex items-center gap-1.5 text-[11px] text-sky-800 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={autoExpire}
                onChange={(e) => {
                  setAutoExpire(e.target.checked);
                  if (e.target.checked) {
                    onChange({
                      ...cardData,
                      expireDate: calculateExpiryDate(cardData.issueDate, 2),
                    });
                  }
                }}
                className="rounded accent-sky-600"
              />
              Auto 2 Years
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Issue Date */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Issue Date (Today)
              </label>
              <input
                type="date"
                value={cardData.issueDate}
                onChange={(e) => handleIssueDateChange(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Expire Date */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Expire Date (+2 Years)
              </label>
              <input
                type="date"
                value={cardData.expireDate}
                disabled={autoExpire}
                onChange={(e) => onChange({ ...cardData, expireDate: e.target.value })}
                className={`w-full px-2.5 py-1.5 text-xs font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                  autoExpire
                    ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed'
                    : 'bg-white border border-slate-200'
                }`}
              />
            </div>
          </div>

          <p className="text-[10.5px] text-sky-700/80 leading-relaxed">
            Card is issued today and valid for 2 full years as specified by StepSkill Bangladesh guidelines.
          </p>
        </div>

        {/* Verification & Contact Config (Pre-configured as requested) */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Verification Portal:</span>
            <span className="font-mono text-slate-700 font-medium">www.stepskill.com.bd/verify</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Support Email:</span>
            <span className="font-mono text-slate-700 font-medium">support@stepskill.com.bd</span>
          </div>
        </div>
      </div>
    </div>
  );
};
