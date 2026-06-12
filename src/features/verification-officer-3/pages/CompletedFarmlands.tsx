import { useNavigate } from 'react-router-dom';
import VO3CompleteCard from '../components/VO3CompleteCard';

export const CompletedFarmlands = () => {
  const navigate = useNavigate();

  const baseCases = [
    { id: "GLC-VO3-06", title: "Kurnool Nandyal Farm", location: "Kurnool, Nandyal", landSize: "10 Acres", landValue: "₹1.5Cr", verificationDate: "06 Oct 2023, 11:30AM", priority: "LOW" as const },
    { id: "GLC-VO3-07", title: "Krishna Estate", location: "Krishna, Machilipatnam", landSize: "18 Acres", landValue: "₹3.5Cr", verificationDate: "05 Oct 2023, 2:15PM", priority: "HIGH" as const },
    { id: "GLC-VO3-08", title: "Mysuru Estate", location: "Guntur, Andhra Pradesh", landSize: "150 Acres", landValue: "37 Lakhs", verificationDate: "12 Oct 2023, 4:30PM", priority: "MEDIUM" as const },
    { id: "GLC-VO3-09", title: "Nellore Farms", location: "Nellore, Gudur", landSize: "25 Acres", landValue: "₹1.2Cr", verificationDate: "04 Oct 2023, 10:00AM", priority: "LOW" as const },
    { id: "GLC-VO3-10", title: "Anantapur Orchard", location: "Anantapur, Gooty", landSize: "40 Acres", landValue: "₹2.8Cr", verificationDate: "02 Oct 2023, 5:00PM", priority: "HIGH" as const },
    { id: "GLC-VO3-11", title: "Chittoor Mango Grove", location: "Chittoor, Madanapalle", landSize: "30 Acres", landValue: "₹1.9Cr", verificationDate: "01 Oct 2023, 9:30AM", priority: "MEDIUM" as const },
  ];

  return (
    <div className="w-full flex flex-col ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 mb-[clamp(1.5rem,2.5vw,4.5rem)]">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-[clamp(0.125rem,0.25vw,1.0rem)]">
          <h1 className="font-plus-jakarta font-bold text-[#1A1C1D] text-[clamp(1.3rem,1.8vw,2.5rem)] tracking-[-1.2px] leading-[clamp(2.2rem,3.33vw,4.0rem)] m-0">
            Completed Farmlands
          </h1>
          <p className="font-plus-jakarta font-normal text-[#3D4949] text-[clamp(0.85rem,1.11vw,1.5rem)] leading-[clamp(1.4rem,1.94vw,2.5rem)] m-0">
            Fully audited and verified farmland assets.
          </p>
        </div>

      </div>

      {/* Grid of Cards */}
      {baseCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(0.8rem,1.11vw,1.5rem)] gap-y-[clamp(1.0rem,1.52vw,2.0rem)] w-full pb-[40px]">
          {baseCases.map((farmland) => (
            <VO3CompleteCard
              key={farmland.id}
              id={farmland.id}
              title={farmland.title}
              location={farmland.location}
              landSize={farmland.landSize}
              landValue={farmland.landValue}
              verificationDate={farmland.verificationDate}
              status="VERIFIED"
              onCardClick={() => navigate(`/verification-officer-3/completed-farmland/${farmland.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[rgba(225,226,237,0.5)] rounded-[24px] p-12 text-center text-[#505F76] font-medium shadow-sm w-full">
          No completed farmlands found matching criteria.
        </div>
      )}
    </div>
  );
};

export default CompletedFarmlands;
