import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface CardQrCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export const CardQrCode: React.FC<CardQrCodeProps> = ({
  value,
  size = 72,
  className = '',
}) => {
  const [qrSrc, setQrSrc] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(
      value,
      {
        width: size * 2, // 2x for sharp print/retina rendering
        margin: 1,
        color: {
          dark: '#0F172A',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      },
      (err, url) => {
        if (!err && url && isMounted) {
          setQrSrc(url);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, [value, size]);

  if (!qrSrc) {
    return (
      <div
        className={`bg-white border border-slate-200 flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-[8px] text-slate-400">QR</span>
      </div>
    );
  }

  return (
    <img
      src={qrSrc}
      alt="Verification QR Code"
      width={size}
      height={size}
      className={`block object-contain rounded-xs ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};
