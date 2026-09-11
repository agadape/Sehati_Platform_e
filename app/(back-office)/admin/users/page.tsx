'use client';

import React, { useState } from 'react';
import { mockUsers } from '@/lib/mock-data';
import { UserPlus, Shield, MoreVertical, X, CheckCircle2 } from 'lucide-react';
import { useToast } from "@/components/shared/ToastProvider";

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      addToast("User baru berhasil ditambahkan!", "success");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-ink">Manajemen User & Akses</h1>
          <p className="mt-1 text-sm text-brand-ink-muted">Kelola pengguna internal back-office dan hak akses mereka.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-brand hover:bg-brand text-white px-5 py-2.5 rounded-lg transition-colors font-semibold shadow-soft shadow-brand/20 active:scale-95"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Tambah User Baru
        </button>
      </div>

      <div className="bg-brand-surface rounded-xl shadow-soft border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-border">
            <thead className="bg-brand-bg">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Nama & ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Role / Hak Akses</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-brand-surface divide-y divide-brand-border">
              {mockUsers.map(user => (
                <tr key={user.id} className="hover:bg-brand-bg transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-brand font-extrabold text-lg border border-brand shadow-soft">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-brand-ink">{user.name}</div>
                        <div className="text-xs text-brand-ink-muted font-medium">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-brand-ink-muted bg-brand-surface px-3 py-1.5 rounded-lg w-fit border border-brand-border">
                      <Shield className="h-4 w-4 text-brand-ink-muted mr-2" />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Aktif
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="p-1.5 rounded-lg text-brand-ink-muted hover:text-brand-ink-muted hover:bg-brand-surface transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-end bg-brand-dark/50 backdrop-blur-sm transition-opacity">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="w-full max-w-md h-full bg-brand-surface shadow-2xl relative flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-brand-border bg-white">
              <h2 className="text-xl font-bold text-brand-ink font-display">Tambah User Baru</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-brand-surface rounded-full text-brand-ink-muted hover:text-brand-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-brand-surface">
              <form id="addUserForm" onSubmit={handleAddUser} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-brand-ink mb-1.5">Nama Lengkap</label>
                  <input type="text" required placeholder="Cth: Sarah Wijaya" className="w-full border border-brand-border p-3 rounded-xl focus:ring-2 focus:ring-brand focus:outline-none bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-ink mb-1.5">Email Karyawan</label>
                  <input type="email" required placeholder="sarah@sehati.com" className="w-full border border-brand-border p-3 rounded-xl focus:ring-2 focus:ring-brand focus:outline-none bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-ink mb-1.5">Peran (Role)</label>
                  <div className="relative">
                    <select required className="w-full border border-brand-border p-3 rounded-xl focus:ring-2 focus:ring-brand focus:outline-none bg-white appearance-none cursor-pointer">
                      <option value="">Pilih peran akses...</option>
                      <option value="Admin Master">Admin Master</option>
                      <option value="Staff Gudang">Staff Gudang</option>
                      <option value="Staff Laporan">Staff Laporan</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-brand-border bg-white flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-brand-ink-muted font-bold hover:bg-brand-bg transition-colors"
              >
                Batal
              </button>
              <button 
                form="addUserForm"
                type="submit"
                disabled={isSubmitting}
                className="bg-brand text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
                {isSubmitting ? "Menyimpan..." : "Simpan User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

