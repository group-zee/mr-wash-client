import React, { useState } from 'react';
import VendorLayout from '../components/VendorLayout';
import { Review } from '../types';
import { Star, MessageSquare, User, Calendar, Tag } from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const [reviews] = useState<Review[]>([
    {
      id: 'R1',
      customerName: 'Alex Johnson',
      rating: 5,
      comment: 'Excellent service! My clothes were cleaned perfectly and delivered on time.',
      date: '2026-04-20',
      serviceName: 'Regular Wash'
    },
    {
      id: 'R2',
      customerName: 'Maria Garcia',
      rating: 4,
      comment: 'Good ironing, but the delivery was a bit late. Overall satisfied.',
      date: '2026-04-18',
      serviceName: 'Premium Ironing'
    },
    {
      id: 'R3',
      customerName: 'David Lee',
      rating: 5,
      comment: 'The dry cleaning for my suit was top notch. Highly recommended.',
      date: '2026-04-15',
      serviceName: 'Dry Clean'
    }
  ]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
      />
    ));
  };

  return (
    <VendorLayout>
      <div className="p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Customer Reviews</h1>
            <p className="text-slate-500 mt-1">See what your customers are saying about your laundry services.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-4xl font-black text-slate-900 mb-1">4.8</div>
              <div className="flex justify-center gap-0.5 mb-2">{renderStars(5)}</div>
              <div className="text-sm text-slate-500 font-medium">Average Rating</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-4xl font-black text-slate-900 mb-1">124</div>
              <div className="text-indigo-600 font-bold mb-2">Total Reviews</div>
              <div className="text-sm text-slate-500 font-medium">Across all services</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-4xl font-black text-slate-900 mb-1">98%</div>
              <div className="text-emerald-600 font-bold mb-2">Satisfaction</div>
              <div className="text-sm text-slate-500 font-medium">Positive feedback</div>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-slate-900">{review.customerName}</h3>
                        <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {review.date}</span>
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {review.serviceName}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-sm leading-relaxed relative italic">
                  <MessageSquare className="w-8 h-8 text-slate-100 absolute -top-2 -right-1" />
                  "{review.comment}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ReviewsPage;
