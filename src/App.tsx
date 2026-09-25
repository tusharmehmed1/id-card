/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { CardData } from './types/card';
import { toInputDateFormat, calculateExpiryDate } from './utils/dateUtils';
import { CardForm } from './components/CardForm';
import { IdCardFront } from './components/IdCardFront';
import { IdCardBack } from './components/IdCardBack';
import { QrVerifyModal } from './components/QrVerifyModal';
import { PrintSheet } from './components/PrintSheet';
import { downloadElementAsPng, printIdCard } from './utils/exportUtils';
import {
  Download,
  Printer,
  RotateCw,
  QrCode,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Eye,
  Info,
} from 'lucide-react';

export default function App() {
  const todayStr = toInputDateFormat(new Date());
  const initialExpiryStr = calculateExpiryDate(todayStr, 2);

  // Initial state strictly configured for Portrait as requested
  const defaultCardData: CardData = {
    fullName: 'TANHA TAMANNA SYED',
    profession: 'Photographer | Digital Marketer',
    freelancerId: 'SSB-829140',
    dateOfBirth: '1998-10-14',
    issueDate: todayStr,
    expireDate: initialExpiryStr,
    district: 'Dhaka',
    photoUrl: '',
    photoScale: 1,
    photoPositionX: 0,
    photoPositionY: 0,
    verifyUrl: 'https://www.stepskill.com.bd/verify',
    supportEmail: 'support@stepskill.com.bd',
    organizationName: 'StepSkill Bangladesh',
    issuerTitle: 'Department of ICT, ICT Division',
    orientation: 'portrait', // Default is Portrait as requested ("portrat hobe")
  };

  const [cardData, setCardData] = useState<CardData>(defaultCardData);
  const [activeTab, setActiveTab] = useState<'front' | 'back' | 'both' | 'flip'>('front');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // DOM references for image download
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);
  const bothCardsRef = useRef<HTMLDivElement>(null);

  // Restore sample data
  const handleResetSample = () => {
    setCardData({
      ...defaultCardData,
      issueDate: toInputDateFormat(new Date()),
      expireDate: calculateExpiryDate(toInputDateFormat(new Date()), 2),
      orientation: cardData.orientation, // preserve current user choice
    });
  };

  const isPortrait = cardData.orientation === 'portrait';

  // Export handlers
  const handleDownloadFront = async () => {
    if (!frontCardRef.current) return;
    setIsExporting(true);
    setExportNotice('Exporting Front Card PNG...');
    const success = await downloadElementAsPng(
      frontCardRef.current,
      `${cardData.fullName.replace(/\s+/g, '_')}_Portrait_Front.png`
    );
    setIsExporting(false);
    setExportNotice(success ? 'Front card downloaded successfully!' : 'Export failed.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  const handleDownloadBack = async () => {
    if (!backCardRef.current) return;
    setIsExporting(true);
    setExportNotice('Exporting Back Card PNG...');
    const success = await downloadElementAsPng(
      backCardRef.current,
      `${cardData.fullName.replace(/\s+/g, '_')}_Portrait_Back.png`
    );
    setIsExporting(false);
    setExportNotice(success ? 'Back card downloaded successfully!' : 'Export failed.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  const handleDownloadBoth = async () => {
    if (!bothCardsRef.current) return;
    setIsExporting(true);
    setExportNotice('Exporting Complete ID Card Master...');
    const success = await downloadElementAsPng(
      bothCardsRef.current,
      `${cardData.fullName.replace(/\s+/g, '_')}_ID_Card_Full_Set.png`
    );
    setIsExporting(false);
    setExportNotice(success ? 'Full ID card set downloaded!' : 'Export failed.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                StepSkill <span className="text-sky-600">ID Studio</span>
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <span className="text-sky-700 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-600" />
              {isPortrait ? 'Portrait ID Generator' : 'Landscape ID Generator'}
            </span>
            <button
              onClick={() => setIsVerifyModalOpen(true)}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Verify Portal
            </button>
            <a
              href="https://www.stepskill.com.bd"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              StepSkill.com.bd
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={printIdCard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print PVC Card</span>
            </button>

            <button
              onClick={handleDownloadFront}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PNG</span>
            </button>
          </div>
        </div>
      </header>

      {/* Export feedback toast banner */}
      {exportNotice && (
        <div className="bg-sky-900 text-white text-xs font-medium py-2 px-4 text-center transition-all animate-in slide-in-from-top flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4 text-sky-400" />
          {exportNotice}
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner introduction */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">
                StepSkill Bangladesh — Portrait ID Card Generator
              </h1>
              <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase bg-sky-100 text-sky-800 rounded-full border border-sky-200">
                {isPortrait ? 'Portrait Mode' : 'Landscape Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Accredited by ICT Division &amp; Department of ICT (DoICT) with official StepSkill Bangladesh credentials.
            </p>
          </div>

          {/* Key requirement indicators */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/60">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Today's Issue Date
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 font-semibold border border-sky-200/60">
              <CheckCircle className="w-3.5 h-3.5 text-sky-600" />
              2-Year Validity
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 font-semibold border border-blue-200/60">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
              Live QR Verification
            </span>
          </div>
        </div>

        {/* Studio Grid: Left Form (40%) | Right Card Preview (60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <CardForm
              cardData={cardData}
              onChange={setCardData}
              onResetSample={handleResetSample}
            />
          </div>

          {/* Right Column: Interactive Card Showcase */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            {/* View Mode Switcher & Card Actions */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              {/* Segmented View Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('front')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'front'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Front Side
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('back')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'back'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Back Side
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('both')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'both'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="hidden sm:inline">Both Sides</span>
                  <span className="sm:hidden">Both</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('flip');
                    setIsFlipped(!isFlipped);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    activeTab === 'flip'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <RotateCw className="w-3 h-3" />
                  3D Flip
                </button>
              </div>

              {/* QR Verification test button */}
              <button
                type="button"
                onClick={() => setIsVerifyModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded-lg transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-sky-600" />
                Test QR Code
              </button>
            </div>

            {/* Display Stage Container */}
            <div className="bg-slate-200/60 p-4 sm:p-8 rounded-3xl border border-slate-300/80 flex flex-col items-center justify-center min-h-[500px] overflow-x-auto shadow-inner relative">
              {/* Active Tab View: Front Side */}
              {activeTab === 'front' && (
                <div className="transform-gpu transition-all duration-300 hover:scale-[1.01]">
                  <IdCardFront
                    cardData={cardData}
                    cardRef={frontCardRef}
                    onQrClick={() => setIsVerifyModalOpen(true)}
                  />
                </div>
              )}

              {/* Active Tab View: Back Side */}
              {activeTab === 'back' && (
                <div className="transform-gpu transition-all duration-300 hover:scale-[1.01]">
                  <IdCardBack cardData={cardData} cardRef={backCardRef} />
                </div>
              )}

              {/* Active Tab View: Both Sides (Side-by-Side) */}
              {activeTab === 'both' && (
                <div
                  ref={bothCardsRef}
                  className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-md flex flex-col md:flex-row gap-6 items-center justify-center"
                >
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
                      Front Side ({isPortrait ? 'Portrait' : 'Landscape'})
                    </div>
                    <IdCardFront
                      cardData={cardData}
                      cardRef={frontCardRef}
                      onQrClick={() => setIsVerifyModalOpen(true)}
                    />
                  </div>

                  <div className="hidden md:block w-[1px] self-stretch bg-slate-200 my-4" />

                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
                      Back Side ({isPortrait ? 'Portrait' : 'Landscape'})
                    </div>
                    <IdCardBack cardData={cardData} cardRef={backCardRef} />
                  </div>
                </div>
              )}

              {/* Active Tab View: Interactive 3D Flippable Card */}
              {activeTab === 'flip' && (
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="perspective-1000 cursor-pointer group"
                    onClick={() => setIsFlipped(!isFlipped)}
                    title="Click card to flip!"
                  >
                    <div
                      className={`relative ${
                        isPortrait ? 'w-[378px] h-[600px]' : 'w-[600px] h-[378px]'
                      } transition-transform duration-700 transform-style-3d ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* Front face */}
                      <div className="absolute inset-0 backface-hidden">
                        <IdCardFront
                          cardData={cardData}
                          cardRef={frontCardRef}
                          onQrClick={() => setIsVerifyModalOpen(true)}
                        />
                      </div>

                      {/* Back face */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180">
                        <IdCardBack cardData={cardData} cardRef={backCardRef} />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-full shadow-xs cursor-pointer transition-transform active:scale-95"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-sky-600" />
                    Click card or press here to flip ({isFlipped ? 'Showing Back' : 'Showing Front'})
                  </button>
                </div>
              )}

              {/* Helper badge underneath */}
              <div className="mt-4 text-center">
                <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  Live Preview · {isPortrait ? 'Vertical Portrait (378×600px)' : 'Horizontal Landscape (600×378px)'}
                </p>
              </div>
            </div>

            {/* Export Toolbar Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-sky-600" />
                  High-Resolution Download &amp; Print
                </h3>
                <span className="text-[11px] font-mono text-slate-500">
                  {isPortrait ? 'Portrait 300 DPI' : 'Landscape 300 DPI'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={handleDownloadFront}
                  disabled={isExporting}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all text-center cursor-pointer group"
                >
                  <Download className="w-4 h-4 text-slate-600 group-hover:text-sky-600 mb-1" />
                  <span className="text-xs font-bold text-slate-800">Front Card</span>
                  <span className="text-[10px] text-slate-500">PNG Format</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadBack}
                  disabled={isExporting}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all text-center cursor-pointer group"
                >
                  <Download className="w-4 h-4 text-slate-600 group-hover:text-sky-600 mb-1" />
                  <span className="text-xs font-bold text-slate-800">Back Card</span>
                  <span className="text-[10px] text-slate-500">PNG Format</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadBoth}
                  disabled={isExporting}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 transition-all text-center cursor-pointer group"
                >
                  <Layers className="w-4 h-4 text-slate-600 group-hover:text-sky-600 mb-1" />
                  <span className="text-xs font-bold text-slate-800">Full Set</span>
                  <span className="text-[10px] text-slate-500">Both Sides</span>
                </button>

                <button
                  type="button"
                  onClick={printIdCard}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 transition-all text-center cursor-pointer group"
                >
                  <Printer className="w-4 h-4 text-sky-700 mb-1" />
                  <span className="text-xs font-bold text-sky-950">Print / PDF</span>
                  <span className="text-[10px] text-sky-700">PVC Card Layout</span>
                </button>
              </div>

              {/* Technical Specifications Summary */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Standard CR-80 ({isPortrait ? '53.98 × 85.6 mm Vertical' : '85.6 × 53.98 mm Horizontal'})
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  High Definition Vector Logos
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Instant QR Verification Code
                </div>
              </div>
            </div>

            {/* Instruction Callout */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3 text-xs text-blue-900">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-blue-950">
                  StepSkill Bangladesh Official Credential Rules:
                </p>
                <p className="text-blue-800/90 leading-relaxed">
                  As per regulations, the Issue Date is stamped with the date of generation (today), and validity automatically extends for <strong>2 full years</strong>. Anyone scanning the QR code on the front card can verify the member's authenticity at <strong>www.stepskill.com.bd/verify</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Hidden print layout component triggered by window.print() */}
      <PrintSheet cardData={cardData} />

      {/* Interactive QR Verification Modal Simulator */}
      <QrVerifyModal
        cardData={cardData}
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <p>
          StepSkill Bangladesh ID Card Generator · Powered by Department of ICT &amp; StepSkill Bangladesh
        </p>
        <p className="mt-1 text-slate-400">
          Support: support@stepskill.com.bd · Verification: www.stepskill.com.bd/verify
        </p>
      </footer>
    </div>
  );
}
