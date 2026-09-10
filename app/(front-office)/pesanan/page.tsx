"use client";

import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";
import { mockOrders } from "@/lib/mock-data";

export default function OrdersPage() {
  // Only show first 5 orders as dummy customer history
  const customerOrders = mockOrders.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Dikirim': return 'bg-blue-100 text-blue-700';
      case 'Dikemas': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700'; // Diproses
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-24 md:pb-0">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Riwayat Pesanan</h1>

      <div className="space-y-4">
        {customerOrders.map(order => (
          <Link href={`/pesanan/${order.id}`} key={order.id} className="block">
            <div className="bg-white border rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  <div className="font-bold text-gray-900">{order.id}</div>
                </div>
                <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Total Belanja</div>
                  <div className="text-sm font-bold text-blue-600">Rp{order.total.toLocaleString('id-ID')}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
