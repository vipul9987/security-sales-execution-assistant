import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BrandingConfig, 
  TeamMember, 
  Vertical, 
  ServiceType, 
  PricingModel, 
  Deal, 
  TrainingMaterial, 
  Message,
  UserRole,
  LeadSource,
  QAStatus,
  QAStatusValue,
  SystemError,
  SystemErrorType
} from '../types';

interface AppContextType {
  branding: BrandingConfig;
  setBranding: (config: BrandingConfig) => void;
  team: TeamMember[];
  setTeam: (members: TeamMember[]) => void;
  verticals: Vertical[];
  setVerticals: (verticals: Vertical[]) => void;
  serviceTypes: ServiceType[];
  setServiceTypes: (services: ServiceType[]) => void;
  pricingModels: PricingModel[];
  setPricingModels: (models: PricingModel[]) => void;
  deals: Deal[];
  setDeals: (deals: Deal[]) => void;
  training: TrainingMaterial[];
  setTraining: (materials: TrainingMaterial[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  crmIntegrations: { [key: string]: boolean };
  setCRMIntegrations: (integrations: { [key: string]: boolean }) => void;
  currentUser: TeamMember | null;
  setCurrentUser: (user: TeamMember | null) => void;
  selectedDealId: string | null;
  setSelectedDealId: (id: string | null) => void;
  qaMode: boolean;
  setQAMode: (mode: boolean) => void;
  qaStatuses: QAStatus[];
  updateQAStatus: (moduleId: string, testName: string, status: QAStatusValue) => void;
  errors: SystemError[];
  logError: (message: string, type: SystemErrorType, stack?: string) => void;
  clearErrors: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Mock Data
const initialBranding: BrandingConfig = {
  companyName: 'SecureGuard Enterprise',
  companyTagline: 'Next-Gen Security Sales Intelligence',
  logoUrl: '',
  primaryColor: '#ef4444', // Red-500
  secondaryColor: '#991b1b', // Red-800
  gradientTheme: 'from-red-600 to-red-900',
  emailFooter: 'Best regards, {{name}} | SecureGuard Enterprise'
};

const initialTeam: TeamMember[] = [
  { id: '1', name: 'Alex Thompson', email: 'alex@secureguard.com', role: UserRole.VP_SALES, region: 'Global' },
  { id: '2', name: 'Sarah Miller', email: 'sarah@secureguard.com', role: UserRole.SALES_MANAGER, managerId: '1', region: 'North America' },
  { id: '3', name: 'James Wilson', email: 'james@secureguard.com', role: UserRole.SALES_REP, managerId: '2', region: 'Northeast' },
  { id: '4', name: 'Elena Rodriguez', email: 'elena@secureguard.com', role: UserRole.SALES_REP, managerId: '2', region: 'Southeast' }
];

const initialVerticals: Vertical[] = [
  { id: '1', name: 'Healthcare', description: 'Hospitals, clinics, and medical centers.', typicalRisks: ['Patient safety', 'Drug theft', 'Unauthorized access'], typicalServices: ['Armed Guard', 'Unarmed Guard'] },
  { id: '2', name: 'Retail', description: 'Shopping malls and retail stores.', typicalRisks: ['Shoplifting', 'Vandalism', 'Crowd control'], typicalServices: ['Loss Prevention', 'Unarmed Guard'] },
  { id: '3', name: 'Commercial Real Estate', description: 'Office buildings and corporate parks.', typicalRisks: ['Trespassing', 'Theft', 'Emergency response'], typicalServices: ['Mobile Patrol', 'Unarmed Guard'] }
];

const initialServiceTypes: ServiceType[] = [
  { id: '1', name: 'Armed Guard', description: 'Highly trained armed security personnel.' },
  { id: '2', name: 'Unarmed Guard', description: 'Professional unarmed security officers.' },
  { id: '3', name: 'Mobile Patrol', description: 'Vehicle-based security checks.' },
  { id: '4', name: 'Executive Protection', description: 'Personal security for VIPs.' },
  { id: '5', name: 'Event Security', description: 'Security for large gatherings and events.' },
  { id: '6', name: 'Loss Prevention', description: 'Retail-focused theft prevention.' }
];

const initialPricingModels: PricingModel[] = [
  { id: '1', name: 'Standard Enterprise', standardRate: 35, overtimeRate: 52.5, holidayRate: 70, mobilePatrolRate: 45, armedGuardRate: 55, unarmedGuardRate: 35 }
];

const initialDeals: Deal[] = [
  {
    id: 'd1',
    companyId: 1,
    title: 'City Hospital Security Expansion',
    value: 450000,
    weeklyHours: 168,
    status: 'Proposal',
    healthScore: 85,
    leadSource: LeadSource.WEBSITE,
    serviceTypes: ['1', '2'],
    techRequirements: ['Guard Tour System', 'Real Time Reporting'],
    stakeholders: [
      { id: 's1', name: 'Dr. Robert Chen', title: 'Chief of Operations', authorityLevel: 'Decision Maker', influenceLevel: 'High', email: 'r.chen@cityhospital.org', phone: '555-0123' }
    ],
    ownerId: '3',
    pricingModelId: '1',
    crmSynced: true,
    createdAt: new Date().toISOString()
  }
];

const initialTraining: TrainingMaterial[] = [
  { id: 't1', title: 'Discovery Best Practices', type: 'PDF', category: 'Discovery', url: '#' },
  { id: 't2', title: 'Handling Price Objections', type: 'Video', category: 'Objections', url: '#' }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branding, setBranding] = useState<BrandingConfig>(initialBranding);
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [verticals, setVerticals] = useState<Vertical[]>(initialVerticals);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>(initialServiceTypes);
  const [pricingModels, setPricingModels] = useState<PricingModel[]>(initialPricingModels);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [training, setTraining] = useState<TrainingMaterial[]>(initialTraining);
  const [messages, setMessages] = useState<Message[]>([]);
  const [crmIntegrations, setCRMIntegrations] = useState<{ [key: string]: boolean }>({
    HubSpot: true,
    Salesforce: false,
    Zoho: false,
    Pipedrive: false
  });
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(initialTeam[0]); // Default to VP for demo
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [qaMode, setQAMode] = useState<boolean>(false);
  const [qaStatuses, setQAStatuses] = useState<QAStatus[]>([]);
  const [errors, setErrors] = useState<SystemError[]>([]);

  const logError = (message: string, type: SystemErrorType, stack?: string) => {
    const newError: SystemError = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      stack,
      timestamp: new Date().toISOString()
    };
    setErrors(prev => [newError, ...prev].slice(0, 50)); // Keep last 50
  };

  const clearErrors = () => setErrors([]);

  const updateQAStatus = (moduleId: string, testName: string, status: QAStatusValue) => {
    setQAStatuses(prev => {
      const existing = prev.find(s => s.moduleId === moduleId && s.testName === testName);
      if (existing) {
        return prev.map(s => s === existing ? { ...s, status, lastRun: new Date().toISOString() } : s);
      }
      return [...prev, { moduleId, testName, status, lastRun: new Date().toISOString() }];
    });
  };

  // Global error listener
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      logError(event.message, SystemErrorType.UNHANDLED, event.error?.stack);
    };
    const handleRejection = (event: PromiseRejectionEvent) => {
      logError(`Unhandled Promise Rejection: ${event.reason}`, SystemErrorType.UNHANDLED, event.reason?.stack);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  // Apply branding colors to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', branding.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', branding.secondaryColor);
  }, [branding]);

  return (
    <AppContext.Provider value={{
      branding, setBranding,
      team, setTeam,
      verticals, setVerticals,
      serviceTypes, setServiceTypes,
      pricingModels, setPricingModels,
      deals, setDeals,
      training, setTraining,
      messages, setMessages,
      crmIntegrations, setCRMIntegrations,
      currentUser, setCurrentUser,
      selectedDealId, setSelectedDealId,
      qaMode, setQAMode,
      qaStatuses, updateQAStatus,
      errors, logError, clearErrors
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
