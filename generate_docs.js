const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'src/features/super-admin/legal-docs/Customer.tsx');
let template = fs.readFileSync(templatePath, 'utf-8');

const configs = [
  {
    file: 'Report.tsx',
    componentName: 'Report',
    activeStep: 'agriculture-report',
    nextRoute: '/super-admin/Documents/land-boundaries',
    nextStepName: 'Land & Boundaries',
    tabs: `[
  { id: 'soil-test', label: 'Soil Test Report', status: 'pending' },
  { id: 'water-test', label: 'Water Test Report', status: 'pending' },
  { id: 'crop-history', label: 'Crop History', status: 'pending' }
]`
  },
  {
    file: 'Boundaries.tsx',
    componentName: 'Boundaries',
    activeStep: 'land-boundaries',
    nextRoute: '/super-admin/Documents/valuation',
    nextStepName: 'Valuation',
    tabs: `[
  { id: 'survey-map', label: 'Survey Map', status: 'pending' },
  { id: 'fencing-details', label: 'Fencing Details', status: 'pending' },
  { id: 'encroachment-report', label: 'Encroachment Report', status: 'pending' }
]`
  },
  {
    file: 'Valuation.tsx',
    componentName: 'Valuation',
    activeStep: 'valuation',
    nextRoute: '/super-admin/Documents/local-intelligence',
    nextStepName: 'Local Intelligence',
    tabs: `[
  { id: 'market-value', label: 'Market Value Assessment', status: 'pending' },
  { id: 'gov-valuation', label: 'Government Valuation', status: 'pending' },
  { id: 'tax-receipts', label: 'Tax Receipts', status: 'pending' }
]`
  },
  {
    file: 'LocalInt.tsx',
    componentName: 'LocalInt',
    activeStep: 'local-intelligence',
    nextRoute: '/super-admin/dashboard',
    nextStepName: 'Dashboard',
    tabs: `[
  { id: 'local-inquiry', label: 'Local Inquiry Report', status: 'pending' },
  { id: 'neighbor-noc', label: 'Neighbor NOC', status: 'pending' },
  { id: 'dispute-check', label: 'Dispute Check', status: 'pending' }
]`
  }
];

// We need to inject the Proceed Modal logic into the template.
// Let's modify the template string to add the proceed modal state and logic.

// 1. Add Check icon import from lucide-react if not present, wait we already have CheckIcon SVG.
// We need a ConfirmationModal component inside the file.
const proceedModalTemplate = \`
// ─── Proceed Modal ─────────────────────────────────────────────────────────────
const ProceedModal: React.FC<{ onClose: () => void; onProceed: () => void; nextStepName: string; farmlandId: string }> = ({ onClose, onProceed, nextStepName, farmlandId }) => {
  return (
    <div style={modalStyles.overlay}>
      <div style={{...modalStyles.box, width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px'}}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Document Verification Complete</h2>
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(141, 198, 63, 0.2)', borderRadius: '50%', transform: 'scale(1.5)' }} />
          <div style={{ width: 96, height: 96, background: '#8DC63F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '4px solid #fff' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 18, fontWeight: 500, lineHeight: 1.5, marginBottom: 32, color: '#1A1A1A' }}>
          Proceed With '<span style={{ color: '#1D7ABE' }}>{nextStepName}</span>' for <br/>
          Farmland ID: <span style={{ color: '#1D7ABE' }}>{farmlandId}</span> for further <br/>
          Verification.
        </p>
        <button 
          onClick={onProceed}
          style={{ background: '#2A3125', color: '#fff', fontWeight: 600, fontSize: 18, padding: '16px 48px', borderRadius: 40, border: 'none', cursor: 'pointer' }}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};
\`;

// Insert the ProceedModal component before the main component
template = template.replace('// ─── Main Component ───────────────────────────────────────────────────────────', proceedModalTemplate + '\\n// ─── Main Component ───────────────────────────────────────────────────────────');

// Update state and logic in the main component
template = template.replace(
  /const \[showRejectModal, setShowRejectModal\] = useState\(false\);/,
  \`const [showRejectModal, setShowRejectModal] = useState(false);
  const [showProceedModal, setShowProceedModal] = useState(false);\`
);

template = template.replace(
  /const handleApprove = \(\) => \{[\s\S]*?if \(nextPending\) \{[\s\S]*?setActiveTab\(nextPending\.id\);[\s\S]*?\}[\s\S]*?\};/,
  \`const handleApprove = () => {
    const updatedTabs = tabs.map((t) => t.id === activeTab ? { ...t, status: 'approved' } : t);
    setTabs(updatedTabs as DocumentTab[]);
    
    const nextPending = updatedTabs.find((t) => t.status === 'pending');
    if (nextPending) {
      setActiveTab(nextPending.id);
    } else {
      const allApproved = updatedTabs.every(t => t.status === 'approved');
      if (allApproved) {
        setShowProceedModal(true);
      }
    }
  };\`);

// Render the ProceedModal in JSX
template = template.replace(
  /\{\/\* ── Reject Modal ────────────────────────────────────────────────── \*\/\}/,
  \`{/* ── Proceed Modal ────────────────────────────────────────────────── */}
      {showProceedModal && (
        <ProceedModal
          onClose={() => setShowProceedModal(false)}
          onProceed={() => navigate(\\\`\${NEXT_ROUTE}/\${farmlandId}\\\`)}
          nextStepName={NEXT_STEP_NAME}
          farmlandId={farmlandId}
        />
      )}

      {/* ── Reject Modal ────────────────────────────────────────────────── */}\`
);

// We need to write this modified template back to Customer.tsx to upgrade it too!
let customerTemplate = template;
customerTemplate = customerTemplate.replace(/const activeStep = 'legal-documents';/, "const activeStep = 'legal-documents';");
customerTemplate = customerTemplate.replace(/const NEXT_ROUTE = .*/g, ''); // just in case
customerTemplate = customerTemplate.replace(/const NEXT_STEP_NAME = .*/g, '');
customerTemplate = customerTemplate.replace(
  /const farmlandId = id \?\? 'GLCSOS 01';\n  const activeStep = 'legal-documents';/,
  \`const farmlandId = id ?? 'GLCSOS 01';
  const activeStep = 'legal-documents';
  const NEXT_ROUTE = '/super-admin/Documents/agriculture-report';
  const NEXT_STEP_NAME = 'Agriculture Report';\`
);
fs.writeFileSync(templatePath, customerTemplate);


// Generate the other 4 files
configs.forEach(config => {
  let fileContent = template;
  
  // Replace component name
  fileContent = fileContent.replace(/const Customer: React\.FC = \(\) => \{/, \`const \${config.componentName}: React.FC = () => {\`);
  fileContent = fileContent.replace(/export default Customer;/, \`export default \${config.componentName};\`);
  
  // Replace active step
  fileContent = fileContent.replace(/const activeStep = 'legal-documents';/, \`const activeStep = '\${config.activeStep}';\`);
  
  // Replace routing and next step
  fileContent = fileContent.replace(
    /const farmlandId = id \?\? 'GLCSOS 01';\n  const activeStep = '.*';/,
    \`const farmlandId = id ?? 'GLCSOS 01';
  const activeStep = '\${config.activeStep}';
  const NEXT_ROUTE = '\${config.nextRoute}';
  const NEXT_STEP_NAME = '\${config.nextStepName}';\`
  );
  
  // Replace initial tabs
  fileContent = fileContent.replace(/const INITIAL_TABS: DocumentTab\[\] = \[[\s\S]*?\];/, \`const INITIAL_TABS: DocumentTab[] = \${config.tabs};\`);
  
  // Replace initial active tab
  const firstTabMatch = config.tabs.match(/id: '([^']+)'/);
  const firstTab = firstTabMatch ? firstTabMatch[1] : 'land-document';
  fileContent = fileContent.replace(/const \[activeTab, setActiveTab\] = useState\('[^']+'\);/, \`const [activeTab, setActiveTab] = useState('\${firstTab}');\`);
  
  fs.writeFileSync(path.join(__dirname, 'src/features/super-admin/legal-docs', config.file), fileContent);
});

console.log("Successfully generated components");
