import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Subtle Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px]"
          />

          {/* Modal Card - 1/3 Screen Width on Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="relative bg-white w-full md:w-[33.33%] max-w-[500px] min-w-[300px] rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col items-center text-center gap-4 mb-8">
                <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shrink-0">
                  <LogOut className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-1">Confirm Logout</h3>
                  <p className="text-sm text-slate-500 font-medium">Are you sure you want to sign out of your account?</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-3 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg shadow-red-200 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LogoutConfirmModal;
