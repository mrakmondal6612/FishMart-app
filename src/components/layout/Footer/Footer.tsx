
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import Testimonials from './Testimonials';
import Services from './Services';
import Newsletter from './Newsletter';

export const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [footerData, setFooterData] = useState({
    logo: '',
    description: '',
    contactInfo: { address: '', phone: '', email: '' },
    socialLinks: { facebook: '', twitter: '', instagram: '', linkedin: '' },
    quickLinks: [],
    accountLinks: [],
    exclusive: { title: '', subtitle: '', note: '' },
    socialLinksExtra: [],
    copyrightText: ''
  });

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    const loadFooter = async () => {
      try {
  const candidates: string[] = [];

  const envBackend = (import.meta as any).env?.VITE_BACKEND_URL;
  if (envBackend) candidates.push(String(envBackend).replace(/\/$/, ''));
 
  const envFallback = (import.meta as any).env?.VITE_BACKEND_FALLBACK || (import.meta as any).env?.VITE_DEPLOYED_BACKEND;
  if (envFallback) candidates.push(String(envFallback).replace(/\/$/, ''));
  candidates.push('/api');

        let response: Response | null = null;
        let lastError = null;
        for (const base of candidates) {
          const url = `${base.replace(/\/$/, '')}/admin/footer`;
          try {
            const r = await fetch(url, { cache: 'no-store', credentials: 'include', headers: { Accept: 'application/json' } });
            if (r.ok) {
              response = r;
              break;
            } else {
              lastError = new Error(`Non-OK status ${r.status} from ${url}`);
            }
          } catch (e) {
            lastError = e;
          }
        }
        if (!response) {
          console.error('Failed to fetch footer from any backend candidate', lastError);
          return;
        }
        const json = await response.json();
        setFooterData({
          logo: json.logo || '',
          description: json.description || '',
          contactInfo: json.contactInfo || { address: '', phone: '', email: '' },
          socialLinks: json.socialLinks || { facebook: '', twitter: '', instagram: '', linkedin: '' },
          quickLinks: Array.isArray(json.quickLinks) ? json.quickLinks : [],
          accountLinks: Array.isArray(json.accountLinks) ? json.accountLinks : [],
          exclusive: json.exclusive || { title: '', subtitle: '', note: '' },
          socialLinksExtra: Array.isArray(json.socialLinksExtra) ? json.socialLinksExtra : [],
          copyrightText: json.copyrightText || ''
        });
      } catch (e) {
        // fail silently and keep static defaults
      }
    };
    loadFooter();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail('');
      toast({
        title: 'Subscribed!',
        description: 'Thank you for subscribing to our newsletter',
      });
      
      // Reset subscription status after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error) {
      toast({
        title: 'Subscription failed',
        description: 'Failed to subscribe. Please try again later.',
        variant: 'destructive',
      });
    }
  };


  return (
    <footer className="w-full">
      {/* Customer Testimonials Section */}
      <Testimonials />

      {/* Services Section */}
      <Services />

      {/* Newsletter Section */}
      {/* <div className="bg-black py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-2">STAY UPTO DATE ABOUT</h3>
              <h3 className="text-3xl font-bold">OUR LATEST OFFERS</h3>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <div className="flex">
                
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white rounded-full px-6 py-3 w-80"
                />
              </div>
              <Button 
                onClick={handleSubmit}
                className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-3 font-medium"
              >
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <Newsletter /> */}

      {/* Main Footer Content */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 w-full relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="relative max-w-[1400px] mx-auto px-6 py-16">
          {/* Top Section with Newsletter */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">Stay Connected</h2>
                <p className="text-cyan-100/70">Get exclusive offers and be the first to know about new arrivals</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-slate-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  required
                />
                <button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!email}
                >
                  {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">FishMart</h3>
                <p className="text-cyan-100/70 leading-relaxed max-w-sm">
                  Your trusted destination for premium aquatic life. Discover our curated collection of freshwater, saltwater, and brackish fish species.
                </p>
              </div>
              
              {/* Social Media */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-cyan-100/80 uppercase tracking-wider">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, label: 'Facebook', url: footerData.socialLinks?.facebook },
                    { icon: Twitter, label: 'Twitter', url: footerData.socialLinks?.twitter },
                    { icon: Instagram, label: 'Instagram', url: footerData.socialLinks?.instagram },
                    { icon: Linkedin, label: 'LinkedIn', url: footerData.socialLinks?.linkedin }
                  ].map(({ icon: Icon, label, url }) => (
                    <a
                      key={label}
                      href={url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-400/60 hover:bg-cyan-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
                    >
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { to: '/shop', label: 'Shop All' },
                  { to: '/freshwater', label: 'Freshwater Fish' },
                  { to: '/saltwater', label: 'Saltwater Fish' },
                  { to: '/brackish', label: 'Brackish Fish' },
                  { to: '/accessories', label: 'Accessories' }
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link 
                      to={to} 
                      className={`text-cyan-100/70 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 inline-block ${
                        activeLink === to ? 'text-cyan-300 font-medium' : ''
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Customer Service</h3>
              <ul className="space-y-3">
                {[
                  { to: '/contact', label: 'Contact Us' },
                  { to: '/faq', label: 'FAQ' },
                  { to: '/shipping', label: 'Shipping Info' },
                  { to: '/returns', label: 'Returns' },
                  { to: '/track-order', label: 'Track Order' }
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link 
                      to={to} 
                      className={`text-cyan-100/70 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 inline-block ${
                        activeLink === to ? 'text-cyan-300 font-medium' : ''
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
              <address className="not-italic space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-cyan-400" />
                  <p className="text-cyan-100/70 text-sm leading-relaxed">
                    {footerData.contactInfo?.address
                      ? footerData.contactInfo.address.split('\n').map((line, i) => (
                          <React.Fragment key={i}>{line}<br/></React.Fragment>
                        ))
                      : (
                          <>
                            429/1, R.B AVENUE, Bhadreswar<br />Hooghly - 712135<br />West Bengal, India
                          </>
                        )}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0 text-cyan-400" />
                  <a href={`mailto:${footerData.contactInfo?.email || 'contact@zixxapp.com'}`} className="text-cyan-100/70 hover:text-cyan-300 transition-colors text-sm">
                    {footerData.contactInfo?.email || 'contact@zixxapp.com'}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0 text-cyan-400" />
                  <a href={`tel:${footerData.contactInfo?.phone || '+918962231295'}`} className="text-cyan-100/70 hover:text-cyan-300 transition-colors text-sm">
                    {footerData.contactInfo?.phone || '+91 89622 31295'}
                  </a>
                </div>
              </address>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-cyan-500/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-cyan-100/60 text-sm">
                  {footerData.copyrightText && footerData.copyrightText.length > 0
                    ? footerData.copyrightText
                    : `© ${new Date().getFullYear()} FishMart. All rights reserved.`}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/privacy-policy" className="text-cyan-100/60 hover:text-cyan-300 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-cyan-100/60 hover:text-cyan-300 transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link to="/shipping" className="text-cyan-100/60 hover:text-cyan-300 transition-colors text-sm">
                  Shipping Policy
                </Link>
                <Link to="/returns" className="text-cyan-100/60 hover:text-cyan-300 transition-colors text-sm">
                  Returns
                </Link>
              </div>
              <div className="text-cyan-100/60 text-sm">
                Made with <span className="text-red-400">♥</span> in India
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
