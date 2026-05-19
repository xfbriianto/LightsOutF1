# LightsOut

Dashboard Formula 1 yang clean, dark, dan agak racing vibes. Project ini dibuat buat lihat info F1 dengan lebih gampang: race calendar, results, driver standings, constructor standings, sampai next race countdown.

## Fitur

- Race calendar lengkap
- Hasil race yang sudah selesai
- Driver standings
- Constructor standings
- Next race card + countdown
- Background animasi dark dengan floating lines
- UI glass/dark yang simple dan modern
- Responsive, jadi tetap enak dibuka di desktop maupun mobile (masih belum sepenuhnya)

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui style components
- Radix UI
- Three.js
- Lucide React
- Vercel Analytics

## Cara Jalanin

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka di browser:

```txt
http://localhost:3000
```

Kalau port 3000 lagi dipakai:

```bash
npm run dev -- -p 3002
```

## Build

```bash
npm run build
```

## Struktur Singkat

- `app/` halaman utama project
- `components/` komponen UI dan section halaman
- `components/home/` bagian home page
- `components/calendar/` bagian race calendar
- `components/results/` bagian race results
- `components/standings/` tabel standings
- `lib/` helper API dan utility
- `public/` asset seperti logo dan icon

## Catatan

LightsOut fokusnya bukan cuma nampilin data, tapi bikin dashboard F1 yang terasa cepat, gelap, dan rapi. Simple, tapi tetap ada style.
