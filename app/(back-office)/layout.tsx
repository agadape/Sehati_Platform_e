'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Map, Package, FileText, RefreshCw, Users, Menu, X } from 'lucide-react';

export default function BackOfficeLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Pesanan', href: '/admin/pesanan', icon: ShoppingCart },
    { name: 'Zonasi', href: '/admin/zonasi', icon: Map },
    { name: 'Warehouse', href: '/admin/warehouse', icon: Package },
    { name: 'Laporan', href: '/admin/laporan', icon: FileText },
    { name: 'Sinkronisasi', href: '/admin/sinkronisasi', icon: RefreshCw },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col md:flex-row font-sans text-brand-ink">
      {/* Mobile Header */}
      <div className="md:hidden bg-brand-surface border-b border-brand-border shadow-soft p-4 flex justify-between items-center z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center">
            <span className="text-brand-ink font-bold text-lg">S</span>
          </div>
          <h1 className="text-xl font-bold text-brand-ink">Sehati Admin</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-brand-surface text-brand-ink-muted hover:bg-brand-border transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 bg-brand-dark text-brand-bg w-72 border-r border-brand-border shadow-soft z-20 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="hidden md:flex items-center gap-3 px-8 h-20 border-b border-brand-border/20">
          <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center shadow-soft">
            <span className="text-brand-ink font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Sehati</h1>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Exact match for dashboard, prefix match for others
            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3.5 text-sm rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-brand text-brand-bg font-bold shadow-soft' 
                    : 'text-brand-bg/70 hover:bg-brand hover:text-brand-bg font-medium'
                }`}
              >
                <Icon className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${
                  isActive ? 'text-brand-bg' : 'text-brand-bg/70 group-hover:text-brand-bg'
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-10 md:hidden transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}
    </div>
  );
}
