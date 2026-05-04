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
      <div className="p-16 text-center">
        <div className="bg-slate-50 border border-slate-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Tag className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No services found</h3>
        <p className="text-slate-500">Get started by adding your first laundry service.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service Details</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pricing</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {services.map((service) => (
            <tr key={service.id} className="hover:bg-slate-50/80 transition-colors group">
              <td className="px-6 py-5">
                <div className="font-bold text-slate-900 mb-1">{service.name}</div>
                <div className="text-sm text-slate-500 max-w-xs truncate">{service.description}</div>
              </td>
              <td className="px-6 py-5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                  {service.category}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="text-slate-900 font-bold text-lg">₹{service.price}</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">per {service.unit}</div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <Clock className="w-4 h-4 text-blue-500" />
                  {service.estimatedTime}
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(service)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-lg transition-all shadow-sm"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(service.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-all shadow-sm"
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
