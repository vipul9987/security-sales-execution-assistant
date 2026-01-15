import React from 'react';

export enum PageView {
  DASHBOARD = 'DASHBOARD',
  DISCOVERY = 'DISCOVERY',
  PROPOSAL = 'PROPOSAL',
  DEAL_HEALTH = 'DEAL_HEALTH',
  COMPANIES = 'COMPANIES',
  SETTINGS = 'SETTINGS'
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