import { useState, useRef } from "react";

type TimelineItem = {
  id: number;
  date: string;
  time: string;
  comment: string;
  files: string[];
  updatedBy: string;
  issueBy?: string;
  issueComment?: string;
};

type Props = {
  editItem: TimelineItem;
  onSave: (id: number, comment: string, files: string[]) => void;
  onCancel: () => void;
};

const UploadForm = ({ editItem, onSave, onCancel }: Props) => {
  const [comment, setComment] = useState(editItem.comment);
  const [files, setFiles] = useState<{ name: string; size: string }[]>(
    editItem.files.map((name) => ({ name, size: `${Math.floor(Math.random() * 5) + 3}MB` }))
  );
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDeleteFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const handleSave = () => {
    onSave(
      editItem.id,
      comment,
      files.map((f) => f.name)
    );
  };

  return (
    <div className="w-full">
      {/* Header Buttons */}
      <div className="flex justify-between items-center mb-8 2xl:mb-11">
        <h3 className="text-[20px] 2xl:text-[26px] font-bold text-[#1A1C1D] font-plus-jakarta">
          Upload File
        </h3>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="
              border border-gray-300 hover:bg-gray-50 
              text-black font-semibold 
              px-8 py-2.5 2xl:px-11 2xl:py-3.5
              rounded-full text-[14px] 2xl:text-[18px]
              transition-all duration-200 cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              bg-[#0284C7] hover:bg-[#0369a1] 
              text-white font-bold 
              px-10 py-2.5 2xl:px-14 2xl:py-3.5
              rounded-full text-[14px] 2xl:text-[18px]
              transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md
            "
          >
            Save
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 2xl:gap-11">
        
        {/* LEFT: Upload Box */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center border-2 border-dashed border-[#96C9ED] bg-[#F0F9FF]/20 rounded-[28px] p-8 text-center min-h-[320px] 2xl:min-h-[400px]">
          {/* File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
            accept=".pdf"
          />

          {/* Upload Icon */}
          <div className="w-16 h-16 2xl:w-20 2xl:h-20 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] mb-5">
            <svg className="w-8 h-8 2xl:w-10 2xl:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>

          <h4 className="text-[18px] 2xl:text-[23px] font-bold text-[#1A1C1D] mb-2 font-plus-jakarta">
            Upload
          </h4>

          <p className="text-[13px] 2xl:text-[17px] text-[#3D4949] leading-relaxed mb-6 font-medium font-plus-jakarta px-4">
            Drag and drop your files here or click to browse your computer.
          </p>

          <button
            onClick={handleChooseFile}
            className="
              bg-[#0284C7] hover:bg-[#0369a1] 
              text-white text-[13px] 2xl:text-[17px] font-bold 
              px-6 py-2.5 2xl:px-8 2xl:py-3.5
              rounded-full transition-all cursor-pointer shadow-sm
            "
          >
            Choose File
          </button>

          <div className="flex justify-between w-full mt-8 2xl:mt-10 pt-4 border-t border-[#E2E2E4] text-[11px] 2xl:text-[14px] text-gray-400 font-bold tracking-wider font-plus-jakarta">
            <span>📄 FORMAT: PDF</span>
            <span>MAX FILE SIZE: 10MB</span>
          </div>
        </div>

        {/* MIDDLE: Uploaded Files List */}
        <div className="lg:col-span-3 flex flex-col">
          <h4 className="text-[16px] 2xl:text-[21px] font-bold text-[#1A1C1D] mb-4 font-plus-jakarta">
            Uploaded Files
          </h4>

          <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] 2xl:max-h-[380px] pr-2">
            {files.length > 0 ? (
              files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-[#F1F5F9] border border-gray-200/50 rounded-2xl p-4 2xl:p-5.5 hover:bg-gray-200/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#1A1C1D] truncate max-w-[140px] 2xl:max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5">
                        {file.size}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteFile(file.name)}
                    className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-gray-200 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 2xl:w-6 2xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 border rounded-2xl bg-gray-50/50">
                <span className="text-xs text-gray-400 font-medium">No files uploaded.</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Comments Textarea */}
        <div className="lg:col-span-6 flex flex-col">
          <h4 className="text-[16px] 2xl:text-[21px] font-bold text-[#1A1C1D] mb-4 font-plus-jakarta">
            Updated Comments:
          </h4>

          <div className="flex-1 bg-[#EFF6FF]/40 border border-[#BFDBFE] rounded-[24px] p-4 2xl:p-6 flex">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your updated comments here..."
              rows={8}
              className="w-full bg-transparent resize-none outline-none border-none text-[15px] 2xl:text-[20px] leading-relaxed text-[#3D4949] font-medium font-plus-jakarta"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default UploadForm;
