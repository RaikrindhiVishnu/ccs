import * as React from "react";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2
        px-5 py-3
        mb-[clamp(1.2rem,2.5vw,2.375rem)]
        bg-[color:var(--surface-card)]
        rounded-full
        shadow-[0px_0px_4px_rgba(0,0,0,0.12)]
        text-[color:var(--text-secondary)]
        text-[clamp(0.75rem,0.95vw,1rem)]
        font-[family-name:var(--font-inter)]
        hover:opacity-80
        transition-opacity
        cursor-pointer
      "
    >
      <ArrowLeft size={16} strokeWidth={1.4} />
      Go Back to Dashboard
    </button>
  );
};

export default BackButton;
