import React from 'react';
import { MapPin } from 'lucide-react';

export const LocationCard: React.FC = () => {
  return (
    <div className="owner-details-location-card">
      <h3 className="owner-details-location-title">Location of land</h3>
      
      <div className="owner-details-coords-row">
        <MapPin className="w-5 h-5 text-[#ECB72B] shrink-0" />
        <a
          href="https://maps.google.com/?q=17.4835850,78.3805050"
          target="_blank"
          rel="noreferrer"
          className="owner-details-coords-link"
        >
          17.4835850, 78.3805050
        </a>
      </div>

      <div className="owner-details-map-frame">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80"
          alt="Green Farmland Grid Satellite Map View"
          className="owner-details-map-image"
        />
        <div className="owner-details-map-overlay-grid"></div>
      </div>
    </div>
  );
};
