import React from 'react';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = "حدث خطأ غير متوقع.", onRetry }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 mb-4 bg-red-50 border border-red-400 rounded shadow text-center">
      <p className="text-red-600 mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          حاول مرة أخرى
        </button>
      )}
    </div>
  );
};