import {
  TrendingUp,
} from "lucide-react";
import fee1 from "@/assets/fee1.svg";
import fee2 from "@/assets/fee2.svg";
import fee3 from "@/assets/fee3.svg";
import fee4 from "@/assets/fee4.svg";
import fee5 from "@/assets/fee5.svg";
import fee6 from "@/assets/fee6.svg";
export const auditorData = {
  name: "Ramudu Kumar",
  role: "Senior Auditor",
  phone: "+91 98765 43210",
  email: "ramudu.k@glc.com",
  profileImage: "https://i.pravatar.cc/200?img=12",
};

export const auditContextData = [
  {
    id: 1,
    label: "Farmland ID",
    value: "GLCSOS 01",
   image: fee1,
  },
  {
    id: 2,
    label: "Location",
    value: "West Godavari, Tanuku",
    image: fee2,
  },
  {
    id: 3,
    label: "Status",
    value: "Pending Final Clearance",
    hasStatusDot: true,
    image: fee3,
  },
];

export const portfolioData = {
  value: "₹4.2 Cr",
  growth: "+12.4% this quarter",
  icon: TrendingUp,
};

export const processingFeeData = {
  totalFee: "₹15,000",

  feeBreakdown: [
    {
      id: 1,
      title: "RO Verification",
      description: "Regional Office documentation review",
      amount: "₹5,000",
       image: fee4,
    },
    {
      id: 2,
      title: "FO Ground Inspection",
      description: "Field Officer physical site audit",
      amount: "₹5,000",
      image: fee5,
    },
    {
      id: 3,
      title: "IO Intelligence Report",
      description: "Intelligence Officer risk assessment",
      amount: "₹5,000",
     image: fee6,
    },
  ],

  totalAmountDue: "₹15,000",

  footerText: "Authorized transaction via biometric link",
};

export const pageContent = {
  backButtonLabel: "Go back to dashboard",
  feeHeading: "Total Processing Fee",
  feeBreakdownHeading: "Fee Breakdown",
  totalAmountLabel: "Total Amount Due",
  sendButtonLabel: "SEND FEE REQUEST TO INVESTOR",
  auditContextHeading: "Audit Context",
  portfolioHeading: "Portfolio Value",
};