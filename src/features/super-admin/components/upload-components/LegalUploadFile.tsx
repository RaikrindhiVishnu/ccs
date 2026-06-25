import React from "react";
import { UploadFile, type UploadedFileItem } from "./UploadFile";
import { Comments } from "./Comments";



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
  return (
    <div className={`bg-white select-none ${className} absolute left-[clamp(1.33rem,2.78vw,3.33rem)] right-[clamp(1.33rem,2.78vw,3.33rem)] top-[clamp(19.5rem,40.63vw,48.75rem)] h-[clamp(14.76rem,30.76vw,36.91rem)] rounded-[24px] box-border bg-white`} style={style} >
      {/* Add Comments Title */}
      <h3 className="text-black font-semibold whitespace-nowrap absolute w-[13.38%] h-[clamp(1rem,2.08vw,2.5rem)] left-[52.65%] top-[clamp(1rem,2.08vw,2.5rem)] font-sans text-[clamp(0.8rem,1.67vw,2.0rem)] leading-[clamp(1rem,2.08vw,2.5rem)] m-0 flex items-center" >
        Add Comments
      </h3>

      <>
        {/* Upload File Title */}
        <h3 className="text-black font-semibold whitespace-nowrap absolute w-[9.56%] h-[clamp(1rem,2.08vw,2.5rem)] left-[2.21%] top-[clamp(1rem,2.08vw,2.5rem)] font-sans text-[clamp(0.8rem,1.67vw,2.0rem)] leading-[clamp(1rem,2.08vw,2.5rem)] m-0 flex items-center" >
          Upload File
        </h3>

        {/* Left Card: Frame 2147239867 */}
        <div className="bg-white absolute w-[50.15%] h-[clamp(11.83rem,24.65vw,29.58rem)] left-[1.32%] top-[clamp(2.43rem,5.07vw,6.08rem)] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-[24px] box-border" >
          <UploadFile
            uploadedFiles={uploadedFiles}
            onFileUpload={onFileUpload}
            onFileDelete={onFileDelete}
          />
        </div>
      </>

      {/* Right Card: Comment Box */}
      <div className="absolute w-[45.44%] h-[clamp(6.03rem,12.57vw,15.08rem)] left-[52.65%] top-[clamp(2.43rem,5.07vw,6.08rem)]" >
        <Comments
          commentValue={commentValue}
          onCommentChange={onCommentChange}
          activeTabLabel={activeTabLabel}
        />
      </div>

      {/* Footer Navigation Buttons */}
      <div className="absolute w-[15.59%] h-[clamp(1.27rem,2.64vw,3.17rem)] right-[1.91%] top-[clamp(12.63rem,26.32vw,31.58rem)]" >
        {/* Back Button */}
        <button type="button" onClick={onPrevTab} className="flex items-center justify-center font-['Outfit',_sans-serif] font-medium text-[rgba(0,0,0,0.8)] border border-[rgba(205,0,0,0.27)] cursor-pointer hover:bg-red-50/20 active:scale-95 transition-all box-border absolute w-[47.17%] h-full left-0 top-0 rounded-[33px] text-[clamp(0.47rem,0.97vw,1.17rem)] leading-[clamp(0.6rem,1.25vw,1.5rem)] bg-transparent" >
          Back
        </button>

        {/* Next Button */}
        <button type="button" onClick={onNextTab} className="flex items-center justify-center font-['Outfit',_sans-serif] font-normal text-white cursor-pointer hover:scale-105 active:scale-95 transition-all absolute w-[47.17%] h-full left-[52.83%] top-0 bg-[radial-gradient(circle_at_50%_50%,#3D4A0D_0%,#2A3008_100%)] rounded-[57px] text-[clamp(0.43rem,0.9vw,1.08rem)] leading-[clamp(0.53rem,1.11vw,1.33rem)] border-none" >
          {isFinishStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
