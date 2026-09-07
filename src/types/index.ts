export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'infrastructure' | 'cultural';
  categoryLabel: string;
  location: string;
  year: string;
  area: string;
  value: string;
  duration: string;
  steelTonnage: string;
  concreteVolume: string;
  certification: string;
  architect: string;
  tagline: string;
  description: string;
  image: string;
  secondaryImage: string;
  highlights: string[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  capabilities: string[];
  materials: string[];
  leadEngineer: string;
  toleranceStandard: string;
  image: string;
}

export interface TimelinePhase {
  phase: string;
  number: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  techUsed: string;
}

export interface InnovationItem {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  projectDelivered: string;
  avatar: string;
}

export interface EstimatorState {
  projectType: 'residential' | 'commercial' | 'infrastructure' | 'cultural';
  areaSqFt: number;
  finishTier: 'standard_luxury' | 'ultra_high_end' | 'bespoke_trophy';
  sustainability: boolean;
  smartAutomation: boolean;
  deepFoundation: boolean;
  helipadOrSkydeck: boolean;
}

declare global {
  interface Window {
    __lenis?: import('lenis').default;
  }
}
