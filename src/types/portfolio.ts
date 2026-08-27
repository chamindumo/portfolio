export interface Project {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  technologies: {
    name: string;
    color: string;
  }[];
  liveUrl?: string;
  githubUrl?: string;
  desktopScreenshots: {
    title: string;
    url: string;
    caption: string;
  }[];
  mobileScreenshots: {
    title: string;
    url: string;
    caption: string;
  }[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  description: string;
  iconName: string;
}

export interface SkillItem {
  name: string;
  level: string;
  category: 'frontend' | 'backend' | 'cloud' | 'core';
  featured?: boolean;
}

export interface ProfileData {
  name: string;
  preferredName: string;
  legalName: string;
  avatarUrl: string;
  title: string;
  roleDescription: string;
  tagline: string;
  availability: string;
  location: string;
  coordinates: string;
  timezone: string;
  email: string;
  studentEmail: string;
  university: string;
  degree: string;
  bioParagraphs: string[];
  socials: {
    platform: string;
    url: string;
    handle: string;
  }[];
}
