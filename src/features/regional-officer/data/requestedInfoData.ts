export interface InfoCard {
  id: string;
  unitType: string;
  status: string;
  valuation: string;
  area: string;
  agentName: string;
  agentEmail: string;
  agentAvatar: string;
  location: string;
  createdDate: string;
  publishedDate: string;
  watermark: string;
}

export const cardsData: InfoCard[] = [
  {
    id: 'GLCSOS 01',
    unitType: 'PRIMARY ASSET UNIT',
    status: 'RETURNED',
    valuation: '₹25 Lakhs',
    area: '100 Acres',
    agentName: 'Ramudu Kumar',
    agentEmail: 'ramudu@gmail.com',
    agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'Tanuku, West Godaveri (WG)',
    createdDate: 'Created : 6th Oct, 12:53 PM',
    publishedDate: 'Published: 08:15 AM',
    watermark: '01',
  },
  {
    id: 'GLCSOS 02',
    unitType: 'SECONDARY ASSET UNIT',
    status: 'RETURNED',
    valuation: '₹12 Lakhs',
    area: '45 Acres',
    agentName: 'Ananya Rao',
    agentEmail: 'ananya.rao@gmail.com',
    agentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Eluru, West Godaveri (WG)',
    createdDate: 'Created: 5th Oct, 10:15 AM',
    publishedDate: 'Published: 09:00 AM',
    watermark: '02',
  },
  {
    id: 'GLCSOS 03',
    unitType: 'TERTIARY ASSET UNIT',
    status: 'RETURNED',
    valuation: '₹45 Lakhs',
    area: '210 Acres',
    agentName: 'Rohan Verma',
    agentEmail: 'rohan.verma@gmail.com',
    agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    location: 'Bhimavaram, West Godaveri (WG)',
    createdDate: 'Created: 4th Oct, 03:45 PM',
    publishedDate: 'Published: 11:30 AM',
    watermark: '03',
  },
];
