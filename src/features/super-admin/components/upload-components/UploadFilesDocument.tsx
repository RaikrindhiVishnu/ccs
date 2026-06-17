import React, { useRef, useState } from "react";
import { CloudUpload, FileText, Trash2, Mic, ChevronLeft, ChevronRight } from "lucide-react";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
}

interface UploadFilesDocumentProps {
  activeTabLabel: string;
  uploadedFiles: UploadedFileItem[];
  commentValue: string;
  onCommentChange: (val: string) => void;
  onFileUpload: (files: FileList) => void;
  onFileDelete: (fileId: string) => void;
  onPrevTab: () => void;
  onNextTab: () => void;
  isFinishStep: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const UploadFilesDocument: React.FC<UploadFilesDocumentProps> = ({
  activeTabLabel,
  uploadedFiles,
  commentValue,
  onCommentChange,
  onFileUpload,
  onFileDelete,
  onPrevTab,
  onNextTab,
  isFinishStep,
  className = "",
  style,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files);
    }
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Mock voice input dictation
  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      const mockDictation = " This is a voice-dictated reference comment for the uploaded " + activeTabLabel + ".";
      setTimeout(() => {
        onCommentChange(commentValue + mockDictation);
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div
      className={`bg-white rounded-[clamp(1rem,1.67vw,2rem)] shadow-[0px_20px_40px_rgba(0,49,50,0.06)] flex flex-col justify-start w-full select-none shrink-0 relative overflow-hidden ${className}`}
      style={{
        height: "clamp(24rem, 30.76vw, 36rem)",
        padding: "clamp(1.25rem, 2.08vw, 2.5rem)",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* ── Headers ── */}
      <div className="flex flex-row justify-between items-center w-full mb-[clamp(0.8rem, 1.6vw, 2rem)]">
        <h3 
          className="font-['Plus_Jakarta_Sans'] font-semibold leading-tight text-black"
          style={{ fontSize: "clamp(1.1rem, 1.67vw, 1.8rem)" }}
        >
          Upload File
        </h3>
        <h3 
          className="font-['Plus_Jakarta_Sans'] font-semibold leading-tight text-black w-full max-w-[clamp(20rem, 42.9vw, 45rem)]"
          style={{ fontSize: "clamp(1.1rem, 1.67vw, 1.8rem)" }}
        >
          Add Comments
        </h3>
      </div>

      {/* ── Main content grid (Upload Zone / Uploaded List vs Comments) ── */}
      <div className="flex flex-row gap-[clamp(1rem, 2vw, 3rem)] items-start justify-between w-full flex-1">
        
        {/* Left Column: Upload Box Frame (Frame 2147239867) */}
        <div 
          className="bg-white rounded-[clamp(1rem, 1.67vw, 1.8rem)] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] flex flex-row items-center justify-between p-[clamp(0.6rem, 0.97vw, 1.2rem)] relative"
          style={{
            width: "clamp(28rem, 47.36vw, 52rem)",
            height: "clamp(16rem, 24.65vw, 28rem)",
          }}
        >
          {/* Dashed Border Drag/Drop overlay (Overlay+Border) */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerUploadClick}
            className={`rounded-[12px] flex flex-col items-center justify-start relative transition-all cursor-pointer ${
              dragActive ? "bg-[#F3F4F1]/60" : "bg-[rgba(242,244,246,0.5)]"
            }`}
            style={{
              width: "clamp(12rem, 19.51vw, 22rem)",
              height: "clamp(13rem, 22.7vw, 24.5rem)",
              border: "2px dashed rgba(225, 229, 239, 0.6)",
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
            />

            {/* Icon Stack */}
            <div 
              className="flex items-center justify-center bg-[#E6EEAD] rounded-full shrink-0 relative"
              style={{
                width: "clamp(2rem, 3.35vw, 4rem)",
                height: "clamp(2rem, 3.35vw, 4rem)",
                marginTop: "clamp(1.5rem, 4.02vw, 5.5rem)",
              }}
            >
              <div 
                className="flex items-center justify-center rounded-full shrink-0 absolute inset-0 m-auto"
                style={{
                  width: "clamp(1.6rem, 2.68vw, 3rem)",
                  height: "clamp(1.6rem, 2.68vw, 3rem)",
                  background: "radial-gradient(50% 50% at 50% 50%, rgba(61, 74, 13, 0.7812) 0%, rgba(42, 48, 8, 0.84) 100%)",
                  boxShadow: "0px 6px 9px -1.8px rgba(0, 88, 188, 0.2)",
                }}
              >
                <CloudUpload className="text-white" style={{ width: "clamp(1rem, 1.39vw, 1.8rem)", height: "clamp(1rem, 1.39vw, 1.8rem)" }} />
              </div>
            </div>

            {/* Texts */}
            <span 
              className="font-['Plus_Jakarta_Sans'] font-bold text-black text-center mt-[clamp(0.8rem, 1.25vw, 1.8rem)] leading-none"
              style={{ fontSize: "clamp(0.85rem, 1.25vw, 1.3rem)" }}
            >
              Upload
            </span>
            <span 
              className="font-['Inter'] font-normal text-[#414755] text-center w-[85%] mt-[clamp(0.4rem, 0.69vw, 1rem)]"
              style={{ fontSize: "clamp(0.65rem, 0.83vw, 1rem)", lineHeight: "1.3" }}
            >
              Drag and drop your files here or click to browse your computer.
            </span>

            {/* Choose File Button */}
            <button
              type="button"
              className="flex items-center justify-center font-['Plus_Jakarta_Sans'] font-semibold text-white cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0px_4px_27.1px_rgba(0,0,0,0.12)] shrink-0"
              style={{
                width: "clamp(5rem, 6.94vw, 8rem)",
                height: "clamp(1.8rem, 2.64vw, 3.5rem)",
                borderRadius: "57px",
                background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                fontSize: "clamp(0.65rem, 0.83vw, 1rem)",
                marginTop: "clamp(0.8rem, 1.25vw, 2.25rem)",
              }}
            >
              Choose File
            </button>

            {/* Bottom Formats Hint */}
            <div 
              className="absolute flex items-center gap-1"
              style={{
                left: "clamp(0.5rem, 1.39vw, 2rem)",
                bottom: "clamp(0.4rem, 0.83vw, 1.25rem)",
              }}
            >
              <FileText style={{ width: "clamp(0.6rem, 0.694vw, 1rem)", height: "clamp(0.6rem, 0.694vw, 1rem)" }} />
              <span className="font-['Inter'] text-black" style={{ fontSize: "clamp(0.55rem, 0.694vw, 0.85rem)" }}>
                Format: <strong className="font-medium">PDF</strong>
              </span>
            </div>

            {/* Bottom Max Size Hint */}
            <div 
              className="absolute flex items-center gap-1"
              style={{
                right: "clamp(0.5rem, 1.04vw, 1.8rem)",
                bottom: "clamp(0.4rem, 0.83vw, 1.25rem)",
              }}
            >
              <span className="font-['Inter'] text-black" style={{ fontSize: "clamp(0.55rem, 0.694vw, 0.85rem)" }}>
                Max File Size: <strong className="font-semibold">10MB</strong>
              </span>
            </div>
          </div>

          {/* Right Part: Uploaded Files List (Frame 2147239865) */}
          <div 
            className="flex-1 flex flex-col items-start justify-start overflow-y-auto px-4"
            style={{
              height: "clamp(13rem, 22.7vw, 24.5rem)",
            }}
          >
            <h4 
              className="font-['Plus_Jakarta_Sans'] font-medium text-black mb-[clamp(0.5rem, 1.18vw, 1.5rem)] leading-none mt-2"
              style={{ fontSize: "clamp(0.9rem, 1.39vw, 1.5rem)" }}
            >
              Uploaded Files
            </h4>

            {/* Files List Wrapper (Frame 2147239864) */}
            <div className="w-full flex flex-col gap-2">
              {uploadedFiles.length === 0 ? (
                <span className="text-gray-400 font-['Inter'] text-xs mt-2">No files uploaded yet.</span>
              ) : (
                uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-2.5 w-full shrink-0"
                  >
                    <FileText className="text-red-500 shrink-0" style={{ width: "clamp(1.2rem, 1.67vw, 2.5rem)", height: "clamp(1.2rem, 1.67vw, 2.5rem)" }} />
                    <div className="flex-1 flex flex-col min-w-0">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#1A1C1D] truncate leading-tight">
                        {file.name}
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-gray-400 mt-0.5">
                        {file.size}
                      </span>
                      {file.status === "uploading" && (
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1.5">
                          <div
                            className="bg-[#2D3409] h-1 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {file.status === "completed" ? (
                      <button
                        type="button"
                        onClick={() => onFileDelete(file.id)}
                        className="p-1 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-400 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    ) : (
                      <span className="text-[10px] font-semibold text-[#2D3409] shrink-0">
                        {file.progress}%
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Comments Box Section (Frame 2147239870) */}
        <div className="flex-1 flex flex-col items-end justify-between relative h-full w-full max-w-[clamp(20rem, 42.9vw, 45rem)]">
          
          {/* Comment Box Container (Rectangle 27625) */}
          <div 
            className="w-full relative flex flex-col justify-between"
            style={{
              height: "clamp(8rem, 12.57vw, 15rem)",
              background: "rgba(230, 238, 173, 0.3)",
              border: "1px solid #E6EEAD",
              borderRadius: "18px",
              padding: "clamp(0.6rem, 1.67vw, 1.8rem)",
              boxSizing: "border-box",
            }}
          >
            <textarea
              value={commentValue}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="Write a comment"
              className="w-full bg-transparent resize-none border-none outline-none font-['Inter'] font-normal text-black placeholder-[rgba(0,0,0,0.4)] flex-1"
              style={{
                fontSize: "clamp(0.8rem, 0.97vw, 1.1rem)",
              }}
            />

            {/* Mic / Dictation Button (Frame 2147239972) */}
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`absolute flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${
                isListening ? "bg-red-600 animate-pulse" : "bg-[#2D3509] hover:opacity-90"
              }`}
              style={{
                width: "clamp(1.6rem, 2.22vw, 2.5rem)",
                height: "clamp(1.6rem, 2.22vw, 2.5rem)",
                right: "clamp(0.5rem, 1.8vw, 2rem)",
                bottom: "clamp(0.5rem, 1.8vw, 2rem)",
              }}
            >
              <Mic size={16} />
            </button>
          </div>

          {/* Footer Buttons container (Frame 2147239935) */}
          <div 
            className="flex flex-row justify-end items-center gap-[clamp(0.5rem, 0.78vw, 1rem)] mt-auto"
            style={{
              height: "clamp(1.8rem, 2.64vw, 3.5rem)",
            }}
          >
            {/* Back Button */}
            <button
              type="button"
              onClick={onPrevTab}
              className="flex items-center justify-center font-['Outfit'] font-medium text-[rgba(0,0,0,0.8)] border border-[rgba(205,0,0,0.27)] cursor-pointer hover:bg-red-50/20 active:scale-95 transition-all shrink-0"
              style={{
                width: "clamp(5rem, 6.94vw, 8rem)",
                height: "clamp(1.8rem, 2.64vw, 3.5rem)",
                borderRadius: "33px",
                fontSize: "clamp(0.75rem, 0.97vw, 1.1rem)",
              }}
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={onNextTab}
              className="flex items-center justify-center font-['Outfit'] font-normal text-white cursor-pointer hover:scale-105 active:scale-95 transition-all shrink-0"
              style={{
                width: "clamp(5rem, 6.94vw, 8rem)",
                height: "clamp(1.8rem, 2.64vw, 3.5rem)",
                borderRadius: "57px",
                background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                fontSize: "clamp(0.75rem, 0.9vw, 1rem)",
              }}
            >
              <span>{isFinishStep ? "Finish" : "Next"}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFilesDocument;
