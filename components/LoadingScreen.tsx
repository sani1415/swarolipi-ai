import React from 'react';
import { Mic } from 'lucide-react';

interface LoadingScreenProps {
  /** Optional short message below the loader (e.g. "লোড হচ্ছে...", "নোট লোড হচ্ছে...") */
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'লোড হচ্ছে...' }) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      {/* Decorative soft circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 h-56 w-56 rounded-full bg-violet-200/25 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Logo / icon with pulse */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-indigo-400/20" style={{ animationDuration: '2s' }} />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
            <Mic className="h-10 w-10 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* App name */}
        <div className="text-center">
          <h1 className="font-['Noto_Sans_Bengali'] text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            স্বরলিপি AI
          </h1>
          <p className="mt-1 font-['Inter'] text-sm font-medium text-indigo-600 sm:text-base">
            Swarolipi AI · Voice Notes
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-indigo-500"
                style={{
                  animation: 'loading-dot 1.2s ease-in-out infinite',
                  animationDelay: `${i * 0.16}s`,
                }}
              />
            ))}
          </div>
          <p className="font-['Noto_Sans_Bengali'] text-sm text-slate-500">{message}</p>
        </div>
      </div>

      {/* Keyframes for dot animation - defined in index.css or inline via style tag */}
      <style>{`
        @keyframes loading-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
