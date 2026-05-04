import React, { useState } from 'react';
import { User, MapPin, Heart, Edit2, Plus, Trash2, CheckCircle, Save } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShopCard, { Shop } from '../components/ShopCard';

// Mock Favorites
const mockFavorites: Shop[] = [
  {
    id: 1,
    name: "Crystal Clean Laundry",
    location: "Downtown, Metro",
    rating: 4.8,
    reviews: 124,
    openTime: "08:00 AM",
    closeTime: "09:00 PM",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=800",
    specialty: "Eco-Friendly",
    priceRange: "₹₹",
    status: "Open"
  },
  {
    id: 2,
    name: "Express Ironing Center",
    location: "Westside Hub",
    rating: 4.5,
    reviews: 89,
    openTime: "09:00 AM",
    closeTime: "08:00 PM",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800",
    specialty: "Steam Ironing",
    priceRange: "₹",
    status: "Open"
  }
];

interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

const CustomerProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'favorites'>('profile');
  
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+91 9876543210'
  });

  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', type: 'Home', street: '123 Main St, Apt 4B', city: 'Metropolis', state: 'NY', zip: '10001', isDefault: true },
    { id: '2', type: 'Work', street: '456 Business Rd, Suite 900', city: 'Metropolis', state: 'NY', zip: '10002', isDefault: false },
  ]);

  const [isEditingAddress, setIsEditingAddress] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile saved successfully!");
  };

  const handleSaveAddress = () => {
    if (isEditingAddress === 'new') {
      setAddresses([...addresses, { ...newAddress, id: Date.now().toString(), isDefault: addresses.length === 0 } as Address]);
    } else if (isEditingAddress) {
      setAddresses(addresses.map(a => a.id === isEditingAddress ? { ...a, ...newAddress } as Address : a));
    }
    setIsEditingAddress(null);
    setNewAddress({});
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary-500/20">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full md:w-72 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary-500/30">
                  {profileData.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{profileData.name}</h2>
                  <p className="text-sm font-medium text-slate-500">Premium Member</p>
                </div>
              </div>
              
              <nav className="flex flex-col gap-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold ${activeTab === 'profile' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <User className="w-5 h-5" />
                  My Profile
                </button>
                <button 
                  onClick={() => setActiveTab('addresses')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold ${activeTab === 'addresses' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <MapPin className="w-5 h-5" />
                  My Addresses
                </button>
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold ${activeTab === 'favorites' ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <Heart className="w-5 h-5" />
                  Favorites
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">Personal Information</h2>
                <form onSubmit={handleProfileSave} className="space-y-6 max-w-xl">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input type="text" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-medium text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-medium text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-medium text-slate-800" />
                  </div>
                  <button type="submit" className="btn-primary w-max flex items-center gap-2 mt-4">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Saved Addresses</h2>
                  <button 
                    onClick={() => { setIsEditingAddress('new'); setNewAddress({ type: 'Home' }); }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 hover:bg-primary-100 font-bold rounded-xl transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map(addr => (
                    <div key={addr.id} className={`p-6 rounded-2xl border-2 transition-all ${addr.isDefault ? 'border-primary-500 bg-primary-50/30' : 'border-slate-100 hover:border-slate-300'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg">{addr.type}</span>
                          {addr.isDefault && <span className="flex items-center gap-1 text-primary-600 text-xs font-bold"><CheckCircle className="w-3 h-3" /> Default</span>}
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setIsEditingAddress(addr.id); setNewAddress(addr); }} className="p-2 text-slate-400 hover:text-primary-600 bg-slate-50 hover:bg-primary-50 rounded-lg transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteAddress(addr.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="font-bold text-slate-800 mb-1">{addr.street}</p>
                      <p className="text-slate-500 text-sm">{addr.city}, {addr.state} {addr.zip}</p>
                      
                      {!addr.isDefault && (
                        <button onClick={() => handleSetDefaultAddress(addr.id)} className="mt-4 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                          Set as Default
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Address Form Modal */}
                {isEditingAddress && (
                  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 p-8">
                      <h3 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">{isEditingAddress === 'new' ? 'Add New Address' : 'Edit Address'}</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Address Type</label>
                          <select value={newAddress.type} onChange={e => setNewAddress({...newAddress, type: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-medium text-slate-800">
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Street Address</label>
                          <input type="text" value={newAddress.street || ''} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-medium text-slate-800" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                            <input type="text" value={newAddress.city || ''} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-medium text-slate-800" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">State</label>
                            <input type="text" value={newAddress.state || ''} onChange={e => setNewAddress({...newAddress, state: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-medium text-slate-800" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">ZIP Code</label>
                          <input type="text" value={newAddress.zip || ''} onChange={e => setNewAddress({...newAddress, zip: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-medium text-slate-800" />
                        </div>
                      </div>
                      <div className="flex gap-4 mt-8">
                        <button onClick={handleSaveAddress} className="flex-1 btn-primary py-3 rounded-xl">Save Address</button>
                        <button onClick={() => setIsEditingAddress(null)} className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">Favorite Shops</h2>
                {mockFavorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockFavorites.map((shop, idx) => (
                      <ShopCard key={shop.id} shop={shop} index={idx} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                    <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-2">No favorites yet</h3>
                    <p className="text-slate-500">Shops you mark as favorite will appear here.</p>
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerProfilePage;
