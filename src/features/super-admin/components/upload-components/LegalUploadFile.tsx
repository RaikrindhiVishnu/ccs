import React, { useRef, useState } from "react";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
  imageType?: "cover" | "land";
}

interface LegalUploadFileProps {
  activeTabLabel: string;
  uploadedFiles: UploadedFileItem[];
  commentValue: string;
  onCommentChange: (val: string) => void;
  onFileUpload: (files: FileList, imageType?: "cover" | "land") => void;
  onFileDelete: (fileId: string) => void;
  onPrevTab: () => void;
  onNextTab: () => void;
  isFinishStep: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LegalUploadFile: React.FC<LegalUploadFileProps> = ({
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

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      const mockDictation = " This is a voice-dictated comment for " + activeTabLabel + ".";
      setTimeout(() => {
        onCommentChange(commentValue + mockDictation);
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className={`bg-white select-none ${className} absolute left-[clamp(1.77rem,2.78vw,3.33rem)] right-[clamp(1.77rem,2.78vw,3.33rem)] top-[clamp(26rem,40.63vw,48.75rem)] h-[clamp(19.68rem,30.76vw,36.91rem)] rounded-[24px] box-border bg-white`} style={style} >
      {/* Add Comments Title */}
      <h3 className="text-black font-semibold whitespace-nowrap absolute w-[13.38%] h-[clamp(1.33rem,2.08vw,2.5rem)] left-[52.65%] top-[clamp(1.33rem,2.08vw,2.5rem)] font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] m-0 flex items-center" >
        Add Comments
      </h3>

      <>
        {/* Upload File Title */}
        <h3 className="text-black font-semibold whitespace-nowrap absolute w-[9.56%] h-[clamp(1.33rem,2.08vw,2.5rem)] left-[2.21%] top-[clamp(1.33rem,2.08vw,2.5rem)] font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] m-0 flex items-center" >
          Upload File
        </h3>

        {/* Left Card: Frame 2147239867 */}
        <div className="bg-white absolute w-[50.15%] h-[clamp(15.78rem,24.65vw,29.58rem)] left-[1.32%] top-[clamp(3.24rem,5.07vw,6.08rem)] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-[24px] box-border" >
          {/* Dashed Upload Box: Overlay+Border */}
          <div onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} onClick={triggerUploadClick} className={`transition-all cursor-pointer ${ dragActive ? "bg-[#F3F4F1]/60" : "bg-[rgba(242,244,246,0.5)]" } box-border absolute w-[41.2%] h-[clamp(14.53rem,22.71vw,27.25rem)] left-[1.76%] top-[clamp(0.62rem,0.97vw,1.17rem)] border-2 border-dashed border-[rgba(225,229,239,0.6)] rounded-[12px]`} >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
            />

            {/* Icon Stack */}
            <div className="flex items-center justify-center bg-[#E6EEAD] absolute w-[clamp(2.14rem,3.35vw,4.02rem)] h-[clamp(2.14rem,3.35vw,4.02rem)] left-[calc(50%-clamp(2.14rem,3.35vw,4.02rem)/2-0.38px)] top-[clamp(2.58rem,4.03vw,4.83rem)] rounded-[6030.65px]" >
              {/* Background & Overlay+Shadow */}
              <div className="flex items-center justify-center relative absolute w-[clamp(1.72rem,2.68vw,3.22rem)] h-[clamp(1.72rem,2.68vw,3.22rem)] left-[calc(50%-clamp(1.72rem,2.68vw,3.22rem)/2)] top-[calc(50%-clamp(1.72rem,2.68vw,3.22rem)/2)] bg-[radial-gradient(circle_at_50%_50%,rgba(61,74,13,0.7812)_0%,rgba(42,48,8,0.84)_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,88,188,0.2),0px_2.4px_3.6px_-2.4px_rgba(0,88,188,0.2)] rounded-[6030.65px]" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute w-[clamp(0.89rem,1.39vw,1.67rem)] h-[clamp(0.89rem,1.39vw,1.67rem)] text-white" >
                  <line x1="12" y1="15" x2="12" y2="3" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="5" y1="21" x2="19" y2="21" />
                </svg>
              </div>
            </div>

            {/* Upload Text */}
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-bold text-[#1A1C1D] text-center absolute w-[clamp(2.84rem,4.44vw,5.33rem)] h-[clamp(1.02rem,1.6vw,1.92rem)] left-[calc(50%-clamp(2.84rem,4.44vw,5.33rem)/2)] top-[clamp(5.39rem,8.42vw,10.1rem)] text-[clamp(0.8rem,1.25vw,1.5rem)] leading-[clamp(1.02rem,1.6vw,1.92rem)] flex items-center justify-center" >
              Upload
            </span>

            {/* Drag and drop hint */}
            <span className="font-['Inter',_sans-serif] font-normal text-[#414755] text-center absolute w-[80%] h-[clamp(1.33rem,2.08vw,2.5rem)] left-[10%] top-[clamp(6.72rem,10.5vw,12.6rem)] text-[clamp(0.53rem,0.83vw,1.0rem)] leading-[clamp(0.67rem,1.04vw,1.25rem)] flex items-center justify-center" >
              Drag and drop your files here or click to browse your computer.
            </span>

            {/* Choose File Button */}
            <button type="button" className="flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-white cursor-pointer hover:scale-105 active:scale-95 transition-all absolute w-[clamp(4.44rem,6.94vw,8.33rem)] h-[clamp(1.69rem,2.64vw,3.17rem)] left-[calc(50%-clamp(4.44rem,6.94vw,8.33rem)/2+0.5px)] top-[clamp(9.33rem,14.58vw,17.5rem)] bg-[radial-gradient(circle_at_50%_50%,#3D4A0D_0%,#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,0,0,0.12)] rounded-[57px] border-none" >
              <span className="font-sans text-[clamp(0.53rem,0.83vw,1.0rem)] leading-[clamp(0.67rem,1.04vw,1.25rem)] text-white" >
                Choose File
              </span>
            </button>

            {/* Format PDF */}
            <div className="flex items-center gap-1 absolute w-[clamp(3.29rem,5.14vw,6.17rem)] h-[clamp(0.53rem,0.83vw,1.0rem)] left-[clamp(0.89rem,1.39vw,1.67rem)] top-[clamp(13.29rem,20.76vw,24.92rem)]" >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[clamp(0.44rem,0.63vw,0.83rem)] h-[clamp(0.44rem,0.63vw,0.83rem)] text-black" >
                <path d="M3.5 1.5h5l3 3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
                <path d="M8.5 1.5v3h3" />
              </svg>
              <span className="font-sans text-[clamp(0.44rem,0.63vw,0.83rem)] leading-[clamp(0.53rem,0.83vw,1.0rem)] text-black flex items-center" >
                Format:&nbsp;
                <strong className="" >PDF</strong>
              </span>
            </div>

            {/* Max File Size */}
            <div className="flex items-center gap-1 justify-end absolute w-[clamp(4.18rem,6.53vw,7.83rem)] h-[clamp(0.53rem,0.83vw,1.0rem)] right-[clamp(0.67rem,1.04vw,1.25rem)] top-[clamp(13.2rem,20.63vw,24.75rem)]" >
              <span className="font-sans text-[clamp(0.44rem,0.63vw,0.83rem)] leading-[clamp(0.53rem,0.83vw,1.0rem)] text-black flex items-center" >
                Max File Size:&nbsp;
                <strong className="" >10MB</strong>
              </span>
            </div>
          </div>

          {/* Uploaded Files Section */}
          <div className="absolute w-[41.06%] h-[clamp(7.56rem,11.81vw,14.17rem)] left-[45.75%] top-[clamp(0.62rem,0.97vw,1.17rem)] flex flex-col items-start gap-[clamp(0.76rem,1.18vw,1.42rem)]" >
            <h4 className="w-full h-[clamp(1.11rem,1.74vw,2.08rem)] font-sans text-[clamp(0.89rem,1.39vw,1.67rem)] leading-[clamp(1.11rem,1.74vw,2.08rem)] text-black m-0" >
              Uploaded Files
            </h4>

            {/* Files List Frame */}
            <div className="flex flex-col items-start overflow-y-auto w-full custom-scrollbar h-[clamp(5.69rem,8.89vw,10.67rem)] gap-[clamp(0.44rem,0.69vw,0.83rem)]" >
              {uploadedFiles.length === 0 ? (
                <span className="text-gray-400 font-['Inter',_sans-serif] text-xs">No files uploaded yet.</span>
              ) : (
                uploadedFiles.map((file) => (
                  <div key={file.id} className="relative w-full shrink-0 h-[clamp(2.62rem,4.1vw,4.92rem)] bg-[#F6F9E2] rounded-[12px]" >
                    <div className="flex items-center justify-center bg-white absolute w-[clamp(1.29rem,2.01vw,2.42rem)] h-[clamp(1.29rem,2.01vw,2.42rem)] left-[clamp(0.4rem,0.63vw,0.75rem)] top-[clamp(0.62rem,0.97vw,1.17rem)] rounded-[4px]" >
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[clamp(0.76rem,1.18vw,1.42rem)] h-[clamp(0.76rem,1.18vw,1.42rem)]" >
                        <path d="M3 0h7.5L14 3.5V16H3V0z" fill="#E2E5E7" />
                        <path d="M10.5 0V3.5H14L10.5 0z" fill="#B0B7BD" />
                        <path d="M11 5h-6v1h6V5z" fill="#CAD1D8" />
                        <path d="M11 7h-6v1h6V7z" fill="#CAD1D8" />
                        <path d="M1 10h14v5H1v-5z" fill="#F15642" />
                        <text x="3.5" y="13.8" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
                      </svg>
                    </div>

                    <div className="flex flex-col justify-center absolute left-[clamp(2.04rem,3.19vw,3.83rem)] top-[clamp(0.62rem,0.97vw,1.17rem)] w-[50%] h-[clamp(1.33rem,2.08vw,2.5rem)]" >
                      <span className="truncate text-black font-sans text-[clamp(0.62rem,0.97vw,1.17rem)] leading-[clamp(0.76rem,1.18vw,1.42rem)] block" >
                        {file.name}
                      </span>
                      <span className="font-sans text-[clamp(0.36rem,0.56vw,0.67rem)] leading-[clamp(0.44rem,0.69vw,0.83rem)] text-[rgba(0,0,0,0.7)]" >
                        {file.size}
                      </span>
                    </div>

                    <button type="button" onClick={() => onFileDelete(file.id)} className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors absolute w-[clamp(1.11rem,1.74vw,2.08rem)] h-[clamp(1.11rem,1.74vw,2.08rem)] right-[clamp(0.67rem,1.04vw,1.25rem)] top-[clamp(0.67rem,1.04vw,1.25rem)] rounded-[2px] border-none" >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[clamp(0.8rem,1.25vw,1.5rem)] h-[clamp(0.8rem,1.25vw,1.5rem)] text-[rgba(0,0,0,0.82)]" >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </>

      {/* Right Card: Comment Box */}
      <div className="absolute w-[45.44%] h-[clamp(8.04rem,12.57vw,15.08rem)] left-[52.65%] top-[clamp(3.24rem,5.07vw,6.08rem)]" >
        <div className="box-border absolute w-full h-full left-0 top-0 bg-[rgba(230,238,173,0.3)] border border-[#E6EEAD] rounded-[18px] z-[0]" / >

        <textarea value={commentValue} onChange={(e) => onCommentChange(e.target.value)} placeholder="Write a comment" className="bg-transparent resize-none border-none outline-none text-black placeholder-[rgba(0,0,0,0.4)] absolute w-[91.59%] h-[clamp(3.73rem,5.83vw,7.0rem)] left-[4.21%] top-[clamp(1.07rem,1.67vw,2.0rem)] font-sans text-[clamp(0.62rem,0.97vw,1.17rem)] leading-[clamp(0.93rem,1.46vw,1.75rem)] z-[1]" / >

        {/* Mic Button */}
        <button type="button" onClick={handleVoiceInput} className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${ isListening ? "bg-red-600 animate-pulse" : "bg-[#2D3509] hover:opacity-90" } absolute w-[clamp(1.42rem,2.22vw,2.67rem)] h-[clamp(1.42rem,2.22vw,2.67rem)] left-[92.56%] top-[clamp(6.0rem,9.38vw,11.25rem)] bg-[#2D3509] border-none z-[1]`} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[clamp(0.8rem,1.25vw,1.5rem)] h-[clamp(0.8rem,1.25vw,1.5rem)] text-white" >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </button>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="absolute w-[15.59%] h-[clamp(1.69rem,2.64vw,3.17rem)] right-[1.91%] top-[clamp(16.84rem,26.32vw,31.58rem)]" >
        {/* Back Button */}
        <button type="button" onClick={onPrevTab} className="flex items-center justify-center font-['Outfit',_sans-serif] font-medium text-[rgba(0,0,0,0.8)] border border-[rgba(205,0,0,0.27)] cursor-pointer hover:bg-red-50/20 active:scale-95 transition-all box-border absolute w-[47.17%] h-full left-0 top-0 rounded-[33px] text-[clamp(0.62rem,0.97vw,1.17rem)] leading-[clamp(0.8rem,1.25vw,1.5rem)] bg-transparent" >
          Back
        </button>

        {/* Next Button */}
        <button type="button" onClick={onNextTab} className="flex items-center justify-center font-['Outfit',_sans-serif] font-normal text-white cursor-pointer hover:scale-105 active:scale-95 transition-all absolute w-[47.17%] h-full left-[52.83%] top-0 bg-[radial-gradient(circle_at_50%_50%,#3D4A0D_0%,#2A3008_100%)] rounded-[57px] text-[clamp(0.58rem,0.9vw,1.08rem)] leading-[clamp(0.71rem,1.11vw,1.33rem)] border-none" >
          {isFinishStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
