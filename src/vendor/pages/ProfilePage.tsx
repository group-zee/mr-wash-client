import React, { useState } from 'react';
import VendorLayout from '../components/VendorLayout';
import { VendorProfile } from '../types';
import { Save, User, Mail, Phone, MapPin, Building, Clock, Info, AlertCircle } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: 'Mujeeb Rahman',
      email: 'mujeeb@mrwash.com',
      phone: '9876543210',
      address: '123 Laundry Lane, Clean City, Metropolis',
      businessName: 'Mr. Wash Premium Laundry',
      openingTime: '09:00',
      closingTime: '20:00',
      description: 'We provide high-quality laundry and dry cleaning services with 24-hour delivery.'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().required('Required').matches(/^\d{10,15}$/, 'Invalid phone'),
      address: Yup.string().required('Required'),
      businessName: Yup.string().required('Required'),
      openingTime: Yup.string().required('Required'),
      closingTime: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    },
  });

  const inputClasses = "w-full px-3 py-2 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-900 bg-white disabled:bg-slate-50 disabled:text-slate-500 shadow-sm";
  const labelClasses = "flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5 ml-1";

  return (
    <VendorLayout>
      <div className="p-6 md:p-10 lg:px-12 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Business Profile</h1>
              <p className="text-slate-500 mt-1 text-base">Manage your business details and contact information.</p>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-all shadow-sm active:scale-95 text-sm"
              >
                Edit Profile
              </button>
            ) : null}
          </header>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Business Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}><Building className="w-4 h-4 text-slate-400" /> Business Name</label>
                  <input disabled={!isEditing} type="text" {...formik.getFieldProps('businessName')} 
                    className={`${inputClasses} ${formik.touched.businessName && formik.errors.businessName ? 'border-red-400' : 'border-slate-300'}`}
                  />
                </div>
                <div>
                  <label className={labelClasses}><User className="w-4 h-4 text-slate-400" /> Owner Name</label>
                  <input disabled={!isEditing} type="text" {...formik.getFieldProps('name')} 
                    className={`${inputClasses} ${formik.touched.name && formik.errors.name ? 'border-red-400' : 'border-slate-300'}`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}><Info className="w-4 h-4 text-slate-400" /> Description</label>
                  <textarea disabled={!isEditing} rows={3} {...formik.getFieldProps('description')} 
                    className={`${inputClasses} ${formik.touched.description && formik.errors.description ? 'border-red-400' : 'border-slate-300'}`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                Contact & Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}><Mail className="w-4 h-4 text-slate-400" /> Email Address</label>
                  <input disabled={!isEditing} type="email" {...formik.getFieldProps('email')} 
                    className={`${inputClasses} ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-slate-300'}`}
                  />
                </div>
                <div>
                  <label className={labelClasses}><Phone className="w-4 h-4 text-slate-400" /> Phone Number</label>
                  <input disabled={!isEditing} type="tel" {...formik.getFieldProps('phone')} 
                    className={`${inputClasses} ${formik.touched.phone && formik.errors.phone ? 'border-red-400' : 'border-slate-300'}`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}><MapPin className="w-4 h-4 text-slate-400" /> Business Address</label>
                  <input disabled={!isEditing} type="text" {...formik.getFieldProps('address')} 
                    className={`${inputClasses} ${formik.touched.address && formik.errors.address ? 'border-red-400' : 'border-slate-300'}`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Operating Hours
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}><Clock className="w-4 h-4 text-slate-400" /> Opening Time</label>
                  <input disabled={!isEditing} type="time" {...formik.getFieldProps('openingTime')} 
                    className={`${inputClasses} ${formik.touched.openingTime && formik.errors.openingTime ? 'border-red-400' : 'border-slate-300'}`}
                  />
                </div>
                <div>
                  <label className={labelClasses}><Clock className="w-4 h-4 text-slate-400" /> Closing Time</label>
                  <input disabled={!isEditing} type="time" {...formik.getFieldProps('closingTime')} 
                    className={`${inputClasses} ${formik.touched.closingTime && formik.errors.closingTime ? 'border-red-400' : 'border-slate-300'}`}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-lg font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-all active:scale-95 text-sm">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm active:scale-95 flex items-center gap-2 text-sm"><Save className="w-4 h-4" />Save Changes</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ProfilePage;
