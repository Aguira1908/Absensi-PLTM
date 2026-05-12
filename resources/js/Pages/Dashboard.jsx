import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  const map = {
    hadir: {
      label: 'Hadir',
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
    },
    izin: {
      label: 'Izin',
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      dot: 'bg-blue-500',
    },
    sakit: {
      label: 'Sakit',
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      dot: 'bg-yellow-500',
    },
    alpha: {
      label: 'Alpha',
      bg: 'bg-red-100',
      text: 'text-red-700',
      dot: 'bg-red-500',
    },
    alpa: {
      label: 'Alpha',
      bg: 'bg-red-100',
      text: 'text-red-700',
      dot: 'bg-red-500',
    },
  };
  const s = map[status] ?? {
    label: status,
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

/* ─── Photo Thumbnail ─── */
function PhotoThumb({ url, label, onOpen }) {
  if (!url) {
    return (
      <div
        className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"
        title={`Tidak ada foto ${label}`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    );
  }
  return (
    <button
      onClick={() => onOpen(url, label)}
      className="w-10 h-10 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#192a47] transition-all duration-150 focus:outline-none focus:border-[#eebf3b] group relative"
      title={`Lihat foto ${label}`}
    >
      <img
        src={url}
        alt={`Foto ${label}`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-150 flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
    </button>
  );
}

/* ─── Lightbox ─── */
function Lightbox({ src, label, onClose }) {
  if (!src) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#192a47]">
          <span className="text-white text-sm font-semibold">Foto {label}</span>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Image */}
        <img
          src={src}
          alt={`Foto ${label}`}
          className="w-full object-contain bg-black max-h-[70vh]"
        />

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-4 py-3 bg-[#0e1a2e]">
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Buka di tab baru
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */
function fmt(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
function fmtDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/* ─── Main Page ─── */
export default function Dashboard({
  attendances = [],
  summary = { hadir: 0, izin: 0, absen: 0 },
}) {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const [lightbox, setLightbox] = useState(null); // { src, label }

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard — PLTM Ordi Hulu" />

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          label={lightbox.label}
          onClose={() => setLightbox(null)}
        />
      )}

      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        {/* ── Greeting bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">{today}</p>
          </div>
          <Link
            href="/absensi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#192a47] hover:bg-[#243d63] text-white text-sm font-semibold transition-colors duration-200 shadow-sm"
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
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Catat Kehadiran
          </Link>
        </div>

        {/* ── Summary cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: 'Total Hadir',
              value: summary.hadir,
              icon: (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ),
              color: 'text-emerald-600',
              bg: 'bg-emerald-50',
              border: 'border-emerald-200',
            },
            {
              label: 'Izin / Sakit',
              value: summary.izin,
              icon: (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              ),
              color: 'text-blue-600',
              bg: 'bg-blue-50',
              border: 'border-blue-200',
            },
            {
              label: 'Tidak Hadir',
              value: summary.absen,
              icon: (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              ),
              color: 'text-red-600',
              bg: 'bg-red-50',
              border: 'border-red-200',
            },
          ].map(({ label, value, icon, color, bg, border }) => (
            <div
              key={label}
              className={`flex items-center gap-4 p-5 rounded-xl bg-white border ${border} shadow-sm`}
            >
              <div
                className={`flex-shrink-0 w-11 h-11 rounded-lg ${bg} ${color} flex items-center justify-center`}
              >
                {icon}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {label}
                </p>
                <p className={`text-3xl font-black ${color} leading-none mt-1`}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Attendance notice ── */}
        <div className="rounded-xl bg-gradient-to-r from-[#192a47] to-[#243d63] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#eebf3b]/20 flex items-center justify-center flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#eebf3b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                Jangan lupa catat kehadiran hari ini!
              </p>
              <p className="text-white/50 text-xs mt-0.5">
                Pastikan Anda absen masuk dan pulang sebelum waktu berakhir.
              </p>
            </div>
          </div>
          <Link
            href="/absensi"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#eebf3b] hover:bg-[#f5cc55] text-[#0e1a2e] text-sm font-bold transition-colors duration-200"
          >
            Absen Sekarang
          </Link>
        </div>

        {/* ── Riwayat Kehadiran ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-800 tracking-wide">
                Riwayat Kehadiran
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">10 data terakhir</p>
            </div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </div>

          {attendances.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-3 opacity-40"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <p className="text-sm font-medium">Belum ada data kehadiran</p>
              <p className="text-xs mt-1">
                Data akan muncul setelah Anda melakukan absensi
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Foto Masuk
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Jam Masuk
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Foto Pulang
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Jam Pulang
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {attendances.map((a, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/60 transition-colors duration-100"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                        {fmtDate(a.logical_date)}
                      </td>

                      {/* Foto Masuk */}
                      <td className="px-6 py-4">
                        <PhotoThumb
                          url={a.clock_in_photo}
                          label="Absen Masuk"
                          onOpen={(src, label) => setLightbox({ src, label })}
                        />
                      </td>

                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                        {fmt(a.clock_in_time)}
                      </td>

                      {/* Foto Pulang */}
                      <td className="px-6 py-4">
                        <PhotoThumb
                          url={a.clock_out_photo}
                          label="Absen Pulang"
                          onOpen={(src, label) => setLightbox({ src, label })}
                        />
                      </td>

                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                        {fmt(a.clock_out_time)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={a.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
