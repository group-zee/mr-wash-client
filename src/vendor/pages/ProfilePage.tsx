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

  const inputClasses = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-slate-700 bg-white disabled:bg-slate-50 disabled:text-slate-400";
  const labelClasses = "flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1.5 ml-1";

  return (
    <VendorLayout>
      <div className="p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Business Profile</h1>
              <p className="text-slate-500 mt-1">Manage your business details and contact information.</p>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Edit Profile
              </button>
            ) : null}
          </header>

          <form onSubmit={handleSave} className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-500" />
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

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-indigo-500" />
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

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" />
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
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 active:scale-95"
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
