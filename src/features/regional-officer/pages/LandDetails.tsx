import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { farmlandsData } from '../data/farmlandsListData';
import { useViewportScale } from '@/hooks/useViewportScale';
import {
  ValuationStepper,
  ValuationTabSelector,
  ValuationUploadCard
} from './valuation';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  url?: string;
}

const LandDetails: React.FC = () => {
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

  // Valuation Sub-tabs list
  const subTabs = [
    'Village Map or Naksha',
    'Sub - Register Value',
    'Valuator Report',
    'Legal Opinion Report',
    'Road Approach',
    'Recent Transactions',
    'Geological Advantages',
    'Future Plans',
    'Validating Disadvantages',
    'Upcoming Infrastrucutres',
    'Railway Track Connectivity',
    'Airport Connectivity'
  ];

  const [activeSubTab, setActiveSubTab] = useState(0);
  const [comments, setComments] = useState<Record<number, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, UploadedFile[]>>({});
  const [isDragOver, setIsDragOver] = useState(false);
  const [completedSubTabs, setCompletedSubTabs] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [roadType, setRoadType] = useState<string>('Government Road');
  const [roadWidth, setRoadWidth] = useState<string>('100');
  const [txAvailability, setTxAvailability] = useState<string>('Available');
  const [valuationPerAcre, setValuationPerAcre] = useState<string>('10,00,000.00');
  const [localMarketAcrePrice, setLocalMarketAcrePrice] = useState<string>('10,00,000.00');
  const [geoAvailability, setGeoAvailability] = useState<string | null>(null);
  const [upcomingInfra, setUpcomingInfra] = useState<string>('');
  const [railwayAvailability, setRailwayAvailability] = useState<string>('Available');
  const [railwayDistance, setRailwayDistance] = useState<string>('0 - 10 kms');
  const [airportAvailability, setAirportAvailability] = useState<string>('Available');
  const [airportDistance, setAirportDistance] = useState<string>('0 - 10 kms');
  const [showSubmittedModal, setShowSubmittedModal] = useState<boolean>(false);

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

  const handleSubTabClick = (index: number) => {
    setActiveSubTab(index);
  };

  const handleNext = () => {
    if (!completedSubTabs.includes(activeSubTab)) {
      setCompletedSubTabs((prev) => [...prev, activeSubTab]);
    }
    setToastMessage(`${subTabs[activeSubTab]} has been saved`);

    if (activeSubTab < subTabs.length - 1) {
      setActiveSubTab(activeSubTab + 1);
    } else {
      setShowSubmittedModal(true);
    }
  };

  const handleBack = () => {
    if (activeSubTab > 0) {
      setActiveSubTab(activeSubTab - 1);
    } else {
      // Go back to step 2 Land & Boundaries
      navigate(`/regional-officer/assigned-farmlands-land-boundaries/${targetId}`);
    }
  };

  // Uploader Actions
  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: UploadedFile[] = Array.from(e.target.files).map((file) => ({
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
  const currentComment = comments[activeSubTab] || '';

  return (
    <div className="owner-details-responsive-outer-container">
      <div 
        className="owner-details-page-wrapper"
        style={{
          transform: `scale(${scale})`,
          marginBottom: `${(scale - 1) * 1084}px`,
          marginRight: `${(scale - 1) * 1440}px`,
          background: '#F9F9F9',
          height: '1080px'
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

        {/* LEFT CARD: Stepper Container */}
        <ValuationStepper farmlandTitle={selectedFarmland.title} targetId={targetId} />

        {/* RIGHT CARD: Stepper sub-tab lists */}
        <ValuationTabSelector
          subTabs={subTabs}
          activeSubTab={activeSubTab}
          completedSubTabs={completedSubTabs}
          onTabClick={handleSubTabClick}
        />

        {/* Global hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          style={{ display: 'none' }}
        />

        {/* Bottom Upload & Comment Area */}
        <ValuationUploadCard
          activeSubTab={activeSubTab}
          currentUploaded={currentUploaded}
          currentComment={currentComment}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          fileInputRef={fileInputRef}
          onFileChooseClick={handleChooseFileClick}
          onFileDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            if (e.dataTransfer.files) {
              const newFiles = Array.from(e.dataTransfer.files).map(file => ({
                id: Math.random().toString(36).substring(7),
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                type: file.type,
                progress: 100
              }));
              setUploadedFiles(prev => ({
                ...prev,
                [activeSubTab]: [...(prev[activeSubTab] || []), ...newFiles]
              }));
            }
          }}
          onFileDelete={handleDeleteFile}
          onCommentChange={(value) =>
            setComments((prev) => ({
              ...prev,
              [activeSubTab]: value
            }))
          }
          onBack={handleBack}
          onNext={handleNext}
          roadType={roadType}
          onRoadTypeChange={setRoadType}
          roadWidth={roadWidth}
          onRoadWidthChange={setRoadWidth}
          txAvailability={txAvailability}
          onTxAvailabilityChange={setTxAvailability}
          valuationPerAcre={valuationPerAcre}
          onValuationPerAcreChange={setValuationPerAcre}
          localMarketAcrePrice={localMarketAcrePrice}
          onLocalMarketAcrePriceChange={setLocalMarketAcrePrice}
          geoAvailability={geoAvailability}
          onGeoAvailabilityChange={setGeoAvailability}
          upcomingInfra={upcomingInfra}
          onUpcomingInfraChange={setUpcomingInfra}
          railwayAvailability={railwayAvailability}
          onRailwayAvailabilityChange={setRailwayAvailability}
          railwayDistance={railwayDistance}
          onRailwayDistanceChange={setRailwayDistance}
          airportAvailability={airportAvailability}
          onAirportAvailabilityChange={setAirportAvailability}
          airportDistance={airportDistance}
          onAirportDistanceChange={setAirportDistance}
        />

      </div>

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

      {showSubmittedModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            width: '610px',
            height: '477px',
            background: '#FFFFFF',
            borderRadius: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            boxSizing: 'border-box',
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)'
          }}>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '30px',
              color: '#000000',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              Valuation Documents Submitted
            </span>

            {/* Shield badge icon */}
            <div style={{ marginBottom: '40px' }}>
              <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="54" cy="54" r="54" fill="#E8F3FD" />
                <path d="M54 22L57.3 32.2L67.8 30L67.8 40.8L77.7 41.8L74.2 52L81.7 59.8L71.8 63.8L75.3 74L65.4 72L62.1 82.2L54 80L45.9 82.2L42.6 72L32.7 74L36.2 63.8L26.3 59.8L33.8 52L30.3 41.8L40.2 40.8L40.2 30L50.7 32.2L54 22Z" fill="#1C75BC" stroke="#E8F3FD" strokeWidth="4" strokeLinejoin="round"/>
                <path d="M42.5 54.5L50.5 62.5L67.5 45.5" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '22px',
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.6)',
              margin: '0 0 32px 0',
              maxWidth: '360px'
            }}>
              Proceed With Agriculture Report to Complete the Farmland Submission
            </p>

            <button
              onClick={() => {
                setShowSubmittedModal(false);
                navigate(`/regional-officer/submit-form/${targetId}`);
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
              Submit Agriculture Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandDetails;
