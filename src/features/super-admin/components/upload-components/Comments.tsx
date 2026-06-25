import React, { useState } from "react";

export interface CommentsProps {
  commentValue: string;
  onCommentChange: (val: string) => void;
  activeTabLabel: string;
  mockDictationSuffix?: string; // e.g. " Survey Report."
  textareaClassName?: string;
  micButtonClassName?: string;
}

export const Comments: React.FC<CommentsProps> = ({
  commentValue,
  onCommentChange,
  activeTabLabel,
  mockDictationSuffix = ".",
  textareaClassName = "absolute w-[91.59%] h-[clamp(2.8rem,5.83vw,7.0rem)] left-[4.21%] top-[clamp(0.8rem,1.67vw,2.0rem)]",
  micButtonClassName = "absolute w-[clamp(1.07rem,_2.22vw,_2.67rem)] h-[clamp(1.07rem,_2.22vw,_2.67rem)] right-[clamp(0.47rem,_0.97vw,_1.17rem)] top-[clamp(4.5rem,_9.38vw,_11.25rem)]",
}) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      const mockDictation = ` This is a voice-dictated comment for ${activeTabLabel}${mockDictationSuffix}`;
      setTimeout(() => {
        onCommentChange(commentValue + mockDictation);
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="box-border absolute w-full h-full left-0 top-0 bg-[rgba(230,238,173,0.3)] border border-[#E6EEAD] rounded-[18px] z-[0]" />

      <textarea
        value={commentValue}
        onChange={(e) => onCommentChange(e.target.value)}
        placeholder="Write a comment"
        className={`bg-transparent resize-none border-none outline-none text-black placeholder-[rgba(0,0,0,0.4)] font-sans text-[clamp(0.47rem,0.97vw,1.17rem)] leading-[clamp(0.7rem,1.46vw,1.75rem)] z-[1] ${textareaClassName}`}
      />

      <button
        type="button"
        onClick={handleVoiceInput}
        className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${
          isListening ? "bg-red-600 animate-pulse" : "bg-[#2D3509] hover:opacity-90"
        } border-none z-[1] ${micButtonClassName}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[clamp(0.6rem,1.25vw,1.5rem)] h-[clamp(0.6rem,1.25vw,1.5rem)] text-white"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </button>
    </>
  );
};
