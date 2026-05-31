import React from 'react';
import { BadgeCheck, Check } from 'lucide-react';

interface AgricultureTabSelectorProps {
  tags: string[];
  activeSubTab: number;
  onSubTabClick: (index: number) => void;
  completedSubTabs: number[];
}

export const AgricultureTabSelector: React.FC<AgricultureTabSelectorProps> = ({
  tags,
  activeSubTab,
  onSubTabClick,
  completedSubTabs
}) => {
  return (
    <div className="submit-form-right-card">
      <div className="submit-form-tags-grid">
        {tags.map((tag, idx) => {
          const isActive = activeSubTab === idx;
          const isCompleted = completedSubTabs.includes(idx);
          
          return (
            <div
              key={idx}
              onClick={() => onSubTabClick(idx)}
              className="submit-form-tag-item"
              style={{
                cursor: 'pointer',
                background: '#FFFFFF',
                border: isActive
                  ? '1.5px solid #2780C4'
                  : '1px solid rgba(0, 0, 0, 0.15)',
                padding: '8px 20px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                borderRadius: '72.5px',
                height: '38px',
                boxSizing: 'border-box'
              }}
            >
              {!isCompleted && (
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#2780C4',
                  borderRadius: '50%',
                  flexShrink: 0
                }} />
              )}
              <span
                className="submit-form-tag-text"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  color: isActive ? '#2780C4' : '#5A5C5E'
                }}
              >
                {tag}
              </span>
              {isCompleted && (
                <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-[18px] h-[18px] text-[#2780C4]" fill="#2780C4" />
                  <Check className="absolute w-2.5 h-2.5 text-white" strokeWidth={4} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
