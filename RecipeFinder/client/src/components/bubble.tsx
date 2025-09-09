import React from 'react';

type CircleProps = {
  children: React.ReactNode;
  gradient: string;
  onClick?: () => void;
  ariaLabel?: string;
};

function Circle({ children, gradient, onClick, ariaLabel }: CircleProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="group w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 hover:-translate-y-[2px] hover:shadow-xl active:scale-[0.98]"
      style={{ background: gradient }}
    >
      {children}
    </button>
  );
}

export function TikTokBubble({ onClick }: { onClick?: () => void }) {
  const handle = () => {
  if (onClick) return onClick();
  const url = 'https://www.tiktok.com/@3dynamic.miami';
    if (typeof window !== 'undefined') {
      const w = window.open(url, '_blank');
      if (w) w.opener = null;
    }
  };

  return (
    <Circle gradient={"linear-gradient(135deg,#ff0050 0%,#000 50%,#25f4ee 100%)"} onClick={handle} ariaLabel="Open TikTok profile">
      <svg className="w-8 h-8 text-white transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    </Circle>
  );
}

export function InstagramBubble({ onClick }: { onClick?: () => void }) {
  const handle = () => {
    if (onClick) return onClick();
    const url = 'https://www.instagram.com/3dynamicmiami/';
    if (typeof window !== 'undefined') {
      const w = window.open(url, '_blank');
      if (w) w.opener = null;
    }
  };

  return (
    <Circle gradient={"linear-gradient(135deg,#833ab4 0%,#fd1d1d 50%,#fcb045 100%)"} onClick={handle} ariaLabel="Open Instagram profile">
      <svg className="w-8 h-8 text-white transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6ZM18 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    </Circle>
  );
}

export default function SocialBubbles({} : {}) {
  return (
  <div className="flex gap-12 items-center">
      <TikTokBubble />
      <InstagramBubble />
    </div>
  );
}
