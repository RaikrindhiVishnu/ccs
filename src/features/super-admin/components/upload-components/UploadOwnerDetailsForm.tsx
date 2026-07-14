import React from "react";
import { Phone, Mail, Calendar } from "lucide-react";

interface UploadOwnerDetailsFormProps {
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  dob: string;
  setDob: (val: string) => void;
  religion: string;
  setReligion: (val: string) => void;
  gender: string;
  setGender: (val: string) => void;
  onDismiss?: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UploadOwnerDetailsForm: React.FC<UploadOwnerDetailsFormProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  dob,
  setDob,
  religion,
  setReligion,
  gender,
  setGender,
  onDismiss,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex-1 flex flex-col justify-between py-[clamp(0.5rem,1.11vw,1.5rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(1.44rem,3vw,3.5rem)] gap-y-[clamp(0.86rem,1.8vw,2.2rem)] w-full">
        {/* First Name */}
        <div className="flex flex-col gap-[clamp(0.27rem,0.56vw,0.8rem)] w-full">
          <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[#3D4949] text-[clamp(0.47rem,0.97vw,1.15rem)] leading-tight tracking-[0.35px] uppercase">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            className="box-sizing-border-box w-full h-[clamp(1.67rem,3.47vw,4.0rem)] bg-[#F3F3F5] rounded-[clamp(0.8rem,1.67vw,2.0rem)] outline-none text-[#1A1C1D] placeholder-[rgba(26,28,29,0.24)] border border-transparent focus:border-[#2D3409]/30 transition-all font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.53rem,1.11vw,1.35rem)] px-[clamp(0.53rem,1.11vw,1.5rem)] py-[clamp(0.4rem,0.83vw,1.1rem)]"
            required
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-[clamp(0.27rem,0.56vw,0.8rem)] w-full">
          <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[#3D4949] text-[clamp(0.47rem,0.97vw,1.15rem)] leading-tight tracking-[0.35px] uppercase">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter second name"
            className="box-sizing-border-box w-full h-[clamp(1.67rem,3.47vw,4.0rem)] bg-[#F3F3F5] rounded-[clamp(0.8rem,1.67vw,2.0rem)] outline-none text-[#1A1C1D] placeholder-[rgba(26,28,29,0.24)] border border-transparent focus:border-[#2D3409]/30 transition-all font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.53rem,1.11vw,1.35rem)] px-[clamp(0.53rem,1.11vw,1.5rem)] py-[clamp(0.4rem,0.83vw,1.1rem)]"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-[clamp(0.27rem,0.56vw,0.8rem)] w-full">
          <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[#3D4949] text-[clamp(0.47rem,0.97vw,1.15rem)] leading-tight tracking-[0.35px] uppercase">
            Phone Number
          </label>
          <div className="relative w-full h-[clamp(1.67rem,3.47vw,4.0rem)] rounded-[clamp(0.8rem,1.67vw,2.0rem)] overflow-hidden">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter mobile number"
              className="box-sizing-border-box w-full h-[clamp(1.67rem,3.47vw,4.0rem)] bg-[#F3F3F5] rounded-[clamp(0.8rem,1.67vw,2.0rem)] outline-none text-[#1A1C1D] placeholder-[rgba(26,28,29,0.24)] border border-transparent focus:border-[#2D3409]/30 transition-all font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.53rem,1.11vw,1.35rem)] pl-[clamp(1.58rem,3.3vw,4.5rem)] pr-[clamp(0.53rem,1.11vw,1.5rem)] py-[clamp(0.4rem,0.83vw,1.1rem)]"
              required
            />
            <Phone 
              className="absolute text-[#3D4949] -translate-y-1/2"
              style={{
                width: "clamp(0.45rem,0.94vw,1.25rem)",
                height: "clamp(0.45rem,0.94vw,1.25rem)",
                left: "clamp(0.53rem,1.11vw,1.5rem)",
                top: "50%"
              }}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-[clamp(0.27rem,0.56vw,0.8rem)] w-full">
          <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[#3D4949] text-[clamp(0.47rem,0.97vw,1.15rem)] leading-tight tracking-[0.35px] uppercase">
            Email
          </label>
          <div className="relative w-full h-[clamp(1.67rem,3.47vw,4.0rem)] rounded-[clamp(0.8rem,1.67vw,2.0rem)] overflow-hidden">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="examplemail@gmail.com"
              className="box-sizing-border-box w-full h-[clamp(1.67rem,3.47vw,4.0rem)] bg-[#F3F3F5] rounded-[clamp(0.8rem,1.67vw,2.0rem)] outline-none text-[#1A1C1D] placeholder-[rgba(26,28,29,0.24)] border border-transparent focus:border-[#2D3409]/30 transition-all font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.53rem,1.11vw,1.35rem)] pl-[clamp(1.58rem,3.3vw,4.5rem)] pr-[clamp(0.53rem,1.11vw,1.5rem)] py-[clamp(0.4rem,0.83vw,1.1rem)]"
              required
            />
            <Mail 
              className="absolute text-[#3D4949] -translate-y-1/2"
              style={{
                width: "clamp(0.5rem,1.04vw,1.35rem)",
                height: "clamp(0.4rem,0.83vw,1.1rem)",
                left: "clamp(0.53rem,1.11vw,1.5rem)",
                top: "50%"
              }}
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-[clamp(0.27rem,0.56vw,0.8rem)] w-full">
          <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[#3D4949] text-[clamp(0.47rem,0.97vw,1.15rem)] leading-tight tracking-[0.35px] uppercase">
            Date of Birth
          </label>
          <div className="relative w-full h-[clamp(1.67rem,3.47vw,4.0rem)] rounded-[clamp(0.8rem,1.67vw,2.0rem)] overflow-hidden">
            <input
              type="text"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="box-sizing-border-box w-full h-[clamp(1.67rem,3.47vw,4.0rem)] bg-[#F3F3F5] rounded-[clamp(0.8rem,1.67vw,2.0rem)] outline-none text-[#1A1C1D] placeholder-[rgba(26,28,29,0.24)] border border-transparent focus:border-[#2D3409]/30 transition-all font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.53rem,1.11vw,1.35rem)] pl-[clamp(1.58rem,3.3vw,4.5rem)] pr-[clamp(0.53rem,1.11vw,1.5rem)] py-[clamp(0.4rem,0.83vw,1.1rem)]"
              required
            />
            <Calendar 
              className="absolute text-[#3D4949] -translate-y-1/2"
              style={{
                width: "clamp(0.45rem,0.94vw,1.25rem)",
                height: "clamp(0.5rem,1.04vw,1.35rem)",
                left: "clamp(0.53rem,1.11vw,1.5rem)",
                top: "50%"
              }}
            />
          </div>
        </div>

        {/* Religion */}
        <div className="flex flex-col gap-[clamp(0.27rem,0.56vw,0.8rem)] w-full">
          <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[#3D4949] text-[clamp(0.47rem,0.97vw,1.15rem)] leading-tight tracking-[0.35px] uppercase">
            Religion
          </label>
          <input
            type="text"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            placeholder="Enter Hindu, Muslim, Christian, etc..."
            className="box-sizing-border-box w-full h-[clamp(1.67rem,3.47vw,4.0rem)] bg-[#F3F3F5] rounded-[clamp(0.8rem,1.67vw,2.0rem)] outline-none text-[#1A1C1D] placeholder-[rgba(26,28,29,0.24)] border border-transparent focus:border-[#2D3409]/30 transition-all font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.53rem,1.11vw,1.35rem)] px-[clamp(0.53rem,1.11vw,1.5rem)] py-[clamp(0.4rem,0.83vw,1.1rem)]"
            required
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-[clamp(0.27rem,0.56vw,0.8rem)] w-full">
          <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[#3D4949] text-[clamp(0.47rem,0.97vw,1.15rem)] leading-tight tracking-[0.35px] uppercase">
            Gender
          </label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Enter male or female"
            className="box-sizing-border-box w-full h-[clamp(1.67rem,3.47vw,4.0rem)] bg-[#F3F3F5] rounded-[clamp(0.8rem,1.67vw,2.0rem)] outline-none text-[#1A1C1D] placeholder-[rgba(26,28,29,0.24)] border border-transparent focus:border-[#2D3409]/30 transition-all font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.53rem,1.11vw,1.35rem)] px-[clamp(0.53rem,1.11vw,1.5rem)] py-[clamp(0.4rem,0.83vw,1.1rem)]"
            required
          />
        </div>
      </div>

      {/* ── Footer CTAs ── */}
      <div className="flex flex-row justify-end items-center gap-[clamp(0.8rem,1.67vw,2.5rem)] pt-[clamp(0.8rem,1.67vw,2.5rem)] border-t border-gray-100 mt-[clamp(1.07rem,2.22vw,3.5rem)]">
        {/* Dismiss Button */}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="font-['Plus_Jakarta_Sans'] font-medium text-[#000000] uppercase hover:underline cursor-pointer tracking-wider text-[clamp(0.47rem,0.97vw,1.25rem)]"
          >
            Dismiss
          </button>
        )}

        {/* Create Button */}
        <button
          type="submit"
          className="flex items-center justify-center text-white rounded-[57px] shadow-lg hover:scale-105 active:scale-95 cursor-pointer font-['Outfit'] font-normal w-[clamp(3.84rem,8vw,10.0rem)] h-[clamp(1.56rem,3.26vw,4.2rem)]"
          style={{
            background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)"
          }}
        >
          <span className="font-['Outfit'] font-normal text-white text-[clamp(0.6rem,1.25vw,1.6rem)]">
            Create
          </span>
        </button>
      </div>
    </form>
  );
};
