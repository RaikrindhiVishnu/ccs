import React from "react";
import { LegalUploadFile } from "./LegalUploadFile";
import { AgricultureReportUploadFile } from "./AgricultureReportUploadFile";
import { LandAndBoundariesUploadFile } from "./LandAndBoundariesUploadFile";
import { ValuationUploadFile } from "./ValuationUploadFile";
import { LocalIntelligenceUploadFile } from "./LocalIntelligenceUploadFile";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
  imageType?: "cover" | "land";
}

interface UploadFilesDocumentProps {
  activeTabLabel: string;
  uploadedFiles: UploadedFileItem[];
  commentValue: string;
  onCommentChange: (val: string) => void;
  onFileUpload: (files: FileList, imageType?: "cover" | "land") => void;
  onFileDelete: (fileId: string) => void;
  onPrevTab: () => void;
  onNextTab: () => void;
  isFinishStep: boolean;
  className?: string;
  style?: React.CSSProperties;
  selectedSoilType?: string;
  onSoilTypeChange?: (val: string) => void;
  selectedCropType?: string;
  onCropTypeChange?: (val: string) => void;
  waterLevelValue?: string;
  onWaterLevelChange?: (val: string) => void;
  selectedFutureCrops?: string;
  onFutureCropsChange?: (val: string) => void;
  yieldCostValue?: string;
  onYieldCostChange?: (val: string) => void;
  yieldReturnsValue?: string;
  onYieldReturnsChange?: (val: string) => void;
  cultivationTypeValue?: string;
  onCultivationTypeChange?: (val: string) => void;
  cultivationNameValue?: string;
  onCultivationNameChange?: (val: string) => void;
  cultivationContactValue?: string;
  onCultivationContactChange?: (val: string) => void;
  maintenanceCropValue?: string;
  onMaintenanceCropChange?: (val: string) => void;
  maintenanceReturnsValue?: string;
  onMaintenanceReturnsChange?: (val: string) => void;
  advantagesValue?: string;
  onAdvantagesChange?: (val: string) => void;
  disadvantagesValue?: string;
  onDisadvantagesChange?: (val: string) => void;
  landShapeValue?: string;
  onLandShapeChange?: (val: string) => void;
  facilityAvailabilityValue?: string;
  onFacilityAvailabilityChange?: (val: string) => void;
  waterFacilityValue?: string;
  onWaterFacilityChange?: (val: string) => void;
  electricityFacilityValue?: string;
  onElectricityFacilityChange?: (val: string) => void;
  treesAvailabilityValue?: string;
  onTreesAvailabilityChange?: (val: string) => void;
  treesCountValue?: string;
  onTreesCountChange?: (val: string) => void;
  surveyReportTypeValue?: string;
  onSurveyReportTypeChange?: (val: string) => void;
  privateSurveyFiles?: UploadedFileItem[];
  onPrivateSurveyFileUpload?: (files: FileList) => void;
  onPrivateSurveyFileDelete?: (id: string) => void;
  governmentSurveyFiles?: UploadedFileItem[];
  onGovernmentSurveyFileUpload?: (files: FileList) => void;
  onGovernmentSurveyFileDelete?: (id: string) => void;
  privateSurveyCommentValue?: string;
  onPrivateSurveyCommentChange?: (val: string) => void;
  governmentSurveyCommentValue?: string;
  onGovernmentSurveyCommentChange?: (val: string) => void;
  boundaryTypeValue?: string;
  onBoundaryTypeChange?: (val: string) => void;
  boundaryOwnerNameValue?: string;
  onBoundaryOwnerNameChange?: (val: string) => void;
  boundaryOwnerAgeValue?: string;
  onBoundaryOwnerAgeChange?: (val: string) => void;
  boundaryRoadTypeValue?: string;
  onBoundaryRoadTypeChange?: (val: string) => void;
  boundaryRoadWidthValue?: string;
  onBoundaryRoadWidthChange?: (val: string) => void;
  boundaryTreesCountValue?: string;
  onBoundaryTreesCountChange?: (val: string) => void;
}

const LEGAL_TABS = [
  "Land Document",
  "Pattadhar Passbook",
  "Link Document",
  "Kasara Pahani & Proceeding Copies",
  "Revenue Record",
  "Lease Agreement",
  "Death Certificate",
  "Partition Deed",
  "Encumbrance Certificate",
  "Land Coordinates",
  "Owner Video KYC",
];

const AGRI_TABS = [
  "Local Agriculture Officer Report",
  "Last 5 years Crop Yielding Report",
  "Soil Report",
  "Type of Crop",
  "Ground Water Level",
  "Types of Crop can be grown",
  "Current Yield Cost",
  "Current Cultivation",
  "Future Crops",
  "Maintenance",
  "Natural Advantages and Disadvantages",
];

const BOUNDARY_TABS = [
  "Land Images",
  "Landscape View of Farmlands",
  "Shape of the Land",
  "Water and Electricity Facility",
  "Any Existing Trees",
  "Master Plan",
  "Survey Report",
  "East Boundaries",
  "West Boundaries",
  "North Boundaries",
  "South Boundaries",
];

const VALUATION_TABS = [
  "Village Map or Naksha",
  "Sub - Register Value",
  "Valuator Report",
  "Legal Opinion Report",
  "Road Approach",
  "Recent Transactions",
  "Geological Advantages",
  "Future Plans",
  "Validating Disadvantages",
  "Upcoming Infrastrucutres",
  "Railway Track Connectivity",
  "Airport Connectivity",
];

const INTEL_TABS = [
  "Local Inquiry Report",
  "Neighbor NOC",
  "Dispute Check",
];

export const UploadFilesDocument: React.FC<UploadFilesDocumentProps> = (props) => {
  const { activeTabLabel } = props;

  if (LEGAL_TABS.includes(activeTabLabel)) {
    return <LegalUploadFile {...props} />;
  }
  if (AGRI_TABS.includes(activeTabLabel)) {
    return <AgricultureReportUploadFile {...props} />;
  }
  if (BOUNDARY_TABS.includes(activeTabLabel)) {
    return <LandAndBoundariesUploadFile {...props} />;
  }
  if (VALUATION_TABS.includes(activeTabLabel)) {
    return <ValuationUploadFile {...props} />;
  }
  if (INTEL_TABS.includes(activeTabLabel)) {
    return <LocalIntelligenceUploadFile {...props} />;
  }
  return null;
};

export default UploadFilesDocument;
