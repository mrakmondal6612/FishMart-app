 import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiUrl } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function Testimonials() {
  const fallback = [
    { 
      name: 'Priya Sharma', 
      rating: 5, 
      text: "FishMart exceeded my expectations! The Cardinal Tetras arrived vibrant and healthy. The packaging was professional, and the care instructions were detailed. My aquarium has never looked better!",
      location: 'Mumbai, Maharashtra',
      fishType: 'Freshwater Fish'
    },
    { 
      name: 'Rajesh Kumar', 
      rating: 5, 
      text: "I was skeptical about ordering saltwater fish online, but FishMart proved me wrong. The Clownfish and Anemones were perfect specimens. Their customer service guided me through the acclimation process.",
      location: 'Bangalore, Karnataka',
      fishType: 'Saltwater Fish'
    },
    { 
      name: 'Ananya Patel', 
      rating: 5, 
      text: "As a beginner, I appreciated how FishMart helped me choose the right species for my setup. The Guppies and Platies are thriving! Their follow-up care and support is exceptional.",
      location: 'Delhi, NCR',
      fishType: 'Community Fish'
    },
    { 
      name: 'Vikram Reddy', 
      rating: 5, 
      text: "The quality of brackish fish is outstanding. My Figure 8 Puffer arrived in perfect health and adapted quickly. FishMart is now my go-to source for rare species.",
      location: 'Hyderabad, Telangana',
      fishType: 'Brackish Fish'
    },
    { 
      name: 'Neha Gupta', 
      rating: 5, 
      text: "Fast delivery and excellent packaging! The Angelfish were so beautiful and healthy. I've already recommended FishMart to all my aquarium enthusiast friends.",
      location: 'Pune, Maharashtra',
      fishType: 'Cichlids'
    },
    { 
      name: 'Arjun Singh', 
      rating: 5, 
      text: "Professional service and high-quality fish. The live arrival guarantee gives peace of mind. My Discus are doing great thanks to their expert care guidance.",
      location: 'Kolkata, West Bengal',
      fishType: 'Discus Fish'
    }
  ];
  
  const [items, setItems] = React.useState<Array<{ 
    name?: string; 
    rating: number; 
    text: string; 
    profilePic?: string | null; 
    email?: string | null;
    location?: string;
    fishType?: string;
  }>>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [autoplay, setAutoplay] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(apiUrl('/clients/testimonials?limit=9'), { credentials: 'include' });
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (mounted && Array.isArray(data?.testimonials)) {
          const mapped = data.testimonials.map((t: any) => ({ 
            name: t.user ? `${t.user.first_name} ${t.user.last_name}`.trim() : t.name || 'Anonymous', 
            rating: t.rating || 5, 
            text: t.text,
            profilePic: t.user?.profile_pic || null,
            email: t.user?.email || null,
            location: t.location || '',
            fishType: t.fishType || ''
          }));
          setItems(mapped);
        }
      } catch {}
      finally { if (mounted) setLoaded(true); }
    })();
    return () => { mounted = false; };
  }, []);

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, items.length]);

  const testimonials = loaded && items.length > 0 ? items : fallback;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Hide entire section if loaded and no testimonials
  if (loaded && items.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl mb-6 shadow-lg">
            <Quote className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Happy Fish Parents
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real stories from aquarium enthusiasts who trust FishMart for their aquatic companions
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 md:p-12">
                    <div className="max-w-4xl mx-auto">
                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="text-xl md:text-2xl text-gray-100 text-center leading-relaxed mb-8 font-light">
                        "{testimonial.text}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                          {testimonial.profilePic ? (
                            <img 
                              src={testimonial.profilePic} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover rounded-full" 
                            />
                          ) : (
                            <span>{testimonial.name?.charAt(0)?.toUpperCase() || 'A'}</span>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-semibold text-white">{testimonial.name}</div>
                          <div className="text-sm text-cyan-300">
                            {testimonial.fishType && <span>{testimonial.fishType} • </span>}
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-700/80 hover:bg-slate-600/80 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-cyan-500/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-700/80 hover:bg-slate-600/80 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-cyan-500/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoplay(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-cyan-400 w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">10,000+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-400 mb-2">4.9/5</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">99%</div>
            <div className="text-gray-400">Live Arrival Rate</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Join Our Happy Community
          </Button>
        </div>
      </div>
    </div>
  );
}
