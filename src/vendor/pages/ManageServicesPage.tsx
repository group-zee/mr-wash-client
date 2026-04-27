import React, { useState } from 'react';
import { LaundryService } from '../types';
import ServiceList from '../components/ServiceList';
import ServiceForm from '../components/ServiceForm';
import VendorLayout from '../components/VendorLayout';
import { Plus } from 'lucide-react';

const ManageServicesPage: React.FC = () => {
  const [services, setServices] = useState<LaundryService[]>([
    {
      id: '1',
      name: 'Regular Wash',
      description: 'Standard machine wash and dry.',
      price: 50,
      unit: 'kg',
      category: 'Wash',
      estimatedTime: '24 hours',
      addons: [],
    },
    {
      id: '2',
      name: 'Premium Ironing',
      description: 'Steam iron for crisp clothes.',
      price: 15,
      unit: 'piece',
      category: 'Iron',
      estimatedTime: '12 hours',
      addons: [],
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<LaundryService | null>(null);

  const handleAddService = (newService: Omit<LaundryService, 'id'>) => {
    const serviceWithId = { ...newService, id: Math.random().toString(36).substr(2, 9) };
    setServices([...services, serviceWithId]);
    setIsFormOpen(false);
  };

  const handleUpdateService = (updatedService: LaundryService) => {
    setServices(services.map((s) => (s.id === updatedService.id ? updatedService : s)));
    setEditingService(null);
    setIsFormOpen(false);
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const openAddForm = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const openEditForm = (service: LaundryService) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  return (
    <VendorLayout>
      <div className="p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manage Services</h1>
              <p className="text-slate-500 mt-1">Add, edit or remove the services you offer to customers.</p>
            </div>
            <button
              onClick={openAddForm}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Service</span>
            </button>
          </header>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <ServiceList 
              services={services} 
              onEdit={openEditForm} 
              onDelete={handleDeleteService} 
            />
          </div>

          {isFormOpen && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h2 className="text-xl font-bold text-slate-800">
                    {editingService ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <button 
                    onClick={() => setIsFormOpen(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <ServiceForm
                    initialData={editingService}
                    onSubmit={editingService ? handleUpdateService : handleAddService}
                    onCancel={() => setIsFormOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </VendorLayout>
  );
};

export default ManageServicesPage;

