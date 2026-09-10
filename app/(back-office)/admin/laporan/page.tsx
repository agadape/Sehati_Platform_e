import React from 'react';
import { Calendar, Download, TrendingUp, BarChart3, DollarSign, Activity } from 'lucide-react';

export default function LaporanPage() {
  // Dummy data for reports
  const dailyReports = [
    { date: '2026-09-10', totalOrders: 145, grossRevenue: 12500000, netRevenue: 10000000 },
    { date: '2026-09-09', totalOrders: 132, grossRevenue: 11200000, netRevenue: 8960000 },
    { date: '2026-09-08', totalOrders: 156, grossRevenue: 14800000, netRevenue: 11840000 },
    { date: '2026-09-07', totalOrders: 110, grossRevenue: 9500000, netRevenue: 7600000 },
    { date: '2026-09-06', totalOrders: 95, grossRevenue: 8200000, netRevenue: 6560000 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Laporan Harian</h1>
          <p className="mt-1 text-sm text-slate-500">Ringkasan transaksi dan performa penjualan mingguan.</p>
        </div>
        <button className="flex items-center bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg hover:bg-slate-50 hover:text-slate-900 font-semibold transition-all shadow-sm active:scale-95">
          <Download className="h-4 w-4 mr-2 text-slate-500" />
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
            <Activity className="h-20 w-20 text-blue-600" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Rata-rata Pesanan / Hari</p>
            <div className="flex items-end">
              <p className="text-4xl font-extrabold text-slate-900">127</p>
              <p className="ml-3 flex items-center text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mb-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="sr-only">Naik</span>
                12%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
            <BarChart3 className="h-20 w-20 text-blue-600" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Pendapatan Kotor (Minggu Ini)</p>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">Rp 56.200<span className="text-slate-400">.000</span></p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
            <DollarSign className="h-20 w-20 text-emerald-600" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Pendapatan Bersih (Minggu Ini)</p>
            <p className="text-3xl font-extrabold text-emerald-600 tracking-tight">Rp 44.960<span className="text-emerald-400">.000</span></p>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">Riwayat Transaksi Harian</h2>
          <div className="flex items-center space-x-2 text-sm text-slate-600 bg-white px-4 py-2.5 rounded-lg border border-slate-300 font-medium shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>06 Sep 2026 - 10 Sep 2026</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pesanan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Pendapatan Kotor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider text-emerald-700">Pendapatan Bersih</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {dailyReports.map((report, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                    {new Date(report.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                      {report.totalOrders}
                    </span>
                    <span className="text-xs text-slate-500 ml-2">pesanan</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                    Rp {report.grossRevenue.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">
                    Rp {report.netRevenue.toLocaleString('id-ID')}
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
