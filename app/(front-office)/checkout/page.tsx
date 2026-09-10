"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Ticket, Clock, CheckCircle } from "lucide-react";
import { mockZones } from "@/lib/mock-data";

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState(mockZones[0].id);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState("");

  const subtotal = 145000; // Dummy subtotal
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
    <div className="max-w-3xl mx-auto pb-24 md:pb-0">
      <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => router.back()}>
        <ChevronLeft className="w-5 h-5 text-gray-600" />
        <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="md:flex gap-6">
        <div className="md:flex-1 space-y-4">
          
          {/* Zona Pengiriman */}
          <div className="bg-white p-5 rounded-xl border">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Alamat & Zona Pengiriman
            </h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Pilih Zona Anda</label>
              <select 
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-900 font-medium"
              >
                {mockZones.map(zone => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>
            </div>
            
            <div className={`p-4 rounded-lg flex items-start gap-3 border ${isSameDay ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
              <Clock className={`w-6 h-6 mt-0.5 ${isSameDay ? 'text-green-600' : 'text-blue-600'}`} />
              <div>
                <div className={`font-bold ${isSameDay ? 'text-green-800' : 'text-blue-800'}`}>
                  {isSameDay ? 'Dikirim Hari Ini (Same Day)' : 'Dikirim Besok (Next Day)'}
                </div>
                <p className={`text-sm mt-1 ${isSameDay ? 'text-green-700' : 'text-blue-700'}`}>
                  {isSameDay 
                    ? "Pesanan Anda masuk sebelum jam 12:00, akan dikirimkan hari ini sesuai jadwal zona." 
                    : "Pesanan masuk setelah jam 12:00, akan masuk jadwal pengiriman keesokan harinya."}
                </p>
                <div className="mt-2 text-xs opacity-70">
                  Jadwal Zona: {mockZones.find(z => z.id === selectedZone)?.schedule}
                </div>
              </div>
            </div>
          </div>

          {/* Promo */}
          <div className="bg-white p-5 rounded-xl border">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-blue-600" />
              Kode Promo / Referral
            </h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Masukkan kode SEHATI10" 
                className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button 
                onClick={handleApplyPromo}
                className="bg-gray-900 text-white px-4 rounded-lg font-medium hover:bg-gray-800"
              >
                Gunakan
              </button>
            </div>
            {promoMsg && (
              <p className={`text-sm mt-2 flex items-center gap-1 ${discount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {discount > 0 && <CheckCircle className="w-4 h-4" />}
                {promoMsg}
              </p>
            )}
          </div>

        </div>

        {/* Summary */}
        <div className="mt-6 md:mt-0 md:w-80">
          <div className="bg-white p-5 rounded-xl border sticky top-20">
            <h3 className="font-bold text-gray-900 mb-4">Ringkasan Belanja</h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal (2 Barang)</span>
                <span>Rp{subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Diskon Promo</span>
                  <span>-Rp{discount.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>
            
            <div className="border-t my-4 pt-4 flex justify-between font-bold text-lg text-gray-900">
              <span>Total Tagihan</span>
              <span>Rp{total.toLocaleString('id-ID')}</span>
            </div>

            <button 
              onClick={() => router.push('/checkout/pembayaran')}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Pilih Pembayaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
