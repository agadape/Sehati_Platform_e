"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, Trash2, AlertCircle, ShoppingBag, ShieldCheck } from "lucide-react";
import { mockProducts } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState([
    { product: mockProducts[0], qty: 2 },
    { product: mockProducts[2], qty: 1 }
  ]);

  const updateQty = (index: number, newQty: number) => {
    if (newQty < 1) return;
    const newItems = [...items];
    newItems[index].qty = newQty;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const minOrder = 100000;
  const isEligible = subtotal >= minOrder;

  return (
    <div className="max-w-4xl mx-auto pb-24 md:pb-8 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex items-center gap-3 mb-6 cursor-pointer hover:opacity-80 transition-opacity w-fit" onClick={() => router.back()}>
        <div className="p-2 bg-brand-surface rounded-full shadow-soft border border-brand-border">
          <ChevronLeft className="w-5 h-5 text-brand-ink" />
        </div>
        <h1 className="text-2xl font-extrabold font-display text-brand-ink tracking-tight">Keranjang Belanja</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-brand-surface rounded-3xl border border-brand-border shadow-soft">
          <div className="w-24 h-24 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-brand" />
          </div>
          <h2 className="text-xl font-bold text-brand-ink mb-2 font-display">Keranjangmu Masih Kosong</h2>
          <p className="text-brand-ink-muted mb-8 max-w-sm mx-auto">Cari produk kebutuhan harianmu sekarang dan nikmati pengiriman cepat dari Sehati.</p>
          <Link href="/" className="inline-block bg-brand text-white font-bold px-8 py-3.5 rounded-full hover:bg-brand hover:shadow-soft hover:shadow-soft transition-all active:scale-95">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="lg:flex gap-8">
          <div className="lg:flex-1 space-y-4">
            {items.map((item, index) => (
              <div key={item.product.id} className="bg-brand-surface p-4 rounded-2xl border border-brand-border shadow-soft flex gap-4 hover:border-brand transition-colors">
                <div className="w-24 h-24 bg-brand-bg rounded-xl overflow-hidden flex-shrink-0 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-brand-ink line-clamp-2 text-sm md:text-base leading-snug font-display">{item.product.name}</h3>
                    <div className="text-brand-ink font-black font-display mt-1 text-lg">Rp{item.product.price.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <button onClick={() => removeItem(index)} className="text-brand-ink-muted hover:text-red-500 flex items-center gap-1.5 text-xs font-bold transition-colors">
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Hapus</span>
                    </button>
                    <div className="flex items-center border border-brand-border rounded-lg h-9 bg-brand-surface shadow-soft overflow-hidden">
                      <button onClick={() => updateQty(index, item.qty - 1)} className="w-9 h-full flex items-center justify-center text-brand-ink-muted hover:bg-brand hover:text-brand-ink transition-colors"><Minus className="w-3.5 h-3.5 stroke-[3]" /></button>
                      <span className="w-10 text-center text-sm font-bold bg-brand-bg h-full flex items-center justify-center">{item.qty}</span>
                      <button onClick={() => updateQty(index, item.qty + 1)} className="w-9 h-full flex items-center justify-center text-brand-ink-muted hover:bg-brand hover:text-brand-ink transition-colors"><Plus className="w-3.5 h-3.5 stroke-[3]" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 lg:mt-0 lg:w-96">
            <div className="bg-brand-surface p-6 rounded-3xl border border-brand-border shadow-soft shadow-gray-200/40 sticky top-24">
              <h3 className="font-bold text-brand-ink mb-6 text-lg border-b pb-4 font-display">Ringkasan Belanja</h3>
              
              <div className="space-y-3 mb-6 text-brand-ink-muted font-medium">
                <div className="flex justify-between">
                  <span>Total Harga ({items.length} Barang)</span>
                  <span className="text-brand-ink font-display">Rp{subtotal.toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              <div className="border-t border-dashed border-brand-border my-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-brand-ink-muted">Total Tagihan</span>
                <span className="font-black font-display text-2xl text-brand-ink">Rp{subtotal.toLocaleString('id-ID')}</span>
              </div>

              {!isEligible && (
                <div className="bg-red-50 text-red-800 p-4 rounded-xl flex gap-3 text-sm mb-6 border border-red-100 shadow-soft">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                  <div className="font-medium">
                    Tambah belanja <strong className="text-red-700 font-display">Rp{(minOrder - subtotal).toLocaleString('id-ID')}</strong> lagi untuk mencapai minimum order Rp100.000.
                  </div>
                </div>
              )}

              <button 
                onClick={() => router.push('/checkout')}
                disabled={!isEligible}
                className="w-full bg-brand text-white font-bold py-4 rounded-full hover:bg-brand hover:shadow-soft hover:shadow-soft transition-all disabled:opacity-50 disabled:hover:shadow-none disabled:cursor-not-allowed active:scale-[0.98]"
              >
                Beli Sekarang
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-brand-ink-muted uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Belanja Aman & Terpercaya
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

