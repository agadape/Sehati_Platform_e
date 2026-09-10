'use client';

import React, { useState } from 'react';
import { mockOrders, mockZones, Order } from '@/lib/mock-data';
import { Search, Filter, MoreVertical } from 'lucide-react';

export default function PesananPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterZone, setFilterZone] = useState<string>('All');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Dikirim': return 'bg-brand text-brand border-brand';
      case 'Dikemas': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Diproses': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-brand-surface text-brand-ink border-brand-border';
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
  };

  const filteredOrders = orders.filter(o => {
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    const matchZone = filterZone === 'All' || o.zoneId === filterZone;
    return matchStatus && matchZone;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-ink">Kelola Pesanan</h1>
          <p className="mt-1 text-sm text-brand-ink-muted">Daftar semua pesanan masuk dari pelanggan.</p>
        </div>
      </div>

      <div className="bg-brand-surface rounded-xl shadow-soft border border-brand-border overflow-hidden">
        <div className="p-6 border-b border-brand-border flex flex-col sm:flex-row gap-4 bg-brand-bg/50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-ink-muted h-5 w-5" />
            <input 
              type="text" 
              placeholder="Cari ID Pesanan atau Nama Pelanggan..." 
              className="w-full pl-10 pr-4 py-2.5 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand text-sm transition-shadow"
            />
          </div>
          <div className="flex gap-3">
            <select 
              className="border border-brand-border rounded-lg px-4 py-2.5 bg-brand-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand text-brand-ink-muted"
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
            >
              <option value="All">Semua Zona</option>
              {mockZones.map(z => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>
            <select 
              className="border border-brand-border rounded-lg px-4 py-2.5 bg-brand-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand text-brand-ink-muted"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="Diproses">Diproses</option>
              <option value="Dikemas">Dikemas</option>
              <option value="Dikirim">Dikirim</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-border">
            <thead className="bg-brand-bg">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">ID Pesanan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Pelanggan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Zona</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-brand-surface divide-y divide-brand-border">
              {filteredOrders.map(order => {
                const zone = mockZones.find(z => z.id === order.zoneId);
                return (
                  <tr key={order.id} className="hover:bg-brand-bg transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-brand-ink">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-brand-ink">{order.customerName}</div>
                      <div className="text-xs text-brand-ink-muted mt-0.5">{new Date(order.createdAt).toLocaleString('id-ID')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-ink-muted">{zone?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-ink font-semibold">Rp {order.total.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-sm border border-brand-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand bg-brand-surface text-brand-ink-muted hover:border-brand-border transition-colors cursor-pointer"
                      >
                        <option value="Diproses">Diproses</option>
                        <option value="Dikemas">Dikemas</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-12 text-center text-brand-ink-muted flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-surface rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-brand-ink-muted" />
              </div>
              <p className="text-lg font-medium text-brand-ink">Tidak ada pesanan</p>
              <p className="text-sm mt-1">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

