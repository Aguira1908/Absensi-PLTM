{{-- Panggil Tailwind CSS langsung agar semua utility class Inertia Anda terbaca --}}
<script src="https://cdn.tailwindcss.com"></script>

{{-- Pastikan full screen --}}
<div class="relative flex min-h-screen w-screen overflow-hidden font-sans"
  style="font-family: 'Inter', sans-serif; background-color: #0e1a2e;">

  {{-- ── Background photo — full bleed ── --}}
  <div class="absolute inset-0 bg-cover"
    style="background-image: url('https://kencanaenergy.com/assets/img/ordi-1-new-2024.jpg'); background-position: center 30%;">
  </div>

  {{-- Multi-layer overlay --}}
  <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
  <div class="absolute inset-0 bg-gradient-to-r from-[#0e1a2e]/90 via-[#0e1a2e]/50 to-transparent"></div>

  {{-- ── LEFT PANEL: Brand info ── --}}
  <div class="relative z-10 hidden w-1/2 flex-col justify-between px-16 py-14 lg:flex">
    {{-- Logo --}}
    <div class="flex items-center gap-3">
      <svg fill="none" height="28" viewBox="0 0 24 24" width="28">
        <path d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12" stroke-linecap="round" stroke-width="2" stroke="#fff" />
        <path d="M2 16C2 16 5 12 12 12C19 12 22 16 22 16" stroke-linecap="round" stroke-width="2" stroke="#7398c8" />
      </svg>
      <span class="text-sm font-bold leading-tight tracking-wide text-white">
        PLTM<br />ORDI HULU
      </span>
    </div>

    {{-- Main brand text --}}
    <div>
      <div class="mb-5 flex items-center gap-3">
        <div class="h-[2px] w-8 bg-[#eebf3b]"></div>
        <span class="text-xs font-bold uppercase tracking-[4px] text-[#eebf3b]">Portal Kehadiran Karyawan</span>
      </div>
      <h1 class="font-black leading-none tracking-tight text-white" style="font-size: clamp(2.5rem, 5vw, 4.5rem);">
        PLTM<br /><span class="text-[#7398c8]">ORDI HULU</span>
      </h1>
      <div class="mb-5 mt-6 h-[3px] w-14 bg-[#eebf3b]"></div>
      <p class="max-w-sm text-sm leading-relaxed text-white/50">
        Sistem kehadiran digital untuk karyawan Pembangkit Listrik Tenaga Mini Hidro Ordi Hulu.
      </p>
    </div>

    {{-- Footer --}}
    <div class="flex items-center gap-2 text-xs text-white/30">
      <svg fill="none" height="12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        stroke="currentColor" viewBox="0 0 24 24" width="12">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      www.kencanaenergy.com
    </div>
  </div>

  {{-- ── RIGHT PANEL: Login form ── --}}
  <div class="relative z-10 flex w-full flex-col items-center justify-center px-8 py-14 lg:w-1/2">
    <div class="w-full max-w-md rounded-2xl border border-white/10 px-10 py-10 shadow-[0_32px_64px_rgba(0,0,0,0.4)]"
      style="background: rgba(14, 26, 46, 0.85); backdrop-filter: blur(24px);">

      {{-- Card header --}}
      <div class="mb-8">
        {{-- Mobile-only logo --}}
        <div class="mb-6 flex items-center gap-2 lg:hidden">
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
            <path d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12" stroke-linecap="round" stroke-width="2" stroke="#fff" />
            <path d="M2 16C2 16 5 12 12 12C19 12 22 16 22 16" stroke-linecap="round" stroke-width="2"
              stroke="#7398c8" />
          </svg>
          <span class="text-xs font-bold leading-tight text-white">PLTM ORDI HULU</span>
        </div>

        <h2 class="text-2xl font-extrabold tracking-tight text-white">Selamat Datang</h2>
        <p class="mt-1 text-sm text-white/40">Masuk untuk mencatat kehadiran Anda</p>
      </div>

      {{-- Form --}}
      <form class="space-y-5" wire:submit="authenticate">

        {{-- Email --}}
        <div>
          <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60"
            for="email">Email</label>
          <input autocomplete="username" autofocus
            class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-[#eebf3b]/50"
            id="email" placeholder="nama@email.com" type="email" wire:model="data.email">
          @error('data.email')
            <p class="mt-1.5 text-xs text-red-400">{{ $message }}</p>
          @enderror
        </div>

        {{-- Password --}}
        <div>
          <div class="mb-2 flex items-center justify-between">
            <label class="text-xs font-semibold uppercase tracking-wider text-white/60" for="password">Password</label>
            @if (filament()->hasPasswordReset())
              <a class="text-xs text-[#eebf3b]/70 transition-colors duration-150 hover:text-[#eebf3b]"
                href="{{ filament()->getRequestPasswordResetUrl() }}">Lupa password?</a>
            @endif
          </div>
          <input autocomplete="current-password"
            class="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-[#eebf3b]/50"
            id="password" placeholder="••••••••" type="password" wire:model="data.password">
          @error('data.password')
            <p class="mt-1.5 text-xs text-red-400">{{ $message }}</p>
          @enderror
        </div>

        {{-- Remember me --}}
        <div class="flex items-center gap-3">
          <div class="relative h-4 w-4 flex-shrink-0 rounded border border-white/20">
            <input class="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" id="remember"
              type="checkbox" wire:model="data.remember">
            <div class="absolute inset-0 hidden p-0.5 text-[#eebf3b] peer-checked:block">
              <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                stroke="currentColor" viewBox="0 0 16 16">
                <polyline points="2 8 6 12 14 4" />
              </svg>
            </div>
          </div>
          <label class="cursor-pointer select-none text-xs text-white/40" for="remember">Ingat saya di perangkat
            ini</label>
        </div>

        {{-- Submit Button --}}
        <button
          class="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#eebf3b] py-3 text-sm font-bold tracking-wide text-[#0e1a2e] shadow-[0_8px_24px_rgba(238,191,59,0.25)] transition-all duration-200 hover:bg-[#f5cc55] disabled:cursor-not-allowed disabled:opacity-60"
          type="submit" wire:loading.attr="disabled">

          <span class="flex items-center gap-2" wire:loading.remove wire:target="authenticate">
            <svg fill="none" height="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
              stroke="currentColor" viewBox="0 0 24 24" width="16">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" x2="3" y1="12" y2="12" />
            </svg>
            Masuk Sekarang
          </span>

          <span class="flex items-center gap-2" wire:loading wire:target="authenticate">
            <svg class="h-4 w-4 animate-spin" fill="none" stroke-width="2" stroke="currentColor"
              viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.3" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Memproses...
          </span>

        </button>
      </form>

      {{-- Back to home --}}
      <div class="mt-6 text-center">
        <a class="text-xs text-white/30 transition-colors duration-150 hover:text-white/60" href="/">
          &larr; Kembali ke Beranda
        </a>
      </div>

    </div>
  </div>

  {{-- Decorative vertical text --}}
  <div
    class="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 select-none font-black uppercase text-white/10 lg:block"
    style="writing-mode: vertical-rl; font-size: 0.6rem; letter-spacing: 8px;">
    Renewable Energy Generation 2024
  </div>
</div>
