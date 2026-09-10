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
      <Link href="/" className="inline-flex items-center gap-2 text-gray-600 mb-8 hover:text-blue-600 cursor-pointer px-4 md:px-0">
        <ChevronLeft className="w-5 h-5" />
        <span>Kembali ke Beranda</span>
      </Link>

      <div className="bg-white p-6 md:p-8 md:border md:rounded-2xl shadow-sm">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
          <Smartphone className="w-6 h-6" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {step === 1 ? "Masuk ke Sehati" : "Masukkan Kode OTP"}
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          {step === 1 
            ? "Masukkan nomor HP Anda untuk masuk atau daftar." 
            : `Kode OTP telah dikirimkan ke nomor ${phone}`}
        </p>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Handphone</label>
              <div className="flex">
                <div className="bg-gray-100 border border-r-0 border-gray-300 px-4 py-3 rounded-l-lg flex items-center text-gray-600 font-medium">
                  +62
                </div>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="81234567890"
                  className="flex-1 border border-gray-300 px-4 py-3 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading || !phone}
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Mengirim OTP..." : "Kirim Kode OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kode OTP (4-6 digit)</label>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="• • • • • •"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-[0.5em] text-lg font-bold"
                required
                maxLength={6}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">Gunakan angka berapapun untuk simulasi login.</p>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading || otp.length < 4}
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Memverifikasi..." : "Masuk"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>

            <div className="text-center">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-sm text-blue-600 font-medium hover:underline"
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
