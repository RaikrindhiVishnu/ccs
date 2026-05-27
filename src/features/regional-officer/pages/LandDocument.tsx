import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { farmlandsData } from '../data/farmlandsListData';
import { useViewportScale } from '@/hooks/useViewportScale';
import {
  CustomerStepper,
  LocationCard,
  CustomerForm
} from './customer-information';

const LandDocument: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1080);

  // Dynamic matching based on URL param
  const selectedFarmland = farmlandsData.find(
    (item) => item.id === id || 
              item.title.replace(/\s+/g, '-').toLowerCase() === id?.toLowerCase() ||
              item.title.replace(/\s+/g, '').toLowerCase() === id?.replace(/\s+/g, '').replace(/-/g, '').toLowerCase()
  ) || farmlandsData[0];

  const targetId = id || selectedFarmland.id.replace(/\s+/g, '-').toLowerCase();

  const handleBack = () => {
    navigate(`/regional-officer/assigned-farmlands-details/${targetId}`);
  };

  const handleNext = () => {
    navigate(`/regional-officer/assigned-farmlands-family-tree/${targetId}`);
  };

  // Form input reactive states
  const [firstName, setFirstName] = useState("Ramudu");
  const [lastName, setLastName] = useState("Kumar");
  const [phone, setPhone] = useState("+91-9123456789");
  const [email, setEmail] = useState("ramudu@gmail.com");
  const [dob, setDob] = useState("13/01/1986");
  const [religion, setReligion] = useState("Hindu");
  const [gender, setGender] = useState("Male");

  return (
    <div className="owner-details-responsive-outer-container">
      <div 
        className="owner-details-page-wrapper"
        style={{
          transform: `scale(${scale})`,
          marginBottom: `${(scale - 1) * 1080}px`,
          marginRight: `${(scale - 1) * 1440}px`,
        }}
      >
        {/* Go back to dashboard pill */}
        <button
          onClick={() => navigate('/regional-officer/assigned-farmlands')}
          className="owner-details-back-pill-btn"
        >
          <ArrowLeft className="w-5 h-5 text-[#353535] shrink-0" />
          <span className="owner-details-back-pill-text">
            Go back to dashboard
          </span>
        </button>

        {/* LEFT TOP CARD: Stepper Timeline */}
        <CustomerStepper farmlandTitle={selectedFarmland.title} targetId={targetId} />

        {/* LEFT BOTTOM CARD: Location & Map */}
        <LocationCard />

        {/* RIGHT MAIN CARD: Customer Details Form */}
        <CustomerForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          dob={dob}
          setDob={setDob}
          religion={religion}
          setReligion={setReligion}
          gender={gender}
          setGender={setGender}
          targetId={targetId}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default LandDocument;
