"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, CheckCircle2, Clock, MapPin, Truck, Package } from "lucide-react";
import { mockOrders, mockZones } from "@/lib/mock-data";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const order = mockOrders.find(o => o.id === id) || mockOrders[0];
  const zone = mockZones.find(z => z.id === order.zoneId);

  const statuses = ['Diproses', 'Dikemas', 'Dikirim', 'Selesai'];
  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-0">
      <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => router.back()}>
        <ChevronLeft className="w-5 h-5 text-gray-600" />
        <h1 className="text-xl font-bold text-gray-900">Detail Pesanan</h1>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden mb-6">
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Nomor Pesanan</div>
            <div className="font-bold text-gray-900">{order.id}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Tanggal</div>
            <div className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString('id-ID')}</div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-gray-900 mb-6">Status Pengiriman</h3>
          
          <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-gray-200">
            {statuses.map((status, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              
              let Icon = Clock;
              if (status === 'Selesai') Icon = CheckCircle2;
              else if (status === 'Dikirim') Icon = Truck;
              else if (status === 'Dikemas') Icon = Package;

              return (
                <div key={status} className={`relative ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                  <div className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2 bg-white ring-4 ring-white ${isCompleted ? 'text-blue-600' : 'text-gray-300'}`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5 fill-current bg-white rounded-full" /> : <div className="w-3 h-3 rounded-full bg-gray-300" />}
                  </div>
                  <div>
                    <div className={`font-bold ${isCurrent ? 'text-blue-600' : ''}`}>{status}</div>
                    {isCurrent && status === 'Dikirim' && (
                      <div className="text-sm mt-1 text-gray-600">Pesanan sedang dalam perjalanan oleh kurir.</div>
                    )}
                    {isCurrent && status === 'Diproses' && (
                      <div className="text-sm mt-1 text-gray-600">Pesanan telah dikonfirmasi dan sedang disiapkan.</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-5 mb-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          Informasi Pengiriman
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex">
            <span className="w-1/3 text-gray-500">Penerima</span>
            <span className="w-2/3 font-medium text-gray-900">{order.customerName}</span>
          </div>
          <div className="flex">
            <span className="w-1/3 text-gray-500">Zona Wilayah</span>
            <span className="w-2/3 font-medium text-gray-900">{zone?.name}</span>
          </div>
          <div className="flex">
            <span className="w-1/3 text-gray-500">Jadwal Antar</span>
            <span className="w-2/3 font-medium text-blue-600">{zone?.schedule}</span>
          </div>
          {order.manifestId && (
            <div className="flex pt-3 border-t mt-3">
              <span className="w-1/3 text-gray-500">No. Manifest</span>
              <span className="w-2/3 font-medium text-gray-900">{order.manifestId}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border p-5">
        <h3 className="font-bold text-gray-900 mb-4">Rincian Pembayaran</h3>
        <div className="flex justify-between items-center text-lg">
          <span className="text-gray-600">Total Belanja</span>
          <span className="font-bold text-gray-900">Rp{order.total.toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  );
}
