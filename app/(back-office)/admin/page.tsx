import React from 'react';
import { ShoppingBag, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { mockOrders, mockProducts, mockSyncLogs } from '@/lib/mock-data';

export default function AdminDashboard() {
  const todayOrders = mockOrders.filter(o => o.createdAt.startsWith('2026-09-10')).length;
  const todayRevenue = mockOrders.filter(o => o.createdAt.startsWith('2026-09-10')).reduce((acc, curr) => acc + curr.total, 0);
  const lowStockProducts = mockProducts.filter(p => p.stock < 30).length;
  const lastSync = mockSyncLogs[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Ringkasan operasional hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pesanan Hari Ini</p>
              <p className="text-2xl font-semibold text-gray-900">{todayOrders}</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pendapatan Hari Ini</p>
              <p className="text-2xl font-semibold text-gray-900">Rp {todayRevenue.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Stok Menipis</p>
              <p className="text-2xl font-semibold text-gray-900">{lowStockProducts} item</p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${lastSync.status === 'Tersambung' ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <RefreshCw className={`h-6 w-6 ${lastSync.status === 'Tersambung' ? 'text-emerald-600' : 'text-red-600'}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sync FoxPro</p>
              <p className={`text-lg font-semibold ${lastSync.status === 'Tersambung' ? 'text-emerald-700' : 'text-red-700'}`}>
                {lastSync.status}
              </p>
              <p className="text-xs text-gray-400">Terakhir: {new Date(lastSync.time).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dummy Chart Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Tren Penjualan Mingguan</h2>
        <div className="h-64 flex items-end justify-between space-x-2 pt-4">
          {[40, 70, 45, 90, 65, 120, 85].map((height, i) => (
            <div key={i} className="w-full flex flex-col items-center">
              <div 
                className="w-full bg-blue-100 hover:bg-blue-200 transition-colors rounded-t-sm"
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-2 block">H-{7-i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
