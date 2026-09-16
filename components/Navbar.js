import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Recupera la sessione attuale al primo caricamento
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Ascolta i cambi di stato (login/logout) in tempo reale
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex justify-between items-center h-16 max-w-7xl mx-auto px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-rose-600 text-white font-bold text-lg">
            H
          </span>
          <span className="text-lg font-semibold text-gray-900 whitespace-nowrap">
            Havenest
          </span>
        </Link>

        {/* LINK DI NAVIGAZIONE */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          <Link
            href="/registrati-host"
            className="text-sm font-medium text-gray-700 hover:text-rose-600 whitespace-nowrap"
          >
            Diventa host
          </Link>

          {user && (
            <Link
              href="/le-mie-strutture"
              className="text-sm font-medium text-gray-700 hover:text-rose-600 whitespace-nowrap"
            >
              I miei annunci
            </Link>
          )}

          <Link
            href="/aggiungi-struttura"
            className="text-sm font-medium text-gray-700 hover:text-rose-600 whitespace-nowrap"
          >
            + Aggiungi struttura
          </Link>
        </div>

        {/* AREA UTENTE (login/logout) */}
        <div className="flex items-center gap-3 shrink-0">
          {loading ? (
            <div className="w-24 h-8" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-gray-600 truncate max-w-[160px]">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-4 py-2 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-50 whitespace-nowrap"
              >
                Esci
              </button>
            </div>
          ) : (
            <Link
              href="/accedi"
              className="text-sm font-medium px-4 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 whitespace-nowrap"
            >
              Accedi
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
