import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

export default function AggiungiStruttura() {
  const [utente, setUtente] = useState(null)
  const [caricamento, setCaricamento] = useState(true)
  const [nome, setNome] = useState('')
  const [luogo, setLuogo] = useState('')
  const [prezzo, setPrezzo] = useState('')
  const [descrizione, setDescrizione] = useState('')
  const [fotoUrl, setFotoUrl] = useState('')
  const [messaggio, setMessaggio] = useState('')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/accedi')
      } else {
        setUtente(data.session.user)
        setCaricamento(false)
      }
    })
  }, [router])

  async function handleSubmit(e) {
    e.preventDefault()
    setMessaggio('')
    const { error } = await supabase.from('strutture').insert({
      nome,
      luogo,
      prezzo: Number(prezzo),
      descrizione,
      foto_url: fotoUrl,
      proprietario: utente.email,
      user_id: utente.id,
    })
    if (error) {
      setMessaggio('Errore: ' + error.message)
    } else {
      router.push('/')
    }
  }

  if (caricamento) {
    return null
  }

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <div className="auth-box">
          <h1>Aggiungi la tua struttura</h1>
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Nome struttura</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Luogo</label>
              <input value={luogo} onChange={(e) => setLuogo(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Prezzo per notte (€)</label>
              <input type="number" min="1" value={prezzo} onChange={(e) => setPrezzo(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Descrizione</label>
              <input value={descrizione} onChange={(e) => setDescrizione(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Link foto (facoltativo)</label>
              <input value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} placeholder="https://..." />
            </div>
            <button className="auth-btn" type="submit">Pubblica struttura</button>
          </form>
          {messaggio && <div className="auth-msg">{messaggio}</div>}
        </div>
      </div>
    </div>
  );
}
