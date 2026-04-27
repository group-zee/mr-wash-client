import React, { useState, useEffect } from 'react';
import { LaundryService, ServiceAddon } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface ServiceFormProps {
  initialData: LaundryService | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'piece' as 'piece' | 'kg',
    category: 'Wash' as any,
    estimatedTime: '',
    addons: [] as ServiceAddon[],
  });

  const [newAddon, setNewAddon] = useState({ name: '', price: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price.toString(),
        unit: initialData.unit,
        category: initialData.category,
        estimatedTime: initialData.estimatedTime,
        addons: initialData.addons || [],
      });
    }
  }, [initialData]);

  const handleAddAddon = () => {
    if (newAddon.name && newAddon.price) {
      setFormData({
        ...formData,
        addons: [
          ...formData.addons,
          { id: Math.random().toString(36).substr(2, 9), name: newAddon.name, price: parseFloat(newAddon.price) }
        ]
      });
      setNewAddon({ name: '', price: '' });
    }
  };

  const handleRemoveAddon = (id: string) => {
    setFormData({
      ...formData,
      addons: formData.addons.filter(a => a.id !== id)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData?.id,
      price: parseFloat(formData.price),
    });
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-slate-700 bg-slate-50/50";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5 ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClasses}>Service Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Premium Suit Wash"
            className={inputClasses}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Description</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe what's included in this service..."
            rows={3}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={inputClasses}
          >
            <option value="Wash">Wash</option>
            <option value="Iron">Iron</option>
            <option value="Dry Clean">Dry Clean</option>
            <option value="Wash & Iron">Wash & Iron</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Estimated Time</label>
          <input
            type="text"
            required
            value={formData.estimatedTime}
            onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
            placeholder="e.g., 24 hours"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Price (₹)</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="0.00"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Unit</label>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['piece', 'kg'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setFormData({ ...formData, unit: u })}
                className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  formData.unit === u
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Per {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Add-on Services</h3>
        <div className="space-y-3 mb-4">
          {formData.addons.map((addon) => (
            <div key={addon.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="font-semibold text-slate-700">{addon.name}</div>
                <div className="text-sm text-indigo-600 font-bold">₹{addon.price}</div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveAddon(addon.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr,100px,50px] gap-2 items-end bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
          <div>
            <label className="text-[10px] font-bold text-indigo-400 uppercase ml-1">Add-on Name</label>
            <input
              type="text"
              placeholder="e.g., Fabric Softener"
              value={newAddon.name}
              onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-indigo-100 focus:border-indigo-400 outline-none text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-indigo-400 uppercase ml-1">Price (₹)</label>
            <input
              type="number"
              placeholder="0"
              value={newAddon.price}
              onChange={(e) => setNewAddon({ ...newAddon, price: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-indigo-100 focus:border-indigo-400 outline-none text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleAddAddon}
            className="h-[38px] flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all active:scale-95 shadow-md shadow-indigo-100"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all active:scale-95"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          {initialData ? 'Save Changes' : 'Add Service'}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;

