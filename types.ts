import React from 'react';

export enum PageView {
  DASHBOARD = 'DASHBOARD',
  DISCOVERY = 'DISCOVERY',
  PROPOSAL = 'PROPOSAL',
  DEAL_HEALTH = 'DEAL_HEALTH',
  COMPANIES = 'COMPANIES',
  TEAM = 'TEAM',
  VERTICALS = 'VERTICALS',
  SERVICE_TYPES = 'SERVICE_TYPES',
  PRICING_MODELS = 'PRICING_MODELS',
  TRAINING = 'TRAINING',
  CRM_INTEGRATIONS = 'CRM_INTEGRATIONS',
  SETTINGS = 'SETTINGS',
  MESSAGING = 'MESSAGING',
  QA = 'QA',
  DEAL_DETAIL = 'DEAL_DETAIL'
}

export interface NavItem {
  id: PageView;
  label: string;
  icon: React.ReactNode;
}

export interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
}

export interface Company {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  status: 'Active' | 'Trial';
}

export interface BrandingConfig {
  companyName: string;
  companyTagline: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  gradientTheme: string;
  emailFooter: string;
}

export enum UserRole {
  VP_SALES = 'VP of Sales',
  SALES_MANAGER = 'Sales Manager',
  SALES_REP = 'Sales Representative'
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  managerId?: string;
  region: string;
}

export interface Vertical {
  id: string;
  name: string;
  description: string;
  typicalRisks: string[];
  typicalServices: string[];
}

export interface ServiceType {
  id: string;
  name: string;
  description: string;
}

export interface PricingModel {
  id: string;
  name: string;
  standardRate: number;
  overtimeRate: number;
  holidayRate: number;
  mobilePatrolRate: number;
  armedGuardRate: number;
  unarmedGuardRate: number;
}

export interface Stakeholder {
  id: string;
  name: string;
  title: string;
  authorityLevel: 'Low' | 'Medium' | 'High' | 'Decision Maker';
  influenceLevel: 'Low' | 'Medium' | 'High';
  email: string;
  phone: string;
}

export enum LeadSource {
  REFERRAL = 'Referral',
  WEBSITE = 'Website',
  BROKER = 'Broker',
  COLD_OUTREACH = 'Cold Outreach',
  EVENT = 'Event',
  OTHER = 'Other'
}

export interface Deal {
  id: string;
  companyId: number;
  title: string;
  value: number; // Annual Contract Value
  weeklyHours: number;
  status: 'Discovery' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  healthScore: number;
  leadSource: LeadSource;
  serviceTypes: string[]; // IDs of ServiceType
  techRequirements: string[];
  stakeholders: Stakeholder[];
  ownerId: string; // TeamMember ID
  pricingModelId: string;
  crmSynced: boolean;
  createdAt: string;
}

export interface TrainingMaterial {
  id: string;
  title: string;
  type: 'PDF' | 'Video' | 'Document';
  category: 'Discovery' | 'Objections' | 'Risk' | 'Proposal';
  url: string;
  assignedTo?: string[]; // TeamMember IDs
}

export interface Message {
  id: string;
  senderId: string;
  recipientIds: string[]; // empty for "All"
  teamId?: string; // for team broadcast
  content: string;
  timestamp: string;
  readBy: string[];
}

export enum QAStatusValue {
  PASS = 'Pass',
  FAIL = 'Fail',
  NOT_TESTED = 'Not Tested'
}

export interface QAStatus {
  moduleId: string;
  testName: string;
  status: QAStatusValue;
  lastRun?: string;
}

export enum SystemErrorType {
  LOGIC = 'Logic Error',
  NETWORK = 'Network Error',
  VALIDATION = 'Validation Error',
  UNHANDLED = 'Unhandled Exception'
}

export interface SystemError {
  id: string;
  message: string;
  type: SystemErrorType;
  stack?: string;
  timestamp: string;
}
