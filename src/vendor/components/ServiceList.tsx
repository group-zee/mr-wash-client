import React from 'react';
import { LaundryService } from '../types';
import { Edit2, Trash2, Tag, Clock } from 'lucide-react';

interface ServiceListProps {
  services: LaundryService[];
  onEdit: (service: LaundryService) => void;
  onDelete: (id: string) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onEdit, onDelete }) => {
  if (services.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Tag className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No services found</h3>
        <p className="text-slate-500">Get started by adding your first laundry service.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Service Details</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Pricing</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Time</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {services.map((service) => (
            <tr key={service.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-900">{service.name}</div>
                <div className="text-sm text-slate-500 max-w-xs truncate">{service.description}</div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {service.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-slate-900 font-medium">₹{service.price}</div>
                <div className="text-xs text-slate-400">per {service.unit}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {service.estimatedTime}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(service)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(service.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
