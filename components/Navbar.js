import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Recupera l'utente loggato all'avvio
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    // Sincronizza i cambiamenti di stato (login/logout in tempo reale)
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
              Havenest
            </span>
          </Link>

          {/* Menu di Navigazione */}
          <div className="flex items-center space-x-3">
            <Link 
              href="/miei-annunci" 
              className="text-sm font-medium text-gray-700 hover:text-rose-600 px-2 py-1 transition"
            >
              I miei annunci
            </Link>

            <Link 
              href="/aggiungi-struttura" 
              className="text-sm font-medium text-gray-700 hover:text-rose-600 px-2 py-1 transition hidden sm:inline"
            >
              + Aggiungi struttura
            </Link>

            {user ? (
              // Se l'utente è LOGGATO: mostra email e tasto Esci
              <div className="flex items-center space-x-3 ml-2">
                <span className="text-xs text-gray-500 hidden md:inline">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-300 bg-rose-50 px-3.5 py-2 rounded-xl transition shadow-sm"
                >
                  Esci
                </button>
              </div>
            ) : (
              // Se l'utente NON è loggato: mostra Accedi e Registrazioni
              <div className="flex items-center space-x-2 ml-2">
                <Link 
                  href="/accedi" 
                  className="text-sm font-medium text-gray-700 hover:text-rose-600 px-3 py-2 transition"
                >
                  Accedi
                </Link>
                
                <Link 
                  href="/registrati-guest" 
                  className="text-sm font-medium text-gray-700 hover:text-rose-600 border border-gray-200 px-3 py-2 rounded-xl transition hidden md:inline"
                >
                  Ospite
                </Link>

                <Link 
                  href="/registrati-host" 
                  className="text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 px-3.5 py-2 rounded-xl transition shadow-sm"
                >
                  Diventa Host
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}