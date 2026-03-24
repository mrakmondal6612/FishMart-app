import { ArrowBigUpDashIcon } from 'lucide-react';
import React from 'react'

export default function Newsletter() {
     const [email, setEmail] = React.useState('');
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      };
  return (
    <div className="lg:px-16">
      <div className="bg-slate-800 px-6 py-8 md:px-8 md:py-10 rounded-2xl border border-cyan-300/20 shadow-lg max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-100">Subscribe for fish updates</h2>
            <p className="mt-2 text-cyan-200/75">Weekly aquarium tips, new fish arrivals, and special discount alerts.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-full border border-cyan-300/40 bg-slate-900 text-white placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold transition"
            >
              Subscribe
            </button>
          </form>
          <small className="text-cyan-200/70">No spam, unsubscribe anytime.</small>
        </div>
      </div>
    </div>
  )
}
