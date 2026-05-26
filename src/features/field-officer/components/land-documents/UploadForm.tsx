import { useState, useRef } from "react";

type FileItem = {
  name: string;
  size: string;
};

type Props = {
  isLandCoordinates: boolean;
  uploadTitle: "Upload" | "Re - Upload";
  files: FileItem[];
  comment: string;
  url?: string;
  onFilesChange: (files: FileItem[]) => void;
  onCommentChange: (comment: string) => void;
  onUrlChange?: (url: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const UploadForm = ({
  isLandCoordinates,
  uploadTitle,
  files,
  comment,
  url = "",
  onFilesChange,
  onCommentChange,
  onUrlChange,
  onNext,
  onBack,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const processFiles = (fileList: FileList) => {
    const newFiles: FileItem[] = Array.from(fileList).map((file) => ({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
    }));
    onFilesChange([...files, ...newFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDeleteFile = (fileName: string) => {
    onFilesChange(files.filter((f) => f.name !== fileName));
  };

  const headingTitle = isLandCoordinates ? "Land Coordinates" : "Upload File";

  return (
    <div className="w-full">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-[18px]">
        <h3 className="text-[22px] font-semibold text-[#1A1C1D] font-plus-jakarta">
          {headingTitle}
        </h3>

        <div className="flex justify-end gap-4">
          <button
            onClick={onBack}
            className="
              h-[56px] px-8 rounded-full border border-[#E2E2E4] bg-white hover:bg-gray-50 
              text-[#3D4949] font-medium text-[20px] transition-all duration-200 cursor-pointer font-plus-jakarta
            "
          >
            Back
          </button>

          <button
            onClick={onNext}
            className="
              h-[56px] px-10 rounded-full bg-[#1C5F9D] hover:bg-[#154675] 
              text-white font-semibold text-[20px] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md font-plus-jakarta
            "
          >
            Next
          </button>
        </div>
      </div>

      {/* Main Form Fields Layout */}
      {isLandCoordinates ? (
        <div className="flex flex-col gap-6 mt-[24px]">
          {/* Link input */}
          <input
            type="text"
            placeholder="Add link here"
            value={url}
            onChange={(e) => onUrlChange && onUrlChange(e.target.value)}
            className="
              w-full
              max-w-[620px]
              2xl:max-w-[720px]
              3xl:max-w-[900px]
              h-[54px]
              rounded-xl border border-[#8DC9F8] bg-[#EDF7FF] px-5 
              outline-none text-[#1C5F9D] hover:border-[#1C5F9D] focus:border-[#1C5F9D] 
              transition-all font-medium font-plus-jakarta text-[18px]
            "
          />

          {/* Comments block */}
          <h4 className="text-[18px] font-semibold text-[#1A1C1D] font-plus-jakarta mt-2">
            Comments:
          </h4>

          <div
            className="
              w-full
              max-w-[620px]
              2xl:max-w-[720px]
              3xl:max-w-[900px]
              h-[230px]
              relative
            "
          >
            <textarea
              value={comment}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="Add your comments"
              className="
                w-full h-full rounded-[24px] border border-[#8DC9F8] bg-[#EDF7FF] 
                px-6 py-5 pb-14 resize-none outline-none text-[#3D4949] font-medium font-plus-jakarta text-[18px]
              "
            />
            
            {/* Mic button */}
            <button className="absolute bottom-4 right-4 w-[42px] h-[42px] rounded-full bg-[#1C5F9D] hover:bg-[#154675] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer border-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between gap-[40px] items-start w-full mt-[24px]">
          
          {/* LEFT: Upload Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              w-[220px]
              h-[300px]
              border border-dashed border-[#CFE6FA] rounded-[24px] 
              flex flex-col items-center justify-center px-6 text-center transition-all shrink-0 bg-white
              ${isDragActive ? "bg-[#EFF6FF] border-[#1C5F9D]" : ""}
            `}
          >
            {/* File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
              accept=".pdf"
            />

            {/* Cloud Upload Icon */}
            <div className="w-16 h-16 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#1C5F9D] mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>

            {/* Heading dynamic text */}
            <h4 className="text-[22px] font-bold text-[#1A1C1D] mb-2 font-plus-jakarta">
              {uploadTitle}
            </h4>

            <p className="text-[14px] text-[#3D4949] leading-relaxed mb-4 font-semibold font-plus-jakarta px-2">
              Drag and drop files here.
            </p>

            <button
              onClick={handleChooseFile}
              className="
                bg-[#1C5F9D] hover:bg-[#154675] 
                text-white text-[14px] font-bold 
                px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-sm font-plus-jakarta border-none
              "
            >
              Choose File
            </button>
          </div>

          {/* MIDDLE: Uploaded Files List */}
          <div className="w-[240px] flex flex-col shrink-0">
            <h4 className="text-[18px] font-semibold text-[#1A1C1D] mb-4 font-plus-jakarta">
              Uploaded Files
            </h4>

            <div className="space-y-4 overflow-y-auto max-h-[240px] pr-1">
              {files.length > 0 ? (
                files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#F1F5F9] border border-gray-200/50 rounded-2xl p-4 hover:bg-gray-200/50 transition-colors w-[230px]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <svg className="w-8 h-8 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#1A1C1D] truncate max-w-[80px] font-plus-jakarta">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold mt-0.5 font-plus-jakarta">
                          {file.size}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteFile(file.name)}
                      className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-gray-200 transition-all cursor-pointer border-none bg-transparent"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div
                  className="
                    w-[230px]
                    h-[96px]
                    rounded-[22px]
                    border border-dashed border-[#E2E2E2]
                    flex items-center justify-center
                    text-[#B9B9B9] font-medium font-plus-jakarta text-sm
                  "
                >
                  No files uploaded.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Comments Textarea */}
          <div className="w-full max-w-[620px] 2xl:max-w-[720px] 3xl:max-w-[900px] flex flex-col shrink-0">
            <h4 className="text-[18px] font-semibold text-[#1A1C1D] mb-4 font-plus-jakarta">
              Comments:
            </h4>

            <div
              className="
                w-full
                h-[230px]
                relative
              "
            >
              <textarea
                value={comment}
                onChange={(e) => onCommentChange(e.target.value)}
                placeholder="Add your comments"
                className="
                  w-full
                  h-[230px]
                  rounded-[24px]
                  border
                  border-[#8DC9F8]
                  bg-[#EDF7FF]
                  px-6
                  py-5
                  pb-14
                  resize-none
                  outline-none
                  text-[#3D4949] font-medium font-plus-jakarta text-[18px]
                "
              />
              
              {/* Mic button */}
              <div className="absolute bottom-4 right-4">
                <button className="w-[42px] h-[42px] rounded-full bg-[#1C5F9D] hover:bg-[#154675] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer border-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default UploadForm;
