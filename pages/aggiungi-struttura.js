import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

export default function AggiungiStruttura() {
  const [utente, setUtente] = useState(null)
  const [caricamento, setCaricamento] = useState(true)
  const [nome, setNome] = useState('')
  const [luogo, setLuogo] = useState('')
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
    const { data, error } = await supabase.from('strutture').insert({
      nome,
      luogo,
      proprietario: utente.email,
      user_id: utente.id,
    }).select().single()

    if (error) {
      setMessaggio('Errore: ' + error.message)
    } else {
      router.push(`/aggiungi-unita?struttura_id=${data.id}`)
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
          <h1>Aggiungi una proprietà</h1>
          <p style={{ fontSize: 13, color: '#666', marginTop: -10, marginBottom: 16 }}>
            Prima crea la proprietà (l'edificio), poi aggiungerai le singole stanze o unità prenotabili.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Nome proprietà</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Luogo</label>
              <input value={luogo} onChange={(e) => setLuogo(e.target.value)} required />
            </div>
            <button className="auth-btn" type="submit">Crea proprietà e continua</button>
          </form>
          {messaggio && <div className="auth-msg">{messaggio}</div>}
        </div>
      </div>
    </div>
  );
}
