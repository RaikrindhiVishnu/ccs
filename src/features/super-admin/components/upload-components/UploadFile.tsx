import React, { useRef, useState } from "react";

export interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
  imageType?: "cover" | "land";
}

export interface UploadFileProps {
  uploadedFiles: UploadedFileItem[];
  onFileUpload: (files: FileList) => void;
  onFileDelete: (fileId: string) => void;
  onUploadClick?: () => void; // Optional custom click handler
  groupByImageType?: boolean; // Optional flag to group files by imageType
}

const FileListItem: React.FC<{ file: UploadedFileItem, onFileDelete: (id: string) => void }> = ({ file, onFileDelete }) => (
  <div className="relative w-full shrink-0 h-[clamp(1.97rem,4.1vw,4.92rem)] bg-[#F6F9E2] rounded-[12px] mb-[4px]">
    <div className="flex items-center justify-center bg-white absolute w-[clamp(0.96rem,2.01vw,2.42rem)] h-[clamp(0.96rem,2.01vw,2.42rem)] left-[clamp(0.3rem,0.63vw,0.75rem)] top-[clamp(0.47rem,0.97vw,1.17rem)] rounded-[4px]">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[clamp(0.6rem,1.25vw,1.5rem)] h-[clamp(0.6rem,1.25vw,1.5rem)]">
        <path d="M12 2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 9H5v-1h6v1zm0-2H5V8h6v1zm0-2H5V6h6v1z" fill="#BDD327"/>
      </svg>
    </div>

    <div className="flex flex-col justify-center absolute left-[clamp(1.53rem,3.19vw,3.83rem)] top-[clamp(0.47rem,0.97vw,1.17rem)] w-[50%] h-[clamp(1rem,2.08vw,2.5rem)]">
      <span className="truncate text-black font-['Inter',_sans-serif] font-normal text-[clamp(0.47rem,0.97vw,1.17rem)] leading-[clamp(0.57rem,1.18vw,1.42rem)] block">
        {file.name}
      </span>
      <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.27rem,0.56vw,0.67rem)] leading-[clamp(0.33rem,0.69vw,0.83rem)] text-[rgba(0,0,0,0.7)]">
        {file.size}
      </span>
    </div>

    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onFileDelete(file.id);
      }}
      className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors absolute w-[clamp(0.84rem,1.74vw,2.08rem)] h-[clamp(0.84rem,1.74vw,2.08rem)] right-[clamp(0.5rem,1.04vw,1.25rem)] top-[clamp(0.5rem,1.04vw,1.25rem)] rounded-[2px] border-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[clamp(0.6rem,1.25vw,1.5rem)] h-[clamp(0.6rem,1.25vw,1.5rem)] text-[rgba(0,0,0,0.82)]">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    </button>
  </div>
);

export const UploadFile: React.FC<UploadFileProps> = ({
  uploadedFiles,
  onFileUpload,
  onFileDelete,
  onUploadClick,
  groupByImageType = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

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
    if (onUploadClick) {
      onUploadClick();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      {/* Dashed Upload Box: Overlay+Border */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerUploadClick}
        className={`transition-all cursor-pointer ${
          dragActive ? "bg-[#F3F4F1]/60" : "bg-[rgba(242,244,246,0.5)]"
        } box-border absolute w-[41.2%] h-[clamp(10.9rem,22.71vw,27.25rem)] left-[1.76%] top-[clamp(0.47rem,0.97vw,1.17rem)] border-2 border-dashed border-[rgba(225,229,239,0.6)] rounded-[12px]`}
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
        <div className="flex items-center justify-center bg-[#E6EEAD] absolute w-[clamp(1.61rem,3.35vw,4.02rem)] h-[clamp(1.61rem,3.35vw,4.02rem)] left-[calc(50%-clamp(1.61rem,3.35vw,4.02rem)/2-0.38px)] top-[clamp(1.93rem,4.03vw,4.83rem)] rounded-[6030.65px]">
          {/* Background & Overlay+Shadow */}
          <div className="flex items-center justify-center w-[clamp(1.29rem,2.68vw,3.22rem)] h-[clamp(1.29rem,2.68vw,3.22rem)] bg-[radial-gradient(circle_at_50%_50%,rgba(61,74,13,0.7812)_0%,rgba(42,48,8,0.84)_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,88,188,0.2),0px_2.4px_3.6px_-2.4px_rgba(0,88,188,0.2)] rounded-[6030.65px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[clamp(0.67rem,1.39vw,1.67rem)] h-[clamp(0.67rem,1.39vw,1.67rem)] text-white"
            >
              <line x1="12" y1="15" x2="12" y2="3" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="5" y1="21" x2="19" y2="21" />
            </svg>
          </div>
        </div>

        {/* Upload Text */}
        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-bold text-[#1A1C1D] text-center absolute w-[clamp(2.13rem,4.44vw,5.33rem)] h-[clamp(0.77rem,1.6vw,1.92rem)] left-[calc(50%-clamp(2.13rem,4.44vw,5.33rem)/2)] top-[clamp(4.04rem,8.42vw,10.1rem)] text-[clamp(0.6rem,1.25vw,1.5rem)] leading-[clamp(0.77rem,1.6vw,1.92rem)] flex items-center justify-center">
          Upload
        </span>

        {/* Drag and drop hint */}
        <span className="font-['Inter',_sans-serif] font-normal text-[#414755] text-center absolute w-[80%] h-[clamp(1rem,2.08vw,2.5rem)] left-[10%] top-[clamp(5.04rem,10.5vw,12.6rem)] text-[clamp(0.4rem,0.83vw,1.0rem)] leading-[clamp(0.5rem,1.04vw,1.25rem)] flex items-center justify-center">
          Drag and drop your files here or click to browse your computer.
        </span>

        {/* Choose File Button */}
        <button
          type="button"
          className="flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-white cursor-pointer hover:scale-105 active:scale-95 transition-all absolute w-[clamp(3.33rem,6.94vw,8.33rem)] h-[clamp(1.27rem,2.64vw,3.17rem)] left-[calc(50%-clamp(3.33rem,6.94vw,8.33rem)/2+0.5px)] top-[clamp(7rem,14.58vw,17.5rem)] bg-[radial-gradient(circle_at_50%_50%,#3D4A0D_0%,#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,0,0,0.12)] rounded-[57px] border-none"
        >
          <span className="font-sans text-[clamp(0.4rem,0.83vw,1.0rem)] leading-[clamp(0.5rem,1.04vw,1.25rem)] text-white">
            Choose File
          </span>
        </button>

        {/* Format PDF */}
        <div className="flex items-center gap-1 absolute w-[clamp(2.47rem,5.14vw,6.17rem)] h-[clamp(0.4rem,0.83vw,1.0rem)] left-[clamp(0.67rem,1.39vw,1.67rem)] top-[clamp(9.96rem,20.76vw,24.92rem)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="w-[clamp(0.3rem,0.63vw,0.83rem)] h-[clamp(0.3rem,0.63vw,0.83rem)] text-black"
          >
            <path d="M3.5 1.5h5l3 3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
            <path d="M8.5 1.5v3h3" />
          </svg>
          <span className="font-sans text-[clamp(0.3rem,0.63vw,0.83rem)] leading-[clamp(0.4rem,0.83vw,1.0rem)] text-black flex items-center">
            Format:&nbsp;
            <strong>PDF</strong>
          </span>
        </div>

        {/* Max File Size */}
        <div className="flex items-center gap-1 justify-end absolute w-[clamp(3.13rem,6.53vw,7.83rem)] h-[clamp(0.4rem,0.83vw,1.0rem)] right-[clamp(0.5rem,1.04vw,1.25rem)] top-[clamp(9.9rem,20.63vw,24.75rem)]">
          <span className="font-sans text-[clamp(0.3rem,0.63vw,0.83rem)] leading-[clamp(0.4rem,0.83vw,1.0rem)] text-black flex items-center">
            Max File Size:&nbsp;
            <strong>10MB</strong>
          </span>
        </div>
      </div>

      {/* Uploaded Files Section */}
      <div className="absolute w-[41.06%] h-[clamp(5.67rem,11.81vw,14.17rem)] left-[45.75%] top-[clamp(0.47rem,0.97vw,1.17rem)] flex flex-col items-start gap-[clamp(0.57rem,1.18vw,1.42rem)]">
        <h4 className="w-full h-[clamp(0.84rem,1.74vw,2.08rem)] font-sans text-[clamp(0.67rem,1.39vw,1.67rem)] leading-[clamp(0.84rem,1.74vw,2.08rem)] text-black m-0">
          Uploaded Files
        </h4>

        {/* Files List Frame */}
        <div className="flex flex-col items-start overflow-y-auto w-full custom-scrollbar h-[clamp(4.27rem,8.89vw,10.67rem)] gap-[clamp(0.33rem,0.69vw,0.83rem)] pr-[clamp(0.33rem,0.69vw,0.83rem)]">
          {groupByImageType ? (
            <>
              <span className="text-[rgba(0,_0,_0,_0.8)] font-['Inter',_sans-serif] text-[12px] block pl-1 mb-1 mt-1">Cover image</span>
              {uploadedFiles.filter((f) => f.imageType === "cover").length === 0 ? (
                <span className="text-gray-400 font-['Inter',_sans-serif] text-[10px] block pl-1 mb-2">No cover image uploaded yet.</span>
              ) : (
                uploadedFiles
                  .filter((f) => f.imageType === "cover")
                  .map((file) => (
                    <FileListItem key={file.id} file={file} onFileDelete={onFileDelete} />
                  ))
              )}

              <span className="text-[rgba(0,_0,_0,_0.8)] font-['Inter',_sans-serif] text-[12px] block pl-1 mt-2 mb-1">Uploaded images</span>
              {uploadedFiles.filter((f) => f.imageType === "land").length === 0 ? (
                <span className="text-gray-400 font-['Inter',_sans-serif] text-[10px] block pl-1">No uploaded images yet.</span>
              ) : (
                uploadedFiles
                  .filter((f) => f.imageType === "land")
                  .map((file) => (
                    <FileListItem key={file.id} file={file} onFileDelete={onFileDelete} />
                  ))
              )}
            </>
          ) : uploadedFiles.length === 0 ? (
            <span className="text-gray-400 font-['Inter',_sans-serif] text-[10px] block pl-1">
              No files uploaded yet.
            </span>
          ) : (
            uploadedFiles.map((file) => (
              <FileListItem key={file.id} file={file} onFileDelete={onFileDelete} />
            ))
          )}
        </div>
      </div>
    </>
  );
};
