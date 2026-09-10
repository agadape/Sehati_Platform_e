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
        <ChevronLeft className="w-5 h-5 text-brand-ink-muted" />
        <h1 className="text-xl font-bold text-brand-ink font-display">Detail Pesanan</h1>
      </div>

      <div className="bg-brand-surface rounded-xl border overflow-hidden mb-6">
        <div className="p-4 bg-brand-bg border-b flex justify-between items-center">
          <div>
            <div className="text-sm text-brand-ink-muted">Nomor Pesanan</div>
            <div className="font-bold text-brand-ink">{order.id}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-brand-ink-muted">Tanggal</div>
            <div className="font-medium text-brand-ink">{new Date(order.createdAt).toLocaleDateString('id-ID')}</div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-brand-ink mb-6 font-display">Status Pengiriman</h3>
          
          <div className="relative pl-6 space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:border-l-2 before:border-dashed before:border-brand-border before:bg-transparent">
            {statuses.map((status, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              
              let Icon = Clock;
              if (status === 'Selesai') Icon = CheckCircle2;
              else if (status === 'Dikirim') Icon = Truck;
              else if (status === 'Dikemas') Icon = Package;

              return (
                <div key={status} className={`relative ${isCompleted ? 'text-brand' : 'text-brand-ink-muted'}`}>
                  <div className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2 bg-brand-surface ring-4 ring-brand-bg ${isCompleted ? 'text-brand' : 'text-brand-border'}`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5 fill-current bg-brand-surface rounded-full" /> : <div className="w-3 h-3 rounded-full bg-brand-border" />}
                  </div>
                  <div>
                    <div className={`font-bold ${isCurrent ? 'text-brand' : ''}`}>{status}</div>
                    {isCurrent && status === 'Dikirim' && (
                      <div className="text-sm mt-1 text-brand-ink-muted">Pesanan sedang dalam perjalanan oleh kurir.</div>
                    )}
                    {isCurrent && status === 'Diproses' && (
                      <div className="text-sm mt-1 text-brand-ink-muted">Pesanan telah dikonfirmasi dan sedang disiapkan.</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-brand-surface rounded-xl border p-5 mb-6">
        <h3 className="font-bold text-brand-ink mb-4 flex items-center gap-2 font-display">
          <MapPin className="w-5 h-5 text-brand-ink-muted" />
          Informasi Pengiriman
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex">
            <span className="w-1/3 text-brand-ink-muted">Penerima</span>
            <span className="w-2/3 font-medium text-brand-ink">{order.customerName}</span>
          </div>
          <div className="flex">
            <span className="w-1/3 text-brand-ink-muted">Zona Wilayah</span>
            <span className="w-2/3 font-medium text-brand-ink">{zone?.name}</span>
          </div>
          <div className="flex">
            <span className="w-1/3 text-brand-ink-muted">Jadwal Antar</span>
            <span className="w-2/3 font-medium text-brand-ink">{zone?.schedule}</span>
          </div>
          {order.manifestId && (
            <div className="flex pt-3 border-t mt-3">
              <span className="w-1/3 text-brand-ink-muted">No. Manifest</span>
              <span className="w-2/3 font-medium text-brand-ink">{order.manifestId}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-brand-surface rounded-xl border p-5">
        <h3 className="font-bold text-brand-ink mb-4 font-display">Rincian Pembayaran</h3>
        <div className="flex justify-between items-center text-lg">
          <span className="text-brand-ink-muted">Total Belanja</span>
          <span className="font-bold text-brand-ink font-display">Rp{order.total.toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  );
}
