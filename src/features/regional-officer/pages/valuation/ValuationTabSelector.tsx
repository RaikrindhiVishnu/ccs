import React from 'react';

interface ValuationTabSelectorProps {
  subTabs: string[];
  activeSubTab: number;
  completedSubTabs: number[];
  onTabClick: (index: number) => void;
}

export const ValuationTabSelector: React.FC<ValuationTabSelectorProps> = ({
  subTabs,
  activeSubTab,
  completedSubTabs,
  onTabClick
}) => {
  return (
    <div className="submit-form-right-card">
      <div className="boundaries-tabs-container">
        {/* Row 1: Village Map or Naksha, Sub - Register Value, Valuator Report */}
        <div className="boundaries-tabs-row">
          {subTabs.slice(0, 3).map((tabName, idx) => {
            const globalIdx = idx;
            const isActive = globalIdx === activeSubTab;
            const isCompleted = completedSubTabs.includes(globalIdx);
            const widths = [229, 218, 188];
            return (
              <div
                key={globalIdx}
                onClick={() => onTabClick(globalIdx)}
                className={`boundaries-tab-item${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
                style={{
                  width: `${widths[idx]}px`,
                  justifyContent: isCompleted ? 'space-between' : 'flex-start'
                }}
              >
                {!isCompleted && <div className="boundaries-tab-dot"></div>}
                <span className="boundaries-tab-text">{tabName}</span>
                {isCompleted && (
                  <div className="boundaries-tab-checkmark-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_603_24265)">
                        <path d="M17.4375 9C17.4375 9.72 16.553 10.3134 16.3758 10.9772C16.193 11.6634 16.6556 12.6197 16.3083 13.2202C15.9553 13.8305 14.8936 13.9036 14.3986 14.3986C13.9036 14.8936 13.8305 15.9553 13.2202 16.3083C12.6197 16.6556 11.6634 16.193 10.9772 16.3758C10.3134 16.553 9.72 17.4375 9 17.4375C8.28 17.4375 7.68656 16.553 7.02281 16.3758C6.33656 16.193 5.38031 16.6556 4.77984 16.3083C4.16953 15.9553 4.09641 14.8936 3.60141 14.3986C3.10641 13.9036 2.04469 13.8305 1.69172 13.2202C1.34437 12.6197 1.80703 11.6634 1.62422 10.9772C1.44703 10.3134 0.5625 9.72 0.5625 9C0.5625 8.28 1.44703 7.68656 1.62422 7.02281C1.80703 6.33656 1.34437 5.38031 1.69172 4.77984C2.04469 4.16953 3.10641 4.09641 3.60141 3.60141C4.09641 3.10641 4.16953 2.04469 4.77984 1.69172C5.38031 1.34437 6.33656 1.80703 7.02281 1.62422C7.68656 1.44703 8.28 0.5625 9 0.5625C9.72 0.5625 10.3134 1.44703 10.9772 1.62422C11.6634 1.80703 12.6197 1.34437 13.2202 1.69172C13.8305 2.04469 13.9036 3.10641 14.3986 3.60141C14.8936 4.09641 15.9553 4.16953 16.3083 4.77984C16.6556 5.38031 16.193 6.33656 16.3758 7.02281C16.553 7.68656 17.4375 8.28 17.4375 9Z" fill="#2780C4"/>
                        <path d="M11.4376 6.4859L8.22574 9.69777L6.56074 8.03418C6.19934 7.67277 5.61293 7.67277 5.25152 8.03418C4.89012 8.39559 4.89012 8.98199 5.25152 9.3434L7.5873 11.6792C7.93887 12.0307 8.5098 12.0307 8.86137 11.6792L12.7454 7.79512C13.1068 7.43371 13.1068 6.8473 12.7454 6.4859C12.384 6.12449 11.799 6.12449 11.4376 6.4859Z" fill="#FFFCEE"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_603_24265">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Row 2: Legal Opinion Report, Road Approach, Recent Transactions */}
        <div className="boundaries-tabs-row">
          {subTabs.slice(3, 6).map((tabName, idx) => {
            const globalIdx = idx + 3;
            const isActive = globalIdx === activeSubTab;
            const isCompleted = completedSubTabs.includes(globalIdx);
            const widths = [225, 188, 219];
            return (
              <div
                key={globalIdx}
                onClick={() => onTabClick(globalIdx)}
                className={`boundaries-tab-item${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
                style={{
                  width: `${widths[idx]}px`,
                  justifyContent: isCompleted ? 'space-between' : 'flex-start'
                }}
              >
                {!isCompleted && <div className="boundaries-tab-dot"></div>}
                <span className="boundaries-tab-text">{tabName}</span>
                {isCompleted && (
                  <div className="boundaries-tab-checkmark-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_603_24265)">
                        <path d="M17.4375 9C17.4375 9.72 16.553 10.3134 16.3758 10.9772C16.193 11.6634 16.6556 12.6197 16.3083 13.2202C15.9553 13.8305 14.8936 13.9036 14.3986 14.3986C13.9036 14.8936 13.8305 15.9553 13.2202 16.3083C12.6197 16.6556 11.6634 16.193 10.9772 16.3758C10.3134 16.553 9.72 17.4375 9 17.4375C8.28 17.4375 7.68656 16.553 7.02281 16.3758C6.33656 16.193 5.38031 16.6556 4.77984 16.3083C4.16953 15.9553 4.09641 14.8936 3.60141 14.3986C3.10641 13.9036 2.04469 13.8305 1.69172 13.2202C1.34437 12.6197 1.80703 11.6634 1.62422 10.9772C1.44703 10.3134 0.5625 9.72 0.5625 9C0.5625 8.28 1.44703 7.68656 1.62422 7.02281C1.80703 6.33656 1.34437 5.38031 1.69172 4.77984C2.04469 4.16953 3.10641 4.09641 3.60141 3.60141C4.09641 3.10641 4.16953 2.04469 4.77984 1.69172C5.38031 1.34437 6.33656 1.80703 7.02281 1.62422C7.68656 1.44703 8.28 0.5625 9 0.5625C9.72 0.5625 10.3134 1.44703 10.9772 1.62422C11.6634 1.80703 12.6197 1.34437 13.2202 1.69172C13.8305 2.04469 13.9036 3.10641 14.3986 3.60141C14.8936 4.09641 15.9553 4.16953 16.3083 4.77984C16.6556 5.38031 16.193 6.33656 16.3758 7.02281C16.553 7.68656 17.4375 8.28 17.4375 9Z" fill="#2780C4"/>
                        <path d="M11.4376 6.4859L8.22574 9.69777L6.56074 8.03418C6.19934 7.67277 5.61293 7.67277 5.25152 8.03418C4.89012 8.39559 4.89012 8.98199 5.25152 9.3434L7.5873 11.6792C7.93887 12.0307 8.5098 12.0307 8.86137 11.6792L12.7454 7.79512C13.1068 7.43371 13.1068 6.8473 12.7454 6.4859C12.384 6.12449 11.799 6.12449 11.4376 6.4859Z" fill="#FFFCEE"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_603_24265">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Row 3: Geological Advantages, Future Plans, Validating Disadvantages */}
        <div className="boundaries-tabs-row">
          {subTabs.slice(6, 9).map((tabName, idx) => {
            const globalIdx = idx + 6;
            const isActive = globalIdx === activeSubTab;
            const isCompleted = completedSubTabs.includes(globalIdx);
            const widths = [240, 165, 253];
            return (
              <div
                key={globalIdx}
                onClick={() => onTabClick(globalIdx)}
                className={`boundaries-tab-item${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
                style={{
                  width: `${widths[idx]}px`,
                  justifyContent: isCompleted ? 'space-between' : 'flex-start'
                }}
              >
                {!isCompleted && <div className="boundaries-tab-dot"></div>}
                <span className="boundaries-tab-text">{tabName}</span>
                {isCompleted && (
                  <div className="boundaries-tab-checkmark-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_603_24265)">
                        <path d="M17.4375 9C17.4375 9.72 16.553 10.3134 16.3758 10.9772C16.193 11.6634 16.6556 12.6197 16.3083 13.2202C15.9553 13.8305 14.8936 13.9036 14.3986 14.3986C13.9036 14.8936 13.8305 15.9553 13.2202 16.3083C12.6197 16.6556 11.6634 16.193 10.9772 16.3758C10.3134 16.553 9.72 17.4375 9 17.4375C8.28 17.4375 7.68656 16.553 7.02281 16.3758C6.33656 16.193 5.38031 16.6556 4.77984 16.3083C4.16953 15.9553 4.09641 14.8936 3.60141 14.3986C3.10641 13.9036 2.04469 13.8305 1.69172 13.2202C1.34437 12.6197 1.80703 11.6634 1.62422 10.9772C1.44703 10.3134 0.5625 9.72 0.5625 9C0.5625 8.28 1.44703 7.68656 1.62422 7.02281C1.80703 6.33656 1.34437 5.38031 1.69172 4.77984C2.04469 4.16953 3.10641 4.09641 3.60141 3.60141C4.09641 3.10641 4.16953 2.04469 4.77984 1.69172C5.38031 1.34437 6.33656 1.80703 7.02281 1.62422C7.68656 1.44703 8.28 0.5625 9 0.5625C9.72 0.5625 10.3134 1.44703 10.9772 1.62422C11.6634 1.80703 12.6197 1.34437 13.2202 1.69172C13.8305 2.04469 13.9036 3.10641 14.3986 3.60141C14.8936 4.09641 15.9553 4.16953 16.3083 4.77984C16.6556 5.38031 16.193 6.33656 16.3758 7.02281C16.553 7.68656 17.4375 8.28 17.4375 9Z" fill="#2780C4"/>
                        <path d="M11.4376 6.4859L8.22574 9.69777L6.56074 8.03418C6.19934 7.67277 5.61293 7.67277 5.25152 8.03418C4.89012 8.39559 4.89012 8.98199 5.25152 9.3434L7.5873 11.6792C7.93887 12.0307 8.5098 12.0307 8.86137 11.6792L12.7454 7.79512C13.1068 7.43371 13.1068 6.8473 12.7454 6.4859C12.384 6.12449 11.799 6.12449 11.4376 6.4859Z" fill="#FFFCEE"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_603_24265">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Row 4: Upcoming Infrastrucutres, Railway Track Connectivity, Airport Connectivity */}
        <div className="boundaries-tabs-row">
          {subTabs.slice(9, 12).map((tabName, idx) => {
            const globalIdx = idx + 9;
            const isActive = globalIdx === activeSubTab;
            const isCompleted = completedSubTabs.includes(globalIdx);
            const widths = [256, 263, 220];
            return (
              <div
                key={globalIdx}
                onClick={() => onTabClick(globalIdx)}
                className={`boundaries-tab-item${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
                style={{
                  width: `${widths[idx]}px`,
                  justifyContent: isCompleted ? 'space-between' : 'flex-start'
                }}
              >
                {!isCompleted && <div className="boundaries-tab-dot"></div>}
                <span className="boundaries-tab-text">{tabName}</span>
                {isCompleted && (
                  <div className="boundaries-tab-checkmark-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_603_24265)">
                        <path d="M17.4375 9C17.4375 9.72 16.553 10.3134 16.3758 10.9772C16.193 11.6634 16.6556 12.6197 16.3083 13.2202C15.9553 13.8305 14.8936 13.9036 14.3986 14.3986C13.9036 14.8936 13.8305 15.9553 13.2202 16.3083C12.6197 16.6556 11.6634 16.193 10.9772 16.3758C10.3134 16.553 9.72 17.4375 9 17.4375C8.28 17.4375 7.68656 16.553 7.02281 16.3758C6.33656 16.193 5.38031 16.6556 4.77984 16.3083C4.16953 15.9553 4.09641 14.8936 3.60141 14.3986C3.10641 13.9036 2.04469 13.8305 1.69172 13.2202C1.34437 12.6197 1.80703 11.6634 1.62422 10.9772C1.44703 10.3134 0.5625 9.72 0.5625 9C0.5625 8.28 1.44703 7.68656 1.62422 7.02281C1.80703 6.33656 1.34437 5.38031 1.69172 4.77984C2.04469 4.16953 3.10641 4.09641 3.60141 3.60141C4.09641 3.10641 4.16953 2.04469 4.77984 1.69172C5.38031 1.34437 6.33656 1.80703 7.02281 1.62422C7.68656 1.44703 8.28 0.5625 9 0.5625C9.72 0.5625 10.3134 1.44703 10.9772 1.62422C11.6634 1.80703 12.6197 1.34437 13.2202 1.69172C13.8305 2.04469 13.9036 3.10641 14.3986 3.60141C14.8936 4.09641 15.9553 4.16953 16.3083 4.77984C16.6556 5.38031 16.193 6.33656 16.3758 7.02281C16.553 7.68656 17.4375 8.28 17.4375 9Z" fill="#2780C4"/>
                        <path d="M11.4376 6.4859L8.22574 9.69777L6.56074 8.03418C6.19934 7.67277 5.61293 7.67277 5.25152 8.03418C4.89012 8.39559 4.89012 8.98199 5.25152 9.3434L7.5873 11.6792C7.93887 12.0307 8.5098 12.0307 8.86137 11.6792L12.7454 7.79512C13.1068 7.43371 13.1068 6.8473 12.7454 6.4859C12.384 6.12449 11.799 6.12449 11.4376 6.4859Z" fill="#FFFCEE"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_603_24265">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
