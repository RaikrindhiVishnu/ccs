import React, { useRef, useState } from "react";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
  imageType?: "cover" | "land";
}

interface LocalIntelligenceUploadFileProps {
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

export const LocalIntelligenceUploadFile: React.FC<LocalIntelligenceUploadFileProps> = ({
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
    <div
      className={`select-none ${className}`}
      style={{
        position: "absolute",
        left: "clamp(1.77rem, 2.78vw, 3.33rem)",
        right: "clamp(1.77rem, 2.78vw, 3.33rem)",
        top: "clamp(26rem, 40.63vw, 48.75rem)",
        height: "clamp(19.68rem, 30.76vw, 36.91rem)",
        borderRadius: "24px",
        boxSizing: "border-box",
        background: "#FFFFFF",
        ...style,
      }}
    >
      <h3
        style={{
          position: "absolute",
          width: "13.38%",
          height: "clamp(1.33rem, 2.08vw, 2.5rem)",
          left: "52.65%",
          top: "clamp(1.33rem, 2.08vw, 2.5rem)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
          lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
          margin: 0,
          display: "flex",
          alignItems: "center",
          color: "#000000",
          whiteSpace: "nowrap",
        }}
      >
        Add Comments
      </h3>

      <>
        <h3
          style={{
            position: "absolute",
            width: "9.56%",
            height: "clamp(1.33rem, 2.08vw, 2.5rem)",
            left: "2.21%",
            top: "clamp(1.33rem, 2.08vw, 2.5rem)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
            lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
            margin: 0,
            display: "flex",
            alignItems: "center",
            color: "#000000",
            whiteSpace: "nowrap",
          }}
        >
          Upload File
        </h3>

        <div
          style={{
            position: "absolute",
            width: "50.15%",
            height: "clamp(15.78rem, 24.65vw, 29.58rem)",
            left: "1.32%",
            top: "clamp(3.24rem, 5.07vw, 6.08rem)",
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "24px",
            boxSizing: "border-box",
            background: "#FFFFFF",
          }}
        >
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerUploadClick}
            className="transition-all cursor-pointer"
            style={{
              boxSizing: "border-box",
              position: "absolute",
              width: "41.2%",
              height: "clamp(14.53rem, 22.7vw, 27.24rem)",
              left: "1.76%",
              top: "clamp(0.62rem, 0.97vw, 1.17rem)",
              border: "2px dashed #BDD327",
              borderRadius: "12px",
              background: dragActive ? "rgba(243, 244, 241, 0.6)" : "rgba(242, 244, 246, 0.5)",
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

            <div
              style={{
                position: "absolute",
                width: "clamp(2.14rem, 3.34vw, 4.01rem)",
                height: "clamp(2.14rem, 3.34vw, 4.01rem)",
                left: "calc(50% - clamp(2.14rem, 3.34vw, 4.01rem) / 2)",
                top: "clamp(2.58rem, 4.03vw, 4.84rem)",
                borderRadius: "6030.65px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#E6EEAD",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "clamp(1.72rem, 2.69vw, 3.23rem)",
                  height: "clamp(1.72rem, 2.69vw, 3.23rem)",
                  left: "calc(50% - clamp(1.72rem, 2.69vw, 3.23rem) / 2)",
                  top: "calc(50% - clamp(1.72rem, 2.69vw, 3.23rem) / 2)",
                  background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                  boxShadow: "0px 6px 9px -1.8px rgba(0, 0, 0, 0.15)",
                  borderRadius: "6030.65px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    width: "clamp(0.89rem, 1.39vw, 1.67rem)",
                    height: "clamp(0.89rem, 1.39vw, 1.67rem)",
                    color: "#FFFFFF",
                  }}
                >
                  <line x1="12" y1="15" x2="12" y2="3" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="5" y1="21" x2="19" y2="21" />
                </svg>
              </div>
            </div>

            <span
              style={{
                position: "absolute",
                width: "clamp(2.84rem, 4.44vw, 5.33rem)",
                height: "clamp(1.02rem, 1.59vw, 1.91rem)",
                left: "calc(50% - clamp(2.84rem, 4.44vw, 5.33rem) / 2)",
                top: "clamp(5.39rem, 8.42vw, 10.1rem)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 1.25vw, 1.5rem)",
                lineHeight: "clamp(1.02rem, 1.59vw, 1.91rem)",
                color: "#1A1C1D",
                textAlign: "center",
              }}
            >
              Upload
            </span>

            <span
              style={{
                position: "absolute",
                width: "80%",
                height: "clamp(1.33rem, 2.08vw, 2.5rem)",
                left: "10%",
                top: "clamp(6.72rem, 10.5vw, 12.6rem)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.53rem, 0.83vw, 1.0rem)",
                lineHeight: "clamp(0.67rem, 1.04vw, 1.25rem)",
                color: "#414755",
                textAlign: "center",
              }}
            >
              Drag and drop your files here or click to browse your computer.
            </span>

            <button
              type="button"
              className="absolute hover:scale-105 active:scale-95 transition-all"
              style={{
                width: "clamp(4.44rem, 6.94vw, 8.33rem)",
                height: "clamp(1.69rem, 2.64vw, 3.17rem)",
                left: "calc(50% - clamp(4.44rem, 6.94vw, 8.33rem) / 2)",
                top: "clamp(9.33rem, 14.58vw, 17.5rem)",
                background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                boxShadow: "0px 4px 27.1px rgba(0, 0, 0, 0.05)",
                borderRadius: "57px",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(0.53rem, 0.83vw, 1.0rem)",
                  lineHeight: "clamp(0.67rem, 1.04vw, 1.25rem)",
                  color: "#FFFFFF",
                }}
              >
                Choose File
              </span>
            </button>

            <div
              style={{
                position: "absolute",
                width: "clamp(3.29rem, 5.14vw, 6.17rem)",
                height: "clamp(0.53rem, 0.83vw, 1.0rem)",
                left: "clamp(0.89rem, 1.39vw, 1.67rem)",
                top: "clamp(13.29rem, 20.76vw, 24.92rem)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 15 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                style={{
                  width: "clamp(0.44rem, 0.69vw, 0.83rem)",
                  height: "clamp(0.44rem, 0.69vw, 0.83rem)",
                  color: "#000000",
                }}
              >
                <path d="M3.5 1.5h5l3 3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
                <path d="M8.5 1.5v3h3" />
              </svg>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(0.44rem, 0.69vw, 0.83rem)",
                  lineHeight: "clamp(0.53rem, 0.83vw, 1.0rem)",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Format:&nbsp;
                <strong style={{ fontWeight: 500 }}>PDF</strong>
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                width: "clamp(4.18rem, 6.53vw, 7.83rem)",
                height: "clamp(0.53rem, 0.83vw, 1.0rem)",
                right: "clamp(0.67rem, 1.04vw, 1.25rem)",
                top: "clamp(13.2rem, 20.63vw, 24.75rem)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(0.44rem, 0.69vw, 0.83rem)",
                  lineHeight: "clamp(0.53rem, 0.83vw, 1.0rem)",
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Max File Size:&nbsp;
                <strong style={{ fontWeight: 500 }}>10MB</strong>
              </span>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              width: "41.06%",
              height: "clamp(7.56rem, 11.8vw, 14.17rem)",
              left: "45.75%",
              top: "clamp(0.62rem, 0.97vw, 1.17rem)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "clamp(0.76rem, 1.18vw, 1.42rem)",
            }}
          >
            <h4
              style={{
                width: "100%",
                height: "clamp(1.11rem, 1.74vw, 2.08rem)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(0.89rem, 1.39vw, 1.67rem)",
                lineHeight: "clamp(1.11rem, 1.74vw, 2.08rem)",
                color: "#000000",
                margin: 0,
              }}
            >
              Uploaded Files
            </h4>

            <div
              className="custom-scrollbar"
              style={{
                height: "clamp(5.69rem, 8.89vw, 10.67rem)",
                gap: "clamp(0.44rem, 0.69vw, 0.83rem)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                overflowY: "auto",
                width: "100%",
              }}
            >
              {uploadedFiles.length === 0 ? (
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "#9ca3af",
                  }}
                >
                  No files uploaded yet.
                </span>
              ) : (
                uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    style={{
                      height: "clamp(2.62rem, 4.1vw, 4.92rem)",
                      background: "#F6F9E2",
                      borderRadius: "12px",
                      position: "relative",
                      width: "100%",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "clamp(1.29rem, 2.01vw, 2.42rem)",
                        height: "clamp(1.29rem, 2.01vw, 2.42rem)",
                        left: "clamp(0.4rem, 0.63vw, 0.75rem)",
                        top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#FFFFFF",
                      }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          width: "clamp(0.76rem, 1.18vw, 1.42rem)",
                          height: "clamp(0.76rem, 1.18vw, 1.42rem)",
                        }}
                      >
                        <path d="M3 0h7.5L14 3.5V16H3V0z" fill="#E2E5E7" />
                        <path d="M10.5 0V3.5H14L10.5 0z" fill="#B0B7BD" />
                        <path d="M11 5h-6v1h6V5z" fill="#CAD1D8" />
                        <path d="M11 7h-6v1h6V7z" fill="#CAD1D8" />
                        <path d="M1 10h14v5H1v-5z" fill="#F15642" />
                        <text
                          x="3.5"
                          y="13.8"
                          fill="#FFFFFF"
                          fontSize="3.5"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          PDF
                        </text>
                      </svg>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        left: "clamp(2.04rem, 3.19vw, 3.83rem)",
                        top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                        width: "50%",
                        height: "clamp(1.33rem, 2.08vw, 2.5rem)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)",
                          lineHeight: "clamp(0.76rem, 1.18vw, 1.42rem)",
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "#000000",
                        }}
                      >
                        {file.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: "clamp(0.36rem, 0.56vw, 0.67rem)",
                          lineHeight: "clamp(0.44rem, 0.69vw, 0.83rem)",
                          color: "rgba(0, 0, 0, 0.7)",
                        }}
                      >
                        {file.size}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onFileDelete(file.id)}
                      className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors"
                      style={{
                        position: "absolute",
                        width: "clamp(1.11rem, 1.74vw, 2.08rem)",
                        height: "clamp(1.11rem, 1.74vw, 2.08rem)",
                        right: "clamp(0.67rem, 1.04vw, 1.25rem)",
                        top: "clamp(0.67rem, 1.04vw, 1.25rem)",
                        borderRadius: "2px",
                        border: "none",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          width: "clamp(0.8rem, 1.25vw, 1.5rem)",
                          height: "clamp(0.8rem, 1.25vw, 1.5rem)",
                          color: "rgba(0, 0, 0, 0.82)",
                        }}
                      >
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

      <div
        style={{
          position: "absolute",
          width: "45.44%",
          height: "clamp(8.04rem, 12.56vw, 15.08rem)",
          left: "52.65%",
          top: "clamp(3.24rem, 5.07vw, 6.08rem)",
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            background: "rgba(230, 238, 173, 0.15)",
            border: "1px solid #E6EEAD",
            borderRadius: "18px",
            zIndex: 0,
          }}
        />

        <textarea
          value={commentValue}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Write a comment"
          style={{
            position: "absolute",
            width: "91.59%",
            height: "clamp(3.73rem, 5.83vw, 7.0rem)",
            left: "4.21%",
            top: "clamp(1.07rem, 1.67vw, 2.0rem)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)",
            lineHeight: "clamp(0.93rem, 1.46vw, 1.75rem)",
            zIndex: 1,
            background: "transparent",
            resize: "none",
            border: "none",
            outline: "none",
            color: "#000000",
          }}
        />

        <button
          type="button"
          onClick={handleVoiceInput}
          className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${
            isListening ? "bg-red-600 animate-pulse" : "hover:opacity-90"
          }`}
          style={{
            position: "absolute",
            width: "clamp(1.42rem, 2.22vw, 2.67rem)",
            height: "clamp(1.42rem, 2.22vw, 2.67rem)",
            right: "clamp(0.62rem, 0.97vw, 1.17rem)",
            top: "clamp(6.0rem, 9.38vw, 11.25rem)",
            background: isListening ? "#dc2626" : "#2D3509",
            border: "none",
            zIndex: 1,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: "clamp(0.8rem, 1.25vw, 1.5rem)",
              height: "clamp(0.8rem, 1.25vw, 1.5rem)",
              color: "#FFFFFF",
            }}
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
            <line x1="12" y1="19" y2="22" />
          </svg>
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          width: "15.59%",
          height: "clamp(1.69rem, 2.64vw, 3.17rem)",
          right: "1.91%",
          top: "clamp(16.84rem, 26.3vw, 31.58rem)",
        }}
      >
        <button
          type="button"
          onClick={onPrevTab}
          className="flex items-center justify-center bg-transparent cursor-pointer hover:bg-red-50/20 active:scale-95 transition-all"
          style={{
            boxSizing: "border-box",
            position: "absolute",
            width: "47.17%",
            height: "100%",
            left: 0,
            top: 0,
            borderRadius: "33px",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)",
            lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)",
            color: "rgba(0, 0, 0, 0.8)",
            border: "1px solid rgba(205, 0, 0, 0.27)",
          }}
        >
          Back
        </button>

        <button
          type="button"
          onClick={onNextTab}
          className="flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all"
          style={{
            position: "absolute",
            width: "47.17%",
            height: "100%",
            left: "52.83%",
            top: 0,
            background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
            borderRadius: "57px",
            border: "none",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(0.58rem, 0.91vw, 1.09rem)",
            lineHeight: "clamp(0.71rem, 1.11vw, 1.33rem)",
            color: "#FFFFFF",
          }}
        >
          {isFinishStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
