import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sehati E-Commerce & Logistik',
    short_name: 'Sehati',
    description: 'Platform pemesanan kebutuhan harian dan sembako',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF8F2',
    theme_color: '#1F6E4A',
    icons: [
      {
        src: 'https://placehold.co/192x192/1F6E4A/FFFFFF/png?text=S',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://placehold.co/512x512/1F6E4A/FFFFFF/png?text=S',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
