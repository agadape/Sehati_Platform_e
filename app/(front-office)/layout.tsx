"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Home, User, Package, Search, Bell } from "lucide-react";

export default function FrontOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/");
    }
  };

  const isHome = pathname === "/";
  const isPesanan = pathname.startsWith("/pesanan");
  const isLogin = pathname === "/login";

  return (
    <div className="min-h-[100dvh] bg-brand-bg flex flex-col pb-16 md:pb-0 font-sans text-brand-ink selection:bg-brand/20 selection:text-brand-dark">
      {/* Header Desktop & Mobile Top */}
      <header className="bg-white sticky top-0 z-50 border-b border-brand-border/50 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-brand text-white flex items-center justify-center rounded-xl font-display font-bold text-xl shadow-soft group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="font-display font-extrabold text-xl md:text-2xl tracking-tight text-brand hidden sm:block group-hover:text-brand-dark transition-colors">
              Sehati
            </span>
          </Link>

          <div className="flex-1 max-w-2xl mx-auto hidden md:block">
            <form onSubmit={handleSearch} className="relative group">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari sayur, beras, daging..." 
                className="w-full pl-11 pr-4 py-2.5 border border-brand-border rounded-xl bg-brand-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm transition-all placeholder-brand-ink-muted/70"
              />
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink-muted group-focus-within:text-brand transition-colors" />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-brand-dark transition-colors">
                Cari
              </button>
            </form>
          </div>

          <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
            {/* Mobile Search Icon */}
            <button className="p-2 text-brand-ink-muted md:hidden hover:bg-brand-surface rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <button className="relative p-2 text-brand-ink-muted hover:text-brand hover:bg-brand/10 rounded-full transition-colors hidden sm:block">
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <Link href="/keranjang" className="relative p-2 text-brand-ink-muted hover:bg-brand/10 hover:text-brand rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              <span className="absolute top-0 right-0 bg-brand-accent border-2 border-white text-brand-ink text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                2
              </span>
            </Link>

            <div className="w-px h-6 bg-brand-border mx-1 hidden md:block"></div>

            <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-bold text-brand hover:text-white px-4 py-2 rounded-xl hover:bg-brand transition-colors border border-brand bg-brand/5">
              Masuk
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar below header - typical e-commerce pattern */}
        <div className="md:hidden px-4 pb-3 bg-white">
          <form onSubmit={handleSearch} className="relative group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari sayur, beras, daging..." 
              className="w-full pl-10 pr-4 py-2 border border-brand-border rounded-xl bg-brand-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm transition-all placeholder-brand-ink-muted/70"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink-muted group-focus-within:text-brand transition-colors" />
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto p-4 md:p-6 lg:p-8 w-full max-w-7xl">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border/50 flex justify-around p-1 pb-safe z-50 shadow-[0_-8px_16px_-8px_rgba(43,36,28,0.08)]">
        <Link href="/" className={`flex flex-col items-center p-2 rounded-xl transition-colors relative w-16 ${isHome ? 'text-brand' : 'text-brand-ink-muted hover:text-brand'}`}>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full bg-brand transition-all ${isHome ? 'opacity-100' : 'opacity-0'}`}></div>
          <Home className={`w-6 h-6 mb-1 mt-1 ${isHome ? 'fill-brand/10' : ''}`} />
          <span className="text-[10px] font-bold">Beranda</span>
        </Link>
        <Link href="/pesanan" className={`flex flex-col items-center p-2 rounded-xl transition-colors relative w-16 ${isPesanan ? 'text-brand' : 'text-brand-ink-muted hover:text-brand'}`}>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full bg-brand transition-all ${isPesanan ? 'opacity-100' : 'opacity-0'}`}></div>
          <Package className={`w-6 h-6 mb-1 mt-1 ${isPesanan ? 'fill-brand/10' : ''}`} />
          <span className="text-[10px] font-bold">Pesanan</span>
        </Link>
        <Link href="/login" className={`flex flex-col items-center p-2 rounded-xl transition-colors relative w-16 ${isLogin ? 'text-brand' : 'text-brand-ink-muted hover:text-brand'}`}>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full bg-brand transition-all ${isLogin ? 'opacity-100' : 'opacity-0'}`}></div>
          <User className={`w-6 h-6 mb-1 mt-1 ${isLogin ? 'fill-brand/10' : ''}`} />
          <span className="text-[10px] font-bold">Akun</span>
        </Link>
      </nav>
    </div>
  );
}

