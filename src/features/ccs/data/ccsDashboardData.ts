import total1 from '@/assets/total-farmland.svg';
import total2 from '@/assets/pending-farmland.svg';
import total3 from '@/assets/approved-farmland.svg';
import total4 from '@/assets/total4.svg';

export const statsData = [
  {
    title: 'TOTAL LANDS',
    value: '4,563',
    icon: total1,
  },
  {
    title: 'PENDING SCREENING',
    value: '2,427',
    icon: total2,
  },
  {
    title: 'APPROVED LANDS',
    value: '1,569',
    icon: total3,
  },
  {
    title: 'TURNED BACK',
    value: '567',
    icon: total4,
  },
];

export const activities = [
  {
    id: 'GLCS001',
    description: 'Land submission received for initial screening.',
    timeAgo: '2 mins ago',
  },
  {
    id: 'GLCS015',
    description: 'Verification Officer approved land documents.',
    timeAgo: '25 mins ago',
  },
  {
    id: 'GLCS023',
    description: 'Screening completed and forwarded for review.',
    timeAgo: '44 mins ago',
  },
  {
    id: 'GLCS012',
    description: 'Verification Officer rejected due to missing survey details.',
    timeAgo: '2 hours ago',
  },
];