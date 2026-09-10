"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Home, User, Package, Search } from "lucide-react";

export default function FrontOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isPesanan = pathname.startsWith("/pesanan");
  const isLogin = pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0 font-sans text-gray-900">
      {/* Header Desktop & Mobile Top */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center rounded-xl font-black text-xl shadow-sm shadow-blue-200">
              S
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700 hidden sm:block">
              Sehati
            </span>
          </Link>

          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Cari kebutuhan harianmu di sini..." 
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all shadow-sm inset-y-0"
              />
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-5 flex-shrink-0">
            {/* Mobile Search Icon */}
            <button className="p-2 text-gray-600 md:hidden hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>

            <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              <User className="w-5 h-5" />
              Masuk
            </Link>
            
            <Link href="/keranjang" className="relative p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-500 border-2 border-white text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                2
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto p-4 md:p-6 lg:p-8 w-full max-w-7xl">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-2 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link href="/" className={`flex flex-col items-center p-2 rounded-xl transition-colors ${isHome ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <Home className={`w-6 h-6 mb-1 ${isHome ? 'fill-blue-50' : ''}`} />
          <span className="text-[10px] font-bold">Beranda</span>
        </Link>
        <Link href="/pesanan" className={`flex flex-col items-center p-2 rounded-xl transition-colors ${isPesanan ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <Package className={`w-6 h-6 mb-1 ${isPesanan ? 'fill-blue-50' : ''}`} />
          <span className="text-[10px] font-bold">Pesanan</span>
        </Link>
        <Link href="/login" className={`flex flex-col items-center p-2 rounded-xl transition-colors ${isLogin ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <User className={`w-6 h-6 mb-1 ${isLogin ? 'fill-blue-50' : ''}`} />
          <span className="text-[10px] font-bold">Akun</span>
        </Link>
      </nav>
    </div>
  );
}
