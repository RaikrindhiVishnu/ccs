import React from 'react';
import {
  Upload as CloudUpload,
  Mic,
  Trash2,
  FileText,
  ChevronDown
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  url?: string;
}

interface LandBoundariesCardProps {
  activeSubTab: number;
  comments: Record<number, string>;
  setComments: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  uploadedFiles: Record<number, UploadedFile[]>;
  isDragOver: boolean;
  setIsDragOver: (val: boolean) => void;
  selectedShape: string;
  setSelectedShape: (val: string) => void;
  isShapeDropdownOpen: boolean;
  setIsShapeDropdownOpen: (val: boolean) => void;
  selectedAvailability: string;
  setSelectedAvailability: (val: string) => void;
  selectedWaterFacility: string;
  setSelectedWaterFacility: (val: string) => void;
  selectedElectricityFacility: string;
  setSelectedElectricityFacility: (val: string) => void;
  treeAvailability: string;
  setTreeAvailability: (val: string) => void;
  treeCount: string;
  setTreeCount: (val: string) => void;
  isTreeCountDropdownOpen: boolean;
  setIsTreeCountDropdownOpen: (val: boolean) => void;
  surveyReportType: string;
  setSurveyReportType: (val: string) => void;
  isBoundaryDropdownOpen: boolean;
  setIsBoundaryDropdownOpen: (val: boolean) => void;
  boundarySelections: Record<number, string>;
  setBoundarySelections: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  roadTypeSelections: Record<number, string>;
  setRoadTypeSelections: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  isTreesDropdownOpen: boolean;
  setIsTreesDropdownOpen: (val: boolean) => void;
  treesSelections: Record<number, string>;
  setTreesSelections: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  
  // Handlers
  onChooseFileClick: () => void;
  onDeleteFile: (fileId: string) => void;
  onAddFiles: (files: File[], type: 'cover' | 'land' | 'private-survey' | 'government-survey') => void;
  
  // Footer
  onBack: () => void;
  onNext: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const LandBoundariesCard: React.FC<LandBoundariesCardProps> = ({
  activeSubTab,
  comments,
  setComments,
  uploadedFiles,
  isDragOver,
  setIsDragOver,
  selectedShape,
  setSelectedShape,
  isShapeDropdownOpen,
  setIsShapeDropdownOpen,
  selectedAvailability,
  setSelectedAvailability,
  selectedWaterFacility,
  setSelectedWaterFacility,
  selectedElectricityFacility,
  setSelectedElectricityFacility,
  treeAvailability,
  setTreeAvailability,
  treeCount,
  setTreeCount,
  isTreeCountDropdownOpen,
  setIsTreeCountDropdownOpen,
  surveyReportType,
  setSurveyReportType,
  isBoundaryDropdownOpen,
  setIsBoundaryDropdownOpen,
  boundarySelections,
  setBoundarySelections,
  roadTypeSelections,
  setRoadTypeSelections,
  isTreesDropdownOpen,
  setIsTreesDropdownOpen,
  treesSelections,
  setTreesSelections,
  
  onChooseFileClick,
  onDeleteFile,
  onAddFiles,
  onBack,
  onNext,
  fileInputRef
}) => {
  const currentUploaded = uploadedFiles[activeSubTab] || [];
  const currentComment = comments[activeSubTab] || '';

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddFiles(Array.from(e.dataTransfer.files), 'land');
    }
  };

  return (
    <div className="land-boundaries-bottom-card" style={{ height: (activeSubTab === 6 && surveyReportType) ? (surveyReportType === 'Both Survey Reports' ? '1190px' : '760px') : undefined }}>
      {/* "Upload File" / "Shape of the Land" title — left:30, top:30 */}
      {(activeSubTab !== 3 && activeSubTab !== 4 && activeSubTab !== 6 && activeSubTab < 7) && (
        <span style={{
          position: 'absolute',
          left: '30px',
          top: '30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '30px',
          color: '#000000'
        }}>
          {activeSubTab === 2 ? 'Shape of the Land' : 'Upload File'}
        </span>
      )}

      {/* "Add Comments" title — left:716, top:30 */}
      {activeSubTab !== 6 && (
        <span style={{
          position: 'absolute',
          left: '716px',
          top: '30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '30px',
          color: '#000000'
        }}>
          Add Comments
        </span>
      )}

      {activeSubTab === 3 ? (
        <>
          {/* Water & Electricity Availability Facility */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '24px',
            position: 'absolute',
            width: '640px',
            height: '87px',
            left: '31px',
            top: '30px'
          }}>
            <span style={{
              width: '640px',
              height: '25px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '25px',
              color: '#000000'
            }}>
              Select availability Facility
            </span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '27px' }}>
              {[
                { label: 'Water Facility', width: '150px' },
                { label: 'Electricity Facility', width: '178px' },
                { label: 'Both', width: '91px' }
              ].map((opt) => {
                const isSelected = selectedAvailability === opt.label;
                return (
                  <div
                    key={opt.label}
                    onClick={() => setSelectedAvailability(opt.label)}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 16px',
                      gap: '8px',
                      width: opt.width,
                      height: '38px',
                      border: `1px solid ${isSelected ? '#2780C4' : 'rgba(0, 0, 0, 0.26)'}`,
                      borderRadius: '33px',
                      cursor: 'pointer',
                      background: isSelected ? '#2780C4' : '#FFFFFF',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: `2px solid ${isSelected ? '#FFFFFF' : '#85BFE5'}`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isSelected && <div style={{ width: '4px', height: '4px', background: '#2780C4', borderRadius: '50%' }} />}
                      </div>
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        color: isSelected ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        {opt.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Select Water Facility */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '24px',
            position: 'absolute',
            width: '640px',
            height: '87px',
            left: '31px',
            top: '147px'
          }}>
            <span style={{
              width: '640px',
              height: '25px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '25px',
              color: '#000000',
              opacity: selectedAvailability === 'Electricity Facility' ? 0.3 : 1
            }}>
              Select Water Facility
            </span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '27px', opacity: selectedAvailability === 'Electricity Facility' ? 0.3 : 1, pointerEvents: selectedAvailability === 'Electricity Facility' ? 'none' : 'auto' }}>
              {[
                { label: 'Bore', width: '91px' },
                { label: 'Muncipal', width: '120px' }
              ].map((opt) => {
                const isSelected = selectedWaterFacility === opt.label;
                return (
                  <div
                    key={opt.label}
                    onClick={() => setSelectedWaterFacility(opt.label)}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 16px',
                      gap: '8px',
                      width: opt.width,
                      height: '38px',
                      border: `1px solid ${isSelected ? '#2780C4' : 'rgba(0, 0, 0, 0.26)'}`,
                      borderRadius: '33px',
                      cursor: 'pointer',
                      background: isSelected ? '#2780C4' : '#FFFFFF',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: `2px solid ${isSelected ? '#FFFFFF' : '#85BFE5'}`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isSelected && <div style={{ width: '4px', height: '4px', background: '#2780C4', borderRadius: '50%' }} />}
                      </div>
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        color: isSelected ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        {opt.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Select Electricity Facility */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '24px',
            position: 'absolute',
            width: '640px',
            height: '87px',
            left: '31px',
            top: '264px'
          }}>
            <span style={{
              width: '640px',
              height: '25px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '25px',
              color: '#000000',
              opacity: selectedAvailability === 'Water Facility' ? 0.3 : 1
            }}>
              Select Electricity Facility
            </span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '27px', opacity: selectedAvailability === 'Water Facility' ? 0.3 : 1, pointerEvents: selectedAvailability === 'Water Facility' ? 'none' : 'auto' }}>
              {[
                { label: '2 Phase', width: '110px' },
                { label: '3 Phase', width: '111px' }
              ].map((opt) => {
                const isSelected = selectedElectricityFacility === opt.label;
                return (
                  <div
                    key={opt.label}
                    onClick={() => setSelectedElectricityFacility(opt.label)}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 16px',
                      gap: '8px',
                      width: opt.width,
                      height: '38px',
                      border: `1px solid ${isSelected ? '#2780C4' : 'rgba(0, 0, 0, 0.26)'}`,
                      borderRadius: '33px',
                      cursor: 'pointer',
                      background: isSelected ? '#2780C4' : '#FFFFFF',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: `2px solid ${isSelected ? '#FFFFFF' : '#85BFE5'}`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isSelected && <div style={{ width: '4px', height: '4px', background: '#2780C4', borderRadius: '50%' }} />}
                      </div>
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        color: isSelected ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        {opt.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : activeSubTab === 4 ? (
        <>
          {/* Trees Availability Selection */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '18px',
            position: 'absolute',
            width: '640px',
            height: '86px',
            left: '30px',
            top: '30px'
          }}>
            <span style={{
              width: '640px',
              height: '30px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '30px',
              color: '#000000'
            }}>
              Any Existing Tress available surrounding land?
            </span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '25px' }}>
              {[
                { label: 'Available', width: '120px' },
                { label: 'Not Available', width: '147px' }
              ].map((opt) => {
                const isSelected = treeAvailability === opt.label;
                return (
                  <div
                    key={opt.label}
                    onClick={() => setTreeAvailability(opt.label)}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 16px',
                      gap: '8px',
                      width: opt.width,
                      height: '38px',
                      border: `1px solid ${isSelected ? '#2780C4' : 'rgba(0, 0, 0, 0.26)'}`,
                      borderRadius: '33px',
                      cursor: 'pointer',
                      background: isSelected ? '#2780C4' : '#FFFFFF',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: `2px solid ${isSelected ? '#FFFFFF' : '#85BFE5'}`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isSelected && <div style={{ width: '4px', height: '4px', background: '#2780C4', borderRadius: '50%' }} />}
                      </div>
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        color: isSelected ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        {opt.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trees Count Selection Dropdown */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '8px',
            position: 'absolute',
            width: '640px',
            height: '82px',
            left: '30px',
            top: '144px',
            opacity: treeAvailability === 'Available' ? 1 : 0.3,
            pointerEvents: treeAvailability === 'Available' ? 'auto' : 'none'
          }}>
            <span style={{
              width: '640px',
              height: '20px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '20px',
              color: 'rgba(0, 0, 0, 0.92)'
            }}>
              Tress count
            </span>
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setIsTreeCountDropdownOpen(!isTreeCountDropdownOpen)}
                style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  padding: '0 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  color: treeCount ? '#000000' : 'rgba(0, 0, 0, 0.4)',
                  cursor: 'pointer',
                  outline: 'none',
                  textAlign: 'left'
                }}
              >
                <span>{treeCount || 'Select'}</span>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="#363434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {isTreeCountDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '56px',
                  left: 0,
                  width: '640px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {['0 - 10', '10 - 20', '20 - 50', '50+'].map((count) => (
                    <div
                      key={count}
                      onClick={() => {
                        setTreeCount(count);
                        setIsTreeCountDropdownOpen(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#1A1C1E',
                        cursor: 'pointer',
                        background: treeCount === count ? '#E5F1F9' : 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (treeCount !== count) e.currentTarget.style.background = '#F5F5F5';
                      }}
                      onMouseLeave={(e) => {
                        if (treeCount !== count) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {count}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : activeSubTab === 6 ? (
        <>
          <span style={{
            position: 'absolute',
            width: '304px',
            height: '30px',
            left: '30px',
            top: '30px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            color: '#000000'
          }}>
            Select Survey Report Type
          </span>

          {/* Survey Report Selection Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: '32px',
            position: 'absolute',
            left: '30px',
            top: '97px'
          }}>
            {[
              { label: 'Private Survey Report', width: '204px' },
              { label: 'Government Survey Report', width: '242px' }
            ].map((opt) => {
              const isSelected = surveyReportType === opt.label;
              return (
                <div
                  key={opt.label}
                  onClick={() => setSurveyReportType(opt.label)}
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 16px',
                    gap: '8px',
                    width: opt.width,
                    height: '38px',
                    border: `1px solid ${isSelected ? '#2780C4' : 'rgba(0, 0, 0, 0.26)'}`,
                    borderRadius: '33px',
                    cursor: 'pointer',
                    background: isSelected ? '#2780C4' : '#FFFFFF',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      boxSizing: 'border-box',
                      width: '12px',
                      height: '12px',
                      background: '#FFFFFF',
                      border: `2px solid ${isSelected ? '#FFFFFF' : '#85BFE5'}`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected && <div style={{ width: '4px', height: '4px', background: '#2780C4', borderRadius: '50%' }} />}
                    </div>
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '18px',
                      color: isSelected ? '#FFFFFF' : '#000000',
                      whiteSpace: 'nowrap'
                    }}>
                      {opt.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Both Survey Reports Selection button */}
          <div style={{
            position: 'absolute',
            left: '30px',
            top: '156px'
          }}>
            {[
              { label: 'Both Survey Reports', width: '196px' }
            ].map((opt) => {
              const isSelected = surveyReportType === opt.label;
              return (
                <div
                  key={opt.label}
                  onClick={() => setSurveyReportType(opt.label)}
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 16px',
                    gap: '8px',
                    width: opt.width,
                    height: '38px',
                    border: `1px solid ${isSelected ? '#2780C4' : 'rgba(0, 0, 0, 0.26)'}`,
                    borderRadius: '33px',
                    cursor: 'pointer',
                    background: isSelected ? '#2780C4' : '#FFFFFF',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      boxSizing: 'border-box',
                      width: '12px',
                      height: '12px',
                      background: '#FFFFFF',
                      border: `2px solid ${isSelected ? '#FFFFFF' : '#85BFE5'}`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected && <div style={{ width: '4px', height: '4px', background: '#2780C4', borderRadius: '50%' }} />}
                    </div>
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '18px',
                      color: isSelected ? '#FFFFFF' : '#000000',
                      whiteSpace: 'nowrap'
                    }}>
                      {opt.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {surveyReportType && (
            <>
              {/* Private Survey Report Panel (Shown if Private or Both) */}
              {(surveyReportType === 'Private Survey Report' || surveyReportType === 'Both Survey Reports') && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '19px',
                  position: 'absolute',
                  width: '1319px',
                  height: '403px',
                  left: '30px',
                  top: '304px'
                }}>
                  {/* Left Side: Upload */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '18px', width: '682px', height: '403px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                      Private Survey Report
                    </span>
                    <div style={{ width: '682px', height: '355px', background: '#FFFFFF', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)', borderRadius: '24px', position: 'relative' }}>
                      <div style={{ boxSizing: 'border-box', position: 'absolute', width: '314px', height: '327px', left: '12px', top: '14px', background: 'rgba(242, 244, 246, 0.5)', border: '2px dashed rgba(225, 229, 239, 0.6)', borderRadius: '12px' }}>
                        <div style={{ position: 'absolute', width: '48.25px', height: '48.25px', left: 'calc(50% - 48.25px/2 - 0.88px)', top: '58px', background: 'rgba(0, 112, 235, 0.1)', borderRadius: '6030.65px' }}>
                          <div style={{ position: 'absolute', width: '38.6px', height: '38.6px', left: 'calc(50% - 38.6px/2)', top: 'calc(50% - 38.6px/2)', background: 'linear-gradient(135deg, rgba(0, 88, 188, 0.84) 0%, rgba(0, 112, 235, 0.84) 100%)', borderRadius: '6030.65px' }}>
                            <CloudUpload style={{ position: 'absolute', width: '20px', height: '20px', left: '9.18px', top: '9.18px', color: '#FFFFFF' }} />
                          </div>
                        </div>
                        <span style={{ position: 'absolute', width: '64px', height: '23px', left: 'calc(50% - 64px/2 - 0.5px)', top: '121.25px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', lineHeight: '23px', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#1A1C1D' }}>Upload</span>
                        <span style={{ position: 'absolute', width: '214px', height: '30px', left: 'calc(50% - 214px/2 + 1.5px)', top: '151.25px', fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '15px', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#414755' }}>Drag and drop your files here or click to browse your computer.</span>
                        <div
                          onClick={() => { onChooseFileClick(); if (fileInputRef.current) { fileInputRef.current.setAttribute('data-upload-type', 'private-survey'); fileInputRef.current.click(); } }}
                          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '6px 20px', position: 'absolute', width: '108px', height: '36px', left: 'calc(50% - 108px/2 - 0.5px)', top: '218px', background: 'linear-gradient(135deg, #0095FF 0%, #1F8AFF 100%)', borderRadius: '9999px', boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
                        >
                          <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px', lineHeight: '24px', color: '#FFFFFF' }}>Choose File</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px', position: 'absolute', width: '87px', height: '12px', left: '20px', top: '299px' }}>
                          <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '10px', color: '#000000' }}>Format:</span>
                          <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '10px', color: '#000000' }}>JPG, PNG</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2px', position: 'absolute', width: '94px', height: '12px', right: '15px', top: '297px' }}>
                          <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '10px', color: '#000000' }}>Max File Size:</span>
                          <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '10px', color: '#000000' }}>10MB</span>
                        </div>
                      </div>
                      
                      {/* Uploaded Files List */}
                      <div style={{ position: 'absolute', left: '341px', top: '14px', width: '314px' }}>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: '20px', lineHeight: '25px', color: '#000000', display: 'block', marginBottom: '16px' }}>Uploaded Files</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {currentUploaded.filter(f => f.name.startsWith('[Private Survey]')).map(file => (
                            <div key={file.id} className="land-boundaries-file-card" style={{ width: '100%', marginBottom: 0 }}>
                              <div className="land-boundaries-file-info">
                                <div className="land-boundaries-file-icon-placeholder" style={{ background: '#E5F1F9' }}>
                                  <FileText className="w-5 h-5 text-[#2780C4]" />
                                </div>
                                <div className="land-boundaries-file-meta">
                                  <span className="land-boundaries-file-name" style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {file.name.replace('[Private Survey] ', '')}
                                  </span>
                                </div>
                              </div>
                              <button onClick={() => onDeleteFile(file.id)} className="land-boundaries-file-delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments for Private Survey */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '13px', width: '618px', height: '224px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                      Add Comments
                    </span>
                    <div style={{ width: '618px', height: '181px', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(187, 219, 240, 0.38)', border: '1px solid #96C9ED', borderRadius: '18px', boxSizing: 'border-box' }} />
                      <textarea
                        value={currentComment}
                        onChange={(e) =>
                          setComments((prev) => ({
                            ...prev,
                            [activeSubTab]: e.target.value
                          }))
                        }
                        placeholder="Write a comment"
                        style={{ position: 'absolute', width: '566px', height: '84px', left: '26px', top: '24px', fontFamily: 'Inter', fontSize: '14px', lineHeight: '17px', color: 'rgba(0,0,0,0.8)', background: 'transparent', border: 'none', outline: 'none', resize: 'none' }}
                      />
                      <button style={{ position: 'absolute', width: '32px', height: '32px', left: '572px', top: '135px', background: '#2680C4', borderRadius: '90px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Government Survey Report Panel (Shown if Government or Both) */}
              {(surveyReportType === 'Government Survey Report' || surveyReportType === 'Both Survey Reports') && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '19px',
                  position: 'absolute',
                  width: '1319px',
                  height: '403px',
                  left: '30px',
                  top: surveyReportType === 'Both Survey Reports' ? '738px' : '304px'
                }}>
                  {/* Left Side: Upload */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '18px', width: '682px', height: '403px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                      Government Survey Report
                    </span>
                    <div style={{ width: '682px', height: '355px', background: '#FFFFFF', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)', borderRadius: '24px', position: 'relative' }}>
                      <div style={{ boxSizing: 'border-box', position: 'absolute', width: '314px', height: '327px', left: '12px', top: '14px', background: 'rgba(242, 244, 246, 0.5)', border: '2px dashed rgba(225, 229, 239, 0.6)', borderRadius: '12px' }}>
                        <div style={{ position: 'absolute', width: '48.25px', height: '48.25px', left: 'calc(50% - 48.25px/2 - 0.88px)', top: '58px', background: 'rgba(0, 112, 235, 0.1)', borderRadius: '6030.65px' }}>
                          <div style={{ position: 'absolute', width: '38.6px', height: '38.6px', left: 'calc(50% - 38.6px/2)', top: 'calc(50% - 38.6px/2)', background: 'linear-gradient(135deg, rgba(0, 88, 188, 0.84) 0%, rgba(0, 112, 235, 0.84) 100%)', borderRadius: '6030.65px' }}>
                            <CloudUpload style={{ position: 'absolute', width: '20px', height: '20px', left: '9.18px', top: '9.18px', color: '#FFFFFF' }} />
                          </div>
                        </div>
                        <span style={{ position: 'absolute', width: '64px', height: '23px', left: 'calc(50% - 64px/2 - 0.5px)', top: '121.25px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', lineHeight: '23px', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#1A1C1D' }}>Upload</span>
                        <span style={{ position: 'absolute', width: '214px', height: '30px', left: 'calc(50% - 214px/2 + 1.5px)', top: '151.25px', fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '15px', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#414755' }}>Drag and drop your files here or click to browse your computer.</span>
                        <div
                          onClick={() => { onChooseFileClick(); if (fileInputRef.current) { fileInputRef.current.setAttribute('data-upload-type', 'government-survey'); fileInputRef.current.click(); } }}
                          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '6px 20px', position: 'absolute', width: '108px', height: '36px', left: 'calc(50% - 108px/2 - 0.5px)', top: '218px', background: 'linear-gradient(135deg, #0095FF 0%, #1F8AFF 100%)', borderRadius: '9999px', boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
                        >
                          <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px', lineHeight: '24px', color: '#FFFFFF' }}>Choose File</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px', position: 'absolute', width: '87px', height: '12px', left: '20px', top: '299px' }}>
                          <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '10px', color: '#000000' }}>Format:</span>
                          <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '10px', color: '#000000' }}>JPG, PNG</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2px', position: 'absolute', width: '94px', height: '12px', right: '15px', top: '297px' }}>
                          <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '10px', color: '#000000' }}>Max File Size:</span>
                          <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '10px', color: '#000000' }}>10MB</span>
                        </div>
                      </div>
                      
                      {/* Uploaded Files Box */}
                      <div style={{ position: 'absolute', left: '341px', top: '14px', width: '314px' }}>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: '20px', lineHeight: '25px', color: '#000000', display: 'block', marginBottom: '16px' }}>Uploaded Files</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {currentUploaded.filter(f => f.name.startsWith('[Government Survey]')).map(file => (
                            <div key={file.id} className="land-boundaries-file-card" style={{ width: '100%', marginBottom: 0 }}>
                              <div className="land-boundaries-file-info">
                                <div className="land-boundaries-file-icon-placeholder" style={{ background: '#E5F1F9' }}>
                                  <FileText className="w-5 h-5 text-[#2780C4]" />
                                </div>
                                <div className="land-boundaries-file-meta">
                                  <span className="land-boundaries-file-name" style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {file.name.replace('[Government Survey] ', '')}
                                  </span>
                                </div>
                              </div>
                              <button onClick={() => onDeleteFile(file.id)} className="land-boundaries-file-delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments for Government Survey */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '13px', width: '618px', height: '224px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                      Add Comments
                    </span>
                    <div style={{ width: '618px', height: '181px', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(187, 219, 240, 0.38)', border: '1px solid #96C9ED', borderRadius: '18px', boxSizing: 'border-box' }} />
                      <textarea
                        value={currentComment}
                        onChange={(e) =>
                          setComments((prev) => ({
                            ...prev,
                            [activeSubTab]: e.target.value
                          }))
                        }
                        placeholder="Write a comment"
                        style={{ position: 'absolute', width: '566px', height: '84px', left: '26px', top: '24px', fontFamily: 'Inter', fontSize: '14px', lineHeight: '17px', color: 'rgba(0,0,0,0.8)', background: 'transparent', border: 'none', outline: 'none', resize: 'none' }}
                      />
                      <button style={{ position: 'absolute', width: '32px', height: '32px', left: '572px', top: '135px', background: '#2680C4', borderRadius: '90px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : activeSubTab >= 7 ? (
        <>
          {/* East/West/North/South Boundaries Form */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '13px', position: 'absolute', width: '640px', height: '97px', left: '30px', top: '30px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
              {['East Boundaries', 'West Boundaries', 'North Boundaries', 'South Boundaries'][activeSubTab - 7]}
            </span>
            
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setIsBoundaryDropdownOpen(!isBoundaryDropdownOpen)}
                style={{ boxSizing: 'border-box', width: '640px', height: '54px', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: '8px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', cursor: 'pointer', outline: 'none' }}
              >
                <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', color: boundarySelections[activeSubTab] ? '#000000' : 'rgba(0,0,0,0.4)' }}>
                  {boundarySelections[activeSubTab] || `What is on the ${['east', 'west', 'north', 'south'][activeSubTab - 7]} side?`}
                </span>
                <ChevronDown style={{ width: '16px', height: '16px', color: '#000' }} />
              </button>
              
              {isBoundaryDropdownOpen && (
                <div style={{ position: 'absolute', top: '56px', left: 0, right: 0, background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', zIndex: 10 }}>
                  {['Land', 'Road', 'Water Body', 'Tress', 'Other'].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setBoundarySelections(prev => ({ ...prev, [activeSubTab]: opt }));
                        setIsBoundaryDropdownOpen(false);
                      }}
                      style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1C1E', cursor: 'pointer', transition: 'background 0.2s', background: boundarySelections[activeSubTab] === opt ? '#E5F1F9' : 'transparent' }}
                      onMouseEnter={(e) => { if (boundarySelections[activeSubTab] !== opt) e.currentTarget.style.background = '#F9FAFB'; }}
                      onMouseLeave={(e) => { if (boundarySelections[activeSubTab] !== opt) e.currentTarget.style.background = 'transparent'; }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {boundarySelections[activeSubTab] === 'Land' && (
            <>
              <span style={{ position: 'absolute', width: '640px', height: '30px', left: '30px', top: '155px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                Owner details of land
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '8px', position: 'absolute', width: '640px', height: '82px', left: '30px', top: '203px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '20px', color: 'rgba(0, 0, 0, 0.92)' }}>Name</span>
                <div style={{ boxSizing: 'border-box', width: '640px', height: '54px', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: '8px', position: 'relative' }}>
                  <input type="text" placeholder="Krishna" style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, background: 'transparent', border: 'none', padding: '0 24px', fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '8px', position: 'absolute', width: '640px', height: '82px', left: '30px', top: '303px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '20px', color: 'rgba(0, 0, 0, 0.92)' }}>Age</span>
                <div style={{ boxSizing: 'border-box', width: '640px', height: '54px', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: '8px', position: 'relative' }}>
                  <input type="text" placeholder="43" style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, background: 'transparent', border: 'none', padding: '0 24px', fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', outline: 'none' }} />
                </div>
              </div>
            </>
          )}

          {boundarySelections[activeSubTab] === 'Road' && (
            <>
              {/* Type of Road */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '18px', position: 'absolute', width: '640px', height: '86px', left: '30px', top: '155px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  Type of Road
                </span>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, gap: '25px', width: '364px', height: '38px' }}>
                  
                  {/* Private Road Button */}
                  <div 
                    onClick={() => setRoadTypeSelections(prev => ({ ...prev, [activeSubTab]: 'Private Road' }))}
                    style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '10px 18px', gap: '10px', width: '143px', height: '38px', borderRadius: '33px', cursor: 'pointer', border: roadTypeSelections[activeSubTab] === 'Private Road' ? '1px solid #FFFFFF' : '1px solid rgba(0, 0, 0, 0.26)', background: roadTypeSelections[activeSubTab] === 'Private Road' ? '#2780C4' : 'transparent' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, gap: '10px' }}>
                      <div style={{ boxSizing: 'border-box', width: '12px', height: '12px', background: '#FFFFFF', border: '2px solid #85BFE5', borderRadius: '50%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {roadTypeSelections[activeSubTab] === 'Private Road' && <div style={{ width: '4px', height: '4px', background: '#2780C4', borderRadius: '50%' }} />}
                      </div>
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '14px', lineHeight: '18px', color: roadTypeSelections[activeSubTab] === 'Private Road' ? '#FFFFFF' : '#000000', whiteSpace: 'nowrap' }}>
                        Private Road
                      </span>
                    </div>
                  </div>

                  {/* Government Road Button */}
                  <div 
                    onClick={() => setRoadTypeSelections(prev => ({ ...prev, [activeSubTab]: 'Government Road' }))}
                    style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '10px 18px', gap: '10px', width: '196px', height: '38px', borderRadius: '33px', cursor: 'pointer', border: roadTypeSelections[activeSubTab] === 'Government Road' ? '1px solid #FFFFFF' : '1px solid rgba(0, 0, 0, 0.26)', background: roadTypeSelections[activeSubTab] === 'Government Road' ? '#2780C4' : 'transparent' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, gap: '10px' }}>
                      <div style={{ boxSizing: 'border-box', width: '12px', height: '12px', background: '#FFFFFF', border: '2px solid #85BFE5', borderRadius: '50%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {roadTypeSelections[activeSubTab] === 'Government Road' && <div style={{ width: '4px', height: '4px', background: '#2780C4', borderRadius: '50%' }} />}
                      </div>
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '14px', lineHeight: '18px', color: roadTypeSelections[activeSubTab] === 'Government Road' ? '#FFFFFF' : '#000000', whiteSpace: 'nowrap' }}>
                        Governement Road
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Width of the Road */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '8px', position: 'absolute', width: '640px', height: '82px', left: '30px', top: '269px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '20px', color: 'rgba(0, 0, 0, 0.92)' }}>
                  Width of the Road <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>(in Feet)</span>
                </span>
                <div style={{ boxSizing: 'border-box', width: '640px', height: '54px', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: '8px', position: 'relative' }}>
                  <input type="text" placeholder="100" style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, background: 'transparent', border: 'none', padding: '0 24px', fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', outline: 'none' }} />
                </div>
              </div>
            </>
          )}

          {boundarySelections[activeSubTab] === 'Tress' && (
            <>
              {/* Trees Count */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '8px', position: 'absolute', width: '640px', height: '82px', left: '30px', top: '162px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '20px', color: 'rgba(0, 0, 0, 0.92)' }}>
                  Trees Count
                </span>
                <div style={{ position: 'relative', width: '100%' }}>
                  <button
                    type="button"
                    onClick={() => setIsTreesDropdownOpen(!isTreesDropdownOpen)}
                    style={{ boxSizing: 'border-box', width: '640px', height: '54px', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', cursor: 'pointer', outline: 'none' }}
                  >
                    <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', color: treesSelections[activeSubTab] ? '#000000' : 'rgba(0,0,0,0.4)' }}>
                      {treesSelections[activeSubTab] || '1 - 10'}
                    </span>
                    <ChevronDown style={{ width: '16px', height: '16px', color: '#000' }} />
                  </button>
                  
                  {isTreesDropdownOpen && (
                    <div style={{ position: 'absolute', top: '56px', left: 0, right: 0, background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', zIndex: 10 }}>
                      {['1 - 10', '11 - 50', '51 - 100', '100+'].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setTreesSelections(prev => ({ ...prev, [activeSubTab]: opt }));
                            setIsTreesDropdownOpen(false);
                          }}
                          style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1C1E', cursor: 'pointer', transition: 'background 0.2s', background: treesSelections[activeSubTab] === opt ? '#E5F1F9' : 'transparent' }}
                          onMouseEnter={(e) => { if (treesSelections[activeSubTab] !== opt) e.currentTarget.style.background = '#F9FAFB'; }}
                          onMouseLeave={(e) => { if (treesSelections[activeSubTab] !== opt) e.currentTarget.style.background = 'transparent'; }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        /* Upload container box — left:18, top:73, 682×355px */
        <div className="land-boundaries-upload-container" style={activeSubTab === 2 ? { boxShadow: 'none', border: 'none', background: 'transparent' } : {}}>
          {activeSubTab === 2 ? (
            /* Shape of the Land — full-container dropdown */
            <div style={{
              position: 'absolute',
              left: '16px',
              right: '16px',
              top: '24px'
            }}>
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setIsShapeDropdownOpen(!isShapeDropdownOpen)}
                  style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '54px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.4)',
                    borderRadius: '8px',
                    padding: '0 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: selectedShape ? '#000000' : 'rgba(0, 0, 0, 0.4)',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <span>{selectedShape || 'Select shape'}</span>
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7 7L13 1" stroke="#363434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {isShapeDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '56px',
                    left: 0,
                    right: 0,
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}>
                    {['Rectangular', 'Square', 'Triangle', 'Trapezoid', 'Irregular'].map((shape) => (
                      <div
                        key={shape}
                        onClick={() => {
                          setSelectedShape(shape);
                          setIsShapeDropdownOpen(false);
                        }}
                        style={{
                          padding: '12px 16px',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          color: '#1A1C1E',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          background: selectedShape === shape ? '#E5F1F9' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedShape !== shape) e.currentTarget.style.background = '#F5F5F5';
                        }}
                        onMouseLeave={(e) => {
                          if (selectedShape !== shape) e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {shape}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Dashed drag/drop zone — left:12, top:14, 281×327px */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`land-boundaries-dashed-dropzone${isDragOver ? ' dragover' : ''}`}
            >
              <div className="land-boundaries-icon-stack">
                <div className="land-boundaries-icon-bg">
                  <CloudUpload className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="land-boundaries-upload-title">Upload</span>
              <p className="land-boundaries-upload-desc">
                Drag and drop your files here or click to browse your computer.
              </p>
              <button onClick={onChooseFileClick} className="land-boundaries-btn-choose">
                Choose File
              </button>
              <div className="land-boundaries-format-row">
                <span className="land-boundaries-format-lbl">Format: </span>
                <span className="land-boundaries-format-val">JPG, PNG</span>
              </div>
              <div className="land-boundaries-format-row" style={{ top: '297px', left: 'auto', right: '15px', width: '94px' }}>
                <span className="land-boundaries-format-lbl">Max File Size: </span>
                <span className="land-boundaries-format-val">10MB</span>
              </div>
            </div>
          )}

          {/* Uploaded Files section — right of dropzone, hidden on Shape tab */}
          {activeSubTab !== 2 && (
            <div className="land-boundaries-uploaded-section">
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '25px',
                color: '#000000',
                display: 'block',
                marginBottom: '8px'
              }}>
                Uploaded Files
              </span>

              {activeSubTab === 0 ? (
                <>
                  <span className="land-boundaries-uploaded-header">Cover image</span>
                  <div className="land-boundaries-uploaded-list" style={{ marginBottom: '12px' }}>
                    {currentUploaded.filter(f => f.name.startsWith('[Cover Image]')).length === 0 ? (
                      <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontFamily: 'Inter, sans-serif' }}>No cover image uploaded</span>
                    ) : (
                      currentUploaded.filter(f => f.name.startsWith('[Cover Image]')).map((file) => (
                        <div key={file.id} className="land-boundaries-file-card cover-theme">
                          <div className="land-boundaries-file-info">
                            <div className="cover-icon-bg">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="land-boundaries-file-meta">
                              <span className="land-boundaries-file-name">
                                {file.name.replace(/^\[Cover Image\]\s*/, '')}
                              </span>
                              <span className="land-boundaries-file-size">{file.size}</span>
                            </div>
                          </div>
                          <button onClick={() => onDeleteFile(file.id)} className="cover-delete-bg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <span className="land-boundaries-uploaded-header">Uploaded images</span>
                  <div className="land-boundaries-uploaded-list">
                    {currentUploaded.filter(f => !f.name.startsWith('[Cover Image]')).length === 0 ? (
                      <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontFamily: 'Inter, sans-serif' }}>No land images uploaded</span>
                    ) : (
                      currentUploaded.filter(f => !f.name.startsWith('[Cover Image]')).map((file) => (
                        <div key={file.id} className="land-boundaries-file-card">
                          <div className="land-boundaries-file-info">
                            {file.url ? (
                              <img src={file.url} alt={file.name} className="land-boundaries-file-preview" />
                            ) : (
                              <div className="land-boundaries-file-fallback">
                                <FileText className="w-5 h-5" />
                              </div>
                            )}
                            <div className="land-boundaries-file-meta">
                              <span className="land-boundaries-file-name">
                                {file.name.replace(/^\[Land Image\]\s*/, '')}
                              </span>
                              <span className="land-boundaries-file-size">{file.size}</span>
                            </div>
                          </div>
                          <button onClick={() => onDeleteFile(file.id)} className="land-boundaries-file-delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <>
                  <span className="land-boundaries-uploaded-header">Uploaded files</span>
                  <div className="land-boundaries-uploaded-list">
                    {currentUploaded.length === 0 ? (
                      <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontFamily: 'Inter, sans-serif' }}>No files uploaded</span>
                    ) : (
                      currentUploaded.map((file) => (
                        <div key={file.id} className="land-boundaries-file-card">
                          <div className="land-boundaries-file-info">
                            {file.url ? (
                              <img src={file.url} alt={file.name} className="land-boundaries-file-preview" />
                            ) : (
                              <div className="land-boundaries-file-fallback">
                                <FileText className="w-5 h-5" />
                              </div>
                            )}
                            <div className="land-boundaries-file-meta">
                              <span className="land-boundaries-file-name">{file.name}</span>
                              <span className="land-boundaries-file-size">{file.size}</span>
                            </div>
                          </div>
                          <button onClick={() => onDeleteFile(file.id)} className="land-boundaries-file-delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Comments textarea box — left:716, top:73, 618×181px */}
      {activeSubTab !== 6 && (
        <div style={{
          position: 'absolute',
          width: '618px',
          height: '181px',
          left: '716px',
          top: '73px'
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'absolute',
            inset: 0,
            background: 'rgba(187, 219, 240, 0.38)',
            border: '1px solid #96C9ED',
            borderRadius: '18px'
          }} />
          <textarea
            value={currentComment}
            onChange={(e) =>
              setComments((prev) => ({
                ...prev,
                [activeSubTab]: e.target.value
              }))
            }
            placeholder="Write a comment"
            style={{
              position: 'absolute',
              width: '566px',
              height: '84px',
              left: '26px',
              top: '24px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '17px',
              color: 'rgba(0, 0, 0, 0.8)',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              left: '572px',
              top: '135px',
              background: '#2680C4',
              borderRadius: '90px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
          </button>
        </div>
      )}

      {/* Back + Next buttons — right:25, bottom:26, 254×38px */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
        width: '254px',
        height: '38px',
        right: '25px',
        bottom: '26px'
      }}>
        <button
          onClick={onBack}
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            gap: '10px',
            width: '121px',
            height: '38px',
            border: '1px solid rgba(0, 0, 0, 0.27)',
            borderRadius: '33px',
            background: 'transparent',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '18px',
            color: 'rgba(0, 0, 0, 0.8)'
          }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            gap: '10px',
            width: '121px',
            height: '38px',
            background: '#2780C4',
            borderRadius: '33px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '18px',
            color: '#FFFFFF'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
