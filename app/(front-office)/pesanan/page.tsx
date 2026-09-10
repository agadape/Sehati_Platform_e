"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, ChevronRight, Store } from "lucide-react";
import { mockOrders, mockProducts } from "@/lib/mock-data";

export default function OrdersPage() {
  // Only show first 5 orders as dummy customer history
  const customerOrders = mockOrders.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Dikirim': return 'bg-brand text-brand';
      case 'Dikemas': return 'bg-orange-100 text-orange-700';
      default: return 'bg-brand-bg text-brand-ink'; // Diproses
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-24 md:pb-0">
      <h1 className="text-xl md:text-2xl font-bold text-brand-ink mb-6 font-display">Riwayat Pesanan</h1>

      <div className="space-y-4">
        {customerOrders.map(order => {
          // Deterministik ambil 1-2 produk sebagai sampel gambar pesanan
          const numericId = parseInt(order.id.replace(/\D/g, '') || '0');
          const sampleProduct1 = mockProducts[numericId % mockProducts.length];
          const sampleProduct2 = mockProducts[(numericId + 1) % mockProducts.length];
          const hasMultipleItems = order.total > 150000;

          return (
            <Link href={`/pesanan/${order.id}`} key={order.id} className="block">
              <div className="bg-white border border-brand-border/50 rounded-2xl p-4 hover:shadow-soft hover:border-brand/30 transition-all">
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-brand-border/30">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-brand" />
                    <span className="font-bold text-sm text-brand-ink">Sehati Mart</span>
                    <span className="text-brand-ink-muted text-xs">• {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="relative w-16 h-16 bg-brand-surface/20 rounded-xl p-1 border border-brand-border/50 shrink-0">
                    <Image 
                      src={sampleProduct1.image} 
                      alt={sampleProduct1.name} 
                      fill
                      sizes="64px"
                      className="object-contain p-1 rounded-lg mix-blend-multiply" 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-brand-ink truncate">{sampleProduct1.name}</h4>
                    <p className="text-xs text-brand-ink-muted mt-0.5">
                      {hasMultipleItems ? `+ 2 produk lainnya` : '1 barang'}
                    </p>
                  </div>
                  
                  <div className="text-right shrink-0 border-l border-brand-border/30 pl-4">
                    <div className="text-[10px] text-brand-ink-muted mb-0.5">Total Belanja</div>
                    <div className="font-bold text-brand-ink text-sm">Rp{order.total.toLocaleString('id-ID')}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

