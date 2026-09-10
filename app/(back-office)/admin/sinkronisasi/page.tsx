'use client';

import React, { useState, useEffect } from 'react';
import { mockSyncLogs } from '@/lib/mock-data';
import { RefreshCw, Database, CheckCircle, XCircle, Clock } from 'lucide-react';

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Status Sinkronisasi FoxPro</h1>
        <p className="mt-1 text-sm text-gray-500">Pantau konektivitas antara sistem web Sehati dan sistem legacy FoxPro di toko.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Database className="h-5 w-5 mr-2 text-gray-500" />
              Status Koneksi FoxPro
            </h2>
            <button 
              onClick={toggleStatus}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Simulasi Toggle Status (Demo)
            </button>
          </div>

          <div className={`p-4 rounded-lg border flex items-center mb-6 ${
            syncStatus === 'Tersambung' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            {syncStatus === 'Tersambung' ? (
              <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            ) : (
              <XCircle className="h-8 w-8 text-red-500 mr-3" />
            )}
            <div>
              <p className={`font-bold text-lg ${syncStatus === 'Tersambung' ? 'text-green-800' : 'text-red-800'}`}>
                {syncStatus}
              </p>
              <p className={`text-sm ${syncStatus === 'Tersambung' ? 'text-green-600' : 'text-red-600'}`}>
                {syncStatus === 'Tersambung' ? 'Sistem web dan FoxPro terhubung dengan baik.' : 'Koneksi ke sistem FoxPro terputus. Silakan periksa jaringan server toko.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Terakhir Sinkronisasi</p>
              <p className="font-semibold text-gray-900">
                {new Date(mockSyncLogs[0].time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1 flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1" />
                Sync Berikutnya
              </p>
              <p className="font-semibold text-blue-600 font-mono text-lg">
                {formatTime(countdown)}
              </p>
            </div>
          </div>

          <button 
            onClick={handleManualSync}
            disabled={isSyncing || syncStatus === 'Gagal Sync'}
            className={`w-full mt-6 py-3 rounded-lg flex items-center justify-center font-medium transition-colors ${
              isSyncing || syncStatus === 'Gagal Sync'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Menyinkronkan...' : 'Sinkronisasi Manual Sekarang'}
          </button>
        </div>

        {/* Sync Logs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Riwayat Sinkronisasi (Log)</h2>
          
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {mockSyncLogs.map((log) => (
                <div key={log.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(log.time).toLocaleTimeString('id-ID')}
                    </p>
                    <p className="text-xs text-gray-500">
                      ID: {log.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      log.status === 'Tersambung' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status === 'Tersambung' ? 'Sukses' : 'Gagal'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {log.recordsCount} record diperbarui
                    </p>
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
