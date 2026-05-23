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
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const isS3Key = typeof imageUrl === "string" && !imageUrl.startsWith("http") && !imageUrl.startsWith("data:");
  
  const { data: s3Data } = useGeneratePresignedUrlQuery(imageUrl || "", {
    skip: !isS3Key || !imageUrl,
  });

  const resolvedUrl = isS3Key ? s3Data?.url : imageUrl;

  return (
    <>
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
            relative
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
            group
          "
        >
          {resolvedUrl ? (
            <>
              <img
                src={resolvedUrl}
                alt={label}
                className="
                  w-[75%]
                  h-[80%]
                  object-cover
                  rounded-[0.25rem]
                  shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
                "
              />
              <div 
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                <div className="bg-white/90 text-gray-900 rounded-full p-2 shadow-lg flex items-center gap-2 px-3 transform scale-90 group-hover:scale-100 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span className="text-xs font-semibold">Preview</span>
                </div>
              </div>
            </>
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

      {/* Lightbox */}
      {lightboxOpen && resolvedUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-full max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={resolvedUrl} 
              alt={label} 
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" 
            />
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-xl hover:bg-gray-100 transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <div className="mt-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
              {label}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentCard;
