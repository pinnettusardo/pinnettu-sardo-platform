import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Recupera l'utente loggato al caricamento
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    // Ascolta i cambiamenti di autenticazione (login/logout)
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
        <div className="flex justify-between h-16">
          {/* Logo / Nome del sito */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-rose-600 hover:opacity-90 transition">
              Pinnettu Sardo
            </Link>
          </div>

          {/* Menu di destra */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Utente Loggato
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {user.email}
                </span>
                <Link 
                  href="/miei-annunci" 
                  className="text-sm font-medium text-gray-700 hover:text-rose-600 transition"
                >
                  I miei annunci
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-rose-600 hover:text-rose-700 border border-rose-200 px-3 py-1.5 rounded-xl transition"
                >
                  Esci
                </button>
              </div>
            ) : (
              // Utente NON Loggato (Mostra Accedi e Registrazioni separate)
              <div className="flex items-center space-x-3">
                <Link 
                  href="/accedi" 
                  className="text-sm font-medium text-gray-700 hover:text-rose-600 px-3 py-2 transition"
                >
                  Accedi
                </Link>
                
                <Link 
                  href="/registrati-guest" 
                  className="text-sm font-medium text-gray-700 hover:text-rose-600 border border-gray-200 px-3 py-2 rounded-xl transition"
                >
                  Registrati (Ospite)
                </Link>

                <Link 
                  href="/registrati-host" 
                  className="text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-xl transition shadow-sm"
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
