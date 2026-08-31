import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Accedi() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messaggio, setMessaggio] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setMessaggio('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessaggio('Errore: ' + error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <div>
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
      </nav>

      <div className="auth-container">
        <div className="auth-box">
          <h1>Bentornato</h1>
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="auth-btn" type="submit">Accedi</button>
          </form>
          {messaggio && <div className="auth-msg">{messaggio}</div>}
          <div className="auth-switch">
            Non hai un account? <Link href="/registrati">Registrati</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
