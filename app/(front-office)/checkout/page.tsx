"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Ticket, Clock, CheckCircle, ShieldCheck, AlertCircle } from "lucide-react";
import { mockZones } from "@/lib/mock-data";

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState(mockZones[0].id);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState("");

  const subtotal = 145000; 
  const total = subtotal - discount;

  const currentHour = new Date().getHours();
  const isSameDay = currentHour < 12;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SEHATI10") {
      setDiscount(subtotal * 0.1);
      setPromoMsg("Kode promo berhasil digunakan!");
    } else {
      setDiscount(0);
      setPromoMsg("Kode promo tidak valid.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 md:pb-8 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex items-center gap-3 mb-6 cursor-pointer hover:opacity-80 transition-opacity w-fit" onClick={() => router.back()}>
        <div className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
      </div>

      <div className="lg:flex gap-8">
        <div className="lg:flex-1 space-y-6">
          
          {/* Zona Pengiriman */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="font-extrabold text-gray-900 mb-5 flex items-center gap-2.5 text-lg">
              <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              Alamat & Zona Pengiriman
            </h2>
            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Zona Anda</label>
              <div className="relative">
                <select 
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none bg-gray-50 hover:bg-white text-gray-900 font-semibold appearance-none transition-all cursor-pointer"
                >
                  {mockZones.map(zone => (
                    <option key={zone.id} value={zone.id}>{zone.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <ChevronLeft className="w-5 h-5 text-gray-400 -rotate-90" />
                </div>
              </div>
            </div>
            
            <div className={`p-5 rounded-2xl flex items-start gap-4 border transition-colors ${isSameDay ? 'bg-green-50/50 border-green-200' : 'bg-blue-50/50 border-blue-200'}`}>
              <div className={`p-2 rounded-full ${isSameDay ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className={`font-black text-lg ${isSameDay ? 'text-green-800' : 'text-blue-800'}`}>
                  {isSameDay ? 'Dikirim Hari Ini (Same Day)' : 'Dikirim Besok (Next Day)'}
                </div>
                <p className={`text-sm mt-1.5 leading-relaxed font-medium ${isSameDay ? 'text-green-700/80' : 'text-blue-700/80'}`}>
                  {isSameDay 
                    ? "Pesanan Anda masuk sebelum jam 12:00, akan dikirimkan hari ini sesuai jadwal zona." 
                    : "Pesanan masuk setelah jam 12:00, akan masuk jadwal pengiriman keesokan harinya."}
                </p>
                <div className={`mt-3 inline-block px-3 py-1 rounded-lg text-xs font-bold ${isSameDay ? 'bg-green-200/50 text-green-800' : 'bg-blue-200/50 text-blue-800'}`}>
                  Jadwal Zona: {mockZones.find(z => z.id === selectedZone)?.schedule}
                </div>
              </div>
            </div>
          </div>

          {/* Promo */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="font-extrabold text-gray-900 mb-5 flex items-center gap-2.5 text-lg">
              <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
                <Ticket className="w-5 h-5" />
              </div>
              Makin Hemat Pakai Promo!
            </h2>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Masukkan kode SEHATI10" 
                className="flex-1 border border-gray-200 rounded-xl p-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none bg-gray-50 uppercase font-bold tracking-wide"
              />
              <button 
                onClick={handleApplyPromo}
                className="bg-gray-900 text-white px-6 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-md shadow-gray-900/10 active:scale-95"
              >
                Gunakan
              </button>
            </div>
            {promoMsg && (
              <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm font-bold animate-in fade-in ${discount > 0 ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                {discount > 0 ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                {promoMsg}
              </div>
            )}
          </div>

        </div>

        {/* Summary */}
        <div className="mt-8 lg:mt-0 lg:w-96">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-6 text-lg border-b pb-4">Ringkasan Pembayaran</h3>
            
            <div className="space-y-4 text-sm font-medium text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal (2 Barang)</span>
                <span className="text-gray-900 font-bold">Rp{subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim</span>
                <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md">Gratis</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold animate-in fade-in">
                  <span>Diskon Promo</span>
                  <span>-Rp{discount.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>
            
            <div className="border-t border-dashed border-gray-200 my-6 pt-6 flex justify-between items-center">
              <span className="font-bold text-gray-600">Total Bayar</span>
              <span className="font-black text-2xl text-blue-600">Rp{total.toLocaleString('id-ID')}</span>
            </div>

            <button 
              onClick={() => router.push('/checkout/pembayaran')}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Pilih Pembayaran
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Transaksi Aman 100%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
