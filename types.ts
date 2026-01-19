import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'travel' | 'logistics' | 'luxury';
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Car {
  id: string;
  name: string;
  category: 'SUV' | 'Sedan' | 'Sport' | 'Bus';
  image: string;
  features: string[];
  priceRange?: string;
}

export enum ViewState {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  LOGISTICS = 'LOGISTICS',
  FLEET = 'FLEET'
}