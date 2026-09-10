import React from 'react';
import { Calendar, Download, TrendingUp } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Harian</h1>
          <p className="mt-1 text-sm text-gray-500">Ringkasan transaksi dan performa penjualan.</p>
        </div>
        <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-500">Rata-rata Pesanan / Hari</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">127</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" />
              <span className="sr-only">Naik</span>
              12%
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-500">Pendapatan Kotor (Minggu Ini)</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">Rp 56.200.000</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-500">Pendapatan Bersih (Minggu Ini)</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">Rp 44.960.000</p>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Riwayat Transaksi Harian</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <Calendar className="h-4 w-4" />
            <span>06 Sep 2026 - 10 Sep 2026</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pesanan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pendapatan Kotor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pendapatan Bersih</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dailyReports.map((report, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(report.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.totalOrders} pesanan
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rp {report.grossRevenue.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
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
