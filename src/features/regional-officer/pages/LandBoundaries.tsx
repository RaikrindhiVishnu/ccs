import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Upload as CloudUpload } from 'lucide-react';
import { farmlandsData } from '../data/farmlandsListData';
import { useViewportScale } from '@/hooks/useViewportScale';
import {
  LandBoundariesStepper,
  LandBoundariesTabSelector,
  LandBoundariesCard
} from './land-boundaries';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  url?: string;
}

const LandBoundaries: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1084);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic matching based on URL param
  const selectedFarmland = farmlandsData.find(
    (item) => item.id === id ||
      item.title.replace(/\s+/g, '-').toLowerCase() === id?.toLowerCase() ||
      item.title.replace(/\s+/g, '').toLowerCase() === id?.replace(/\s+/g, '').replace(/-/g, '').toLowerCase()
  ) || farmlandsData[0];

  const targetId = id || selectedFarmland.id.replace(/\s+/g, '-').toLowerCase();

  // Stepper Sub-tabs list
  const subTabs = [
    'Land Images',
    'Landscape View of Farmlands',
    'Shape of the Land',
    'Water and Electricity Facility',
    'Any Existing Trees',
    'Master Plan',
    'Survey Report',
    'East Boundaries',
    'West Boundaries',
    'North Boundaries',
    'South Boundaries'
  ];

  const [activeSubTab, setActiveSubTab] = useState(0);
  const [comments, setComments] = useState<Record<number, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, UploadedFile[]>>({});
  const [isDragOver, setIsDragOver] = useState(false);
  const [completedSubTabs, setCompletedSubTabs] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [isShapeDropdownOpen, setIsShapeDropdownOpen] = useState(false);
  
  // States for Water and Electricity Facility
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');
  const [selectedWaterFacility, setSelectedWaterFacility] = useState<string>('');
  const [selectedElectricityFacility, setSelectedElectricityFacility] = useState<string>('');

  // States for Any Existing Trees
  const [treeAvailability, setTreeAvailability] = useState<string>('');
  const [treeCount, setTreeCount] = useState<string>('');
  const [isTreeCountDropdownOpen, setIsTreeCountDropdownOpen] = useState(false);

  // States for Survey Report
  const [surveyReportType, setSurveyReportType] = useState<string>('');

  React.useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Navigation handlers
  const handleBackToDashboard = () => {
    navigate('/regional-officer/assigned-farmlands');
  };

  const [showSubmittedModal, setShowSubmittedModal] = useState(false);

  const handleNext = () => {
    if (!completedSubTabs.includes(activeSubTab)) {
      setCompletedSubTabs((prev) => [...prev, activeSubTab]);
    }
    setToastMessage(`${subTabs[activeSubTab]} has been saved`);

    if (activeSubTab < subTabs.length - 1) {
      setActiveSubTab(activeSubTab + 1);
    } else {
      // Completed last sub-tab, show Submitted popup modal
      setShowSubmittedModal(true);
    }
  };

  const handleBack = () => {
    if (activeSubTab > 0) {
      setActiveSubTab(activeSubTab - 1);
    } else {
      // Go back to step 1 customer details
      navigate(`/regional-officer/assigned-farmlands-upload/${targetId}`);
    }
  };

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'cover' | 'land' | 'private-survey' | 'government-survey'>('land');
  const [isBoundaryDropdownOpen, setIsBoundaryDropdownOpen] = useState(false);
  const [boundarySelections, setBoundarySelections] = useState<Record<number, string>>({});
  const [roadTypeSelections, setRoadTypeSelections] = useState<Record<number, string>>({});
  const [isTreesDropdownOpen, setIsTreesDropdownOpen] = useState(false);
  const [treesSelections, setTreesSelections] = useState<Record<number, string>>({});

  // Uploader Actions
  const handleChooseFileClick = () => {
    if (activeSubTab === 0) {
      setShowUploadModal(true);
    } else {
      setUploadType('land');
      if (fileInputRef.current) {
        fileInputRef.current.setAttribute('data-upload-type', 'land');
      }
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const targetType = (e.target.getAttribute('data-upload-type') as any) || uploadType;
      addFiles(Array.from(e.target.files), targetType);
    }
  };

  const addFiles = (files: File[], type: 'cover' | 'land' | 'private-survey' | 'government-survey') => {
    const newFiles: UploadedFile[] = files.map((file) => {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const isImg = file.type.startsWith('image/');
      let displayName = file.name;
      if (type === 'cover') displayName = `[Cover Image] ${file.name}`;
      else if (type === 'private-survey') displayName = `[Private Survey] ${file.name}`;
      else if (type === 'government-survey') displayName = `[Government Survey] ${file.name}`;
      else displayName = `[Land Image] ${file.name}`;
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: displayName,
        size: `${sizeMb} MB`,
        type: file.type,
        progress: 100,
        url: isImg ? URL.createObjectURL(file) : undefined
      };
    });

    setUploadedFiles((prev) => ({
      ...prev,
      [activeSubTab]: [...(prev[activeSubTab] || []), ...newFiles]
    }));
    setShowUploadModal(false);
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [activeSubTab]: (prev[activeSubTab] || []).filter((f) => f.id !== fileId)
    }));
  };

  return (
    <div className={`owner-details-responsive-outer-container${showSubmittedModal ? ' submit-form-no-scroll' : ''}`}>
      <div
        className="owner-details-page-wrapper"
        style={{
          transform: `scale(${scale})`,
          marginBottom: `${(scale - 1) * 1084}px`,
          marginRight: `${(scale - 1) * 1440}px`,
          background: '#F9F9F9',
          height: (activeSubTab === 6 && surveyReportType) ? (surveyReportType === 'Both Survey Reports' ? '1850px' : '1400px') : '1080px'
        }}
      >
        {/* Go back pill */}
        <button
          onClick={handleBackToDashboard}
          className="submit-form-back-pill"
        >
          <ArrowLeft className="w-6 h-6 text-[#353535] shrink-0" strokeWidth={1.5} />
          <span className="submit-form-back-text">Go Back to Dashboard</span>
        </button>

        {/* Header Right */}
        <div className="submit-form-header-right">
          <button className="submit-form-bell-btn">
            <div className="relative">
              <Bell className="w-6 h-6 text-[#2C2C2C]" strokeWidth={1.8} />
              <span className="absolute top-0 right-0 w-[5px] h-[5px] bg-[#EF4646] rounded-full"></span>
            </div>
          </button>

          <div className="submit-form-avatar-box">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
              alt="User profile avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* LEFT CARD: Timeline Stepper */}
        <LandBoundariesStepper farmlandTitle={selectedFarmland.title} targetId={targetId} />

        {/* RIGHT CARD: Sub-tab selectors grid */}
        <LandBoundariesTabSelector
          subTabs={subTabs}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
          completedSubTabs={completedSubTabs}
        />

        {/* Global hidden file input for all upload buttons */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          style={{ display: 'none' }}
        />

        {/* BOTTOM BIG CONTAINER CARD */}
        <LandBoundariesCard
          activeSubTab={activeSubTab}
          comments={comments}
          setComments={setComments}
          uploadedFiles={uploadedFiles}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
          isShapeDropdownOpen={isShapeDropdownOpen}
          setIsShapeDropdownOpen={setIsShapeDropdownOpen}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          selectedWaterFacility={selectedWaterFacility}
          setSelectedWaterFacility={setSelectedWaterFacility}
          selectedElectricityFacility={selectedElectricityFacility}
          setSelectedElectricityFacility={setSelectedElectricityFacility}
          treeAvailability={treeAvailability}
          setTreeAvailability={setTreeAvailability}
          treeCount={treeCount}
          setTreeCount={setTreeCount}
          isTreeCountDropdownOpen={isTreeCountDropdownOpen}
          setIsTreeCountDropdownOpen={setIsTreeCountDropdownOpen}
          surveyReportType={surveyReportType}
          setSurveyReportType={setSurveyReportType}
          isBoundaryDropdownOpen={isBoundaryDropdownOpen}
          setIsBoundaryDropdownOpen={setIsBoundaryDropdownOpen}
          boundarySelections={boundarySelections}
          setBoundarySelections={setBoundarySelections}
          roadTypeSelections={roadTypeSelections}
          setRoadTypeSelections={setRoadTypeSelections}
          isTreesDropdownOpen={isTreesDropdownOpen}
          setIsTreesDropdownOpen={setIsTreesDropdownOpen}
          treesSelections={treesSelections}
          setTreesSelections={setTreesSelections}
          
          onChooseFileClick={handleChooseFileClick}
          onDeleteFile={handleDeleteFile}
          onAddFiles={addFiles}
          onBack={handleBack}
          onNext={handleNext}
          fileInputRef={fileInputRef}
        />
      </div>

      {/* Choose Upload Image Modal */}
      {showUploadModal && (
        <div className="upload-modal-backdrop" onClick={() => setShowUploadModal(false)}>
          <div className="upload-modal-frame" onClick={(e) => e.stopPropagation()}>
            <h3 className="upload-modal-title">Choose upload Image</h3>

            {/* Cover Image Option */}
            <div className="upload-modal-card cover-image">
              <span className="upload-modal-card-title">Cover Image</span>

              <div className="upload-modal-icon-stack">
                <div className="upload-modal-icon-bg" />
                <div className="upload-modal-icon-shadow" />
                <div className="upload-modal-icon">
                  <CloudUpload className="w-5 h-5 text-white" />
                </div>
              </div>

              <button
                onClick={() => {
                  setUploadType('cover');
                  if (fileInputRef.current) {
                    fileInputRef.current.setAttribute('data-upload-type', 'cover');
                  }
                  fileInputRef.current?.click();
                }}
                className="upload-modal-btn"
              >
                <span className="upload-modal-btn-text">Upload</span>
              </button>
            </div>

            {/* Land Images Option */}
            <div className="upload-modal-card land-images">
              <span className="upload-modal-card-title">Land Images</span>

              <div className="upload-modal-icon-stack">
                <div className="upload-modal-icon-bg" />
                <div className="upload-modal-icon-shadow" />
                <div className="upload-modal-icon">
                  <CloudUpload className="w-5 h-5 text-white" />
                </div>
              </div>

              <button
                onClick={() => {
                  setUploadType('land');
                  if (fileInputRef.current) {
                    fileInputRef.current.setAttribute('data-upload-type', 'land');
                  }
                  fileInputRef.current?.click();
                }}
                className="upload-modal-btn"
              >
                <span className="upload-modal-btn-text">Upload</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {toastMessage && (
        <div style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          background: '#FFFFFF',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1000,
          border: '1px solid rgba(0, 0, 0, 0.05)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: '#2780C4',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: '12px'
          }}>
            ✓
          </div>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#1A1C1E'
          }}>
            {toastMessage}
          </span>
          <button
            onClick={() => setToastMessage(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#8A9099',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '0 4px',
              marginLeft: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Submitted popup modal */}
      {showSubmittedModal && (
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'relative',
            width: '610px',
            height: '477px',
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0px 0px 12.5px rgba(0, 0, 0, 0.15)',
            borderRadius: '24px',
            transform: `scale(${scale})`,
            transformOrigin: 'center'
          }}>
            {/* Title */}
            <span style={{
              position: 'absolute',
              width: '370px',
              height: '30px',
              left: 'calc(50% - 370px/2)',
              top: '32px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000'
            }}>
              Land and Boundaries Submitted
            </span>

            {/* Verification Icon Container */}
            <div style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              left: 'calc(50% - 180px/2)',
              top: '85px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* Outer seal (light blue tint) */}
              <svg width="180" height="180" viewBox="0 0 24 24" fill="rgba(39, 128, 196, 0.08)" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: 0, top: 0 }}>
                <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.51l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12z"/>
              </svg>

              {/* Inner seal (solid blue with white check) */}
              <div style={{
                position: 'absolute',
                width: '126px',
                height: '126px',
                left: '27px',
                top: '27px'
              }}>
                <svg width="126" height="126" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.51l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12z" fill="#2780C4"/>
                  <path d="M10.09 16.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" fill="#FFFFFF"/>
                </svg>
              </div>
            </div>

            {/* Subtitle */}
            <span style={{
              position: 'absolute',
              width: '367px',
              height: '50px',
              left: 'calc(50% - 367px/2 + 0.5px)',
              top: '282px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#3D4949'
            }}>
              Proceed With Valuation to Complete the Farmland Submission
            </span>

            {/* Start Valuation Button */}
            <button 
              onClick={() => {
                setShowSubmittedModal(false);
                navigate(`/regional-officer/assigned-farmlands-valuation/${targetId}`);
              }}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '17px',
                gap: '17px',
                position: 'absolute',
                width: '349px',
                height: '64px',
                left: 'calc(50% - 349px/2 + 0.5px)',
                top: '373px',
                background: '#2780C4',
                borderRadius: '56.1383px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '23.8163px',
                lineHeight: '30px',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                color: '#FFFFFF'
              }}>
                Start Valuation
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandBoundaries;
