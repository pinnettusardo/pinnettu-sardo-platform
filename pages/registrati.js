import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

export default function Registrati() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [cognome, setCognome] = useState('')
  const [messaggio, setMessaggio] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMessaggio('')

    try {
      // 1. Registrazione dell'utente in Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({ 
        email, 
        password 
      })

      if (authError) throw authError

      const user = data.user
      if (user) {
        // 2. Salvataggio dei dati aggiuntivi nella tabella 'profiles'
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: user.id, // Collega l'ID univoco dell'utente
              nome: nome,
              cognome: cognome,
              role: 'guest'
            }
          ])

        if (profileError) throw profileError

        setMessaggio('Registrazione avvenuta! Controlla la tua email per confermare.')
      }
    } catch (error) {
      setMessaggio('Errore: ' + error.message)
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
          <h1>Crea il tuo account</h1>
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Nome</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Cognome</label>
              <input type="text" value={cognome} onChange={(e) => setCognome(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            <button className="auth-btn" type="submit">Registrati</button>
          </form>
          {messaggio && <div className="auth-msg">{messaggio}</div>}
          <div className="auth-switch">
            Hai già un account? <Link href="/accedi">Accedi</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
