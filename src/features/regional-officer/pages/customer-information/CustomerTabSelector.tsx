import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeCheck, Check } from 'lucide-react';

interface CustomerTabSelectorProps {
  targetId: string;
  activeTab: 'owner' | 'family' | 'land';
}

export const CustomerTabSelector: React.FC<CustomerTabSelectorProps> = ({
  targetId,
  activeTab
}) => {
  const navigate = useNavigate();

  return (
    <div className="owner-details-tab-bar">
      {/* Tab 1 */}
      <div
        onClick={() => navigate(`/regional-officer/assigned-farmlands-upload/${targetId}`)}
        className={`owner-details-tab ${activeTab === 'owner' ? 'active' : 'inactive'} tab-1`}
      >
        <span className={`owner-details-tab-text ${activeTab === 'owner' ? 'active' : ''}`}>Owner Details</span>
        <div className="relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
          <BadgeCheck className="w-4.5 h-4.5 text-[#3D93D1]" fill="#3D93D1" />
          <Check className="absolute w-2.5 h-2.5 text-white" strokeWidth={4} />
        </div>
      </div>

      {/* Tab 2 */}
      <div
        onClick={() => navigate(`/regional-officer/assigned-farmlands-family-tree/${targetId}`)}
        className={`owner-details-tab ${activeTab === 'family' ? 'active' : 'inactive'} tab-2`}
      >
        <span className={`owner-details-tab-text ${activeTab === 'family' ? 'active' : ''}`}>Family Tree</span>
        <div className="relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
          <BadgeCheck className="w-4.5 h-4.5 text-[#3D93D1]" fill="#3D93D1" />
          <Check className="absolute w-2.5 h-2.5 text-white" strokeWidth={4} />
        </div>
      </div>

      {/* Tab 3 */}
      <div
        onClick={() => navigate(`/regional-officer/assigned-farmlands-land-details/${targetId}`)}
        className={`owner-details-tab ${activeTab === 'land' ? 'active' : 'inactive'} tab-3`}
      >
        <span className={`owner-details-tab-text ${activeTab === 'land' ? 'active' : ''}`}>Land Details</span>
        <div className="relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
          <BadgeCheck className="w-4.5 h-4.5 text-[#3D93D1]" fill="#3D93D1" />
          <Check className="absolute w-2.5 h-2.5 text-white" strokeWidth={4} />
        </div>
      </div>
    </div>
  );
};
