'use client';

import React, { useState, useEffect } from 'react';
import { mockSyncLogs } from '@/lib/mock-data';
import { RefreshCw, Database, CheckCircle, XCircle, Clock, Activity, Server, ArrowRightLeft } from 'lucide-react';

export default function SinkronisasiPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'Tersambung' | 'Gagal Sync'>('Tersambung');
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setCountdown(300);
    }, 2000);
  };

  const toggleStatus = () => {
    setSyncStatus(prev => prev === 'Tersambung' ? 'Gagal Sync' : 'Tersambung');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-brand-dark p-6 rounded-2xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Server className="h-6 w-6 text-brand" />
            Control Panel: FoxPro Bridge
          </h1>
          <p className="mt-1 text-sm text-brand-ink-muted">Monitoring real-time konektivitas antara sistem cloud Sehati dan server legacy FoxPro.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-brand-dark rounded-full border border-brand-border">
          <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${syncStatus === 'Tersambung' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${syncStatus === 'Tersambung' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
          </div>
          <span className="text-sm font-medium text-brand-bg font-mono tracking-wide">
            {syncStatus === 'Tersambung' ? 'SYSTEM.ONLINE' : 'SYSTEM.OFFLINE'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Status Card */}
        <div className="lg:col-span-7 bg-brand-surface rounded-2xl shadow-soft border border-brand-border p-8">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-xl font-bold text-brand-ink flex items-center">
              <Activity className="h-6 w-6 mr-2 text-brand" />
              Status Koneksi
            </h2>
            <button 
              onClick={toggleStatus}
              className="text-xs px-3 py-1.5 bg-brand-surface hover:bg-brand-border text-brand-ink-muted rounded-lg transition-colors font-medium border border-brand-border"
            >
              Simulasi Status (Demo)
            </button>
          </div>

          <div className={`p-6 rounded-2xl border-2 flex items-center mb-8 transition-colors duration-300 ${
            syncStatus === 'Tersambung' 
              ? 'bg-gradient-to-r from-emerald-50 to-white border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
              : 'bg-gradient-to-r from-rose-50 to-white border-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
          }`}>
            <div className={`p-4 rounded-full mr-5 ${syncStatus === 'Tersambung' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
              {syncStatus === 'Tersambung' ? (
                <CheckCircle className="h-10 w-10" />
              ) : (
                <XCircle className="h-10 w-10" />
              )}
            </div>
            <div>
              <p className={`font-extrabold text-2xl tracking-tight mb-1 ${syncStatus === 'Tersambung' ? 'text-emerald-700' : 'text-rose-700'}`}>
                {syncStatus}
              </p>
              <p className={`text-sm font-medium ${syncStatus === 'Tersambung' ? 'text-emerald-600/80' : 'text-rose-600/80'}`}>
                {syncStatus === 'Tersambung' 
                  ? 'Sistem web dan FoxPro terhubung dengan baik. Data sinkron.' 
                  : 'Koneksi ke sistem FoxPro terputus. Silakan periksa jaringan server toko atau restart bridge.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center mb-8">
            <div className="p-5 bg-brand-bg border border-brand-border rounded-2xl">
              <p className="text-sm text-brand-ink-muted font-medium mb-2 uppercase tracking-wider">Terakhir Sinkronisasi</p>
              <p className="text-2xl font-bold text-brand-ink font-mono">
                {new Date(mockSyncLogs[0].time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="p-5 bg-brand-bg border border-brand-border rounded-2xl">
              <p className="text-sm text-brand-ink-muted font-medium mb-2 flex items-center justify-center uppercase tracking-wider">
                <Clock className="h-4 w-4 mr-1.5" />
                Sync Berikutnya
              </p>
              <p className="text-2xl font-bold text-brand font-mono">
                {formatTime(countdown)}
              </p>
            </div>
          </div>

          <button 
            onClick={handleManualSync}
            disabled={isSyncing || syncStatus === 'Gagal Sync'}
            className={`w-full py-4 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
              isSyncing || syncStatus === 'Gagal Sync'
                ? 'bg-brand-surface text-brand-ink-muted cursor-not-allowed border border-brand-border'
                : 'bg-brand hover:bg-brand text-white shadow-md hover:shadow-lg shadow-brand/20 active:scale-[0.99]'
            }`}
          >
            <RefreshCw className={`h-5 w-5 mr-3 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Memproses Sinkronisasi...' : 'Sinkronisasi Manual Sekarang'}
          </button>
        </div>

        {/* Sync Logs */}
        <div className="lg:col-span-5 bg-brand-dark rounded-2xl shadow-lg border border-brand-border p-6 flex flex-col h-full text-brand-bg">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-border">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Database className="h-5 w-5 mr-2 text-brand-ink-muted" />
              Terminal Log (FoxPro)
            </h2>
            <span className="text-xs font-mono bg-brand-dark px-2 py-1 rounded text-brand-ink-muted border border-brand-border">LIVE</span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-4 font-mono text-sm">
              {mockSyncLogs.map((log) => (
                <div key={log.id} className="flex flex-col bg-brand-dark/50 rounded-lg p-3 border border-brand-border/50 hover:bg-brand-dark transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-brand">
                      [{new Date(log.time).toLocaleTimeString('id-ID')}]
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      log.status === 'Tersambung' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {log.status === 'Tersambung' ? 'SUCCESS' : 'FAILED'}
                    </span>
                  </div>
                  <div className="flex items-center text-brand-ink-muted text-xs mt-1">
                    <ArrowRightLeft className="h-3 w-3 mr-1.5" />
                    <span className="text-brand-bg">JOB_{log.id}</span>
                    <span className="mx-2 text-brand-ink-muted">|</span>
                    <span>{log.recordsCount} records synced</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

