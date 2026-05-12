import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';

const gallery = [
  {
    img: 'https://kencanaenergy.com/assets/img/ordi-1-new-2024.jpg',
    title: 'Bendungan Ordi Hulu',
    caption:
      'Fasilitas pembangkit listrik tenaga mini hidro yang terletak di kawasan hutan Ordi Hulu, menghasilkan energi bersih untuk kebutuhan regional.',
    pos: 'center',
  },
  {
    img: 'https://kencanaenergy.com/assets/img/ordi-1-new-2025.jpeg',
    title: 'Area Operasional 2025',
    caption:
      'Pembaruan infrastruktur dan peralatan berat di area operasional PLTM yang mendukung efisiensi produksi energi terbarukan.',
    pos: 'center',
  },
  {
    img: 'https://kencanaenergy.com/assets/img/ordi-3-new-2025.jpeg',
    title: 'Jalur Penstock',
    caption:
      'Jalur pipa penstock yang mengalirkan air dari reservoir menuju turbin, komponen vital dalam sistem pembangkit listrik mini hidro.',
    pos: 'center',
  },
  {
    img: 'https://kencanaenergy.com/assets/img/ordi-1-new-2024.jpg',
    title: 'Lingkungan Sekitar',
    caption:
      'Kawasan hijau di sekitar PLTM Ordi Hulu dijaga kelestariannya sebagai wujud komitmen terhadap energi berkelanjutan dan lingkungan.',
    pos: 'right center',
  },
];

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="PLTM Ordi Hulu — Portal Kehadiran Karyawan" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* ══════════════════════════════════════════
          HERO — Full Screen, Full Bleed
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full h-screen overflow-x-hidden"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Background photo — full bleed */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://kencanaenergy.com/assets/img/ordi-1-new-2024.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />

        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a2e]/80 via-transparent to-[#0e1a2e]/40" />

        {/* Header */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Header auth={auth} />
        </div>

        {/* ── Hero Content — vertically & horizontally centered-left ── */}
        <div className="absolute inset-0 flex flex-col justify-center px-[8vw] z-20">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#eebf3b]" />
            <span className="text-[#eebf3b] text-xs font-bold tracking-[4px] uppercase">
              Portal Kehadiran Karyawan
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            PLTM
            <br />
            <span className="text-[#7398c8]">ORDI HULU</span>
          </h1>

          {/* Divider line */}
          <div className="w-16 h-[3px] bg-[#eebf3b] mt-6 mb-5" />

          {/* Tagline */}
          <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
            Sustainable&nbsp;&nbsp;·&nbsp;&nbsp;Professional&nbsp;&nbsp;·&nbsp;&nbsp;Reliable&nbsp;&nbsp;·&nbsp;&nbsp;Green
          </p>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mt-4 max-w-md">
            Pembangkit Listrik Tenaga Mini Hidro berbasis energi terbarukan di
            kawasan Ordi Hulu, Kalimantan.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4 mt-10">
            <a
              href={route('login')}
              className="inline-flex items-center gap-2 bg-[#eebf3b] hover:bg-[#f5cc55] text-[#0e1a2e] text-sm font-bold px-7 py-3 rounded-sm tracking-wide transition-all duration-200 shadow-lg shadow-[#eebf3b]/20"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Masuk Sekarang
            </a>
            <span className="text-white/30 text-xs tracking-widest">
              www.kencanaenergy.com
            </span>
          </div>
        </div>

        {/* Decorative vertical text — right side */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white/15 font-black tracking-[6px] uppercase select-none pointer-events-none"
          style={{
            writingMode: 'vertical-rl',
            fontSize: '0.65rem',
            letterSpacing: '8px',
          }}
        >
          Renewable Energy Generation 2024
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[0.6rem] tracking-[3px] uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════════ */}
      <div
        className="flex items-center justify-center gap-6 py-10"
        style={{ background: '#4a6583', fontFamily: "'Inter', sans-serif" }}
      >
        <div className="h-px bg-white/30 w-24" />
        <div className="flex items-center gap-2 text-white/60 text-sm font-bold tracking-[4px] uppercase">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          Galeri Foto
        </div>
        <div className="h-px bg-white/30 w-24" />
      </div>

      {/* ══════════════════════════════════════════
          SLIDE 2 — Photo Gallery
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden flex flex-col"
        style={{
          background: '#0e1a2e',
          aspectRatio: '16 / 9',
          fontFamily: "'Inter', sans-serif",
          padding: '2.5rem 2.5rem 2rem 2.5rem',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo — top right */}
        <div className="absolute top-5 right-7 flex items-center gap-2 z-20">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M2 16C2 16 5 12 12 12C19 12 22 16 22 16"
              stroke="#5f87b8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="text-white text-[0.6rem] font-bold leading-tight tracking-wide">
            PLTM
            <br />
            ORDI HULU
          </div>
        </div>

        {/* Section heading */}
        <div className="mb-5 z-10">
          <h2
            className="text-white font-extrabold tracking-[3px] uppercase"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}
          >
            Galeri
          </h2>
          <p className="text-white/40 text-xs tracking-widest mt-0.5">
            Dokumentasi Lapangan PLTM Ordi Hulu
          </p>
        </div>

        {/* Gallery grid */}
        <div className="flex gap-2.5 flex-1 min-h-0">
          {gallery.map(({ img, title, caption, pos }) => (
            <div
              key={title}
              className="flex-1 relative overflow-hidden bg-black group cursor-pointer rounded-sm"
            >
              {/* Background image — zooms on hover */}
              <div
                className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  backgroundImage: `url('${img}')`,
                  backgroundPosition: pos,
                }}
              />

              {/* Base gradient — always visible at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500" />

              {/* Hover overlay — darkens full card */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

              {/* Title — always visible at bottom */}
              <div className="absolute bottom-0 left-0 w-full px-4 py-3 translate-y-0 transition-all duration-500 group-hover:-translate-y-[4.5rem]">
                <p className="text-white text-xs font-bold tracking-widest uppercase opacity-70">
                  PLTM Ordi Hulu
                </p>
                <p className="text-white text-sm font-bold leading-tight mt-0.5">
                  {title}
                </p>
                <div className="w-5 h-[2px] bg-[#eebf3b] mt-2 group-hover:w-12 transition-all duration-500" />
              </div>

              {/* Caption — slides up on hover */}
              <div className="absolute bottom-0 left-0 w-full px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-white/80 text-[0.7rem] leading-relaxed line-clamp-4">
                  {caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom spacing */}
      <div
        className="bg-[#4a6583] py-8"
        style={{ fontFamily: "'Inter', sans-serif" }}
      />
    </>
  );
}
