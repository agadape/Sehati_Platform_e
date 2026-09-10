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
          <ChevronLeft className="w-5 h-5 text-brand-ink-muted" />
          <h1 className="text-xl font-bold text-brand-ink font-display">Pembayaran</h1>
        </div>
      )}

      {/* Success Overlay Animation */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-surface/90 backdrop-blur-sm transition-all duration-300">
          <div className="bg-brand-surface p-8 rounded-2xl shadow-soft text-center transform scale-100 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-brand-ink mb-2 font-display">Pembayaran Berhasil!</h2>
            <p className="text-brand-ink-muted mb-6">Pesanan Anda segera diproses.</p>
            <div className="w-full h-1.5 bg-brand-bg rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      <div className={`bg-brand-surface p-6 md:p-8 rounded-2xl border shadow-soft text-center transition-opacity ${isSuccess ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-6">
          <div className="text-sm text-brand-ink-muted mb-1">Total Pembayaran</div>
          <div className="text-3xl font-bold text-brand-ink font-display">Rp130.500</div>
        </div>

        <div className="bg-brand text-brand-ink text-sm py-2 px-4 rounded-lg font-medium inline-flex mb-6 items-center gap-2">
          <QrCode className="w-4 h-4" />
          Scan QRIS menggunakan aplikasi Bank / E-Wallet
        </div>

        <div className="w-64 h-64 mx-auto bg-brand-bg rounded-xl mb-8 p-4 border flex flex-col items-center justify-center relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SEHATI-DUMMY-PAYMENT" 
            alt="QRIS" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-brand-ink-muted">
            Untuk keperluan demo, klik tombol di bawah ini untuk mensimulasikan pembayaran yang berhasil dari pelanggan.
          </p>
          <button 
            onClick={handleSimulatePayment}
            className="w-full bg-brand-accent text-white font-bold py-3.5 rounded-full hover:opacity-90 transition-colors shadow-soft shadow-soft active:scale-[0.98]"
          >
            Simulasikan Pembayaran Berhasil
          </button>
        </div>
      </div>
    </div>
  );
}

