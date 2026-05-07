import React, { useEffect } from 'react';
import { LaundryService, ServiceAddon } from '../types';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ServiceFormProps {
  initialData: LaundryService | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price.toString() || '',
      unit: initialData?.unit || 'piece',
      category: initialData?.category || 'Wash',
      estimatedTime: initialData?.estimatedTime || '',
      addons: initialData?.addons || [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      price: Yup.number().required('Required').positive('Must be positive'),
      unit: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
      estimatedTime: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      onSubmit({
        ...values,
        id: initialData?.id,
        price: parseFloat(values.price),
      });
    },
  });

  const [addonName, setAddonName] = React.useState('');
  const [addonPrice, setAddonPrice] = React.useState('');

  const handleAddAddon = () => {
    if (addonName && addonPrice) {
      const newAddons = [
        ...formik.values.addons,
        { id: Math.random().toString(36).substr(2, 9), name: addonName, price: parseFloat(addonPrice) }
      ];
      formik.setFieldValue('addons', newAddons);
      setAddonName('');
      setAddonPrice('');
    }
  };

  const handleRemoveAddon = (id: string) => {
    formik.setFieldValue('addons', formik.values.addons.filter(a => a.id !== id));
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-xl border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-slate-700 bg-slate-50/50 shadow-sm";
  const labelClasses = "flex items-center justify-between text-sm font-semibold text-slate-700 mb-1.5 ml-1";

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1 custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClasses}>
            Service Name
            {formik.touched.name && formik.errors.name && <span className="text-red-500 font-normal text-xs">{formik.errors.name}</span>}
          </label>
          <input type="text" {...formik.getFieldProps('name')} placeholder="e.g., Premium Suit Wash" 
            className={`${inputClasses} ${formik.touched.name && formik.errors.name ? 'border-red-400' : 'border-slate-200'}`}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>
            Description
            {formik.touched.description && formik.errors.description && <span className="text-red-500 font-normal text-xs">{formik.errors.description}</span>}
          </label>
          <textarea rows={3} {...formik.getFieldProps('description')} placeholder="Describe what's included..." 
            className={`${inputClasses} ${formik.touched.description && formik.errors.description ? 'border-red-400' : 'border-slate-200'}`}
          />
        </div>

        <div>
          <label className={labelClasses}>Category</label>
          <select {...formik.getFieldProps('category')} className={inputClasses}>
            <option value="Wash">Wash</option>
            <option value="Iron">Iron</option>
            <option value="Dry Clean">Dry Clean</option>
            <option value="Wash & Iron">Wash & Iron</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>
            Estimated Time
            {formik.touched.estimatedTime && formik.errors.estimatedTime && <span className="text-red-500 font-normal text-xs">{formik.errors.estimatedTime}</span>}
          </label>
          <input type="text" {...formik.getFieldProps('estimatedTime')} placeholder="e.g., 24 hours" 
            className={`${inputClasses} ${formik.touched.estimatedTime && formik.errors.estimatedTime ? 'border-red-400' : 'border-slate-200'}`}
          />
        </div>

        <div>
          <label className={labelClasses}>
            Price (₹)
            {formik.touched.price && formik.errors.price && <span className="text-red-500 font-normal text-xs">{formik.errors.price}</span>}
          </label>
          <input type="number" {...formik.getFieldProps('price')} placeholder="0.00" 
            className={`${inputClasses} ${formik.touched.price && formik.errors.price ? 'border-red-400' : 'border-slate-200'}`}
          />
        </div>

        <div>
          <label className={labelClasses}>Unit</label>
          <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
            {(['piece', 'kg'] as const).map((u) => (
              <button key={u} type="button" onClick={() => formik.setFieldValue('unit', u)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${formik.values.unit === u ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
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
        <div className="space-y-2.5 mb-4">
          {formik.values.addons.map((addon) => (
            <div key={addon.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="font-semibold text-slate-700 text-sm">{addon.name}</div>
                <div className="text-sm text-blue-600 font-bold">₹{addon.price}</div>
              </div>
              <button type="button" onClick={() => handleRemoveAddon(addon.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr,100px,50px] gap-2 items-end bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 shadow-sm">
          <div>
            <label className="text-[10px] font-bold text-blue-400 uppercase ml-1">Add-on Name</label>
            <input type="text" placeholder="Fabric Softener" value={addonName} onChange={(e) => setAddonName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-blue-100 focus:border-blue-400 outline-none text-sm shadow-inner" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-blue-400 uppercase ml-1">Price (₹)</label>
            <input type="number" placeholder="0" value={addonPrice} onChange={(e) => setAddonPrice(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-blue-100 focus:border-blue-400 outline-none text-sm shadow-inner" />
          </div>
          <button type="button" onClick={handleAddAddon} className="h-[38px] flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-200"><Plus className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="flex gap-3 pt-6 border-t border-slate-100">
        <button type="button" onClick={onCancel} className="flex-1 px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all active:scale-95 text-sm">Cancel</button>
        <button type="submit" className="flex-1 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-95 text-sm">{initialData ? 'Save Changes' : 'Add Service'}</button>
      </div>
    </form>
  );
};

export default ServiceForm;
