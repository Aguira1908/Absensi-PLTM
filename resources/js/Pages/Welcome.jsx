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
          HERO — Full Screen
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-screen overflow-x-hidden flex flex-col"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Background photo */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://kencanaenergy.com/assets/img/ordi-1-new-2024.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a2e]/85 via-[#0e1a2e]/40 to-transparent" />

        {/* Header */}
        <div className="relative z-50 w-full">
          <Header auth={auth} />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col justify-center flex-1 px-6 sm:px-10 md:px-[8vw] py-16 sm:py-20">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 sm:w-8 h-[2px] bg-[#eebf3b] flex-shrink-0" />
            <span className="text-[#eebf3b] text-[10px] sm:text-xs font-bold tracking-[3px] sm:tracking-[4px] uppercase leading-tight">
              Portal Kehadiran Karyawan
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 6.5rem)' }}
          >
            PLTM
            <br />
            <span className="text-[#7398c8]">ORDI HULU</span>
          </h1>

          {/* Divider */}
          <div className="w-12 sm:w-16 h-[3px] bg-[#eebf3b] mt-5 mb-4" />

          {/* Tagline — hidden on very small screens */}
          <p className="hidden sm:block text-white/60 text-xs sm:text-sm font-medium tracking-widest uppercase">
            Sustainable&nbsp;&nbsp;·&nbsp;&nbsp;Professional&nbsp;&nbsp;·&nbsp;&nbsp;Reliable&nbsp;&nbsp;·&nbsp;&nbsp;Green
          </p>

          {/* Description */}
          <p className="text-white/50 text-xs sm:text-sm leading-relaxed mt-3 sm:mt-4 max-w-xs sm:max-w-md">
            Pembangkit Listrik Tenaga Mini Hidro berbasis energi terbarukan di
            kawasan Ordi Hulu, Sumatera Utara.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <a
              href={route('login')}
              className="inline-flex items-center gap-2 bg-[#eebf3b] hover:bg-[#f5cc55] text-[#0e1a2e] text-sm font-bold px-6 sm:px-7 py-3 rounded-sm tracking-wide transition-all duration-200 shadow-lg shadow-[#eebf3b]/20"
            >
              <svg
                width="15"
                height="15"
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
            <span className="text-white/30 text-[10px] tracking-widest hidden sm:block">
              www.kencanaenergy.com
            </span>
          </div>
        </div>

        {/* Scroll hint — only desktop */}
        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2">
          <span className="text-white/30 text-[0.6rem] tracking-[3px] uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>

        {/* Decorative vertical text — desktop only */}
        <div
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white/15 font-black tracking-[6px] uppercase select-none pointer-events-none"
          style={{
            writingMode: 'vertical-rl',
            fontSize: '0.65rem',
            letterSpacing: '8px',
          }}
        >
          Renewable Energy Generation 2024
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════════ */}
      <div
        className="flex items-center justify-center gap-4 sm:gap-6 py-8 sm:py-10 px-4"
        style={{ background: '#4a6583', fontFamily: "'Inter', sans-serif" }}
      >
        <div className="h-px bg-white/30 flex-1 max-w-[80px] sm:max-w-[96px]" />
        <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm font-bold tracking-[3px] sm:tracking-[4px] uppercase whitespace-nowrap">
          <svg
            width="16"
            height="16"
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
        <div className="h-px bg-white/30 flex-1 max-w-[80px] sm:max-w-[96px]" />
      </div>

      {/* ══════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════ */}
      <section
        className="w-full"
        style={{ background: '#0e1a2e', fontFamily: "'Inter', sans-serif" }}
      >
        {/* Section heading */}
        <div className="px-6 sm:px-10 pt-8 pb-5">
          <h2
            className="text-white font-extrabold tracking-[3px] uppercase"
            style={{ fontSize: 'clamp(1rem, 4vw, 1.6rem)' }}
          >
            Galeri
          </h2>
          <p className="text-white/40 text-xs tracking-widest mt-1">
            Dokumentasi Lapangan PLTM Ordi Hulu
          </p>
        </div>

        {/* Logo — desktop top-right overlay */}
        <div className="hidden sm:flex absolute top-0 right-7 items-center gap-2 z-20 mt-5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

        {/* Gallery grid:
            Mobile  → 2 columns, each card has fixed height
            Desktop → 4 columns, taller cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 px-4 sm:px-6 md:px-8 pb-8">
          {gallery.map(({ img, title, caption, pos }) => (
            <div
              key={title}
              className="relative overflow-hidden bg-black group cursor-pointer rounded-md"
              style={{ height: 'clamp(140px, 28vw, 280px)' }}
            >
              {/* Background image — zooms on hover */}
              <div
                className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  backgroundImage: `url('${img}')`,
                  backgroundPosition: pos,
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

              {/* Title bar — always visible */}
              <div className="absolute bottom-0 left-0 w-full px-3 py-2.5 sm:px-4 sm:py-3 transition-all duration-500 group-hover:sm:-translate-y-16">
                <p className="text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase opacity-60">
                  PLTM Ordi Hulu
                </p>
                <p className="text-white text-[11px] sm:text-sm font-bold leading-tight mt-0.5 line-clamp-1">
                  {title}
                </p>
                <div className="w-4 h-[2px] bg-[#eebf3b] mt-1.5 sm:mt-2 group-hover:sm:w-10 transition-all duration-500" />
              </div>

              {/* Caption — slides up on hover (desktop only) */}
              <div className="hidden sm:block absolute bottom-0 left-0 w-full px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-white/80 text-[0.65rem] leading-relaxed line-clamp-4">
                  {caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer bar */}
      <div
        className="bg-[#4a6583] py-6 flex items-center justify-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <p className="text-white/40 text-xs tracking-widest">
          © 2024 PLTM Ordi Hulu · Kencana Energy
        </p>
      </div>
    </>
  );
}
