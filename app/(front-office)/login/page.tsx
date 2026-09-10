"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, Smartphone } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto pt-8 md:pt-16 pb-20">
      <Link href="/" className="inline-flex items-center gap-2 text-brand-ink-muted mb-8 hover:text-brand-ink cursor-pointer px-4 md:px-0">
        <ChevronLeft className="w-5 h-5" />
        <span>Kembali ke Beranda</span>
      </Link>

      <div className="bg-brand-surface p-6 md:p-8 md:border md:rounded-2xl shadow-soft">
        <div className="w-12 h-12 bg-brand text-brand-ink rounded-full flex items-center justify-center mb-6">
          <Smartphone className="w-6 h-6" />
        </div>
        
        <h1 className="text-2xl font-bold text-brand-ink mb-2 font-display">
          {step === 1 ? "Masuk ke Sehati" : "Masukkan Kode OTP"}
        </h1>
        <p className="text-brand-ink-muted mb-8 text-sm">
          {step === 1 
            ? "Masukkan nomor HP Anda untuk masuk atau daftar." 
            : `Kode OTP telah dikirimkan ke nomor ${phone}`}
        </p>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-ink mb-2">Nomor Handphone</label>
              <div className="flex">
                <div className="bg-brand-bg border border-r-0 border-brand-border px-4 py-3 rounded-l-lg flex items-center text-brand-ink-muted font-medium">
                  +62
                </div>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="81234567890"
                  className="flex-1 border border-brand-border px-4 py-3 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-brand w-full"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading || !phone}
              className="w-full bg-brand text-white font-bold py-3.5 rounded-full flex justify-center items-center gap-2 hover:bg-brand disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Mengirim OTP..." : "Kirim Kode OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-ink mb-2">Kode OTP (4-6 digit)</label>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="• • • • • •"
                className="w-full border border-brand-border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand text-center tracking-[0.5em] text-lg font-bold"
                required
                maxLength={6}
              />
              <p className="text-xs text-brand-ink-muted mt-2 text-center">Gunakan angka berapapun untuk simulasi login.</p>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading || otp.length < 4}
              className="w-full bg-brand text-white font-bold py-3.5 rounded-full flex justify-center items-center gap-2 hover:bg-brand disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Memverifikasi..." : "Masuk"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>

            <div className="text-center">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-sm text-brand-ink font-medium hover:underline"
              >
                Ganti Nomor HP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

