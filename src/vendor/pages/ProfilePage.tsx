import React, { useState } from 'react';
import VendorLayout from '../components/VendorLayout';
import { VendorProfile } from '../types';
import { Save, User, Mail, Phone, MapPin, Building, Clock, Info } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<VendorProfile>({
    name: 'Mujeeb Rahman',
    email: 'mujeeb@mrwash.com',
    phone: '+91 98765 43210',
    address: '123 Laundry Lane, Clean City, Metropolis',
    businessName: 'Mr. Wash Premium Laundry',
    openingTime: '09:00',
    closingTime: '20:00',
    description: 'We provide high-quality laundry and dry cleaning services with 24-hour delivery.'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Mock save
    alert('Profile updated successfully!');
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition-all outline-none text-white bg-[#111827]/80 disabled:bg-white/5 disabled:text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.1)]";
  const labelClasses = "flex items-center gap-2 text-sm font-semibold text-slate-300 mb-1.5 ml-1";

  return (
    <VendorLayout>
      <div className="p-6 md:p-10 lg:px-12 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Business Profile</h1>
              <p className="text-slate-400 mt-2 text-lg">Manage your business details and contact information.</p>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/25 active:scale-95"
              >
                Edit Profile
              </button>
            ) : null}
          </header>

          <form onSubmit={handleSave} className="space-y-8">
            <div className="bg-[#111827]/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-violet-400" />
                Business Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}><Building className="w-4 h-4" /> Business Name</label>
                  <input 
                    disabled={!isEditing}
                    type="text" 
                    value={profile.businessName}
                    onChange={(e) => setProfile({...profile, businessName: e.target.value})}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}><User className="w-4 h-4" /> Owner Name</label>
                  <input 
                    disabled={!isEditing}
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className={inputClasses}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}><Info className="w-4 h-4" /> Description</label>
                  <textarea 
                    disabled={!isEditing}
                    rows={3}
                    value={profile.description}
                    onChange={(e) => setProfile({...profile, description: e.target.value})}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111827]/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-violet-400" />
                Contact & Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}><Mail className="w-4 h-4" /> Email Address</label>
                  <input 
                    disabled={!isEditing}
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}><Phone className="w-4 h-4" /> Phone Number</label>
                  <input 
                    disabled={!isEditing}
                    type="tel" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className={inputClasses}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}><MapPin className="w-4 h-4" /> Business Address</label>
                  <input 
                    disabled={!isEditing}
                    type="text" 
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111827]/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-violet-400" />
                Operating Hours
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}><Clock className="w-4 h-4" /> Opening Time</label>
                  <input 
                    disabled={!isEditing}
                    type="time" 
                    value={profile.openingTime}
                    onChange={(e) => setProfile({...profile, openingTime: e.target.value})}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}><Clock className="w-4 h-4" /> Closing Time</label>
                  <input 
                    disabled={!isEditing}
                    type="time" 
                    value={profile.closingTime}
                    onChange={(e) => setProfile({...profile, closingTime: e.target.value})}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-white/5 text-slate-300 px-6 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-all active:scale-95 border border-white/10"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3.5 rounded-xl font-bold hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ProfilePage;
