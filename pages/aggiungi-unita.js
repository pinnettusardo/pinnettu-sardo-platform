import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

export default function AggiungiUnita() {
  const [nomeUnita, setNomeUnita] = useState('')
  const [prezzo, setPrezzo] = useState('')
  const [descrizione, setDescrizione] = useState('')
  const [messaggio, setMessaggio] = useState('')
  const router = useRouter()
  const { struttura_id } = router.query

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/accedi')
      }
    })
  }, [router])

  async function handleSubmit(e) {
    e.preventDefault()
    setMessaggio('')

    const { error } = await supabase.from('unita').insert({
      struttura_id: struttura_id,
      nome: nomeUnita,
      prezzo: parseFloat(prezzo),
      descrizione: descrizione,
    })

    if (error) {
      setMessaggio('Errore: ' + error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <div className="auth-box">
          <h1>Aggiungi un'unità</h1>
          <p style={{ fontSize: 13, color: '#666', marginTop: -10, marginBottom: 16 }}>
            Ora aggiungi la stanza o l'alloggio specifico (es. Stanza Matrimoniale, Pinnetto Intero) collegato a questa proprietà.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Nome Unità / Alloggio</label>
              <input value={nomeUnita} onChange={(e) => setNomeUnita(e.target.value)} placeholder="Es. Pinnetto Indipendente" required />
            </div>
            <div className="auth-field">
              <label>Prezzo per notte (€)</label>
              <input type="number" value={prezzo} onChange={(e) => setPrezzo(e.target.value)} placeholder="Es. 90" required />
            </div>
            <div className="auth-field">
              <label>Descrizione</label>
              <textarea value={descrizione} onChange={(e) => setDescrizione(e.target.value)} placeholder="Descrivi l'alloggio..." rows="4" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
            <button className="auth-btn" type="submit">Salva unità e pubblica</button>
          </form>
          {messaggio && <div className="auth-msg">{messaggio}</div>}
        </div>
      </div>
    </div>
  )
}
