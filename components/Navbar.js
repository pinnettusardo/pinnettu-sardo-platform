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
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
                H
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Havenest
              </span>
            </Link>
          </div>

          {/* Menu Destra */}
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

            {user ? (
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-600 font-medium">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 px-3 py-1.5 rounded-lg transition shadow-sm"
                >
                  Esci
                </button>
              </div>
            ) : (
              <Link 
                href="/accedi" 
                className="text-sm font-medium text-gray-700 hover:text-rose-600 border border-gray-200 px-4 py-2 rounded-xl transition shadow-sm"
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
