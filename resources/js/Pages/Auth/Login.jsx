import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <>
      <Head title="Masuk — PLTM Ordi Hulu" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div
        className="relative min-h-screen w-screen flex overflow-hidden"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* ── Background photo — full bleed ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://kencanaenergy.com/assets/img/ordi-1-new-2024.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />

        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a2e]/90 via-[#0e1a2e]/50 to-transparent" />

        {/* ── LEFT PANEL: Brand info ── */}
        <div className="relative z-10 hidden lg:flex flex-col justify-between w-1/2 px-16 py-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2 16C2 16 5 12 12 12C19 12 22 16 22 16"
                stroke="#7398c8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-white font-bold text-sm leading-tight tracking-wide">
              PLTM
              <br />
              ORDI HULU
            </span>
          </div>

          {/* Main brand text */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#eebf3b]" />
              <span className="text-[#eebf3b] text-xs font-bold tracking-[4px] uppercase">
                Portal Kehadiran Karyawan
              </span>
            </div>
            <h1
              className="font-black text-white leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              PLTM
              <br />
              <span className="text-[#7398c8]">ORDI HULU</span>
            </h1>
            <div className="w-14 h-[3px] bg-[#eebf3b] mt-6 mb-5" />
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Sistem kehadiran digital untuk karyawan Pembangkit Listrik Tenaga
              Mini Hidro Ordi Hulu.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            www.kencanaenergy.com
          </div>
        </div>

        {/* ── RIGHT PANEL: Login form ── */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full lg:w-1/2 px-8 py-14">
          <div
            className="w-full max-w-md rounded-2xl px-10 py-10"
            style={{
              background: 'rgba(14, 26, 46, 0.85)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
            }}
          >
            {/* Card header */}
            <div className="mb-8">
              {/* Mobile-only logo */}
              <div className="flex items-center gap-2 mb-6 lg:hidden">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 16C2 16 5 12 12 12C19 12 22 16 22 16"
                    stroke="#7398c8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-white font-bold text-xs leading-tight">
                  PLTM ORDI HULU
                </span>
              </div>

              <h2 className="text-white text-2xl font-extrabold tracking-tight">
                Selamat Datang
              </h2>
              <p className="text-white/40 text-sm mt-1">
                Masuk untuk mencatat kehadiran Anda
              </p>
            </div>

            {/* Status message */}
            {status && (
              <div className="mb-5 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
                {status}
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  autoComplete="username"
                  autoFocus
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                  placeholder="nama@email.com"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = 'rgba(238,191,59,0.5)')
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = 'rgba(255,255,255,0.10)')
                  }
                />
                <InputError
                  message={errors.email}
                  className="mt-1.5 text-red-400 text-xs"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-white/60 text-xs font-semibold tracking-wider uppercase"
                  >
                    Password
                  </label>
                  {canResetPassword && (
                    <Link
                      href={route('password.request')}
                      className="text-[#eebf3b]/70 hover:text-[#eebf3b] text-xs transition-colors duration-150"
                    >
                      Lupa password?
                    </Link>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  autoComplete="current-password"
                  onChange={(e) => setData('password', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                  placeholder="••••••••"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = 'rgba(238,191,59,0.5)')
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = 'rgba(255,255,255,0.10)')
                  }
                />
                <InputError
                  message={errors.password}
                  className="mt-1.5 text-red-400 text-xs"
                />
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-3">
                <div
                  className="relative w-4 h-4 flex-shrink-0 rounded cursor-pointer"
                  style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <input
                    id="remember"
                    type="checkbox"
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  {data.remember && (
                    <svg
                      className="absolute inset-0 w-full h-full p-0.5 text-[#eebf3b]"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2 8 6 12 14 4" />
                    </svg>
                  )}
                </div>
                <label
                  htmlFor="remember"
                  className="text-white/40 text-xs cursor-pointer select-none"
                >
                  Ingat saya di perangkat ini
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 mt-2 disabled:opacity-60"
                style={{
                  background: '#eebf3b',
                  color: '#0e1a2e',
                  boxShadow: '0 8px 24px rgba(238,191,59,0.25)',
                }}
                onMouseEnter={(e) =>
                  !processing && (e.target.style.background = '#f5cc55')
                }
                onMouseLeave={(e) =>
                  !processing && (e.target.style.background = '#eebf3b')
                }
              >
                {processing ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </button>
            </form>

            {/* Back to home */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-white/30 hover:text-white/60 text-xs transition-colors duration-150"
              >
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative vertical text */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-white/10 font-black uppercase select-none pointer-events-none hidden lg:block"
          style={{
            writingMode: 'vertical-rl',
            fontSize: '0.6rem',
            letterSpacing: '8px',
          }}
        >
          Renewable Energy Generation 2024
        </div>
      </div>
    </>
  );
}
