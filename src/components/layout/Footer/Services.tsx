import React, { useEffect, useState } from 'react';
import { Truck, Headset, ShieldCheck, Clock, Package, Heart } from 'lucide-react';

const DEFAULT_SERVICES = [
  { 
    icon: 'Truck', 
    title: 'Lightning Fast Delivery', 
    description: 'Free delivery on orders over ₹299. Your fish arrive safely within 24-48 hours.',
    features: ['Live arrival guarantee', 'Temperature controlled', 'Professional packaging']
  },
  { 
    icon: 'Headset', 
    title: 'Expert Aquarist Support', 
    description: '24/7 support from fish care experts who understand your aquatic needs.',
    features: ['Live chat support', 'Video consultations', 'Care guidance']
  },
  { 
    icon: 'ShieldCheck', 
    title: '30-Day Health Guarantee', 
    description: 'Comprehensive health guarantee with hassle-free returns and replacements.',
    features: ['Full refund policy', 'Free replacement', 'Health certification']
  },
  { 
    icon: 'Package', 
    title: 'Premium Quality Fish', 
    description: 'Hand-selected specimens from trusted breeders with health certification.',
    features: ['Quarantine tested', 'Disease-free', 'Sustainably sourced']
  },
  { 
    icon: 'Clock', 
    title: 'Flexible Scheduling', 
    description: 'Choose your delivery time and track your order in real-time.',
    features: ['Scheduled delivery', 'Live tracking', 'SMS updates']
  },
  { 
    icon: 'Heart', 
    title: 'Community First', 
    description: 'Join thousands of happy aquarium enthusiasts who trust FishMart.',
    features: ['Member rewards', 'Community forums', 'Exclusive events']
  }
];

const ICON_MAP = {
  Truck,
  Headset,
  ShieldCheck,
  Clock,
  Package,
  Heart
};

export default function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const candidates = [];
        const envBackend = (import.meta as any).env?.VITE_BACKEND_URL;
        if (envBackend) candidates.push(String(envBackend).replace(/\/$/, ''));
        const envFallback = (import.meta as any).env?.VITE_BACKEND_FALLBACK || (import.meta as any).env?.VITE_DEPLOYED_BACKEND;
        if (envFallback) candidates.push(String(envFallback).replace(/\/$/, ''));
        candidates.push('/api');

        let res = null;
        let lastErr = null;
        for (const base of candidates) {
          const url = `${base.replace(/\/$/, '')}/admin/footer`;
          try {
            const r = await fetch(url, { cache: 'no-store', credentials: 'include', headers: { Accept: 'application/json' } });
            if (r.ok) { res = r; break; }
            else lastErr = new Error(`Non-OK ${r.status}`);
          } catch (e) { lastErr = e; }
        }
        if (!res) return;
        const json = await res.json();
        if (json && Array.isArray(json.services) && json.services.length > 0) {
          setServices(json.services.map(s => ({ 
            icon: s.icon || '', 
            title: s.title || '', 
            description: s.description || '',
            features: s.features || []
          })));
        }
      } catch (e) {
        // ignore, keep defaults
      }
    };
    load();
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-teal-500 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose FishMart?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the highest quality fish and exceptional service 
            to aquarium enthusiasts across India.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || ICON_MAP['Truck'];
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 hover:border-cyan-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.slice(0, isHovered ? 3 : 1).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                          <span className={isHovered || idx === 0 ? 'opacity-100' : 'opacity-0'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Hover Indicator */}
                  <div className="mt-4 flex items-center gap-2 text-cyan-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn more</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <span>Serving 10,000+ happy aquarium enthusiasts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
