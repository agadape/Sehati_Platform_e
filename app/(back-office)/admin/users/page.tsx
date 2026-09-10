'use client';

import React from 'react';
import { mockUsers } from '@/lib/mock-data';
import { UserPlus, Shield, MoreVertical } from 'lucide-react';

export default function UsersPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-ink">Manajemen User & Akses</h1>
          <p className="mt-1 text-sm text-brand-ink-muted">Kelola pengguna internal back-office dan hak akses mereka.</p>
        </div>
        <button className="flex items-center bg-brand hover:bg-brand text-white px-5 py-2.5 rounded-lg transition-colors font-semibold shadow-soft shadow-brand/20 active:scale-95">
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
    </div>
  );
}

