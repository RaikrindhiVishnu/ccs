import * as React from "react";
import { useGeneratePresignedUrlQuery } from "@/features/auth/api/authApi";

interface DocumentCardProps {
  label: string;
  imageUrl?: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  label,
  imageUrl,
}) => {
  const isS3Key = typeof imageUrl === "string" && !imageUrl.startsWith("http") && !imageUrl.startsWith("data:");
  
  const { data: s3Data } = useGeneratePresignedUrlQuery(imageUrl || "", {
    skip: !isS3Key || !imageUrl,
  });

  const resolvedUrl = isS3Key ? s3Data?.url : imageUrl;

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
        {resolvedUrl ? (
          <div
            className="relative w-[75%] h-[80%] group cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[0.25rem] overflow-hidden"
            onClick={() => window.open(resolvedUrl, "_blank")}
            title="View Document"
          >
            <img
              src={resolvedUrl}
              alt={label}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <span className="ml-1.5 font-medium text-sm font-[family-name:var(--font-inter)]">View</span>
            </div>
          </div>
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
