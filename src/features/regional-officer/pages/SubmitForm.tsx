import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { farmlandsData } from '../data/farmlandsListData';
import { useViewportScale } from '@/hooks/useViewportScale';
import {
  AgricultureStepper,
  AgricultureTabSelector,
  AgricultureCard
} from './agriculture';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  url?: string;
}

const SubmitForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1084);

  // Dynamic matching based on URL param
  const selectedFarmland = farmlandsData.find(
    (item) => item.id === id ||
      item.title.replace(/\s+/g, '-').toLowerCase() === id?.toLowerCase() ||
      item.title.replace(/\s+/g, '').toLowerCase() === id?.replace(/\s+/g, '').replace(/-/g, '').toLowerCase()
  ) || farmlandsData[0];

  const targetId = id || selectedFarmland.id.replace(/\s+/g, '-').toLowerCase();

  // Sub-tabs configuration
  const tags = [
    'Local Agricluture Officer Report',
    'Last 5 years Crop Yielding Report',
    'Soil',
    'Type Of Crop',
    'Ground Water Level',
    'Types of Crop can be grown',
    'Current Yield Cost',
    'Current Cultivation',
    'Future Crops',
    'Maintenance',
    'Natural Advantages and Disadvantages'
  ];

  // Component States
  const [activeSubTab, setActiveSubTab] = useState<number>(0);
  const [completedSubTabs, setCompletedSubTabs] = useState<number[]>([]);
  const [comments, setComments] = useState<Record<number, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, UploadedFile[]>>({});
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSubmittedModal, setShowSubmittedModal] = useState<boolean>(false);

  // Custom Form fields states
  const [soilType, setSoilType] = useState<string>('');
  const [cropType, setCropType] = useState<string>('Rice');
  const [groundWater, setGroundWater] = useState<string>('100 feets');
  const [cropsGrown, setCropsGrown] = useState<string[]>(['Rice', 'Corn']);
  const [yieldCost, setYieldCost] = useState<string>('100000');
  const [yieldReturns, setYieldReturns] = useState<string>('125000');
  const [currentCultivation, setCurrentCultivation] = useState<string>('Lease');
  const [cultivatorName, setCultivatorName] = useState<string>('Krishna');
  const [cultivatorContact, setCultivatorContact] = useState<string>('+91-9928483732');
  const [futureCrops, setFutureCrops] = useState<string>('');
  const [maintenanceCrops, setMaintenanceCrops] = useState<string[]>(['Rice', 'Corn']);
  const [maintenanceReturns, setMaintenanceReturns] = useState<string>('1,00,000.00');
  const [advantages, setAdvantages] = useState<string>('Better soil');
  const [disadvantages, setDisadvantages] = useState<string>('Road side land');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto hide toast message after 4s
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleBackToDashboard = () => {
    navigate('/regional-officer/assigned-farmlands');
  };

  const handleNext = () => {
    if (!completedSubTabs.includes(activeSubTab)) {
      setCompletedSubTabs((prev) => [...prev, activeSubTab]);
    }

    setToastMessage(`${tags[activeSubTab]} has been saved`);

    if (activeSubTab < tags.length - 1) {
      setActiveSubTab(activeSubTab + 1);
    } else {
      setShowSubmittedModal(true);
    }
  };

  const handleBack = () => {
    if (activeSubTab > 0) {
      setActiveSubTab(activeSubTab - 1);
    } else {
      navigate(`/regional-officer/assigned-farmlands-valuation/${targetId}`);
    }
  };

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.type,
        progress: 100
      }));

      setUploadedFiles((prev) => ({
        ...prev,
        [activeSubTab]: [...(prev[activeSubTab] || []), ...newFiles]
      }));
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.type,
        progress: 100
      }));

      setUploadedFiles((prev) => ({
        ...prev,
        [activeSubTab]: [...(prev[activeSubTab] || []), ...newFiles]
      }));
    }
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [activeSubTab]: (prev[activeSubTab] || []).filter((f) => f.id !== fileId)
    }));
  };

  const currentUploaded = uploadedFiles[activeSubTab] || [];

  return (
    <div className={`owner-details-responsive-outer-container${showSubmittedModal ? ' submit-form-no-scroll' : ''}`}>
      <div 
        className="owner-details-page-wrapper"
        style={{
          transform: `scale(${scale})`,
          marginBottom: `${(scale - 1) * 1084}px`,
          marginRight: `${(scale - 1) * 1440}px`,
          background: '#F9F9F9'
        }}
      >
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          style={{ display: 'none' }}
        />

        {/* Go back to dashboard pill */}
        <button
          onClick={handleBackToDashboard}
          className="submit-form-back-pill"
        >
          <ArrowLeft className="w-6 h-6 text-[#353535] shrink-0" strokeWidth={1.5} />
          <span className="submit-form-back-text">Go Back to Dashboard</span>
        </button>

        {/* Right side: Bell & Avatar info */}
        <div className="submit-form-header-right">
          <button className="submit-form-bell-btn">
            <div className="relative">
              <Bell className="w-6 h-6 text-[#2C2C2C]" strokeWidth={1.8} />
              <span className="absolute top-0 right-0 w-[5px] h-[5px] bg-[#EF4646] rounded-full"></span>
            </div>
          </button>

          <div className="submit-form-avatar-box">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="User profile avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* LEFT CARD: Timeline Stepper */}
        <AgricultureStepper farmlandTitle={selectedFarmland.title} targetId={targetId} />

        {/* RIGHT CARD: verified tags bento */}
        <AgricultureTabSelector
          tags={tags}
          activeSubTab={activeSubTab}
          onSubTabClick={setActiveSubTab}
          completedSubTabs={completedSubTabs}
        />

        {/* BOTTOM CARD: Upload file list, comments and back/next actions */}
        <AgricultureCard
          activeSubTab={activeSubTab}
          comments={comments}
          onCommentChange={(value) =>
            setComments((prev) => ({
              ...prev,
              [activeSubTab]: value
            }))
          }
          currentUploaded={currentUploaded}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          onChooseFileClick={handleChooseFileClick}
          onDeleteFile={handleDeleteFile}
          onFileDrop={handleFileDrop}
          
          soilType={soilType}
          setSoilType={setSoilType}
          cropType={cropType}
          setCropType={setCropType}
          groundWater={groundWater}
          setGroundWater={setGroundWater}
          cropsGrown={cropsGrown}
          setCropsGrown={setCropsGrown}
          yieldCost={yieldCost}
          setYieldCost={setYieldCost}
          yieldReturns={yieldReturns}
          setYieldReturns={setYieldReturns}
          currentCultivation={currentCultivation}
          setCurrentCultivation={setCurrentCultivation}
          cultivatorName={cultivatorName}
          setCultivatorName={setCultivatorName}
          cultivatorContact={cultivatorContact}
          setCultivatorContact={setCultivatorContact}
          futureCrops={futureCrops}
          setFutureCrops={setFutureCrops}
          maintenanceCrops={maintenanceCrops}
          setMaintenanceCrops={setMaintenanceCrops}
          maintenanceReturns={maintenanceReturns}
          setMaintenanceReturns={setMaintenanceReturns}
          advantages={advantages}
          setAdvantages={setAdvantages}
          disadvantages={disadvantages}
          setDisadvantages={setDisadvantages}

          onBack={handleBack}
          onNext={handleNext}
        />
      </div>

      {/* Save Toast message alert */}
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

      {/* Submitted Confirmation Modal */}
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
            borderRadius: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}>
            {/* Title */}
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '30px',
              textAlign: 'center',
              color: '#000000',
              marginBottom: '32px'
            }}>
              Farmland Submitted
            </span>

            {/* Shield badge checkmark icon */}
            <div style={{ marginBottom: '40px' }}>
              <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="54" cy="54" r="54" fill="#E8F3FD" />
                <path d="M54 22L57.3 32.2L67.8 30L67.8 40.8L77.7 41.8L74.2 52L81.7 59.8L71.8 63.8L75.3 74L65.4 72L62.1 82.2L54 80L45.9 82.2L42.6 72L32.7 74L36.2 63.8L26.3 59.8L33.8 52L30.3 41.8L40.2 40.8L40.2 30L50.7 32.2L54 22Z" fill="#1C75BC" stroke="#E8F3FD" strokeWidth="4" strokeLinejoin="round"/>
                <path d="M42.5 54.5L50.5 62.5L67.5 45.5" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Instruction description */}
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.8)',
              margin: '0 0 32px 0',
              maxWidth: '360px'
            }}>
              Farmland ID: <span style={{ color: '#1C75BC', fontWeight: 700 }}>{targetId ? targetId.toUpperCase().replace('-', ' ') : 'GLCSOS 01'}</span> has been<br />successfully submitted
            </p>

            {/* Action return button */}
            <button
              onClick={() => {
                setShowSubmittedModal(false);
                navigate('/regional-officer/assigned-farmlands');
              }}
              style={{
                width: '320px',
                height: '48px',
                background: '#2780C4',
                borderRadius: '33px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '20px',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 4px 10px rgba(39, 128, 196, 0.2)'
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitForm;
