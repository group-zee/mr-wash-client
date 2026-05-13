import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, ArrowRight, ShieldCheck, Star, Clock, Truck, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../customer/components/Header';
import HeroCarousel from '../../customer/components/HeroCarousel';
import PromoBanners from '../../customer/components/PromoBanners';
import Categories from '../../customer/components/Categories';
import ServiceShowcase from '../../customer/components/ServiceShowcase';
import Footer from '../../customer/components/Footer';

const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Hero Section (Same as HomePage) */}
      <HeroCarousel 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        locationQuery={locationQuery}
        setLocationQuery={setLocationQuery}
      />

      {/* Promo Banners */}
      <PromoBanners />

      {/* Categories */}
      <Categories />

      {/* Features Section (Added for Landing Page value) */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Why Choose Mr. Wash?</h2>
          <p className="text-slate-500 font-bold mt-2">Experience premium care for your favorites</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: 'Top Rated Shops',
              desc: 'Only the best verified laundry partners make it to our platform.',
              icon: Star,
              color: 'text-yellow-500',
              bg: 'bg-yellow-50'
            },
            {
              title: 'Express Delivery',
              desc: 'Get your clothes washed, folded, and delivered within 24 hours.',
              icon: Truck,
              color: 'text-blue-600',
              bg: 'bg-blue-50'
            },
            {
              title: 'Professional Care',
              desc: 'Specialized cleaning for all fabrics, from daily wear to luxury silk.',
              icon: ShieldCheck,
              color: 'text-green-600',
              bg: 'bg-green-50'
            }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className={`w-20 h-20 ${feature.bg} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-10 h-10 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-brand rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/30">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-700/50 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Ready to experience <br /> 
              effortless laundry?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
              Join thousands of happy customers. Sign up today and get your first wash with an exclusive discount.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/customer/signup" className="w-full sm:w-auto px-12 py-5 bg-white text-brand rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
                Get Started Now
              </Link>
              <Link to="/customer/login" className="w-full sm:w-auto px-12 py-5 bg-blue-700 text-white rounded-2xl font-black text-xl hover:bg-blue-800 transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Showcase */}
      <div className="bg-slate-50/50">
        <ServiceShowcase />
      </div>

      {/* Bottom Features Info */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-black mb-6">
            <Droplets className="w-4 h-4" />
            <span>ECO-FRIENDLY WASHING</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
            We care about your <br /> clothes and the planet.
          </h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
            Our vendors use premium, biodegradable detergents and advanced water-saving technology. Quality care that doesn't cost the earth.
          </p>
          <div className="space-y-4">
            {[
              { icon: Clock, text: 'Real-time order tracking' },
              { icon: ShieldCheck, text: 'Verified high-quality vendors' },
              { icon: ArrowRight, text: 'Pick-up and Drop-off at your doorstep' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 font-bold text-slate-700">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  <item.icon className="w-4 h-4" />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-[3rem] bg-slate-100 overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1545173168-9f1947e8017e?q=80&w=2000&auto=format&fit=crop" 
              alt="Quality Laundry" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900">100% Insured</div>
                <div className="text-slate-500 font-bold text-sm text-sm uppercase tracking-widest">Safe & Secure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
