import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Brand Havenest */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
              H
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Avenest
            </span>
          </Link>

          {/* Menu di Navigazione Centrale / Destra */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/registrati-host" 
              className="text-sm font-medium text-gray-700 hover:text-rose-600 transition"
            >
              Diventa host
            </Link>

            <Link 
              href="/miei-annunci" 
              className="text-sm font-medium text-gray-700 hover:text-rose-600 transition"
            >
              I miei annunci
            </Link>

            <Link 
              href="/aggiungi-struttura" 
              className="text-sm font-medium text-gray-700 hover:text-rose-600 transition"
            >
              + Aggiungi struttura
            </Link>

            {/* Icona lingua o extra se presente */}
            <button className="text-gray-400 hover:text-gray-600 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18m1-18a17 17 0 010 18" />
              </svg>
            </button>

            {/* Sezione Utente Loggato con Email e Pulsante Esci */}
            {user ? (
              <div className="flex items-center space-x-3 border border-gray-200 rounded-full py-1.5 px-3 bg-gray-50 shadow-sm">
                <span className="text-sm font-medium text-gray-700">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-semibold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 px-2.5 py-1 rounded-full transition"
                >
                  Esci
                </button>
              </div>
            ) : (
              <Link 
                href="/accedi" 
                className="text-sm font-medium text-gray-700 hover:text-rose-600 border border-gray-200 px-4 py-2 rounded-full transition shadow-sm"
              >
                Accedi
              </Link>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}
