import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
  const { auth, flash } = usePage().props;
  const user = auth.user;

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    if (flash?.success) {
      setFlashMessage({ type: 'success', message: flash.success });
      const timer = setTimeout(() => setFlashMessage(null), 5000);
      return () => clearTimeout(timer);
    } else if (flash?.error) {
      setFlashMessage({ type: 'error', message: flash.error });
      const timer = setTimeout(() => setFlashMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top Nav ── */}
      <nav className="bg-[#192a47] shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo + Nav links */}
            <div className="flex items-center gap-8">
              {/* Brand */}
              <Link
                href="/"
                className="flex items-center gap-2.5 flex-shrink-0"
              >
                {/* <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 16C2 16 5 12 12 12C19 12 22 16 22 16"
                    stroke="#7398c8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg> */}
                <span className="text-white font-bold text-xs leading-tight tracking-wide hidden sm:block">
                  PLTM
                  <br />
                  ORDI HULU
                </span>
              </Link>

              {/* Desktop nav links */}
              <div className="hidden sm:flex items-center gap-1">
                <Link
                  href={route('dashboard')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    route().current('dashboard')
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href={route('absensi')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    route().current('absensi')
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Absensi
                </Link>
              </div>
            </div>

            {/* Right: User dropdown */}
            <div className="hidden sm:flex items-center">
              <Dropdown>
                <Dropdown.Trigger>
                  <button
                    type="button"
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors duration-150 group"
                  >
                    {/* Avatar circle */}
                    <div className="w-8 h-8 rounded-full bg-[#eebf3b] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#0e1a2e] text-xs font-black">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white text-sm font-medium max-w-[140px] truncate">
                      {user.name}
                    </span>
                    <svg
                      className="w-4 h-4 text-white/50 group-hover:text-white transition-colors"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>
                  <Dropdown.Link href={route('profile.edit')}>
                    <span className="flex items-center gap-2">
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
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Profil Saya
                    </span>
                  </Dropdown.Link>
                  <Dropdown.Link
                    href={route('logout')}
                    method="post"
                    as="button"
                  >
                    <span className="flex items-center gap-2 text-red-600">
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
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Keluar
                    </span>
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setShowingNavigationDropdown((prev) => !prev)}
              className="sm:hidden p-2 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={!showingNavigationDropdown ? 'block' : 'hidden'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={showingNavigationDropdown ? 'block' : 'hidden'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden border-t border-white/10`}
        >
          <div className="space-y-1 px-4 py-3">
            <ResponsiveNavLink
              href={route('dashboard')}
              active={route().current('dashboard')}
            >
              Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink
              href={route('absensi')}
              active={route().current('absensi')}
            >
              Absensi
            </ResponsiveNavLink>
          </div>
          <div className="border-t border-white/10 px-4 py-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#eebf3b] flex items-center justify-center">
                <span className="text-[#0e1a2e] text-xs font-black">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{user.name}</p>
                <p className="text-white/40 text-xs">{user.email}</p>
              </div>
            </div>
            <ResponsiveNavLink href={route('profile.edit')}>
              Profil Saya
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('logout')} method="post" as="button">
              Keluar
            </ResponsiveNavLink>
          </div>
        </div>
      </nav>

      {/* Page header slot */}
      {header && (
        <header className="bg-white border-b border-gray-100 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      {/* Toast Notification */}
      {flashMessage && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white text-sm font-medium max-w-sm ${
              flashMessage.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
          >
            {flashMessage.type === 'success' ? (
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <p className="leading-snug">{flashMessage.message}</p>
            <button
              onClick={() => setFlashMessage(null)}
              className="ml-1 hover:opacity-70 shrink-0"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <main>{children}</main>
    </div>
  );
}
