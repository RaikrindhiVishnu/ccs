export interface FarmlandListItem {
  id: string;
  title: string;
  agentName: string;
  avatarUrl: string;
  locationDistrict: string;
  createdStamp: string;
  publishedStamp: string;
  areaSize: string;
  totalAmount: string;
  costPerAcre: string;
  statusState: 'COMPLETED' | 'PROCESSING' | 'REVIEW';
}

export const farmlandsData: FarmlandListItem[] = [
  {
    id: 'row-1',
    title: 'GLCSOS 01',
    agentName: 'Ram Varma',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    locationDistrict: 'West Godvari, AP',
    createdStamp: '6th Oct - 12:53 PM',
    publishedStamp: 'Published: 08:15 AM',
    areaSize: '2.5 Acres',
    totalAmount: '25 lakhs',
    costPerAcre: '80000.00',
    statusState: 'COMPLETED',
  },
  {
    id: 'row-2',
    title: 'GLCSOS 02',
    agentName: 'Ananya Rao',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    locationDistrict: 'East Godavari, Kakinada',
    createdStamp: '7th Oct - 10:15 AM',
    publishedStamp: 'Published: 09:45 AM',
    areaSize: '15 Acres',
    totalAmount: '₹12 Lakhs',
    costPerAcre: '80000.00',
    statusState: 'PROCESSING',
  },
  {
    id: 'row-3',
    title: 'GLCSOS 03',
    agentName: 'K. Sastry',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    locationDistrict: 'Vizag, Anakapalle',
    createdStamp: '8th Oct - 09:30 AM',
    publishedStamp: 'Published: 09:45 AM',
    areaSize: '15 Acres',
    totalAmount: '₹12 Lakhs',
    costPerAcre: '80000.00',
    statusState: 'REVIEW',
  },
  {
    id: 'row-4',
    title: 'GLCSOS 01',
    agentName: 'Ram Varma',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    locationDistrict: 'West Godvari, AP',
    createdStamp: '6th Oct - 12:53 PM',
    publishedStamp: 'Published: 08:15 AM',
    areaSize: '15 Acres',
    totalAmount: '₹12 Lakhs',
    costPerAcre: '80000.00',
    statusState: 'COMPLETED',
  },
  {
    id: 'row-5',
    title: 'GLCSOS 02',
    agentName: 'Ananya Rao',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    locationDistrict: 'East Godavari, Kakinada',
    createdStamp: '7th Oct - 10:15 AM',
    publishedStamp: 'Published: 09:45 AM',
    areaSize: '15 Acres',
    totalAmount: '₹12 Lakhs',
    costPerAcre: '80000.00',
    statusState: 'PROCESSING',
  },
];
