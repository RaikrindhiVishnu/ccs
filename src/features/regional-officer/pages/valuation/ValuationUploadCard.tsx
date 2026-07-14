import React from 'react';
import { CloudUpload, Mic, Trash2, FileText } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
}

interface ValuationUploadCardProps {
  activeSubTab: number;
  currentUploaded: UploadedFile[];
  currentComment: string;
  isDragOver: boolean;
  setIsDragOver: (drag: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChooseClick: () => void;
  onFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileDelete: (fileId: string) => void;
  onCommentChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  roadType?: string;
  onRoadTypeChange?: (value: string) => void;
  roadWidth?: string;
  onRoadWidthChange?: (value: string) => void;
  txAvailability?: string;
  onTxAvailabilityChange?: (value: string) => void;
  valuationPerAcre?: string;
  onValuationPerAcreChange?: (value: string) => void;
  localMarketAcrePrice?: string;
  onLocalMarketAcrePriceChange?: (value: string) => void;
  geoAvailability?: string | null;
  onGeoAvailabilityChange?: (value: string) => void;
  upcomingInfra?: string;
  onUpcomingInfraChange?: (value: string) => void;
  railwayAvailability?: string;
  onRailwayAvailabilityChange?: (value: string) => void;
  railwayDistance?: string;
  onRailwayDistanceChange?: (value: string) => void;
  airportAvailability?: string;
  onAirportAvailabilityChange?: (value: string) => void;
  airportDistance?: string;
  onAirportDistanceChange?: (value: string) => void;
}

export const ValuationUploadCard: React.FC<ValuationUploadCardProps> = ({
  activeSubTab,
  currentUploaded,
  currentComment,
  isDragOver,
  setIsDragOver,
  fileInputRef: _fileInputRef,
  onFileChooseClick,
  onFileDrop,
  onFileDelete,
  onCommentChange,
  onBack,
  onNext,
  roadType = 'Government Road',
  onRoadTypeChange,
  roadWidth = '100',
  onRoadWidthChange,
  txAvailability = 'Available',
  onTxAvailabilityChange,
  valuationPerAcre = '10,00,000.00',
  onValuationPerAcreChange,
  localMarketAcrePrice = '10,00,000.00',
  onLocalMarketAcrePriceChange,
  geoAvailability = null,
  onGeoAvailabilityChange,
  upcomingInfra = '',
  onUpcomingInfraChange,
  railwayAvailability = 'Available',
  onRailwayAvailabilityChange,
  railwayDistance = '0 - 10 kms',
  onRailwayDistanceChange,
  airportAvailability = 'Available',
  onAirportAvailabilityChange,
  airportDistance = '0 - 10 kms',
  onAirportDistanceChange
}) => {
  if (activeSubTab === 11) {
    return (
      <div className="land-boundaries-bottom-card">
        {/* Any Airpot Connectivity? */}
        <div style={{
          position: 'absolute',
          width: '640px',
          height: '92px',
          left: '30px',
          top: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px'
        }}>
          <span style={{
            width: '640px',
            height: '30px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            color: '#000000'
          }}>
            Any Airpot Connectivity?
          </span>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '25px',
            width: '292px',
            height: '38px'
          }}>
            {/* Available button */}
            <button
              onClick={() => onAirportAvailabilityChange?.('Available')}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 18px',
                gap: '10px',
                width: '120px',
                height: '38px',
                background: airportAvailability === 'Available' ? '#2B2D2F' : '#FFFFFF',
                border: airportAvailability === 'Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                borderRadius: '33px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                width: '84px',
                height: '18px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  width: '12px',
                  height: '12px',
                  background: airportAvailability === 'Available' ? '#3D93D1' : '#FFFFFF',
                  border: '2px solid #85BFE5',
                  borderRadius: '50%'
                }} />
                <span style={{
                  width: '62px',
                  height: '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  color: airportAvailability === 'Available' ? '#FFFFFF' : '#000000'
                }}>
                  Available
                </span>
              </div>
            </button>

            {/* Not Available button */}
            <button
              onClick={() => onAirportAvailabilityChange?.('Not Available')}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 18px',
                gap: '10px',
                width: '147px',
                height: '38px',
                background: airportAvailability === 'Not Available' ? '#2B2D2F' : '#FFFFFF',
                border: airportAvailability === 'Not Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                borderRadius: '33px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                width: '111px',
                height: '18px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  width: '12px',
                  height: '12px',
                  background: airportAvailability === 'Not Available' ? '#3D93D1' : '#FFFFFF',
                  border: '2px solid #85BFE5',
                  borderRadius: '50%'
                }} />
                <span style={{
                  width: '89px',
                  height: '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: airportAvailability === 'Not Available' ? '#FFFFFF' : '#000000'
                }}>
                  Not Available
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Select distance block */}
        <div style={{
          position: 'absolute',
          width: '640px',
          height: '97px',
          left: '30px',
          top: '156px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '13px'
        }}>
          <span style={{
            width: '640px',
            height: '30px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            color: '#000000'
          }}>
            Select distance
          </span>

          <div style={{
            position: 'relative',
            width: '640px',
            height: '54px'
          }}>
            <select
              disabled={airportAvailability === 'Not Available'}
              value={airportDistance}
              onChange={(e) => onAirportDistanceChange?.(e.target.value)}
              style={{
                boxSizing: 'border-box',
                width: '640px',
                height: '54px',
                background: airportAvailability === 'Not Available' ? '#F5F5F5' : '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.4)',
                borderRadius: '8px',
                padding: '0 45px 0 24px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                color: airportAvailability === 'Not Available' ? 'rgba(0, 0, 0, 0.38)' : '#000000',
                cursor: airportAvailability === 'Not Available' ? 'not-allowed' : 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              <option value="0 - 10 kms">0 - 10 kms</option>
              <option value="10 - 20 kms">10 - 20 kms</option>
              <option value="20 - 50 kms">20 - 50 kms</option>
              <option value="50+ kms">50+ kms</option>
            </select>
            {/* Arrow vector */}
            <div style={{
              position: 'absolute',
              right: '25px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              width: '12px',
              height: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="#363434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Add Comments */}
        <span style={{
          position: 'absolute',
          width: '182px',
          height: '30px',
          left: '716px',
          top: '30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '30px',
          color: '#000000'
        }}>
          Add Comments
        </span>

        {/* Comments textarea box — left:716, top:73, 618×181px */}
        <div style={{
          position: 'absolute',
          width: '618px',
          height: '181px',
          left: '716px',
          top: '73px'
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'absolute',
            inset: 0,
            background: 'rgba(187, 219, 240, 0.38)',
            border: '1px solid #96C9ED',
            borderRadius: '18px'
          }} />
          <textarea
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            style={{
              position: 'absolute',
              width: '566px',
              height: '84px',
              left: '26px',
              top: '24px',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#000000',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              left: '572px',
              top: '135px',
              background: '#2680C4',
              borderRadius: '90px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Back + Next buttons — right:25, bottom:26, 254×38px */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          width: '254px',
          height: '38px',
          right: '25px',
          bottom: '26px'
        }}>
          <button
            onClick={onBack}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              border: '1px solid rgba(0, 0, 0, 0.27)',
              borderRadius: '33px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              color: 'rgba(0, 0, 0, 0.8)'
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              background: '#2780C4',
              borderRadius: '33px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '18px',
              color: '#FFFFFF'
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (activeSubTab === 10) {
    return (
      <div className="land-boundaries-bottom-card">
        {/* Any Railway Track Connectivity? */}
        <div style={{
          position: 'absolute',
          width: '640px',
          height: '92px',
          left: '30px',
          top: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px'
        }}>
          <span style={{
            width: '640px',
            height: '30px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            color: '#000000'
          }}>
            Any Railway Track Connectivity?
          </span>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '25px',
            width: '292px',
            height: '38px'
          }}>
            {/* Available button */}
            <button
              onClick={() => onRailwayAvailabilityChange?.('Available')}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 18px',
                gap: '10px',
                width: '120px',
                height: '38px',
                background: railwayAvailability === 'Available' ? '#2B2D2F' : '#FFFFFF',
                border: railwayAvailability === 'Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                borderRadius: '33px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                width: '84px',
                height: '18px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  width: '12px',
                  height: '12px',
                  background: railwayAvailability === 'Available' ? '#3D93D1' : '#FFFFFF',
                  border: '2px solid #85BFE5',
                  borderRadius: '50%'
                }} />
                <span style={{
                  width: '62px',
                  height: '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  color: railwayAvailability === 'Available' ? '#FFFFFF' : '#000000'
                }}>
                  Available
                </span>
              </div>
            </button>

            {/* Not Available button */}
            <button
              onClick={() => onRailwayAvailabilityChange?.('Not Available')}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 18px',
                gap: '10px',
                width: '147px',
                height: '38px',
                background: railwayAvailability === 'Not Available' ? '#2B2D2F' : '#FFFFFF',
                border: railwayAvailability === 'Not Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                borderRadius: '33px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                width: '111px',
                height: '18px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  width: '12px',
                  height: '12px',
                  background: railwayAvailability === 'Not Available' ? '#3D93D1' : '#FFFFFF',
                  border: '2px solid #85BFE5',
                  borderRadius: '50%'
                }} />
                <span style={{
                  width: '89px',
                  height: '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: railwayAvailability === 'Not Available' ? '#FFFFFF' : '#000000'
                }}>
                  Not Available
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Select distance block */}
        <div style={{
          position: 'absolute',
          width: '640px',
          height: '97px',
          left: '30px',
          top: '156px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '13px'
        }}>
          <span style={{
            width: '640px',
            height: '30px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            color: '#000000'
          }}>
            Select distance
          </span>

          <div style={{
            position: 'relative',
            width: '640px',
            height: '54px'
          }}>
            <select
              disabled={railwayAvailability === 'Not Available'}
              value={railwayDistance}
              onChange={(e) => onRailwayDistanceChange?.(e.target.value)}
              style={{
                boxSizing: 'border-box',
                width: '640px',
                height: '54px',
                background: railwayAvailability === 'Not Available' ? '#F5F5F5' : '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.4)',
                borderRadius: '8px',
                padding: '0 45px 0 24px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                color: railwayAvailability === 'Not Available' ? 'rgba(0, 0, 0, 0.38)' : '#000000',
                cursor: railwayAvailability === 'Not Available' ? 'not-allowed' : 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              <option value="0 - 10 kms">0 - 10 kms</option>
              <option value="10 - 20 kms">10 - 20 kms</option>
              <option value="20 - 50 kms">20 - 50 kms</option>
              <option value="50+ kms">50+ kms</option>
            </select>
            {/* Arrow vector */}
            <div style={{
              position: 'absolute',
              right: '25px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              width: '12px',
              height: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="#363434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Add Comments */}
        <span style={{
          position: 'absolute',
          width: '182px',
          height: '30px',
          left: '716px',
          top: '30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '30px',
          color: '#000000'
        }}>
          Add Comments
        </span>

        {/* Comments textarea box — left:716, top:73, 618×181px */}
        <div style={{
          position: 'absolute',
          width: '618px',
          height: '181px',
          left: '716px',
          top: '73px'
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'absolute',
            inset: 0,
            background: 'rgba(187, 219, 240, 0.38)',
            border: '1px solid #96C9ED',
            borderRadius: '18px'
          }} />
          <textarea
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            style={{
              position: 'absolute',
              width: '566px',
              height: '84px',
              left: '26px',
              top: '24px',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#000000',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              left: '572px',
              top: '135px',
              background: '#2680C4',
              borderRadius: '90px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Back + Next buttons — right:25, bottom:26, 254×38px */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          width: '254px',
          height: '38px',
          right: '25px',
          bottom: '26px'
        }}>
          <button
            onClick={onBack}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              border: '1px solid rgba(0, 0, 0, 0.27)',
              borderRadius: '33px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              color: 'rgba(0, 0, 0, 0.8)'
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              background: '#2780C4',
              borderRadius: '33px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '18px',
              color: '#FFFFFF'
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (activeSubTab === 9) {
    return (
      <div className="land-boundaries-bottom-card">
        {/* Upcoming Infrastructures */}
        <div style={{
          position: 'absolute',
          width: '640px',
          height: '97px',
          left: '30px',
          top: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '13px'
        }}>
          <span style={{
            width: '640px',
            height: '30px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            color: '#000000'
          }}>
            Upcoming Infrastructures
          </span>

          {/* Select wrapper container */}
          <div style={{
            position: 'relative',
            width: '640px',
            height: '54px'
          }}>
            <select
              value={upcomingInfra}
              onChange={(e) => onUpcomingInfraChange?.(e.target.value)}
              style={{
                boxSizing: 'border-box',
                width: '640px',
                height: '54px',
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.4)',
                borderRadius: '8px',
                padding: '0 45px 0 20px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '16px',
                color: upcomingInfra ? '#000000' : 'rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              <option value="" disabled hidden>Select Upcoming Infrastructure</option>
              <option value="Highway Expansion" style={{ color: '#000000' }}>Highway Expansion</option>
              <option value="Metro/Railway Project" style={{ color: '#000000' }}>Metro/Railway Project</option>
              <option value="Industrial Corridor" style={{ color: '#000000' }}>Industrial Corridor</option>
              <option value="No Major Project Planned" style={{ color: '#000000' }}>No Major Project Planned</option>
            </select>
            {/* Custom dropdown arrow */}
            <div style={{
              position: 'absolute',
              right: '25px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              width: '12px',
              height: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="#363434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Add Comments */}
        <span style={{
          position: 'absolute',
          width: '182px',
          height: '30px',
          left: '716px',
          top: '30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '30px',
          color: '#000000'
        }}>
          Add Comments
        </span>

        {/* Comments textarea box — left:716, top:73, 618×181px */}
        <div style={{
          position: 'absolute',
          width: '618px',
          height: '181px',
          left: '716px',
          top: '73px'
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'absolute',
            inset: 0,
            background: 'rgba(187, 219, 240, 0.38)',
            border: '1px solid #96C9ED',
            borderRadius: '18px'
          }} />
          <textarea
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            style={{
              position: 'absolute',
              width: '566px',
              height: '84px',
              left: '26px',
              top: '24px',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#000000',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              left: '572px',
              top: '135px',
              background: '#2680C4',
              borderRadius: '90px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Back + Next buttons — right:25, bottom:26, 254×38px */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          width: '254px',
          height: '38px',
          right: '25px',
          bottom: '26px'
        }}>
          <button
            onClick={onBack}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              border: '1px solid rgba(0, 0, 0, 0.27)',
              borderRadius: '33px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              color: 'rgba(0, 0, 0, 0.8)'
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              background: '#2780C4',
              borderRadius: '33px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '18px',
              color: '#FFFFFF'
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (activeSubTab === 8) {
    return (
      <div className="land-boundaries-bottom-card">
        {/* Validating the Disadvantages of the Land */}
        <span style={{
          position: 'absolute',
          width: '550px',
          height: '30px',
          left: '30px',
          top: '30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '30px',
          color: '#000000'
        }}>
          Validating the Disadvantages of the Land
        </span>

        {/* Comments textarea box — left:30, top:73, 618×181px */}
        <div style={{
          position: 'absolute',
          width: '618px',
          height: '181px',
          left: '30px',
          top: '73px'
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'absolute',
            inset: 0,
            background: 'rgba(187, 219, 240, 0.38)',
            border: '1px solid #96C9ED',
            borderRadius: '18px'
          }} />
          <textarea
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            style={{
              position: 'absolute',
              width: '566px',
              height: '84px',
              left: '26px',
              top: '24px',
              fontFamily: "'Inter', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '17px',
              color: 'rgba(0, 0, 0, 0.8)',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              left: '572px',
              top: '135px',
              background: '#2680C4',
              borderRadius: '90px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Back + Next buttons — right:25, bottom:26, 254×38px */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          width: '254px',
          height: '38px',
          right: '25px',
          bottom: '26px'
        }}>
          <button
            onClick={onBack}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              border: '1px solid rgba(0, 0, 0, 0.27)',
              borderRadius: '33px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              color: 'rgba(0, 0, 0, 0.8)'
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              background: '#2780C4',
              borderRadius: '33px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '18px',
              color: '#FFFFFF'
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (activeSubTab === 7) {
    return (
      <div className="land-boundaries-bottom-card">
        {/* Future Plans of Geographical Advantages */}
        <span style={{
          position: 'absolute',
          width: '476px',
          height: '30px',
          left: '30px',
          top: '30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '30px',
          color: '#000000'
        }}>
          Future Plans of Geographical Advantages
        </span>

        {/* Comments textarea box — left:30, top:73, 618×181px */}
        <div style={{
          position: 'absolute',
          width: '618px',
          height: '181px',
          left: '30px',
          top: '73px'
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'absolute',
            inset: 0,
            background: 'rgba(187, 219, 240, 0.38)',
            border: '1px solid #96C9ED',
            borderRadius: '18px'
          }} />
          <textarea
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            style={{
              position: 'absolute',
              width: '566px',
              height: '84px',
              left: '26px',
              top: '24px',
              fontFamily: "'Inter', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '17px',
              color: 'rgba(0, 0, 0, 0.8)',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              left: '572px',
              top: '135px',
              background: '#2680C4',
              borderRadius: '90px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Back + Next buttons — right:25, bottom:26, 254×38px */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          width: '254px',
          height: '38px',
          right: '25px',
          bottom: '26px'
        }}>
          <button
            onClick={onBack}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              border: '1px solid rgba(0, 0, 0, 0.27)',
              borderRadius: '33px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              color: 'rgba(0, 0, 0, 0.8)'
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              background: '#2780C4',
              borderRadius: '33px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '18px',
              color: '#FFFFFF'
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (activeSubTab === 6) {
    return (
      <div className="land-boundaries-bottom-card">
        {/* Any Surrounding Mines & Geological Advantages? */}
        <div style={{
          position: 'absolute',
          width: '640px',
          height: '92px',
          left: '30px',
          top: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px'
        }}>
          <span style={{
            width: '640px',
            height: '30px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            color: '#000000'
          }}>
            Any Surrounding Mines & Geological Advantages?
          </span>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '25px',
            width: '307px',
            height: '38px'
          }}>
            {/* Available button */}
            <button
              onClick={() => onGeoAvailabilityChange?.('Available')}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 18px',
                gap: '10px',
                width: '135px',
                height: '38px',
                background: geoAvailability === 'Available' ? '#2B2D2F' : '#FFFFFF',
                border: geoAvailability === 'Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                borderRadius: '33px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                width: '97px',
                height: '18px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  width: '12px',
                  height: '12px',
                  background: geoAvailability === 'Available' ? '#3D93D1' : '#FFFFFF',
                  border: '2px solid #85BFE5',
                  borderRadius: '50%',
                  margin: '0px -4px'
                }} />
                <span style={{
                  width: '89px',
                  height: '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: geoAvailability === 'Available' ? '#FFFFFF' : '#000000'
                }}>
                  Available
                </span>
              </div>
            </button>

            {/* Not Available button */}
            <button
              onClick={() => onGeoAvailabilityChange?.('Not Available')}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 18px',
                gap: '10px',
                width: '147px',
                height: '38px',
                background: geoAvailability === 'Not Available' ? '#2B2D2F' : '#FFFFFF',
                border: geoAvailability === 'Not Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                borderRadius: '33px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                width: '111px',
                height: '18px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  width: '12px',
                  height: '12px',
                  background: geoAvailability === 'Not Available' ? '#3D93D1' : '#FFFFFF',
                  border: '2px solid #85BFE5',
                  borderRadius: '50%'
                }} />
                <span style={{
                  width: '89px',
                  height: '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: geoAvailability === 'Not Available' ? '#FFFFFF' : '#000000'
                }}>
                  Not Available
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Add Comments */}
        <span style={{
          position: 'absolute',
          width: '182px',
          height: '30px',
          left: '716px',
          top: '30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '30px',
          color: '#000000'
        }}>
          Add Comments
        </span>

        {/* Comments textarea box — left:716, top:73, 618×181px */}
        <div style={{
          position: 'absolute',
          width: '618px',
          height: '181px',
          left: '716px',
          top: '73px'
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'absolute',
            inset: 0,
            background: 'rgba(187, 219, 240, 0.38)',
            border: '1px solid #96C9ED',
            borderRadius: '18px'
          }} />
          <textarea
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            style={{
              position: 'absolute',
              width: '566px',
              height: '84px',
              left: '26px',
              top: '24px',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#000000',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              left: '572px',
              top: '135px',
              background: '#2680C4',
              borderRadius: '90px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Back + Next buttons — right:25, bottom:26, 254×38px */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          width: '254px',
          height: '38px',
          right: '25px',
          bottom: '26px'
        }}>
          <button
            onClick={onBack}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              border: '1px solid rgba(0, 0, 0, 0.27)',
              borderRadius: '33px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              color: 'rgba(0, 0, 0, 0.8)'
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              background: '#2780C4',
              borderRadius: '33px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '18px',
              color: '#FFFFFF'
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (activeSubTab === 5) {
    return (
      <div className="land-boundaries-bottom-card">
        {/* Any recent transaction in surrounding lands? */}
        <div style={{
          position: 'absolute',
          width: '640px',
          height: '86px',
          left: '30px',
          top: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '18px'
        }}>
          <span style={{
            width: '640px',
            height: '30px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            color: '#000000'
          }}>
            Any recent transaction in surrounding lands?
          </span>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '25px',
            width: '292px',
            height: '38px'
          }}>
            {/* Available button */}
            <button
              onClick={() => onTxAvailabilityChange?.('Available')}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 18px',
                gap: '10px',
                width: '120px',
                height: '38px',
                background: txAvailability === 'Available' ? '#2B2D2F' : '#FFFFFF',
                border: txAvailability === 'Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                borderRadius: '33px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                width: '84px',
                height: '18px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  width: '12px',
                  height: '12px',
                  background: txAvailability === 'Available' ? '#3D93D1' : '#FFFFFF',
                  border: '2px solid #85BFE5',
                  borderRadius: '50%'
                }} />
                <span style={{
                  width: '62px',
                  height: '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  color: txAvailability === 'Available' ? '#FFFFFF' : '#000000'
                }}>
                  Available
                </span>
              </div>
            </button>

            {/* Not Available button */}
            <button
              onClick={() => onTxAvailabilityChange?.('Not Available')}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 18px',
                gap: '10px',
                width: '147px',
                height: '38px',
                background: txAvailability === 'Not Available' ? '#2B2D2F' : '#FFFFFF',
                border: txAvailability === 'Not Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                borderRadius: '33px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                width: '111px',
                height: '18px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  width: '12px',
                  height: '12px',
                  background: txAvailability === 'Not Available' ? '#3D93D1' : '#FFFFFF',
                  border: '2px solid #85BFE5',
                  borderRadius: '50%'
                }} />
                <span style={{
                  width: '89px',
                  height: '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: txAvailability === 'Not Available' ? '#FFFFFF' : '#000000'
                }}>
                  Not Available
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Valuation Per Acre */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '8px',
          position: 'absolute',
          width: '640px',
          height: '82px',
          left: '30px',
          top: '144px'
        }}>
          <span style={{
            width: '640px',
            height: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '20px',
            color: 'rgba(0, 0, 0, 0.92)'
          }}>
            Valuation Per Acre
          </span>
          <div style={{
            boxSizing: 'border-box',
            width: '640px',
            height: '54px',
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.4)',
            borderRadius: '8px',
            position: 'relative'
          }}>
            <input
              type="text"
              value={valuationPerAcre}
              onChange={(e) => onValuationPerAcreChange?.(e.target.value)}
              style={{
                position: 'absolute',
                width: '592px',
                height: '22px',
                left: '24px',
                top: 'calc(50% - 22px/2)',
                fontFamily: "'Inter', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '22px',
                color: '#000000',
                border: 'none',
                outline: 'none',
                background: 'transparent'
              }}
            />
          </div>
        </div>

        {/* Locall Market Acre Price */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '8px',
          position: 'absolute',
          width: '640px',
          height: '82px',
          left: '30px',
          top: '254px'
        }}>
          <span style={{
            width: '640px',
            height: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '20px',
            color: 'rgba(0, 0, 0, 0.92)'
          }}>
            Locall Market Acre Price
          </span>
          <div style={{
            boxSizing: 'border-box',
            width: '640px',
            height: '54px',
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.4)',
            borderRadius: '8px',
            position: 'relative'
          }}>
            <input
              type="text"
              value={localMarketAcrePrice}
              onChange={(e) => onLocalMarketAcrePriceChange?.(e.target.value)}
              style={{
                position: 'absolute',
                width: '592px',
                height: '22px',
                left: '24px',
                top: 'calc(50% - 22px/2)',
                fontFamily: "'Inter', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '22px',
                color: '#000000',
                border: 'none',
                outline: 'none',
                background: 'transparent'
              }}
            />
          </div>
        </div>

        {/* Add Comments */}
        <span style={{
          position: 'absolute',
          width: '182px',
          height: '30px',
          left: '716px',
          top: '30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '30px',
          color: '#000000'
        }}>
          Add Comments
        </span>

        {/* Comments textarea box — left:716, top:73, 618×181px */}
        <div style={{
          position: 'absolute',
          width: '618px',
          height: '181px',
          left: '716px',
          top: '73px'
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'absolute',
            inset: 0,
            background: 'rgba(187, 219, 240, 0.38)',
            border: '1px solid #96C9ED',
            borderRadius: '18px'
          }} />
          <textarea
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            style={{
              position: 'absolute',
              width: '566px',
              height: '84px',
              left: '26px',
              top: '24px',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#000000',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              left: '572px',
              top: '135px',
              background: '#2680C4',
              borderRadius: '90px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Back + Next buttons — right:25, bottom:26, 254×38px */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          width: '254px',
          height: '38px',
          right: '25px',
          bottom: '26px'
        }}>
          <button
            onClick={onBack}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              border: '1px solid rgba(0, 0, 0, 0.27)',
              borderRadius: '33px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              color: 'rgba(0, 0, 0, 0.8)'
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              background: '#2780C4',
              borderRadius: '33px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '18px',
              color: '#FFFFFF'
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (activeSubTab === 4) {
    return (
      <div className="land-boundaries-bottom-card">
        {/* Type of Road Approach */}
        <div style={{
          position: 'absolute',
          width: '640px',
          height: '86px',
          left: '30px',
          top: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '18px'
        }}>
          <span style={{
            width: '640px',
            height: '30px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            color: '#000000'
          }}>
            Type of Road Approach
          </span>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '25px',
            width: '364px',
            height: '38px'
          }}>
            {/* Private Road button */}
            <button
              onClick={() => onRoadTypeChange?.('Private Road')}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 18px',
                gap: '10px',
                width: '143px',
                height: '38px',
                background: roadType === 'Private Road' ? '#2B2D2F' : '#FFFFFF',
                border: roadType === 'Private Road' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                borderRadius: '33px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                width: '107px',
                height: '18px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  width: '12px',
                  height: '12px',
                  background: roadType === 'Private Road' ? '#3D93D1' : '#FFFFFF',
                  border: '2px solid #85BFE5',
                  borderRadius: '50%'
                }} />
                <span style={{
                  width: '85px',
                  height: '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: roadType === 'Private Road' ? '#FFFFFF' : '#000000'
                }}>
                  Private Road
                </span>
              </div>
            </button>

            {/* Governement Road button */}
            <button
              onClick={() => onRoadTypeChange?.('Government Road')}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 18px',
                gap: '10px',
                width: '196px',
                height: '38px',
                background: roadType === 'Government Road' ? '#2B2D2F' : '#FFFFFF',
                border: roadType === 'Government Road' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                borderRadius: '33px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                width: '160px',
                height: '18px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  width: '12px',
                  height: '12px',
                  background: roadType === 'Government Road' ? '#3D93D1' : '#FFFFFF',
                  border: '2px solid #85BFE5',
                  borderRadius: '50%'
                }} />
                <span style={{
                  width: '138px',
                  height: '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: roadType === 'Government Road' ? '#FFFFFF' : '#000000'
                }}>
                  Governement Road
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Width of the Road (in Feet) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '8px',
          position: 'absolute',
          width: '640px',
          height: '82px',
          left: '30px',
          top: '144px'
        }}>
          <span style={{
            width: '640px',
            height: '20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '20px',
            color: 'rgba(0, 0, 0, 0.92)'
          }}>
            Width of the Road (in Feet)
          </span>
          <div style={{
            boxSizing: 'border-box',
            width: '640px',
            height: '54px',
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.4)',
            borderRadius: '8px',
            position: 'relative'
          }}>
            <input
              type="text"
              value={roadWidth}
              onChange={(e) => onRoadWidthChange?.(e.target.value)}
              style={{
                position: 'absolute',
                width: '592px',
                height: '22px',
                left: '24px',
                top: 'calc(50% - 22px/2)',
                fontFamily: "'Inter', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '22px',
                color: '#000000',
                border: 'none',
                outline: 'none',
                background: 'transparent'
              }}
            />
          </div>
        </div>

        {/* Add Comments */}
        <span style={{
          position: 'absolute',
          width: '182px',
          height: '30px',
          left: '716px',
          top: '30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '30px',
          color: '#000000'
        }}>
          Add Comments
        </span>

        {/* Comments textarea box — left:716, top:73, 618×181px */}
        <div style={{
          position: 'absolute',
          width: '618px',
          height: '181px',
          left: '716px',
          top: '73px'
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'absolute',
            inset: 0,
            background: 'rgba(187, 219, 240, 0.38)',
            border: '1px solid #96C9ED',
            borderRadius: '18px'
          }} />
          <textarea
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            style={{
              position: 'absolute',
              width: '566px',
              height: '84px',
              left: '26px',
              top: '24px',
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#000000',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none'
            }}
          />
          <button
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              left: '572px',
              top: '135px',
              background: '#2680C4',
              borderRadius: '90px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
          </button>
        </div>

        {/* Back + Next buttons — right:25, bottom:26, 254×38px */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          width: '254px',
          height: '38px',
          right: '25px',
          bottom: '26px'
        }}>
          <button
            onClick={onBack}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              border: '1px solid rgba(0, 0, 0, 0.27)',
              borderRadius: '33px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '18px',
              color: 'rgba(0, 0, 0, 0.8)'
            }}
          >
            Back
          </button>
          <button
            onClick={onNext}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '121px',
              height: '38px',
              background: '#2780C4',
              borderRadius: '33px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '18px',
              color: '#FFFFFF'
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="land-boundaries-bottom-card">
      {/* "Upload File" title — left:30, top:30 */}
      <span style={{
        position: 'absolute',
        left: '30px',
        top: '30px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '30px',
        color: '#000000'
      }}>
        Upload File
      </span>

      {/* "Add Comments" title — left:716, top:30 */}
      <span style={{
        position: 'absolute',
        left: '716px',
        top: '30px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '30px',
        color: '#000000'
      }}>
        Add Comments
      </span>

      {/* Upload container box — left:18, top:73, 682×355px */}
      <div className="land-boundaries-upload-container">
        {/* Dashed drag/drop zone — left:12, top:14, 281×327px */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onFileDrop}
          className={`land-boundaries-dashed-dropzone${isDragOver ? ' dragover' : ''}`}
        >
          <div className="land-boundaries-icon-stack">
            <div className="land-boundaries-icon-bg">
              <CloudUpload className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="land-boundaries-upload-title">Upload</span>
          <p className="land-boundaries-upload-desc">
            Drag and drop your files here or click to browse your computer.
          </p>
          <button onClick={onFileChooseClick} className="land-boundaries-btn-choose">
            Choose File
          </button>
          <div className="land-boundaries-format-row">
            <span className="land-boundaries-format-lbl">Format: </span>
            <span className="land-boundaries-format-val">PDF</span>
          </div>
          <div className="land-boundaries-size-row">
            <span className="land-boundaries-size-lbl">Max File Size: </span>
            <span className="land-boundaries-size-val">10MB</span>
          </div>
        </div>

        {/* Uploaded Files section — right of dropzone */}
        <div className="land-boundaries-uploaded-section">
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '25px',
            color: '#000000',
            display: 'block',
            marginBottom: '8px'
          }}>
            Uploaded Files
          </span>

          <div className="land-boundaries-uploaded-list">
            {currentUploaded.length === 0 ? (
              <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', fontFamily: 'Inter, sans-serif' }}>
                No files uploaded yet.
              </span>
            ) : (
              currentUploaded.map((file) => (
                <div key={file.id} className="land-boundaries-file-card">
                  <div className="land-boundaries-file-info">
                    <div className="land-boundaries-file-fallback">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="land-boundaries-file-meta">
                      <span className="land-boundaries-file-name">{file.name}</span>
                      <span className="land-boundaries-file-size">{file.size}</span>
                    </div>
                  </div>
                  <button onClick={() => onFileDelete(file.id)} className="land-boundaries-file-delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Comments textarea box — left:716, top:73, 618×181px */}
      <div style={{
        position: 'absolute',
        width: '618px',
        height: '181px',
        left: '716px',
        top: '73px'
      }}>
        <div style={{
          boxSizing: 'border-box',
          position: 'absolute',
          inset: 0,
          background: 'rgba(187, 219, 240, 0.38)',
          border: '1px solid #96C9ED',
          borderRadius: '18px'
        }} />
        <textarea
          value={currentComment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Write a comment"
          style={{
            position: 'absolute',
            width: '566px',
            height: '84px',
            left: '26px',
            top: '24px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '17px',
            color: 'rgba(0, 0, 0, 0.8)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none'
          }}
        />
        <button
          style={{
            position: 'absolute',
            width: '32px',
            height: '32px',
            left: '572px',
            top: '135px',
            background: '#2680C4',
            borderRadius: '90px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Mic style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
        </button>
      </div>

      {/* Back + Next buttons — right:25, bottom:26, 254×38px */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
        width: '254px',
        height: '38px',
        right: '25px',
        bottom: '26px'
      }}>
        <button
          onClick={onBack}
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            gap: '10px',
            width: '121px',
            height: '38px',
            border: '1px solid rgba(0, 0, 0, 0.27)',
            borderRadius: '33px',
            background: 'transparent',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '18px',
            color: 'rgba(0, 0, 0, 0.8)'
          }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            gap: '10px',
            width: '121px',
            height: '38px',
            background: '#2780C4',
            borderRadius: '33px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '18px',
            color: '#FFFFFF'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
