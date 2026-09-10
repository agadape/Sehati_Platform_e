"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, QrCode, CheckCircle2 } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSimulatePayment = () => {
    setIsSuccess(true);
    setTimeout(() => {
      // Redirect to a dummy order detail after 2 seconds
      router.push("/pesanan/ORD-1005");
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto pt-4 pb-24 md:pb-0 relative">
      {!isSuccess && (
        <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => router.back()}>
          <ChevronLeft className="w-5 h-5 text-gray-600" />
          <h1 className="text-xl font-bold text-gray-900">Pembayaran</h1>
        </div>
      )}

      {/* Success Overlay Animation */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform scale-100 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h2>
            <p className="text-gray-500 mb-6">Pesanan Anda segera diproses.</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      <div className={`bg-white p-6 md:p-8 rounded-2xl border shadow-sm text-center transition-opacity ${isSuccess ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-1">Total Pembayaran</div>
          <div className="text-3xl font-bold text-gray-900">Rp130.500</div>
        </div>

        <div className="bg-blue-50 text-blue-800 text-sm py-2 px-4 rounded-lg font-medium inline-flex mb-6 items-center gap-2">
          <QrCode className="w-4 h-4" />
          Scan QRIS menggunakan aplikasi Bank / E-Wallet
        </div>

        <div className="w-64 h-64 mx-auto bg-gray-100 rounded-xl mb-8 p-4 border flex flex-col items-center justify-center relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SEHATI-DUMMY-PAYMENT" 
            alt="QRIS" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Untuk keperluan demo, klik tombol di bawah ini untuk mensimulasikan pembayaran yang berhasil dari pelanggan.
          </p>
          <button 
            onClick={handleSimulatePayment}
            className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20 active:scale-[0.98]"
          >
            Simulasikan Pembayaran Berhasil
          </button>
        </div>
      </div>
    </div>
  );
}
