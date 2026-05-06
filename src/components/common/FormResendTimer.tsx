'use client';

import { useState, useEffect } from 'react';

interface FormResendTimerProps {
  initialSeconds?: number;
  onResend: () => void;
  className?: string;
}

export const FormResendTimer = ({
  initialSeconds = 60,
  onResend,
  className = '',
}: FormResendTimerProps) => {
  const [timer, setTimer] = useState(initialSeconds);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    onResend();
    setTimer(initialSeconds);
  };

  return (
    <>
      {timer > 0 ? (
        <div
          className={`bg-[#ECEDEE] px-6 py-2.75 h-10 md:h-12 rounded-full text-loading text-regular-bold md:text-medium-bold flex items-center gap-1 cursor-pointer ${className}`}
        >
          <span>إعادة إرسال الرمز خلال:</span>
          <span>{formatTime(timer)}</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className={`bg-[#ECEDEE] px-6 py-2.75 h-10 md:h-12 rounded-full text-loading text-regular-bold md:text-medium-bold flex items-center cursor-pointer ${className}`}
        >
          إعادة إرسال الرمز
        </button>
      )}
    </>
  );
};