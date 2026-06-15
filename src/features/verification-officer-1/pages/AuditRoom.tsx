import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  CalendarDays,
  Check,
  FileCheck,
  Bell
} from 'lucide-react';
import { MOCK_FARMLANDS } from '../data/farmlandsMockData';

export const AuditRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find targeted farmland details
  const targetId = id || "GLC SOS 01";
  const farmland = MOCK_FARMLANDS.find(item => 
    item.id === targetId || 
    item.id.replace(/\s+/g, '') === targetId.replace(/\s+/g, '')
  ) || MOCK_FARMLANDS[0];

  // Steps state: 'customer' (Customer Information) | 'legal' (Legal Documents)
  const [activeStep, setActiveStep] = useState<'customer' | 'legal'>('customer');

  // Active Tab state for Customer Information
  const [activeTab, setActiveTab] = useState<'owner' | 'family' | 'land'>('owner');

  const [submitted, setSubmitted] = useState(false);
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [showTurnbackPopup, setShowTurnbackPopup] = useState(false);
  const [turnbackReason, setTurnbackReason] = useState("");

  // Legal Step custom interactive states
  const [selectedDoc, setSelectedDoc] = useState<string>("Land Document");
  const [legalChecks, setLegalChecks] = useState<Record<string, boolean>>({
    "Land Document": true,
    "Pattadhar Passbook": true,
    "Link Document": true,
    "Kasara Pahani & Proceeding Copies": true,
    "Revenue Record": true,
    "Lease Agreement": true,
    "Death Certificate": true,
    "Partition Deed": true,
    "Encumbrance Certificate": true,
    "Land Coordinates": true,
    "Owner KYC Video": true,
  });

  const handleBack = () => {
    navigate('/verification-officer-1/assigned-farmlands');
  };

  const handleApprove = () => {
    if (activeStep === 'customer') {
      if (activeTab === 'owner') {
        setActiveTab('family');
      } else if (activeTab === 'family') {
        setActiveTab('land');
      } else if (activeTab === 'land') {
        setShowApprovePopup(true);
      }
    } else {
      setSubmitted(true);
      setTimeout(() => {
        navigate('/verification-officer-1/dashboard');
      }, 1500);
    }
  };

  const handleProceedPopup = () => {
    setShowApprovePopup(false);
    setActiveStep('legal');
  };

  const handleTurnBackClick = () => {
    setTurnbackReason("");
    setShowTurnbackPopup(true);
  };

  const handleTurnbackSubmit = () => {
    setShowTurnbackPopup(false);
    navigate('/verification-officer-1/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F4F5F6] flex flex-col p-6 md:p-12 font-plus-jakarta box-border w-full items-center">
      <style>{`
        /* Default Styles & Layout Zoom Rules */
        .audit-container {
          width: 100%;
          box-sizing: border-box;
          margin: 0 auto;
        }
        .audit-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 24px;
        }
        .audit-middle-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          width: 100%;
          align-items: stretch;
        }
        .audit-bottom-margin {
          margin-top: 24px;
        }
        .sidebar-card {
          width: 100%;
          align-self: start;
        }
        .files-inner-container {
          width: 100%;
          border: 1px solid #E5EAEB;
          border-radius: 16px;
          padding: 12px;
          background-color: white;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .comment-box-container {
          width: 100%;
          border: 1px solid #D5E9FA;
          border-radius: 16px;
          padding: 12px;
          background-color: #F5F9FD;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .files-inner-container::-webkit-scrollbar,
        .comment-box-container::-webkit-scrollbar {
          display: none;
        }

        .header-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: white;
          border: 1px solid #E5EAEB;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s;
          height: 40px;
          padding: 0 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          text-transform: none;
        }
        .header-btn:hover {
          background-color: #F9FAFB;
        }
        .header-icon {
          width: 16px;
          height: 16px;
        }
        .bell-btn {
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          background-color: white;
          border: 1px solid #E5EAEB;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
        }
        .bell-btn:hover {
          background-color: #F9FAFB;
        }
        .bell-icon {
          width: 18px;
          height: 18px;
        }
        .avatar-container {
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          overflow: hidden;
          border: 1px solid #E5EAEB;
          cursor: pointer;
        }

        /* Stepper elements */
        .stepper-container {
          position: relative;
          padding-left: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .stepper-line {
          position: absolute;
          left: 9px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background-color: rgba(39, 128, 196, 0.4);
        }
        .step-node {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          text-align: left;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          width: 100%;
        }
        .step-icon-box {
          position: absolute;
          left: -24px;
          top: 2px;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .step-exclamation {
          font-size: 11px;
          font-weight: 700;
          line-height: 1;
        }

        /* Tabs and forms */
        .tab-buttons-container {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-bottom: 24px;
          width: 100%;
        }
        .tab-btn {
          padding: 10px 20px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .info-field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .info-field-value {
          width: 100%;
          height: 48px;
          background-color: #F3F4F6;
          border-radius: 14px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          font-weight: 500;
          color: #1A1C1D;
        }

        /* Badge Checklist Buttons */
        .badge-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 9999px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
        }
        .badge-btn-active {
          background-color: white;
          border-color: #2780C4;
          color: #1A1C1D;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .badge-btn-inactive {
          background-color: #F3F6F6;
          border-color: transparent;
          color: #5D6B6B;
        }
        .badge-btn-inactive:hover {
          border-color: #CBD5E1;
        }

        /* File grid elements */
        .file-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #EAF3FA;
          border-radius: 16px;
          padding: 12px;
        }
        .file-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
        }

        /* Comments element */
        .comment-box-text {
          background-color: #EAF3FA;
          border: 1px solid rgba(39, 128, 196, 0.15);
          border-radius: 16px;
          padding: 16px;
          line-height: 1.625;
          color: #3D4949;
        }

        /* Action buttons */
        .btn-action-outline {
          border: 1px solid #2780C4;
          color: #2780C4;
          border-radius: 9999px;
          background-color: transparent;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          padding: 0 24px;
        }
        .btn-action-outline:hover {
          background-color: rgba(39, 128, 196, 0.05);
        }
        .btn-action-primary {
          background-color: #2780C4;
          color: white;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          padding: 0 32px;
        }
        .btn-action-primary:hover {
          background-color: #2069A1;
        }

        @media (min-width: 1024px) {
          .audit-middle-grid {
            grid-template-columns: 410px 1fr;
            gap: 32px;
          }
          .audit-bottom-margin {
            margin-top: 32px;
          }
          .sidebar-card {
            width: 410px;
            height: 443px;
            align-self: start;
          }
        }

        /* 1440px Screen Resolution Specification */
        @media (min-width: 1440px) {
          .audit-container {
            width: 1280px !important;
            max-width: 1280px !important;
          }
          .audit-header {
            margin-bottom: 32px !important;
          }
          .audit-middle-grid {
            grid-template-columns: 410px 1fr !important;
            gap: 32px !important;
          }
          .audit-bottom-margin {
            margin-top: 32px !important;
          }
          .middle-row-card {
            height: 443px !important;
          }
          .bottom-row-card {
            height: 360px !important;
          }
          .sidebar-card {
            width: 410px !important;
            height: 443px !important;
            border-radius: 24px !important;
            align-self: start !important;
          }
          .files-inner-container {
            height: 180px !important;
            border: 1px solid #E5EAEB !important;
            border-radius: 20px !important;
            padding: 16px !important;
            background-color: white !important;
            overflow-y: auto !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          .comment-box-container {
            height: 180px !important;
            border: 1px solid #D5E9FA !important;
            border-radius: 20px !important;
            padding: 16px !important;
            background-color: #F5F9FD !important;
            overflow-y: auto !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          .card-padding {
            padding: 32px !important;
          }
          .card-radius {
            border-radius: 28px !important;
          }
          .text-id {
            font-size: 32px !important;
          }
          .text-label {
            font-size: 12px !important;
          }
          .text-value {
            font-size: 14px !important;
          }
          .text-title {
            font-size: 24px !important;
          }
          
          /* Header buttons scaling */
          .header-btn {
            height: 44px !important;
            padding: 0 20px !important;
          }
          .header-icon {
            width: 20px !important;
            height: 20px !important;
          }
          .bell-btn {
            width: 52px !important;
            height: 52px !important;
          }
          .bell-icon {
            width: 22px !important;
            height: 22px !important;
          }
          .avatar-container {
            width: 52px !important;
            height: 52px !important;
          }

          /* Stepper scaling */
          .stepper-container {
            padding-left: 32px !important;
            gap: 32px !important;
          }
          .stepper-line {
            left: 11px !important;
            top: 8px !important;
            bottom: 8px !important;
          }
          .step-node {
            gap: 6px !important;
          }
          .step-icon-box {
            left: -30px !important;
            top: 2px !important;
            width: 24px !important;
            height: 24px !important;
          }
          .step-exclamation {
            font-size: 12px !important;
          }

          /* Tab buttons & Fields */
          .tab-buttons-container {
            gap: 12px !important;
            margin-bottom: 32px !important;
          }
          .tab-btn {
            padding: 10px 20px !important;
            font-size: 12px !important;
          }
          .info-field-value {
            height: 54px !important;
            border-radius: 18px !important;
            padding: 0 20px !important;
          }

          /* Badge checklist */
          .badge-padding {
            padding: 10px 20px !important;
          }
          .badge-font {
            font-size: 12px !important;
          }
          
          /* File row & comments */
          .file-row {
            border-radius: 20px !important;
            padding: 16px !important;
          }
          .file-icon-box {
            width: 40px !important;
            height: 40px !important;
            border-radius: 10px !important;
          }
          .comment-box-padding {
            padding: 20px !important;
          }
          .comment-box-font {
            font-size: 13px !important;
          }
          .action-btn-height {
            height: 44px !important;
          }
          .action-btn-font {
            font-size: 12px !important;
          }
          .btn-action-outline {
            padding: 0 24px !important;
          }
          .btn-action-primary {
            padding: 0 32px !important;
          }
        }

        /* 1920px Screen Resolution Specification (Proportionally Scaled from 1440) */
        @media (min-width: 1920px) {
          .audit-container {
            width: 1707px !important;
            max-width: 1707px !important;
          }
          .audit-header {
            margin-bottom: 42px !important;
          }
          .audit-middle-grid {
            grid-template-columns: 546px 1fr !important;
            gap: 42px !important;
          }
          .audit-bottom-margin {
            margin-top: 42px !important;
          }
          .middle-row-card {
            height: 590px !important;
          }
          .bottom-row-card {
            height: 480px !important;
          }
          .sidebar-card {
            width: 546px !important;
            height: 590px !important;
            border-radius: 32px !important;
            align-self: start !important;
          }
          .files-inner-container {
            height: 240px !important;
            border: 1px solid #E5EAEB !important;
            border-radius: 26px !important;
            padding: 22px !important;
            background-color: white !important;
            overflow-y: auto !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          .comment-box-container {
            height: 240px !important;
            border: 1px solid #D5E9FA !important;
            border-radius: 26px !important;
            padding: 22px !important;
            background-color: #F5F9FD !important;
            overflow-y: auto !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          .card-padding {
            padding: 42px !important;
          }
          .card-radius {
            border-radius: 37px !important;
          }
          .text-id {
            font-size: 42px !important;
          }
          .text-label {
            font-size: 16px !important;
          }
          .text-value {
            font-size: 18px !important;
          }
          .text-title {
            font-size: 32px !important;
          }

          /* Header buttons scaling */
          .header-btn {
            height: 58px !important;
            padding: 0 28px !important;
          }
          .header-icon {
            width: 28px !important;
            height: 28px !important;
          }
          .bell-btn {
            width: 70px !important;
            height: 70px !important;
          }
          .bell-icon {
            width: 30px !important;
            height: 30px !important;
          }
          .avatar-container {
            width: 70px !important;
            height: 70px !important;
          }

          /* Stepper scaling */
          .stepper-container {
            padding-left: 42px !important;
            gap: 42px !important;
          }
          .stepper-line {
            left: 15px !important;
            top: 10px !important;
            bottom: 10px !important;
          }
          .step-node {
            gap: 8px !important;
          }
          .step-icon-box {
            left: -40px !important;
            top: 4px !important;
            width: 32px !important;
            height: 32px !important;
          }
          .step-exclamation {
            font-size: 16px !important;
          }

          /* Tab buttons & Fields */
          .tab-buttons-container {
            gap: 16px !important;
            margin-bottom: 42px !important;
          }
          .tab-btn {
            padding: 14px 28px !important;
            font-size: 16px !important;
          }
          .info-field-value {
            height: 72px !important;
            border-radius: 24px !important;
            padding: 0 26px !important;
          }

          /* Badge checklist */
          .badge-padding {
            padding: 14px 28px !important;
          }
          .badge-font {
            font-size: 16px !important;
          }

          /* File row & comments */
          .file-row {
            border-radius: 26px !important;
            padding: 22px !important;
          }
          .file-icon-box {
            width: 54px !important;
            height: 54px !important;
            border-radius: 14px !important;
          }
          .comment-box-padding {
            padding: 28px !important;
          }
          .comment-box-font {
            font-size: 17px !important;
          }
          .action-btn-height {
            height: 58px !important;
          }
          .action-btn-font {
            font-size: 16px !important;
          }
          .btn-action-outline {
            padding: 0 32px !important;
          }
          .btn-action-primary {
            padding: 0 42px !important;
          }
        }

        /* 2560px Screen Resolution Specification (Proportionally Scaled from 1440) */
        @media (min-width: 2560px) {
          .audit-container {
            width: 2276px !important;
            max-width: 2276px !important;
          }
          .audit-header {
            margin-bottom: 56px !important;
          }
          .audit-middle-grid {
            grid-template-columns: 728px 1fr !important;
            gap: 56px !important;
          }
          .audit-bottom-margin {
            margin-top: 56px !important;
          }
          .middle-row-card {
            height: 787px !important;
          }
          .bottom-row-card {
            height: 640px !important;
          }
          .sidebar-card {
            width: 728px !important;
            height: 787px !important;
            border-radius: 42px !important;
            align-self: start !important;
          }
          .files-inner-container {
            height: 320px !important;
            border: 1px solid #E5EAEB !important;
            border-radius: 35px !important;
            padding: 30px !important;
            background-color: white !important;
            overflow-y: auto !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          .comment-box-container {
            height: 320px !important;
            border: 1px solid #D5E9FA !important;
            border-radius: 35px !important;
            padding: 30px !important;
            background-color: #F5F9FD !important;
            overflow-y: auto !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          .card-padding {
            padding: 56px !important;
          }
          .card-radius {
            border-radius: 50px !important;
          }
          .text-id {
            font-size: 56px !important;
          }
          .text-label {
            font-size: 22px !important;
          }
          .text-value {
            font-size: 24px !important;
          }
          .text-title {
            font-size: 42px !important;
          }

          /* Header buttons scaling */
          .header-btn {
            height: 78px !important;
            padding: 0 38px !important;
          }
          .header-icon {
            width: 38px !important;
            height: 38px !important;
          }
          .bell-btn {
            width: 92px !important;
            height: 92px !important;
          }
          .bell-icon {
            width: 42px !important;
            height: 42px !important;
          }
          .avatar-container {
            width: 92px !important;
            height: 92px !important;
          }

          /* Stepper scaling */
          .stepper-container {
            padding-left: 56px !important;
            gap: 56px !important;
          }
          .stepper-line {
            left: 20px !important;
            top: 14px !important;
            bottom: 14px !important;
          }
          .step-node {
            gap: 12px !important;
          }
          .step-icon-box {
            left: -53px !important;
            top: 6px !important;
            width: 42px !important;
            height: 42px !important;
          }
          .step-exclamation {
            font-size: 22px !important;
          }

          /* Tab buttons & Fields */
          .tab-buttons-container {
            gap: 22px !important;
            margin-bottom: 56px !important;
          }
          .tab-btn {
            padding: 18px 36px !important;
            font-size: 22px !important;
          }
          .info-field-value {
            height: 96px !important;
            border-radius: 32px !important;
            padding: 0 35px !important;
          }

          /* Badge checklist */
          .badge-padding {
            padding: 18px 36px !important;
          }
          .badge-font {
            font-size: 22px !important;
          }

          /* File row & comments */
          .file-row {
            border-radius: 35px !important;
            padding: 30px !important;
          }
          .file-icon-box {
            width: 70px !important;
            height: 70px !important;
            border-radius: 18px !important;
          }
          .comment-box-padding {
            padding: 35px !important;
          }
          .comment-box-font {
            font-size: 23px !important;
          }
          .action-btn-height {
            height: 78px !important;
          }
          .action-btn-font {
            font-size: 22px !important;
          }
          .btn-action-outline {
            padding: 0 42px !important;
          }
          .btn-action-primary {
            padding: 0 56px !important;
          }
        }
      `}</style>
      
      <div className="audit-container flex flex-col flex-1">
        {/* Top Header Row with Go Back Button & Notification / Profile */}
        <div className="audit-header w-full">
          <button
            onClick={handleBack}
            className="header-btn"
          >
            <ArrowLeft className="header-icon text-[#3D4949] shrink-0" />
            <span className="text-scale-value font-plus-jakarta font-bold text-xs text-[#3D4949]">
              Go back to dashboard
            </span>
          </button>

          {/* Notifications and Profile */}
          <div className="flex items-center gap-3">
            <button className="bell-btn bg-white">
              <Bell className="bell-icon text-[#2C2C2C]" />
              <span className="absolute top-[8px] right-[8px] w-[8px] h-[8px] bg-[#EF4646] rounded-full border-[1.5px] border-white" />
            </button>
            <div 
              className="avatar-container overflow-hidden" 
              onClick={() => navigate('/verification-officer-1/profile')}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="flex-1 bg-white rounded-[32px] border border-[#E5EAEB] p-12 text-center flex flex-col items-center justify-center gap-4 max-w-[800px] mx-auto w-full mt-10 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
              <FileCheck className="w-10 h-10" />
            </div>
            <h2 className="font-plus-jakarta font-extrabold text-2xl text-[#1E1E1E]">
              Verification Approved!
            </h2>
            <p className="font-plus-jakarta text-[#5D6B6B] text-base max-w-md">
              The status for <span className="font-bold text-[#2780C4]">{farmland.id}</span> has been updated to Approved. Redirecting...
            </p>
          </div>
        ) : (
          <div className="w-full flex-1 flex flex-col">
            {activeStep === 'customer' ? (
              <div className="audit-middle-grid flex-1">
                
                {/* LEFT SIDEBAR SECTION */}
                <div className="sidebar-card card-padding card-radius bg-white border border-[#E5EAEB] shadow-sm flex flex-col relative">
                  <span className="text-label font-plus-jakarta text-xs font-bold text-[#8E9D9D] uppercase tracking-wider">Farmland ID:</span>
                  <h2 className="text-id font-plus-jakarta font-extrabold text-[32px] text-[#1A1C1D] mt-2 mb-8 leading-none tracking-tight">
                    {farmland.id.replace(/\s+/g, ' ')}
                  </h2>

                  {/* Vertical Stepper Checkpoints */}
                  <div className="stepper-container">
                    {/* Vertical Line Connector */}
                    <div className="stepper-line" />

                    {/* Step 1: Customer Info */}
                    <button
                      onClick={() => setActiveStep('customer')}
                      className="step-node group"
                    >
                      <div className="step-icon-box bg-[#FF7A00] border border-[#FF7A00] text-white">
                        <span className="step-exclamation">!</span>
                      </div>
                      <span className="text-label font-plus-jakarta text-xs font-extrabold uppercase tracking-wider text-[#FF7A00]">
                        Customer Information
                      </span>
                    </button>

                    {/* Step 2: Legal Documents */}
                    <button
                      onClick={() => setActiveStep('legal')}
                      className="step-node group"
                    >
                      <div className="step-icon-box border-2 text-white bg-[#FFB87A] border-[#FFB87A] transition-colors">
                        <span className="step-exclamation">!</span>
                      </div>
                      <span className="text-label font-plus-jakarta text-xs font-extrabold uppercase tracking-wider text-[#FFB87A] group-hover:text-[#FF7A00] transition-colors">
                        Legal Documents
                      </span>
                    </button>
                  </div>
                </div>

                {/* MAIN WORKSPACE SECTION */}
                <div className="right-workspace card-padding card-radius bg-white border border-[#E5EAEB] shadow-sm flex flex-col justify-between">
                  <div className="w-full">
                    {/* Tab Header bar */}
                    <div className="tab-buttons-container">
                      {/* Owner Details Tab Button */}
                      <button
                        type="button"
                        onClick={() => setActiveTab('owner')}
                        className={`tab-btn transition-all cursor-pointer ${
                          activeTab === 'owner' 
                            ? 'bg-transparent text-[#2780C4] border border-[#2780C4] shadow-xs' 
                            : 'bg-[#F3F4F6] text-[#8E9D9D] border border-transparent hover:bg-gray-100'
                        }`}
                      >
                        {activeTab === 'owner' ? (
                          <span className="w-4 h-4 rounded-full bg-[#FF7A00] flex items-center justify-center text-white text-[9px] font-extrabold">!</span>
                        ) : null}
                        <span>Owner Details</span>
                        {activeTab !== 'owner' ? (
                          <span className="w-4 h-4 rounded-full bg-[#2780C4] flex items-center justify-center text-white shrink-0">
                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </span>
                        ) : null}
                      </button>

                      {/* Family Tree Tab Button */}
                      <button
                        type="button"
                        onClick={() => setActiveTab('family')}
                        className={`tab-btn transition-all cursor-pointer ${
                          activeTab === 'family' 
                            ? 'bg-transparent text-[#2780C4] border border-[#2780C4] shadow-xs' 
                            : 'bg-[#F3F4F6] text-[#8E9D9D] border border-transparent hover:bg-gray-100'
                        }`}
                      >
                        {activeTab === 'family' || activeTab === 'owner' ? (
                          <span className="w-4 h-4 rounded-full bg-[#FF7A00] flex items-center justify-center text-white text-[9px] font-extrabold">!</span>
                        ) : null}
                        <span>Family Tree</span>
                        {activeTab === 'land' ? (
                          <span className="w-4 h-4 rounded-full bg-[#2780C4] flex items-center justify-center text-white shrink-0">
                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </span>
                        ) : null}
                      </button>

                      {/* Land Details Tab Button */}
                      <button
                        type="button"
                        onClick={() => setActiveTab('land')}
                        className={`tab-btn transition-all cursor-pointer ${
                          activeTab === 'land' 
                            ? 'bg-transparent text-[#2780C4] border border-[#2780C4] shadow-xs' 
                            : 'bg-[#F3F4F6] text-[#8E9D9D] border border-transparent hover:bg-gray-100'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-[#FF7A00] flex items-center justify-center text-white text-[9px] font-extrabold">!</span>
                        <span>Land Details</span>
                      </button>
                    </div>

                    {/* Tab Content Areas */}
                    <div className="w-full">
                      {/* Tab 1: Owner Details */}
                      {activeTab === 'owner' && (
                        <div className="flex flex-col gap-8 animate-fadeIn">
                          <div className="flex items-center gap-4">
                            <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-white shadow-md">
                              <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                                alt="Owner avatar"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <h3 className="text-title font-plus-jakarta font-extrabold text-[22px] text-[#1A1C1D] leading-none">
                                Arjun Mehta
                              </h3>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="info-field-group">
                              <label className="text-label font-plus-jakarta font-bold text-xs text-[#3D4949] uppercase tracking-wider">First Name</label>
                              <div className="info-field-value text-value font-plus-jakarta text-[15px] font-medium">
                                Arjun
                              </div>
                            </div>

                            <div className="info-field-group">
                              <label className="text-label font-plus-jakarta font-bold text-xs text-[#3D4949] uppercase tracking-wider">Last Name</label>
                              <div className="info-field-value text-value font-plus-jakarta text-[15px] font-medium">
                                Mehta
                              </div>
                            </div>

                            <div className="info-field-group">
                              <label className="text-label font-plus-jakarta font-bold text-xs text-[#3D4949] uppercase tracking-wider">Phone Number</label>
                              <div className="info-field-value text-value font-plus-jakarta text-[15px] font-medium gap-3">
                                <Phone className="w-4 h-4 text-[#8E9D9D] shrink-0" />
                                <span>+91-9123456789</span>
                              </div>
                            </div>

                            <div className="info-field-group">
                              <label className="text-label font-plus-jakarta font-bold text-xs text-[#3D4949] uppercase tracking-wider">Email</label>
                              <div className="info-field-value text-value font-plus-jakarta text-[15px] font-medium gap-3">
                                <Mail className="w-4 h-4 text-[#8E9D9D] shrink-0" />
                                <span>arjunmehta@gmail.com</span>
                              </div>
                            </div>

                            <div className="info-field-group">
                              <label className="text-label font-plus-jakarta font-bold text-xs text-[#3D4949] uppercase tracking-wider">Date of Birth</label>
                              <div className="info-field-value text-value font-plus-jakarta text-[15px] font-medium gap-3">
                                <CalendarDays className="w-4 h-4 text-[#8E9D9D] shrink-0" />
                                <span>13/01/1984</span>
                              </div>
                            </div>

                            <div className="info-field-group">
                              <label className="text-label font-plus-jakarta font-bold text-xs text-[#3D4949] uppercase tracking-wider">Religion</label>
                              <div className="info-field-value text-value font-plus-jakarta text-[15px] font-medium">
                                Hindu
                              </div>
                            </div>

                            <div className="info-field-group">
                              <label className="text-label font-plus-jakarta font-bold text-xs text-[#3D4949] uppercase tracking-wider">Gender</label>
                              <div className="info-field-value text-value font-plus-jakarta text-[15px] font-medium">
                                Male
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-4">
                            <span className="font-plus-jakarta font-bold text-sm text-[#1A1C1D]">Google Location of Land</span>
                            <a
                              href={`https://maps.google.com/?q=${encodeURIComponent('17.4835850,78.3805050')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="font-plus-jakarta font-bold text-sm text-[#2780C4] underline hover:text-[#2069A1] transition-colors ml-1"
                            >
                              17.4835850, 78.3805050
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Tab 2: Family Tree */}
                      {activeTab === 'family' && (
                        <div className="flex flex-col gap-6 animate-fadeIn">
                          <div className="relative w-full h-[500px] bg-[#FAFDFE] rounded-[24px] border border-sky-100/50 overflow-x-auto overflow-y-hidden no-scrollbar">
                            <div className="relative w-[760px] h-[500px] mx-auto">
                              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <line x1="380" y1="165" x2="380" y2="205" stroke="#D2DBE2" strokeWidth="2" />
                                <line x1="120" y1="205" x2="640" y2="205" stroke="#D2DBE2" strokeWidth="2" />
                                <line x1="120" y1="205" x2="120" y2="245" stroke="#D2DBE2" strokeWidth="2" />
                                <line x1="380" y1="205" x2="380" y2="245" stroke="#D2DBE2" strokeWidth="2" />
                                <line x1="640" y1="205" x2="640" y2="245" stroke="#D2DBE2" strokeWidth="2" />
                                <line x1="380" y1="320" x2="380" y2="395" stroke="#D2DBE2" strokeWidth="2" />
                              </svg>

                              <div className="absolute left-[165px] top-[192px] bg-[#E8EFFF] text-[#4F6BE7] text-[10px] font-extrabold px-3 py-1 rounded-full border-none">
                                FATHER
                              </div>
                              <div className="absolute left-[354px] top-[210px] bg-[#E8EFFF] text-[#4F6BE7] text-[10px] font-extrabold px-3 py-1 rounded-full border-none">
                                SPOUSE
                              </div>
                              <div className="absolute left-[505px] top-[192px] bg-[#E8EFFF] text-[#4F6BE7] text-[10px] font-extrabold px-3 py-1 rounded-full border-none">
                                MOTHER
                              </div>
                              <div className="absolute left-[348px] top-[345px] bg-[#E8EFFF] text-[#4F6BE7] text-[10px] font-extrabold px-3 py-1 rounded-full border-none">
                                DAUGHTER
                              </div>

                              <div className="absolute left-[280px] top-[15px] w-[200px] border-2 border-[#DBE9F6] bg-[#F5F9FD] rounded-[24px] p-4 text-center flex flex-col items-center justify-center gap-1.5 shadow-sm">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                                  <img 
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                                    alt="Owner avatar" 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <span className="bg-[#3D93D1] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider leading-none">
                                  OWNER
                                </span>
                                <h4 className="font-plus-jakarta font-bold text-sm text-[#1A1C1D] mt-0.5 leading-none">Arjun Mehta</h4>
                                <span className="text-xs text-[#2780C4] font-medium leading-none">Male, 42 yrs</span>
                              </div>

                              <div className="absolute left-[20px] top-[245px] w-[200px] bg-white border border-[#E5EAEB] rounded-[20px] p-3 flex items-center gap-3 shadow-xs">
                                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                                  <img 
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" 
                                    alt="" 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <h4 className="font-plus-jakarta font-bold text-sm text-[#1A1C1D] leading-tight">Vikram Mehta</h4>
                                  <span className="text-xs text-[#8E9D9D] leading-tight">Male, 72 yrs</span>
                                </div>
                              </div>

                              <div className="absolute left-[280px] top-[245px] w-[200px] bg-white border border-[#E5EAEB] rounded-[20px] p-3 flex items-center gap-3 shadow-xs">
                                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                                  <img 
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" 
                                    alt="" 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <h4 className="font-plus-jakarta font-bold text-sm text-[#1A1C1D] leading-tight">Priya Mehta</h4>
                                  <span className="text-xs text-[#8E9D9D] leading-tight">Female, 40 yrs</span>
                                </div>
                              </div>

                              <div className="absolute left-[540px] top-[245px] w-[200px] bg-white border border-[#E5EAEB] rounded-[20px] p-3 flex items-center gap-3 shadow-xs">
                                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                                  <img 
                                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80" 
                                    alt="" 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <h4 className="font-plus-jakarta font-bold text-sm text-[#1A1C1D] leading-tight">Sushila Mehta</h4>
                                  <span className="text-xs text-[#8E9D9D] leading-tight">Female, 68 yrs</span>
                                </div>
                              </div>

                              <div className="absolute left-[280px] top-[395px] w-[200px] bg-white border border-[#E5EAEB] rounded-[20px] p-3 flex items-center gap-3 shadow-xs">
                                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                                  <img 
                                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" 
                                    alt="" 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <h4 className="font-plus-jakarta font-bold text-sm text-[#1A1C1D] leading-tight">Ananya Mehta</h4>
                                  <span className="text-xs text-[#8E9D9D] leading-tight">Female, 12 yrs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tab 3: Land Details */}
                      {activeTab === 'land' && (
                        <div className="flex flex-col gap-6 animate-fadeIn">
                          <h3 className="text-title font-plus-jakarta font-extrabold text-xs text-[#5D6B6B] uppercase tracking-widest text-center mb-2">Farmland Details</h3>
                          
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-4">
                            <div className="flex flex-col gap-5 text-right w-full md:w-[200px]">
                              <div className="flex flex-col gap-1">
                                <span className="text-label font-plus-jakarta text-[10px] text-[#8E9D9D] font-extrabold uppercase tracking-wider">State</span>
                                <span className="text-value font-plus-jakarta text-sm font-bold text-[#2780C4]">Andhra Pradesh</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-label font-plus-jakarta text-[10px] text-[#8E9D9D] font-extrabold uppercase tracking-wider">District</span>
                                <span className="text-value font-plus-jakarta text-sm font-bold text-[#2780C4]">West Godavari</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-label font-plus-jakarta text-[10px] text-[#8E9D9D] font-extrabold uppercase tracking-wider">Area/City/Town</span>
                                <span className="text-value font-plus-jakarta text-sm font-bold text-[#2780C4]">Thanuku</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-label font-plus-jakarta text-[10px] text-[#8E9D9D] font-extrabold uppercase tracking-wider">Acquisition Category</span>
                                <span className="text-value font-plus-jakarta text-sm font-bold text-[#2780C4]">Ancestral Property</span>
                              </div>
                            </div>

                            <div className="flex-1 flex justify-center">
                              <div className="w-[300px] h-[190px] rounded-[24px] overflow-hidden shadow-xs border border-[#ECECEC]">
                                <img
                                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=80"
                                  alt="Farmland Aerial View"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-5 text-left w-full md:w-[200px]">
                              <div className="flex flex-col gap-1">
                                <span className="text-label font-plus-jakarta text-[10px] text-[#8E9D9D] font-extrabold uppercase tracking-wider">Agent</span>
                                <span className="text-value font-plus-jakarta text-sm font-bold text-[#2780C4]">Agent Vinod</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-label font-plus-jakarta text-[10px] text-[#8E9D9D] font-extrabold uppercase tracking-wider">Land Conversion</span>
                                <span className="text-value font-plus-jakarta text-sm font-bold text-[#2780C4]">Acres</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-label font-plus-jakarta text-[10px] text-[#8E9D9D] font-extrabold uppercase tracking-wider">Value for Area</span>
                                <span className="text-value font-plus-jakarta text-sm font-bold text-[#2780C4]">1,00,000.00</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-label font-plus-jakarta text-[10px] text-[#8E9D9D] font-extrabold uppercase tracking-wider">Agent Referral Location</span>
                                <span className="text-value font-plus-jakarta text-sm font-bold text-[#2780C4]">Another Location</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center border-t border-[#F1F3F4]/80 pt-6 mt-4 px-2">
                            <div className="flex flex-col">
                              <span className="text-label font-plus-jakarta text-[10px] text-[#8E9D9D] font-extrabold uppercase tracking-wider">Geo Reference</span>
                              <h4 className="text-title font-plus-jakarta text-xl font-bold text-[#2780C4] mt-1 leading-none">N 38.2975° W 122.2869°</h4>
                              <span className="text-label font-plus-jakarta text-[10px] text-[#8E9D9D] mt-2 leading-none">GRID: 84T-QK • ELEV: 12m</span>
                            </div>
                            <div className="w-[160px] h-[80px] rounded-[16px] overflow-hidden border border-[#ECECEC] shadow-xs">
                              <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=200&auto=format&fit=crop&q=80"
                                alt="Satellite Map View"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="flex justify-end gap-3 items-center border-t border-[#F1F3F4] pt-6 mt-8">
                    <button
                      type="button"
                      onClick={handleTurnBackClick}
                      className="btn-action-outline action-btn-height action-btn-font"
                    >
                      Turn Back
                    </button>
                    <button
                      type="button"
                      onClick={handleApprove}
                      className="btn-action-primary action-btn-height action-btn-font"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full gap-6">
                {/* Middle Row: Side-by-side Stepper and checklist badges */}
                <div className="audit-middle-grid">
                  
                  {/* LEFT SIDEBAR SECTION */}
                  <div className="sidebar-card card-padding card-radius bg-white border border-[#E5EAEB] shadow-sm flex flex-col relative middle-row-card">
                    <span className="text-label font-plus-jakarta text-xs font-bold text-[#8E9D9D] uppercase tracking-wider">Farmland ID:</span>
                    <h2 className="text-id font-plus-jakarta font-extrabold text-[32px] text-[#1A1C1D] mt-2 mb-8 leading-none tracking-tight">
                      {farmland.id.replace(/\s+/g, ' ')}
                    </h2>

                    {/* Vertical Stepper Checkpoints */}
                    <div className="stepper-container">
                      <div className="stepper-line" />

                      {/* Step 1: Customer Info */}
                      <button
                        onClick={() => setActiveStep('customer')}
                        className="step-node group"
                      >
                        <div className="step-icon-box bg-[#2780C4]/10 border border-[#2780C4]/20 text-[#2780C4]">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                        <span className="text-label font-plus-jakarta text-xs font-extrabold uppercase tracking-wider text-[#8E9D9D]">
                          Customer Information
                        </span>
                        <span className="text-scale-value font-plus-jakarta text-[10px] text-[#8E9D9D] font-bold">
                          Oct 24 • 09:00 AM
                        </span>
                      </button>

                      {/* Step 2: Legal Documents */}
                      <button
                        onClick={() => setActiveStep('legal')}
                        className="step-node group"
                      >
                        <div className="step-icon-box bg-[#FF7A00] border border-[#FF7A00] text-white">
                          <span className="step-exclamation">!</span>
                        </div>
                        <span className="text-label font-plus-jakarta text-xs font-extrabold uppercase tracking-wider text-[#FF7A00]">
                          Legal Documents
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* RIGHT WORKSPACE SECTION (Badges checklist card) */}
                  <div className="right-workspace card-padding card-radius bg-white border border-[#E5EAEB] shadow-sm flex flex-col middle-row-card justify-center">
                    <div className="flex flex-wrap gap-3.5 justify-start">
                      {Object.keys(legalChecks).map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => setSelectedDoc(name)}
                          className={`badge-btn badge-padding badge-font ${
                            selectedDoc === name ? 'badge-btn-active' : 'badge-btn-inactive'
                          }`}
                        >
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setLegalChecks(prev => ({
                                ...prev,
                                [name]: !prev[name]
                              }));
                            }}
                            className="shrink-0 cursor-pointer"
                          >
                            {legalChecks[name] ? (
                              <span className="w-5 h-5 rounded-full bg-[#FF7A00] flex items-center justify-center text-white text-[10px] font-extrabold">
                                !
                              </span>
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-[#2780C4] flex items-center justify-center text-white">
                                <Check className="w-3 h-3 text-white" strokeWidth={3.5} />
                              </span>
                            )}
                          </span>
                          <span>{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Full width 50/50 split in a single white card */}
                <div className="audit-bottom-margin w-full">
                  <div className="bottom-row-card card-padding card-radius bg-white border border-[#E5EAEB] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full">
                    {/* Left Column: Uploaded Files */}
                    <div className="flex flex-col">
                      <h3 className="text-title font-plus-jakarta font-extrabold text-2xl text-[#1A1C1D] tracking-tight mb-4">
                        Uploaded Files
                      </h3>
                      <div className="files-inner-container flex flex-col gap-4">
                        <div className="file-row">
                          <div className="flex items-center gap-3">
                            <div className="file-icon-box">
                              <span className="font-bold text-[9px] text-red-500 font-plus-jakarta">PDF</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-plus-jakarta font-bold text-xs text-[#1A1C1D]">File_name.pdf</span>
                              <span className="font-plus-jakarta text-[10px] text-[#8E9D9D] font-bold">6MB</span>
                            </div>
                          </div>
                          <button className="text-[#3D4949] hover:text-[#2780C4] cursor-pointer bg-transparent border-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                        </div>

                        <div className="file-row">
                          <div className="flex items-center gap-3">
                            <div className="file-icon-box">
                              <span className="font-bold text-[9px] text-red-500 font-plus-jakarta">PDF</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-plus-jakarta font-bold text-xs text-[#1A1C1D]">File_name_1.pdf</span>
                              <span className="font-plus-jakarta text-[10px] text-[#8E9D9D] font-bold">8MB</span>
                            </div>
                          </div>
                          <button className="text-[#3D4949] hover:text-[#2780C4] cursor-pointer bg-transparent border-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Comments */}
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col">
                        <h3 className="text-title font-plus-jakarta font-extrabold text-2xl text-[#1A1C1D] tracking-tight mb-4">
                          Comments
                        </h3>
                        <div className="comment-box-container comment-box-font font-plus-jakarta text-[13px] leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur.
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          type="button"
                          onClick={handleTurnBackClick}
                          className="btn-action-outline action-btn-height action-btn-font"
                        >
                          Turn Back
                        </button>
                        <button
                          type="button"
                          onClick={handleApprove}
                          className="btn-action-primary action-btn-height action-btn-font"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showApprovePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-[28px] p-8 max-w-[480px] w-full shadow-2xl flex flex-col items-center text-center border border-slate-100/50 animate-scaleUp">
            <h3 className="font-plus-jakarta font-extrabold text-xl text-[#1A1C1D]">
              Customer Information
            </h3>
            
            <div className="relative w-24 h-24 my-6 flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-[#F0F7FD] opacity-60 scale-110" />
              <div className="absolute w-20 h-20 rounded-full bg-[#E1F0FC]" />
              
              <svg className="w-16 h-16 text-[#2780C4] relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 12l-2.44-1.04.14-2.65-2.56-.67-.85-2.51-2.44 1.03-1.85-1.92-1.85 1.92-2.44-1.03-.85 2.51-2.56.67.14 2.65L2 12l2.44 1.04-.14 2.65 2.56.67.85 2.51 2.44-1.03 1.85 1.92 1.85-1.92 2.44 1.03.85-2.51 2.56-.67-.14-2.65L23 12z" fill="#2780C4" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            <p className="font-plus-jakarta text-[#5D6B6B] text-[15px] font-medium leading-relaxed max-w-sm">
              Proceed With <span className="text-[#2780C4] font-bold">'Legal Documents'</span> Approval For The Farmland ID: <span className="text-[#2780C4] font-bold">{farmland.id.replace(/\s+/g, '')}</span> to Complete The Verification.
            </p>

            <button
              onClick={handleProceedPopup}
              className="h-12 w-full md:w-[220px] rounded-full bg-[#2780C4] text-white font-bold hover:bg-[#2069A1] transition-all cursor-pointer mt-6 border-none shadow-sm flex items-center justify-center text-sm"
            >
              Proceed
            </button>
          </div>
        </div>
      )}

      {showTurnbackPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-[28px] p-8 max-w-[500px] w-full shadow-2xl flex flex-col border border-slate-100/50 animate-scaleUp relative">
            <button 
              onClick={() => setShowTurnbackPopup(false)}
              className="absolute top-6 right-6 text-[#2C2C2C] hover:opacity-70 cursor-pointer border-none bg-transparent"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="font-plus-jakarta font-extrabold text-xl text-[#1A1C1D] mb-6">
              Turnback
            </h3>
            
            <label className="font-plus-jakarta text-xs font-semibold text-[#8E9D9D] mb-2">
              Provide the reason for turnback:
            </label>
            
            <textarea
              value={turnbackReason}
              onChange={(e) => setTurnbackReason(e.target.value)}
              placeholder="Start write here..."
              className="w-full h-36 bg-[#F3F4F6] rounded-[20px] p-4 font-plus-jakarta text-sm text-[#1A1C1D] border border-transparent focus:border-[#2780C4] focus:bg-white focus:outline-none transition-all resize-none mb-6"
            />
            
            <div className="flex justify-end">
              <button
                onClick={handleTurnbackSubmit}
                className="h-11 px-8 rounded-full bg-[#2780C4] hover:bg-[#2069A1] text-white font-bold text-xs tracking-wider transition-all cursor-pointer border-none shadow-sm flex items-center justify-center"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AuditRoom;
