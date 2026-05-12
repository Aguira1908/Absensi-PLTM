import { Link } from '@inertiajs/react';
import React from 'react';

const Header = ({ auth }) => {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4">
      {/* Brand */}
      <div className="flex items-center gap-2">
        {/* <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
        <h1 className="text-white font-bold text-sm leading-tight tracking-wide">
          PLTM
          <br />
          ORDI HULU
        </h1>
      </div>

      {/* Navigation */}
      <nav>
        {auth.user ? (
          <Link
            href={route('dashboard')}
            className="text-white text-sm font-semibold px-5 py-2 border border-white/50 rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-200"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href={route('login')}
            className="text-white text-sm font-semibold px-5 py-2 border border-white/50 rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-200"
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
