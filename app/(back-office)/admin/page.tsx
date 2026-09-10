import React from 'react';
import { ShoppingBag, TrendingUp, AlertTriangle, RefreshCw, Activity } from 'lucide-react';
import { mockOrders, mockProducts, mockSyncLogs } from '@/lib/mock-data';

export default function AdminDashboard() {
  const todayOrders = mockOrders.filter(o => o.createdAt.startsWith('2026-09-10')).length;
  const todayRevenue = mockOrders.filter(o => o.createdAt.startsWith('2026-09-10')).reduce((acc, curr) => acc + curr.total, 0);
  const lowStockProducts = mockProducts.filter(p => p.stock < 30).length;
  const lastSync = mockSyncLogs[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-ink tracking-tight">Dashboard Overview</h1>
          <p className="mt-2 text-brand-ink-muted font-medium">Ringkasan operasional dan performa hari ini.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-brand-surface rounded-full border border-brand-border shadow-soft text-sm font-medium text-brand-ink-muted">
          <Activity className="h-4 w-4 text-brand" />
          <span>Real-time updates active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg shadow-brand/20 p-6 text-white group">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-surface/10 rounded-full blur-2xl group-hover:bg-brand-surface/20 transition-all"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-brand font-medium mb-1">Pesanan Hari Ini</p>
              <p className="text-4xl font-extrabold tracking-tight">{todayOrders}</p>
            </div>
            <div className="p-3 bg-brand-surface/20 rounded-xl backdrop-blur-sm">
              <ShoppingBag className="h-7 w-7 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-brand relative z-10">
            <span className="bg-brand-surface/20 px-2 py-0.5 rounded text-white font-medium mr-2">+12%</span>
            vs kemarin
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-lg shadow-emerald-900/20 p-6 text-white group">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-surface/10 rounded-full blur-2xl group-hover:bg-brand-surface/20 transition-all"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-emerald-100 font-medium mb-1">Pendapatan (Hari Ini)</p>
              <p className="text-3xl font-extrabold tracking-tight">Rp {todayRevenue.toLocaleString('id-ID')}</p>
            </div>
            <div className="p-3 bg-brand-surface/20 rounded-xl backdrop-blur-sm">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-100 relative z-10">
            <span className="bg-brand-surface/20 px-2 py-0.5 rounded text-white font-medium mr-2">+5.4%</span>
            vs kemarin
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-900/20 p-6 text-white group">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-surface/10 rounded-full blur-2xl group-hover:bg-brand-surface/20 transition-all"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-orange-100 font-medium mb-1">Stok Menipis</p>
              <p className="text-4xl font-extrabold tracking-tight">{lowStockProducts}</p>
            </div>
            <div className="p-3 bg-brand-surface/20 rounded-xl backdrop-blur-sm">
              <AlertTriangle className="h-7 w-7 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-orange-100 relative z-10">
            Perlu restock segera
          </div>
        </div>

        {/* Card 4 */}
        <div className={`relative overflow-hidden rounded-2xl shadow-lg p-6 text-white group ${
          lastSync.status === 'Tersambung' 
            ? 'bg-gradient-to-br from-brand-dark to-brand shadow-brand-dark/20' 
            : 'bg-gradient-to-br from-rose-500 to-rose-700 shadow-rose-900/20'
        }`}>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-brand-bg font-medium mb-1">Status FoxPro</p>
              <p className="text-2xl font-extrabold tracking-tight">{lastSync.status}</p>
            </div>
            <div className={`p-3 rounded-xl backdrop-blur-sm ${lastSync.status === 'Tersambung' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-surface/20 text-white'}`}>
              <RefreshCw className={`h-7 w-7 ${lastSync.status === 'Tersambung' ? 'animate-spin-slow' : ''}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-brand-bg relative z-10">
            Terakhir: {new Date(lastSync.time).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-brand-surface rounded-2xl shadow-soft border border-brand-border p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-brand-ink">Tren Penjualan Mingguan</h2>
            <p className="text-brand-ink-muted text-sm mt-1">Volume pesanan dalam 7 hari terakhir</p>
          </div>
          <select className="bg-brand-bg border border-brand-border text-brand-ink-muted rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand">
            <option>7 Hari Terakhir</option>
            <option>Bulan Ini</option>
          </select>
        </div>
        
        <div className="relative h-72">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full border-b border-brand-border flex-1"></div>
            ))}
            <div className="w-full border-b border-brand-border"></div>
          </div>
          
          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-2 pt-8 pb-1">
            {[40, 70, 45, 90, 65, 120, 85].map((height, i) => (
              <div key={i} className="w-[10%] flex flex-col items-center group relative">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-brand-dark text-white text-xs font-bold py-1 px-2 rounded pointer-events-none z-10">
                  {height} pesanan
                </div>
                
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg shadow-soft group-hover:from-blue-500 group-hover:to-blue-300 transition-all duration-300"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-sm font-medium text-brand-ink-muted mt-4 absolute -bottom-8">
                  {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Ming'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-brand-ink-muted">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand"></div>
            <span>Pesanan Selesai</span>
          </div>
        </div>
      </div>
    </div>
  );
}

