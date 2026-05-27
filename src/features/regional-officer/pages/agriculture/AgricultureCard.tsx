import React, { useState } from 'react';
import { Upload as CloudUpload, Mic, Trash2, FileText, ChevronDown, Search } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  url?: string;
}

interface AgricultureCardProps {
  activeSubTab: number;
  comments: Record<number, string>;
  onCommentChange: (val: string) => void;
  currentUploaded: UploadedFile[];
  isDragOver: boolean;
  setIsDragOver: (val: boolean) => void;
  onChooseFileClick: () => void;
  onDeleteFile: (fileId: string) => void;
  onFileDrop: (e: React.DragEvent) => void;

  // Custom form values and setters
  soilType: string;
  setSoilType: (val: string) => void;
  cropType: string;
  setCropType: (val: string) => void;
  groundWater: string;
  setGroundWater: (val: string) => void;
  cropsGrown: string[];
  setCropsGrown: (val: string[]) => void;
  yieldCost: string;
  setYieldCost: (val: string) => void;
  yieldReturns: string;
  setYieldReturns: (val: string) => void;
  currentCultivation: string;
  setCurrentCultivation: (val: string) => void;
  cultivatorName: string;
  setCultivatorName: (val: string) => void;
  cultivatorContact: string;
  setCultivatorContact: (val: string) => void;
  futureCrops: string;
  setFutureCrops: (val: string) => void;

  maintenanceCrops: string[];
  setMaintenanceCrops: (val: string[]) => void;
  maintenanceReturns: string;
  setMaintenanceReturns: (val: string) => void;

  advantages: string;
  setAdvantages: (val: string) => void;
  disadvantages: string;
  setDisadvantages: (val: string) => void;

  onBack: () => void;
  onNext: () => void;
}

export const AgricultureCard: React.FC<AgricultureCardProps> = ({
  activeSubTab,
  comments,
  onCommentChange,
  currentUploaded,
  isDragOver,
  setIsDragOver,
  onChooseFileClick,
  onDeleteFile,
  onFileDrop,

  soilType,
  setSoilType,
  cropType,
  setCropType,
  groundWater,
  setGroundWater,
  cropsGrown,
  setCropsGrown,
  yieldCost,
  setYieldCost,
  yieldReturns,
  setYieldReturns,
  currentCultivation,
  setCurrentCultivation,
  cultivatorName,
  setCultivatorName,
  cultivatorContact,
  setCultivatorContact,
  futureCrops,
  setFutureCrops,
  maintenanceCrops,
  setMaintenanceCrops,
  maintenanceReturns,
  setMaintenanceReturns,
  advantages,
  setAdvantages,
  disadvantages,
  setDisadvantages,

  onBack,
  onNext
}) => {
  const currentComment = comments[activeSubTab] || '';
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dropdown options
  const soilOptions = ['Alluvial Soil', 'Red Soil', 'Black Soil', 'Laterite Soil', 'Desert Soil', 'Peaty/Marshy Soil'];
  const cropTypeOptions = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Ragi', 'Bajra', 'Barley'];
  const waterOptions = ['50 feets', '100 feets', '150 feets', '200 feets', '250 feets', '300 feets', '350+ feets'];

  // Custom multi-select crop items
  const cropItems = [
    { id: 'rice-1', name: 'Rice', col: 1 },
    { id: 'corn-1', name: 'Corn', col: 1 },
    { id: 'cotton-1', name: 'Cotton', col: 1 },
    { id: 'wheat-1', name: 'Wheat', col: 1 },
    { id: 'wheat-2', name: 'Wheat', col: 1 },
    { id: 'sunflower-1', name: 'Sun Flower', col: 2 },
    { id: 'sugarcane-1', name: 'Sugar Cane', col: 2 },
    { id: 'sunflower-2', name: 'Sun Flower', col: 2 },
    { id: 'sugarcane-2', name: 'Sugar Cane', col: 2 },
    { id: 'sugarcane-3', name: 'Sugar Cane', col: 2 },
    { id: 'sunflower-3', name: 'Sun Flower', col: 3 },
    { id: 'sugarcane-4', name: 'Sugar Cane', col: 3 },
    { id: 'sunflower-4', name: 'Sun Flower', col: 3 },
    { id: 'sugarcane-5', name: 'Sugar Cane', col: 3 },
    { id: 'sugarcane-6', name: 'Sugar Cane', col: 3 }
  ];

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
    onFileDrop(e);
  };

  const toggleCropSelection = (cropName: string) => {
    if (activeSubTab === 5) {
      if (cropsGrown.includes(cropName)) {
        setCropsGrown(cropsGrown.filter((c) => c !== cropName));
      } else {
        setCropsGrown([...cropsGrown, cropName]);
      }
    } else if (activeSubTab === 9) {
      if (maintenanceCrops.includes(cropName)) {
        setMaintenanceCrops(maintenanceCrops.filter((c) => c !== cropName));
      } else {
        setMaintenanceCrops([...maintenanceCrops, cropName]);
      }
    }
  };

  const filteredCrops = cropItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFutureCropsTab = activeSubTab === 8;
  const isAdvantagesTab = activeSubTab === 10;
  const showCommentsSection = !isFutureCropsTab && !isAdvantagesTab;

  return (
    <div className="land-boundaries-bottom-card" style={{ height: '443px', background: '#FFFFFF', borderRadius: '24px', position: 'absolute', top: '581px', left: '40px', right: '40px' }}>

      {/* ================= LEFT SIDE COLUMN: CUSTOM INPUTS BY TAB ================= */}
      <div style={{
        position: 'absolute',
        left: '30px',
        top: '30px',
        width: isFutureCropsTab ? '410px' : '640px',
        height: '383px',
        boxSizing: 'border-box'
      }}>
        {/* Tab 0 and 1: Upload File Layout */}
        {(activeSubTab === 0 || activeSubTab === 1) && (
          <>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '30px',
              color: '#000000',
              display: 'block',
              marginBottom: '13px'
            }}>
              Upload File
            </span>

            <div style={{
              boxSizing: 'border-box',
              width: '100%',
              height: '327px',
              background: '#FFFFFF',
              border: '1px solid #E2E2E6',
              borderRadius: '24px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'row',
              gap: '20px'
            }}>
              {/* Left Side: Drag & Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  flex: 1,
                  height: '100%',
                  background: isDragOver ? 'rgba(39, 128, 196, 0.08)' : 'rgba(242, 244, 246, 0.5)',
                  border: isDragOver ? '2px dashed #2780C4' : '2px dashed rgba(225, 229, 239, 0.8)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                {/* Cloud Icon */}
                <div style={{ position: 'relative', width: '48px', height: '48px', marginBottom: '10px' }}>
                  <div style={{ position: 'absolute', width: '48px', height: '48px', left: 0, top: 0, background: 'rgba(0, 112, 235, 0.1)', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', width: '38px', height: '38px', left: '5px', top: '5px', background: 'linear-gradient(135deg, rgba(0, 88, 188, 0.84) 0%, rgba(0, 112, 235, 0.84) 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CloudUpload className="w-5 h-5 text-white" />
                  </div>
                </div>

                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: '#1A1C1D', marginBottom: '6px' }}>Upload</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '11px', lineHeight: '14px', color: '#414755', maxWidth: '190px', marginBottom: '12px' }}>Drag and drop your files here or click to browse your computer.</span>

                <button
                  type="button"
                  onClick={onChooseFileClick}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '6px 20px',
                    background: 'linear-gradient(135deg, #0095FF 0%, #1F8AFF 100%)',
                    borderRadius: '9999px',
                    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '12px',
                    color: '#FFFFFF'
                  }}
                >
                  Choose File
                </button>

                <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '4px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: '#777' }}>Format:</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '9px', color: '#000000' }}>PDF</span>
                </div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', display: 'flex', gap: '2px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: '#777' }}>Max File Size:</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '9px', color: '#000000' }}>10MB</span>
                </div>
              </div>

              {/* Right Side: Uploaded List */}
              <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: '18px', color: '#000000', marginBottom: '12px' }}>Uploaded Files</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
                  {currentUploaded.length === 0 ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9AA3AD', border: '1px dashed #E2E2E6', borderRadius: '8px' }}>
                      No files uploaded yet.
                    </div>
                  ) : (
                    currentUploaded.map((file) => (
                      <div key={file.id} className="land-boundaries-file-card" style={{ boxSizing: 'border-box' }}>
                        <div className="land-boundaries-file-info">
                          <div className="land-boundaries-file-fallback" style={{ background: '#E5F1F9' }}>
                            <FileText className="w-5 h-5 text-[#2780C4]" />
                          </div>
                          <div className="land-boundaries-file-meta">
                            <span className="land-boundaries-file-name" title={file.name}>{file.name}</span>
                            <span className="land-boundaries-file-size">{file.size}</span>
                          </div>
                        </div>
                        <button onClick={() => onDeleteFile(file.id)} className="land-boundaries-file-delete" type="button">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tab 2: Soil (Soil Type select dropdown) */}
        {activeSubTab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
              Soil Type
            </span>
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
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
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: soilType ? '#000000' : 'rgba(0, 0, 0, 0.4)' }}>
                  {soilType || 'Select Soil Type'}
                </span>
                <ChevronDown className="w-5 h-5 text-[#363434]" />
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '58px',
                  left: 0,
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 100,
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {soilOptions.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setSoilType(opt);
                        setDropdownOpen(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#1A1C1E',
                        cursor: 'pointer',
                        background: soilType === opt ? '#E5F1F9' : 'transparent'
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Type of Crop select dropdown */}
        {activeSubTab === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
              Types of Crops available present?
            </span>
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
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
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: cropType ? '#000000' : 'rgba(0, 0, 0, 0.4)' }}>
                  {cropType || 'Select Crop'}
                </span>
                <ChevronDown className="w-5 h-5 text-[#363434]" />
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '58px',
                  left: 0,
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 100,
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {cropTypeOptions.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setCropType(opt);
                        setDropdownOpen(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#1A1C1E',
                        cursor: 'pointer',
                        background: cropType === opt ? '#E5F1F9' : 'transparent'
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Ground Water Level select dropdown */}
        {activeSubTab === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
              Depth of Ground Water Level
            </span>
            <div style={{ position: 'relative', width: '100%' }}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
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
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: groundWater ? '#000000' : 'rgba(0, 0, 0, 0.4)' }}>
                  {groundWater || 'Select Depth'}
                </span>
                <ChevronDown className="w-5 h-5 text-[#363434]" />
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '58px',
                  left: 0,
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 100,
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {waterOptions.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setGroundWater(opt);
                        setDropdownOpen(false);
                      }}
                      style={{
                        padding: '12px 16px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: '#1A1C1E',
                        cursor: 'pointer',
                        background: groundWater === opt ? '#E5F1F9' : 'transparent'
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Types of Crop can be grown (Custom Multiselect Search Dropdown Overlay) */}
        {activeSubTab === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '30px',
              color: '#000000'
            }}>
              Types of Crop can br Grown in Future
            </span>

            {/* Input closed pill box */}
            <div style={{ position: 'relative', width: '640px' }}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  padding: '0 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {cropsGrown.length === 0 ? (
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(0, 0, 0, 0.4)' }}>
                    Select types
                  </span>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', flexWrap: 'wrap' }}>
                    {cropsGrown.map((crop) => (
                      <div key={crop} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          background: '#3D93D1',
                          border: '1.5px solid #F1F1FF',
                          borderRadius: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                            <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 500,
                          fontSize: '14px',
                          color: '#138FFF'
                        }}>
                          {crop}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <ChevronDown className="w-5 h-5 text-[#363434] shrink-0" />
              </button>

              {/* Multiselect Open Overlay Box */}
              {dropdownOpen && (
                <div style={{
                  boxSizing: 'border-box',
                  position: 'absolute',
                  width: '640px',
                  height: '286px',
                  left: 0,
                  top: '63px',
                  background: '#FFFFFF',
                  border: '1px solid #999999',
                  borderRadius: '8px',
                  zIndex: 100,
                  padding: '13px 16px'
                }}>
                  {/* Search box inside overlay */}
                  <div style={{
                    boxSizing: 'border-box',
                    position: 'relative',
                    width: '610px',
                    height: '44px',
                    background: '#FFFFFF',
                    border: '1px solid #C5C1C1',
                    borderRadius: '79px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    marginBottom: '16px'
                  }}>
                    <Search className="w-5 h-5 text-[rgba(0,0,0,0.6)] shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        marginLeft: '10px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        color: '#000000'
                      }}
                    />
                  </div>

                  {/* 3-Column Items Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    rowGap: '20px',
                    columnGap: '10px',
                    height: '180px',
                    overflowY: 'auto',
                    paddingRight: '12px'
                  }}>
                    {/* Column 1 items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {filteredCrops.filter(item => item.col === 1).map((item, index) => {
                        const isChecked = cropsGrown.includes(item.name);
                        return (
                          <div
                            key={`${item.id}-${index}`}
                            onClick={() => toggleCropSelection(item.name)}
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                          >
                            <div style={{
                              boxSizing: 'border-box',
                              width: '18px',
                              height: '18px',
                              background: isChecked ? '#3D93D1' : '#F1F1FF',
                              border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                              borderRadius: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {isChecked && (
                                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                  <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 500,
                              fontSize: '14px',
                              color: '#138FFF'
                            }}>
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Column 2 items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {filteredCrops.filter(item => item.col === 2).map((item, index) => {
                        const isChecked = cropsGrown.includes(item.name);
                        return (
                          <div
                            key={`${item.id}-${index}`}
                            onClick={() => toggleCropSelection(item.name)}
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                          >
                            <div style={{
                              boxSizing: 'border-box',
                              width: '18px',
                              height: '18px',
                              background: isChecked ? '#3D93D1' : '#F1F1FF',
                              border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                              borderRadius: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {isChecked && (
                                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                  <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 500,
                              fontSize: '14px',
                              color: '#138FFF'
                            }}>
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Column 3 items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {filteredCrops.filter(item => item.col === 3).map((item, index) => {
                        const isChecked = cropsGrown.includes(item.name);
                        return (
                          <div
                            key={`${item.id}-${index}`}
                            onClick={() => toggleCropSelection(item.name)}
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                          >
                            <div style={{
                              boxSizing: 'border-box',
                              width: '18px',
                              height: '18px',
                              background: isChecked ? '#3D93D1' : '#F1F1FF',
                              border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                              borderRadius: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {isChecked && (
                                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                  <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 500,
                              fontSize: '14px',
                              color: '#138FFF'
                            }}>
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 6: Current Yield Cost (Currency Text Inputs) */}
        {activeSubTab === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                What is the current yielding cost?
              </span>
              <input
                type="text"
                value={yieldCost}
                onChange={(e) => setYieldCost(e.target.value)}
                placeholder="Enter Yield Cost"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  padding: '0 24px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  color: '#000000',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', color: '#000000' }}>
                Current returns from yield?
              </span>
              <input
                type="text"
                value={yieldReturns}
                onChange={(e) => setYieldReturns(e.target.value)}
                placeholder="Enter Returns"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  padding: '0 24px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  color: '#000000',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        )}

        {/* Tab 7: Current Cultivation (Self/Lease Pills & Name & Contact Details Inputs) */}
        {activeSubTab === 7 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
              What is the Current Cultivation Type?
            </span>

            {/* Self / Lease Pills */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                type="button"
                onClick={() => setCurrentCultivation('Self')}
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px 24px',
                  gap: '10px',
                  background: currentCultivation === 'Self' ? '#2780C4' : '#FFFFFF',
                  border: currentCultivation === 'Self' ? 'none' : '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  color: currentCultivation === 'Self' ? '#FFFFFF' : '#000000'
                }}
              >
                <div style={{
                  width: '14px',
                  height: '14px',
                  border: currentCultivation === 'Self' ? 'none' : '1.5px solid #2780C4',
                  background: currentCultivation === 'Self' ? '#FFFFFF' : 'transparent',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {currentCultivation === 'Self' && (
                    <div style={{ width: '6px', height: '6px', background: '#2780C4', borderRadius: '50%' }} />
                  )}
                </div>
                Self
              </button>

              <button
                type="button"
                onClick={() => setCurrentCultivation('Lease')}
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px 24px',
                  gap: '10px',
                  background: currentCultivation === 'Lease' ? '#2780C4' : '#FFFFFF',
                  border: currentCultivation === 'Lease' ? 'none' : '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  color: currentCultivation === 'Lease' ? '#FFFFFF' : '#000000'
                }}
              >
                <div style={{
                  width: '14px',
                  height: '14px',
                  border: currentCultivation === 'Lease' ? 'none' : '1.5px solid #2780C4',
                  background: currentCultivation === 'Lease' ? '#FFFFFF' : 'transparent',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {currentCultivation === 'Lease' && (
                    <div style={{ width: '6px', height: '6px', background: '#2780C4', borderRadius: '50%' }} />
                  )}
                </div>
                Lease
              </button>
            </div>

            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '18px', color: '#000000' }}>
                Name
              </span>
              <input
                type="text"
                value={cultivatorName}
                onChange={(e) => setCultivatorName(e.target.value)}
                placeholder="Enter Name"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  padding: '0 24px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  color: '#000000',
                  outline: 'none'
                }}
              />
            </div>

            {/* Contact Details Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '18px', color: '#000000' }}>
                Contact Details
              </span>
              <input
                type="text"
                value={cultivatorContact}
                onChange={(e) => setCultivatorContact(e.target.value)}
                placeholder="Enter Contact Details"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  padding: '0 24px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  color: '#000000',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        )}

        {/* Tab 8: Future Crops (Left side text area matching comments box styling) */}
        {activeSubTab === 8 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', width: '410px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
              Future crop plans suggested by Green Land Captial
            </span>
            <div style={{
              position: 'relative',
              width: '410px',
              height: '181px'
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
                value={futureCrops}
                onChange={(e) => setFutureCrops(e.target.value)}
                placeholder="Write a comment"
                style={{
                  position: 'absolute',
                  width: '358px',
                  height: '84px',
                  left: '26px',
                  top: '24px',
                  fontFamily: "'Poppins', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: '#000000',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  overflow: 'hidden'
                }}
              />
              <button
                type="button"
                style={{
                  position: 'absolute',
                  width: '32px',
                  height: '32px',
                  left: '364px',
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
          </div>
        )}

        {/* Tab 9: Maintenance (Crops multiselect search dropdown & Returns input) */}
        {activeSubTab === 9 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            {/* Multiselect search dropdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                If Green Land Captial does the maintenace, what will be the suggested crop?
              </span>

              {/* Input closed pill box */}
              <div style={{ position: 'relative', width: '640px' }}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    boxSizing: 'border-box',
                    width: '640px',
                    height: '54px',
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(0, 0, 0, 0.4)',
                    borderRadius: '8px',
                    padding: '0 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {maintenanceCrops.length === 0 ? (
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(0, 0, 0, 0.4)' }}>
                      Select Types
                    </span>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', flexWrap: 'wrap' }}>
                      {maintenanceCrops.map((crop) => (
                        <div key={crop} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '18px',
                            height: '18px',
                            background: '#3D93D1',
                            border: '1.5px solid #F1F1FF',
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                              <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#138FFF'
                          }}>
                            {crop}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <ChevronDown className="w-5 h-5 text-[#363434] shrink-0" />
                </button>

                {/* Multiselect Open Overlay Box */}
                {dropdownOpen && (
                  <div style={{
                    boxSizing: 'border-box',
                    position: 'absolute',
                    width: '640px',
                    height: '286px',
                    left: 0,
                    top: '63px',
                    background: '#FFFFFF',
                    border: '1px solid #999999',
                    borderRadius: '8px',
                    zIndex: 100,
                    padding: '13px 16px'
                  }}>
                    {/* Search box inside overlay */}
                    <div style={{
                      boxSizing: 'border-box',
                      position: 'relative',
                      width: '610px',
                      height: '44px',
                      background: '#FFFFFF',
                      border: '1px solid #C5C1C1',
                      borderRadius: '79px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 16px',
                      marginBottom: '16px'
                    }}>
                      <Search className="w-5 h-5 text-[rgba(0,0,0,0.6)] shrink-0" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        style={{
                          flex: 1,
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          marginLeft: '10px',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '16px',
                          color: '#000000'
                        }}
                      />
                    </div>

                    {/* 3-Column Items Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      rowGap: '20px',
                      columnGap: '10px',
                      height: '180px',
                      overflowY: 'auto',
                      paddingRight: '12px'
                    }}>
                      {/* Column 1 items */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {filteredCrops.filter(item => item.col === 1).map((item, index) => {
                          const isChecked = maintenanceCrops.includes(item.name);
                          return (
                            <div
                              key={`${item.id}-${index}`}
                              onClick={() => toggleCropSelection(item.name)}
                              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                            >
                              <div style={{
                                boxSizing: 'border-box',
                                width: '18px',
                                height: '18px',
                                background: isChecked ? '#3D93D1' : '#F1F1FF',
                                border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                                borderRadius: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                {isChecked && (
                                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                              <span style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 500,
                                fontSize: '14px',
                                color: '#138FFF'
                              }}>
                                {item.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Column 2 items */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {filteredCrops.filter(item => item.col === 2).map((item, index) => {
                          const isChecked = maintenanceCrops.includes(item.name);
                          return (
                            <div
                              key={`${item.id}-${index}`}
                              onClick={() => toggleCropSelection(item.name)}
                              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                            >
                              <div style={{
                                boxSizing: 'border-box',
                                width: '18px',
                                height: '18px',
                                background: isChecked ? '#3D93D1' : '#F1F1FF',
                                border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                                borderRadius: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                {isChecked && (
                                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                              <span style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 500,
                                fontSize: '14px',
                                color: '#138FFF'
                              }}>
                                {item.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Column 3 items */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {filteredCrops.filter(item => item.col === 3).map((item, index) => {
                          const isChecked = maintenanceCrops.includes(item.name);
                          return (
                            <div
                              key={`${item.id}-${index}`}
                              onClick={() => toggleCropSelection(item.name)}
                              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                            >
                              <div style={{
                                boxSizing: 'border-box',
                                width: '18px',
                                height: '18px',
                                background: isChecked ? '#3D93D1' : '#F1F1FF',
                                border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                                borderRadius: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                {isChecked && (
                                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                              <span style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 500,
                                fontSize: '14px',
                                color: '#138FFF'
                              }}>
                                {item.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Returns Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', color: '#000000' }}>
                What will be the best returns?
              </span>
              <input
                type="text"
                value={maintenanceReturns}
                onChange={(e) => setMaintenanceReturns(e.target.value)}
                placeholder="Enter Amount"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  padding: '0 24px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  color: '#000000',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        )}

        {activeSubTab === 10 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '640px', height: '212px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', width: '640px', height: '97px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000', height: '30px' }}>
                What are the Advantages?
              </span>
              <input
                type="text"
                value={advantages}
                onChange={(e) => setAdvantages(e.target.value)}
                placeholder="Enter advantages"
                style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  padding: '0 24px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  color: '#000000',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', width: '640px', height: '97px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000', height: '30px' }}>
                What are the Disadvantages?
              </span>
              <input
                type="text"
                value={disadvantages}
                onChange={(e) => setDisadvantages(e.target.value)}
                placeholder="Enter disadvantages"
                style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  padding: '0 24px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  color: '#000000',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ================= RIGHT SIDE COLUMN: COMMENTS AREA ================= */}
      {showCommentsSection && (
        <>
          <span style={{
            position: 'absolute',
            left: '716px', // Align with Figma spec exactly
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

          <div style={{
            position: 'absolute',
            width: '618px', // Figma spec: 618px width
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
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="Write a comment"
              style={{
                position: 'absolute',
                width: '566px',
                height: '84px',
                left: '26px',
                top: '24px',
                fontFamily: "'Poppins', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '21px',
                color: '#000000',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'none',
                overflow: 'hidden'
              }}
            />
            <button
              type="button"
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
        </>
      )}

      {/* Back and Next Actions */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
        width: '254px',
        height: '38px',
        right: '40px',
        bottom: '30px'
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
          {activeSubTab === 10 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};
