import React from 'react';
import { Phone, Mail, Calendar } from 'lucide-react';
import { CustomerTabSelector } from './CustomerTabSelector';

interface CustomerFormProps {
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  dob: string;
  setDob: (val: string) => void;
  religion: string;
  setReligion: (val: string) => void;
  gender: string;
  setGender: (val: string) => void;
  targetId: string;
  onBack: () => void;
  onNext: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  email,
  setEmail,
  dob,
  setDob,
  religion,
  setReligion,
  gender,
  setGender,
  targetId,
  onBack,
  onNext
}) => {
  return (
    <div className="owner-details-central-card">
      {/* Avatar Profile */}
      <div className="owner-details-avatar-wrapper">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
          alt="Ramudu Kumar Profile Avatar"
          className="owner-details-avatar"
        />
      </div>
      <h2 className="owner-details-profile-name">Ramudu Kumar</h2>

      {/* Top Horizontal Tab Bar */}
      <CustomerTabSelector targetId={targetId} activeTab="owner" />

      {/* Information Form Grid */}
      <div className="owner-details-form-grid">
        {/* First Name */}
        <div className="owner-details-form-field">
          <label className="owner-details-field-label">First Name</label>
          <input
            type="text"
            className="owner-details-input-field"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
          />
        </div>

        {/* Last Name */}
        <div className="owner-details-form-field">
          <label className="owner-details-field-label">Last Name</label>
          <input
            type="text"
            className="owner-details-input-field"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
          />
        </div>

        {/* Phone Number */}
        <div className="owner-details-form-field">
          <label className="owner-details-field-label">Phone Number</label>
          <div className="owner-details-field-input-box prefix">
            <Phone className="w-4.5 h-4.5 text-[#3D4949] shrink-0" />
            <input
              type="text"
              className="owner-details-input-field-inline"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
            />
          </div>
        </div>

        {/* Email */}
        <div className="owner-details-form-field">
          <label className="owner-details-field-label">Email</label>
          <div className="owner-details-field-input-box prefix">
            <Mail className="w-4.5 h-4.5 text-[#3D4949] shrink-0" />
            <input
              type="text"
              className="owner-details-input-field-inline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="owner-details-form-field">
          <label className="owner-details-field-label">Date of Birth</label>
          <div className="owner-details-field-input-box prefix">
            <Calendar className="w-4.5 h-4.5 text-[#3D4949] shrink-0" />
            <input
              type="text"
              className="owner-details-input-field-inline"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>

        {/* Religion */}
        <div className="owner-details-form-field">
          <label className="owner-details-field-label">Religion</label>
          <input
            type="text"
            className="owner-details-input-field"
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            placeholder="Enter Religion"
          />
        </div>

        {/* Gender */}
        <div className="owner-details-form-field">
          <label className="owner-details-field-label">Gender</label>
          <input
            type="text"
            className="owner-details-input-field"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Enter Gender"
          />
        </div>
      </div>

      {/* Google Location Link Row */}
      <div className="owner-details-google-loc-row">
        <span className="owner-details-google-loc-lbl">Google Location of Land</span>
        <a
          href="https://maps.google.com/?q=17.4835850,78.3805050"
          target="_blank"
          rel="noreferrer"
          className="owner-details-google-loc-link"
        >
          17.4835850, 78.3805050
        </a>
      </div>

      {/* Footer Actions Wrapper */}
      <div className="owner-details-footer-actions">
        <div className="owner-details-footer-btns-group">
          <button onClick={onBack} className="owner-details-btn-back">
            Back
          </button>
          <button onClick={onNext} className="owner-details-btn-next">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
