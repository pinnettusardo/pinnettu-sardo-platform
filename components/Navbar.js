import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

export default function Navbar() {
  const [utente, setUtente] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUtente(data.session?.user || null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUtente(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <nav className="navbar">
      <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
        <svg width="34" height="34" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#d9532b"/>
          <rect x="24" y="20" width="13" height="56" rx="4" fill="#ffffff"/>
          <rect x="63" y="36" width="13" height="40" rx="4" fill="#ffffff"/>
          <rect x="30" y="46" width="12" height="9" rx="3" fill="#d9532b"/>
          <rect x="30" y="52" width="40" height="12" rx="5" fill="#ffffff"/>
          <rect x="27" y="76" width="6" height="8" rx="2" fill="#ffffff"/>
          <rect x="67" y="76" width="6" height="8" rx="2" fill="#ffffff"/>
        </svg>
        avenest
      </Link>
      <div className="navbar-right">
        {utente && (
          <Link href="/miei-annunci" className="nav-link" style={{ textDecoration: 'none', fontWeight: '500', marginRight: '10px' }}>
            I miei annunci
          </Link>
        )}
        <Link href={utente ? "/aggiungi-struttura" : "/registrati"} className="nav-link" style={{ textDecoration: 'none' }}>Diventa host</Link>
        <button className="icon-btn">🌐</button>
        {utente ? (
          <div className="user-menu" onClick={handleLogout} style={{ cursor: 'pointer' }} title="Clicca per uscire">
            <span className="email">{utente.email}</span>
            <div className="user-icon">👤</div>
          </div>
        ) : (
          <Link href="/accedi" className="user-menu" style={{ textDecoration: 'none' }}>
            <span>☰</span>
            <div className="user-icon">👤</div>
          </Link>
        )}
      </div>
    </nav>
  )
}
