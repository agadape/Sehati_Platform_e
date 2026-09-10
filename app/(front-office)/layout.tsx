import Link from "next/link";
import { ShoppingCart, Home, User, Package, Search } from "lucide-react";

export default function FrontOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      {/* Header Desktop & Mobile Top */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded font-bold text-xl">S</div>
            <span className="font-bold text-xl text-blue-900 hidden sm:block">Sehati</span>
          </Link>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari produk..." 
                className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Search className="w-4 h-4 absolute left-4 top-3 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-sm font-medium text-gray-600 hover:text-blue-600">
              Masuk
            </Link>
            <Link href="/keranjang" className="relative p-2 text-gray-600 hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                2
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 z-50">
        <Link href="/" className="flex flex-col items-center text-blue-600">
          <Home className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">Beranda</span>
        </Link>
        <Link href="/pesanan" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
          <Package className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">Pesanan</span>
        </Link>
        <Link href="/login" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
          <User className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-medium">Akun</span>
        </Link>
      </nav>
    </div>
  );
}
