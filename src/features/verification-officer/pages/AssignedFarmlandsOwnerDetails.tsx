import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Check, Phone, Mail, CalendarDays } from 'lucide-react';
import { useViewportScale } from '@/hooks/useViewportScale';

export const VerificationOfficerAssignedFarmlandsOwnerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1080);
  const targetId = id || "GLCSOS 01";

  const handleBack = () => {
    navigate('/verification-officer/assigned-farmlands');
  };

  return (
    <div 
      className="bg-[#F2F2F2] min-h-screen relative flex justify-center overflow-hidden"
    >
      <div 
        style={{
          width: '1440px',
          height: '1065px',
          position: 'relative',
          background: '#F2F2F2',
          borderRadius: '32px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: `${(scale - 1) * 1065}px`
        }}
      >
        {/* Top Header - Back Button */}
        <div style={{
          position: 'absolute',
          width: '240px',
          height: '52px',
          left: '72px',
          top: '36px',
          filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.12))'
        }}>
          <button
            onClick={handleBack}
            style={{
              width: '240px',
              height: '52px',
              background: '#FFFFFF',
              borderRadius: '60px',
              display: 'flex',
              alignItems: 'center',
              padding: '19px 20px',
              gap: '8px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <ArrowLeft className="w-6 h-6 text-[#353535] shrink-0" />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '110%',
              color: '#353535'
            }}>
              Go back to dashboard
            </span>
          </button>
        </div>

        {/* Top Header - Bell & Avatar */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '13px',
          position: 'absolute',
          width: '117px',
          height: '52px',
          left: 'calc(50% - 117px/2 + 621.5px)',
          top: '34px'
        }}>
          <button style={{
            width: '52px',
            height: '52px',
            background: '#FFFFFF',
            borderRadius: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer'
          }}>
            <Bell className="w-6 h-6 text-[#2C2C2C]" />
          </button>
          <div style={{
            width: '52px',
            height: '52px',
            background: '#FFFFFF',
            borderRadius: '72px',
            overflow: 'hidden'
          }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* LEFT COLUMN */}
        {/* Stepper Card */}
        <div style={{
          position: 'absolute',
          height: '443px',
          left: '40px',
          width: '410px',
          top: '130px',
          background: '#FFFFFF',
          borderRadius: '24px'
        }}>
          <span style={{
            position: 'absolute',
            width: '96px',
            height: '20px',
            left: '30px',
            top: '30px',
            fontFamily: "'Plus Jakarta Sans'",
            fontWeight: 500,
            fontSize: '16px',
            color: '#000000'
          }}>
            Farmland ID:
          </span>
          <span style={{
            position: 'absolute',
            left: '30px',
            top: '60px',
            fontFamily: "'Plus Jakarta Sans'",
            fontWeight: 500,
            fontSize: '35px',
            color: '#000000'
          }}>
            {targetId}
          </span>

          {/* Stepper Line */}
          <div style={{
            position: 'absolute',
            width: '244px',
            height: '0px',
            left: '110px',
            top: '136px',
            border: '1px solid rgba(0, 120, 250, 0.25)',
            transform: 'rotate(90deg)',
            transformOrigin: 'top left'
          }} />

          {/* Steps */}
          <div style={{ position: 'absolute', left: '120px', top: '130px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', color: '#FFBC8A' }}>CUSTOMER INFORMATION</span>
          </div>
          <div style={{ position: 'absolute', left: '120px', top: '219px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', color: '#FFBC8A' }}>LAND & BOUNDARIES</span>
          </div>
          <div style={{ position: 'absolute', left: '143px', top: '299px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', color: '#FFBC8A' }}>VALUATION</span>
          </div>
          <div style={{ position: 'absolute', left: '143px', top: '377px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', color: '#FFBC8A' }}>AGRICULTURE & REPORT</span>
          </div>

          {/* Step Dots (Exclamation in Circle) */}
          {[136, 218, 296, 374].map((top, index) => (
            <div key={index} style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              left: '98px',
              top: `${top}px`,
              background: '#FFFFFF',
              border: '0.2px solid rgba(0, 0, 0, 0.15)',
              borderRadius: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                background: '#FFBC8A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>!</div>
            </div>
          ))}
        </div>

        {/* Location of Land Card */}
        <div style={{
          position: 'absolute',
          height: '443px',
          left: '42px',
          width: '410px',
          top: '586px',
          background: '#FFFFFF',
          borderRadius: '24px'
        }}>
          <span style={{
            position: 'absolute',
            left: '24px',
            top: '30px',
            fontFamily: "'Plus Jakarta Sans'",
            fontWeight: 500,
            fontSize: '24px',
            color: '#000000'
          }}>
            Location of land
          </span>
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '84px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <MapPin className="text-blue-500 w-[15px] h-[22px]" />
            <span style={{
              fontFamily: "'Poppins'",
              fontWeight: 500,
              fontSize: '16px',
              textDecorationLine: 'underline',
              color: '#1D7ABE'
            }}>
              17.4835850, 78.3805050
            </span>
          </div>
          {/* Map Image */}
          <div style={{
            position: 'absolute',
            width: '362px',
            height: '285px',
            left: '24px',
            top: '134px',
            borderRadius: '24px',
            overflow: 'hidden'
          }}>
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
              alt="Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CENTRAL MAIN CONTENT */}
        <div style={{
          position: 'absolute',
          height: '901px',
          left: '466px',
          right: '40px',
          top: '128px',
          background: '#FFFFFF',
          boxShadow: '0px 20px 40px rgba(0, 49, 50, 0.06)',
          borderRadius: '32px'
        }}>
          
          {/* Top Tabs */}
          <div style={{
            position: 'absolute',
            width: '628px',
            height: '41px',
            left: 'calc(50% - 628px/2)',
            top: '40px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center'
          }}>
            {/* Tab 1 Active */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '11px 31px',
              gap: '20px',
              background: '#FFFFFF',
              border: '1px solid #3D93D1',
              borderRadius: '72px'
            }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '14px', color: '#3D93D1' }}>Owner Details</span>
              <div className="w-[18px] h-[18px] bg-[#3D93D1] rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
            {/* Tab 2 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '11px 39px',
              gap: '20px',
              background: '#F9F9F9',
              borderRadius: '72px'
            }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '14px', color: '#5A5C5E' }}>Family Tree</span>
              <div className="w-[18px] h-[18px] bg-[#3D93D1] rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
            {/* Tab 3 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '11px 39px',
              gap: '20px',
              background: '#F9F9F9',
              borderRadius: '72px'
            }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '14px', color: '#5A5C5E' }}>Land Details</span>
              <div className="w-[18px] h-[18px] bg-[#3D93D1] rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Profile Header (Avatar + Name) */}
          <div style={{
            position: 'absolute',
            left: '48px',
            top: '129.5px', // centered vertically with Ramudu Kumar
            display: 'flex',
            alignItems: 'center',
            gap: '21px'
          }}>
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
              alt="Ramudu Kumar"
              style={{
                width: '82px',
                height: '82px',
                border: '4px solid #F9F9FB',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                borderRadius: '9999px',
                objectFit: 'cover'
              }}
            />
            <span style={{
              fontFamily: "'Manrope'",
              fontWeight: 700,
              fontSize: '24px',
              color: '#1A1C1D'
            }}>
              Ramudu Kumar
            </span>
          </div>

          {/* Form Grid */}
          <div style={{
            position: 'absolute',
            left: '48px',
            right: '48px',
            top: '258px', // adjusted to match layout flow
            height: '408px',
          }}>
            {/* Row 1 */}
            <div className="flex gap-[48px] mb-[28px]">
              <div className="flex-1 flex flex-col gap-[8px]">
                <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">First Name</label>
                <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] py-[12px] flex items-center">
                  <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">Ramudu</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[8px]">
                <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Last Name</label>
                <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] py-[12px] flex items-center">
                  <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">Kumar</span>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-[48px] mb-[28px]">
              <div className="flex-1 flex flex-col gap-[8px]">
                <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Phone Number</label>
                <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center gap-[12px]">
                  <Phone className="w-[14px] h-[14px] text-[#3D4949]" />
                  <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">+91-9123456789</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[8px]">
                <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Email</label>
                <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center gap-[12px]">
                  <Mail className="w-[15px] h-[12px] text-[#3D4949]" />
                  <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">ramudu@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-[48px] mb-[28px]">
              <div className="flex-1 flex flex-col gap-[8px]">
                <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Date of Birth</label>
                <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center gap-[12px]">
                  <CalendarDays className="w-[14px] h-[15px] text-[#3D4949]" />
                  <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">13/01/1986</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[8px]">
                <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Religion</label>
                <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center">
                  <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">Hindu</span>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex gap-[48px]">
              <div className="flex-1 flex flex-col gap-[8px]">
                <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Gender</label>
                <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center">
                  <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">Male</span>
                </div>
              </div>
              <div className="flex-1"></div> {/* Empty space for grid alignment */}
            </div>
          </div>

          {/* Google Location Link */}
          <div style={{
            position: 'absolute',
            left: '48px',
            top: '694px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '16px', color: '#000000' }}>Google Location of Land</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 500, fontSize: '16px', textDecorationLine: 'underline', color: '#1D7ABE' }}>
              17.4835850, 78.3805050
            </span>
          </div>

          {/* Footer Actions */}
          <div style={{
            position: 'absolute',
            height: '68px',
            left: '56px',
            right: '48px',
            top: '763px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleBack}
                style={{
                  width: '121px',
                  height: '38px',
                  border: '1px solid rgba(0, 0, 0, 0.27)',
                  borderRadius: '33px',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 500, fontSize: '14px', color: 'rgba(0, 0, 0, 0.8)' }}>
                  Turn Back
                </span>
              </button>
              <button 
                onClick={handleBack}
                style={{
                  width: '121px',
                  height: '38px',
                  background: '#2780C4',
                  borderRadius: '33px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '14px', color: '#FFFFFF' }}>
                  Approve
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default VerificationOfficerAssignedFarmlandsOwnerDetails;
