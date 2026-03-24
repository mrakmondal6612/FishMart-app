 import { Star } from 'lucide-react';
 import React from 'react'
 import { apiUrl } from '@/lib/api';

export default function Testimonials() {
  const fallback = [
    { name: 'Sarah M.', rating: 5, text: "The quality of fish from FishMart is exceptional! My freshwater aquarium has never looked better with the vibrant Cardinal Tetras and Oscar fish I purchased. Delivery was quick and the fish arrived in perfect condition." },
    { name: 'Alex K.', rating: 5, text: "I was looking for rare saltwater fish for my marine setup and found exactly what I needed at FishMart. The customer service team was incredibly helpful in guiding me through the selection process. Highly recommended!" },
    { name: 'James L.', rating: 5, text: "As a beginner aquarist, FishMart provided me with beginner-friendly species and excellent care instructions. The prices are competitive and the fish are healthy and beautiful. I've already recommended them to all my friends!" },
  ];
  const [items, setItems] = React.useState<Array<{ name?: string; rating: number; text: string; profilePic?: string | null; email?: string | null }>>([]);
  const [loaded, setLoaded] = React.useState(false);
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
            email: t.user?.email || null
          }));
          setItems(mapped);
        }
      } catch {}
      finally { if (mounted) setLoaded(true); }
    })();
    return () => { mounted = false; };
  }, []);
  // Hide entire section if loaded and no testimonials
  if (loaded && items.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-950 py-24">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-300 mb-4">Our Happy Customers</h2>
        <p className="text-center text-cyan-200/70 mb-10">What aquarium lovers are saying about FishMart’s quality and service.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(loaded && items.length > 0 ? items : fallback).map((testimonial, index) => (
            <div key={index} className="bg-slate-900/70 border border-cyan-500/20 rounded-2xl p-5 shadow-elevated backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:border-cyan-400/40">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white flex items-center justify-center mr-3">
                  {testimonial.profilePic ? (
                    <img src={testimonial.profilePic} alt={testimonial.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="font-bold">{testimonial.name?.charAt(0)?.toUpperCase() || 'A'}</span>
                  )}
                </div>
                <div>
                  <div className="text-sm text-cyan-100 font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-cyan-200">{Array.from({ length: testimonial.rating }).map((_, i) => <Star key={i} className="inline w-4 h-4 text-cyan-400" />)}</div>
                </div>
              </div>
              <p className="text-cyan-100/70 text-sm">{testimonial.text}</p>
            </div>
          ))}
        </div>

        {loaded && items.length === 0 && (
          <div className="text-center text-cyan-100/60 mt-6">No testimonials yet.</div>
        )}
      </div>
    </div>
  )
}
