import * as React from "react";

interface DocumentCardProps {
  label: string;
  imageUrl?: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  label,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col gap-[0.5rem] lg:gap-[0.625rem]">
      <span
        className="
          font-medium
          font-[family-name:var(--font-sans)]
          text-[color:var(--label-color)]
          text-[0.75rem]
          lg:text-[0.8125rem]
          xl:text-[0.875rem]
          2xl:text-[1rem]
        "
      >
        {label}
      </span>
      <div
        className="
          border
          border-dashed
          border-[color:var(--border-default)]
          rounded-[0.75rem]
          lg:rounded-[0.875rem]
          xl:rounded-[1.125rem]
          overflow-hidden
          flex items-center justify-center
          w-full
          aspect-[323/197]
        "
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={label}
            className="
              w-[75%]
              h-[80%]
              object-cover
              rounded-[0.25rem]
              shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
            "
          />
        ) : (
          <div
            className="
              w-[75%]
              h-[78%]
              rounded-[0.375rem]
              flex items-center justify-center
              shadow-[0px_4px_4px_rgba(0,0,0,0.10)]
              bg-gradient-to-br
              from-[color:var(--document-placeholder-from)]
              to-[color:var(--document-placeholder-to)]
            "
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-30"
            >
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                stroke="var(--text-secondary)"
                strokeWidth="1.5"
              />
              <path
                d="M2 9h20"
                stroke="var(--text-secondary)"
                strokeWidth="1.5"
              />
              <circle cx="6" cy="13" r="1" fill="var(--text-secondary)" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
