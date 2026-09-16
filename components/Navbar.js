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
    <div style={{ width: '100%', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 9999, fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', backgroundColor: '#e11d48', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: '18px' }}>
              H
            </div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', letterSpacing: '-0.5px' }}>
              Havenest
            </span>
          </Link>
        </div>

        {/* Menu di destra */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/registrati-host" style={{ fontSize: '14px', fontWeight: 500, color: '#374151', textDecoration: 'none' }}>
            Diventa host
          </Link>

          <Link href="/miei-annunci" style={{ fontSize: '14px', fontWeight: 500, color: '#374151', textDecoration: 'none' }}>
            I miei annunci
          </Link>

          <Link href="/aggiungi-struttura" style={{ fontSize: '14px', fontWeight: 500, color: '#374151', textDecoration: 'none' }}>
            + Aggiungi struttura
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#4b5563' }}>
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', backgroundColor: '#e11d48', border: 'none', padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s' }}
              >
                Esci
              </button>
            </div>
          ) : (
            <Link href="/accedi" style={{ fontSize: '14px', fontWeight: 500, color: '#374151', textDecoration: 'none', border: '1px solid #d1d5db', padding: '7px 16px', borderRadius: '10px' }}>
              Accedi
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
