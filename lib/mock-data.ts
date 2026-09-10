export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

export interface Zone {
  id: string;
  name: string;
  schedule: string;
}

export interface Order {
  id: string;
  customerName: string;
  zoneId: string;
  total: number;
  status: 'Diproses' | 'Dikemas' | 'Dikirim' | 'Selesai';
  createdAt: string;
  manifestId?: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
}

export interface SyncLog {
  id: string;
  time: string;
  recordsCount: number;
  status: 'Tersambung' | 'Gagal Sync';
}

export const mockProducts: Product[] = [
  { id: 'P001', name: 'Indomie Goreng Original', price: 3000, category: 'Makanan', stock: 150, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80', description: 'Mie instan goreng favorit.' },
  { id: 'P002', name: 'Beras Pandan Wangi 5kg', price: 65000, category: 'Sembako', stock: 20, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', description: 'Beras kualitas premium.' },
  { id: 'P003', name: 'Minyak Goreng Bimoli 2L', price: 38000, category: 'Sembako', stock: 50, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80', description: 'Minyak goreng kelapa sawit pilihan.' },
  { id: 'P004', name: 'Aqua Botol 600ml', price: 3500, category: 'Minuman', stock: 200, image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=400&q=80', description: 'Air mineral dalam kemasan botol.' },
  { id: 'P005', name: 'Teh Pucuk Harum 350ml', price: 4000, category: 'Minuman', stock: 80, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80', description: 'Minuman teh melati.' },
  { id: 'P006', name: 'Silverqueen Cashew 62g', price: 15000, category: 'Cemilan', stock: 45, image: 'https://images.unsplash.com/photo-1548907040-4c42fa260840?w=400&q=80', description: 'Cokelat susu dengan kacang mete.' },
  { id: 'P007', name: 'Chitato Sapi Panggang', price: 10000, category: 'Cemilan', stock: 30, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80', description: 'Keripik kentang rasa sapi panggang.' },
  { id: 'P008', name: 'Sunsilk Black Shine 170ml', price: 22000, category: 'Perawatan Diri', stock: 15, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80', description: 'Shampoo untuk rambut hitam berkilau.' },
  { id: 'P009', name: 'Pepsodent White 190g', price: 12000, category: 'Perawatan Diri', stock: 60, image: 'https://images.unsplash.com/photo-1559599189-e160e1dc9f02?w=400&q=80', description: 'Pasta gigi pencegah gigi berlubang.' },
  { id: 'P010', name: 'Rinso Anti Noda 800g', price: 25000, category: 'Kebersihan', stock: 40, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80', description: 'Deterjen bubuk anti noda.' },
  { id: 'P011', name: 'Sunlight Jeruk Nipis 755ml', price: 18000, category: 'Kebersihan', stock: 55, image: 'https://images.unsplash.com/photo-1585832770485-e68a5dbcf524?w=400&q=80', description: 'Cairan pencuci piring.' },
  { id: 'P012', name: 'Sari Roti Tawar', price: 16000, category: 'Makanan', stock: 5, image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400&q=80', description: 'Roti tawar lembut.' },
  { id: 'P013', name: 'Kopi Kapal Api Mix', price: 13000, category: 'Minuman', stock: 100, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80', description: 'Kopi bubuk instan dengan gula.' },
  { id: 'P014', name: 'Susu Beruang Bear Brand', price: 11000, category: 'Minuman', stock: 25, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', description: 'Susu steril murni.' },
  { id: 'P015', name: 'Taro Net Seaweed', price: 6000, category: 'Cemilan', stock: 40, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80', description: 'Snack rasa rumput laut.' },
  { id: 'P016', name: 'Kecap Bango 520ml', price: 24000, category: 'Sembako', stock: 35, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80', description: 'Kecap manis kedelai hitam.' },
  { id: 'P017', name: 'Saos Sambal ABC 340ml', price: 16000, category: 'Sembako', stock: 40, image: 'https://images.unsplash.com/photo-1558961363-a0c6e8ec98b3?w=400&q=80', description: 'Saos sambal ekstra pedas.' },
  { id: 'P018', name: 'Tolak Angin Cair', price: 4000, category: 'Kesehatan', stock: 120, image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80', description: 'Herbal masuk angin.' },
  { id: 'P019', name: 'Insto Reguler 7.5ml', price: 15000, category: 'Kesehatan', stock: 20, image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&q=80', description: 'Obat tetes mata.' },
  { id: 'P020', name: 'Pocari Sweat 500ml', price: 8000, category: 'Minuman', stock: 65, image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80', description: 'Minuman isotonik penghenti dahaga.' }
];

export const mockZones: Zone[] = [
  { id: 'Z001', name: 'Kecamatan Kebayoran Baru', schedule: 'Setiap Hari - Same Day (sebelum 12:00)' },
  { id: 'Z002', name: 'Kecamatan Kebayoran Lama', schedule: 'Setiap Hari - Same Day (sebelum 12:00)' },
  { id: 'Z003', name: 'Kecamatan Pesanggrahan', schedule: 'Senin & Kamis - Next Day' },
  { id: 'Z004', name: 'Kecamatan Cilandak', schedule: 'Selasa & Jumat - Next Day' },
  { id: 'Z005', name: 'Kecamatan Jagakarsa', schedule: 'Rabu & Sabtu - Next Day' }
];

export const mockOrders: Order[] = [
  { id: 'ORD-1001', customerName: 'Budi Santoso', zoneId: 'Z001', total: 155000, status: 'Selesai', createdAt: '2026-09-08T09:30:00Z', manifestId: 'MNF-001' },
  { id: 'ORD-1002', customerName: 'Siti Aminah', zoneId: 'Z002', total: 85000, status: 'Selesai', createdAt: '2026-09-08T10:15:00Z', manifestId: 'MNF-001' },
  { id: 'ORD-1003', customerName: 'Ahmad Dahlan', zoneId: 'Z001', total: 240000, status: 'Dikirim', createdAt: '2026-09-09T08:20:00Z', manifestId: 'MNF-002' },
  { id: 'ORD-1004', customerName: 'Rini Yulianti', zoneId: 'Z003', total: 120000, status: 'Dikirim', createdAt: '2026-09-09T11:45:00Z', manifestId: 'MNF-002' },
  { id: 'ORD-1005', customerName: 'Joko Widodo', zoneId: 'Z004', total: 450000, status: 'Dikemas', createdAt: '2026-09-10T07:10:00Z' },
  { id: 'ORD-1006', customerName: 'Dewi Lestari', zoneId: 'Z005', total: 95000, status: 'Dikemas', createdAt: '2026-09-10T08:05:00Z' },
  { id: 'ORD-1007', customerName: 'Agus Setiawan', zoneId: 'Z001', total: 310000, status: 'Diproses', createdAt: '2026-09-10T09:00:00Z' },
  { id: 'ORD-1008', customerName: 'Rina Nose', zoneId: 'Z002', total: 55000, status: 'Diproses', createdAt: '2026-09-10T09:45:00Z' },
  { id: 'ORD-1009', customerName: 'Andi Mallarangeng', zoneId: 'Z003', total: 180000, status: 'Diproses', createdAt: '2026-09-10T10:15:00Z' },
  { id: 'ORD-1010', customerName: 'Nina Zatulini', zoneId: 'Z004', total: 215000, status: 'Diproses', createdAt: '2026-09-10T11:30:00Z' },
  { id: 'ORD-1011', customerName: 'Reza Rahadian', zoneId: 'Z005', total: 75000, status: 'Diproses', createdAt: '2026-09-10T12:20:00Z' },
  { id: 'ORD-1012', customerName: 'Dian Sastro', zoneId: 'Z001', total: 420000, status: 'Diproses', createdAt: '2026-09-10T13:00:00Z' },
  { id: 'ORD-1013', customerName: 'Iqbaal Ramadhan', zoneId: 'Z002', total: 110000, status: 'Diproses', createdAt: '2026-09-10T14:10:00Z' },
  { id: 'ORD-1014', customerName: 'Tara Basro', zoneId: 'Z003', total: 260000, status: 'Diproses', createdAt: '2026-09-10T15:05:00Z' },
  { id: 'ORD-1015', customerName: 'Chelsea Islan', zoneId: 'Z004', total: 190000, status: 'Diproses', createdAt: '2026-09-10T16:45:00Z' }
];

export const mockUsers: User[] = [
  { id: 'U001', name: 'Admin Utama', role: 'Super Admin' },
  { id: 'U002', name: 'Budi Gudang', role: 'Staff Gudang' },
  { id: 'U003', name: 'Siti Laporan', role: 'Staff Laporan' },
  { id: 'U004', name: 'Agus Pengiriman', role: 'Koordinator Kurir' }
];

export const mockSyncLogs: SyncLog[] = [
  { id: 'SYNC-001', time: '2026-09-10T17:00:00Z', recordsCount: 154, status: 'Tersambung' },
  { id: 'SYNC-002', time: '2026-09-10T16:45:00Z', recordsCount: 12, status: 'Tersambung' },
  { id: 'SYNC-003', time: '2026-09-10T16:30:00Z', recordsCount: 0, status: 'Tersambung' },
  { id: 'SYNC-004', time: '2026-09-10T16:15:00Z', recordsCount: 0, status: 'Gagal Sync' },
  { id: 'SYNC-005', time: '2026-09-10T16:00:00Z', recordsCount: 45, status: 'Tersambung' }
];
