import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import UploadTimelineSidebar from "../components/UploadTimelineSidebar";
import UploadCustomerInformationCard from "../components/UploadCustomerInformationCard";
import UploadGoBack from "../components/UploadGoBack";

export const SuperAdminUploadCustomerInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const targetId = id || "GLCSOS-05";

  const handleDismiss = () => {
    // Navigate back to the land details page
    navigate(`/super-admin/upload/land-details/${targetId}?boundaryConfirmed=true`);
  };

  const handleSubmit = (formData: any) => {
    console.log("Customer creation form data submitted:", formData);
    // Switch to family tree or save details here
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col justify-start items-center p-[clamp(1.5rem,2.78vw,3.33rem)] font-sans">
      <div 
        className="w-full max-w-[clamp(64rem,90vw,120rem)] flex flex-col gap-[clamp(1.5rem,2vw,2.5rem)]"
      >
        {/* ── Top Header - Reuses UploadGoBack ── */}
        <div className="flex justify-start w-full">
          <UploadGoBack onClick={handleGoBack} />
        </div>

        {/* ── Main Layout - Sidebar & Central Form side-by-side ── */}
        <div className="w-full flex flex-col lg:flex-row gap-[clamp(1rem,1.67vw,2.5rem)] lg:items-stretch items-start">
          
          {/* Left Column: Timeline Stepper Card */}
          <UploadTimelineSidebar 
            farmlandId={targetId} 
            activeStep="customer-information"
          />

          {/* Right Column: Customer Information Card */}
          <UploadCustomerInformationCard 
            farmlandId={targetId} 
            onSubmit={handleSubmit}
            onDismiss={handleDismiss}
          />

        </div>
      </div>
    </div>
  );
};

export default SuperAdminUploadCustomerInformation;
