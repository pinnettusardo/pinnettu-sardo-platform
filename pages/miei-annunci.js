import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

export default function MieiAnnunci() {
  const [unita, setUnita] = useState([])
  const [caricamento, setCaricamento] = useState(true)
  const [messaggio, setMessaggio] = useState('')
  const router = useRouter()

  useEffect(() => {
    caricaMieiAnnunci()
  }, [])

  async function caricaMieiAnnunci() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/accedi')
      return
    }

    // Recuperiamo le unità create dall'utente loggato (tramite la struttura o l'utente)
    // Selezioniamo le unità associate alle strutture dell'utente
    const { data, error } = await supabase
      .from('unita')
      .select('*, strutture!inner(nome, proprietario, user_id)')
      .eq('strutture.user_id', session.user.id)

    if (error) {
      console.error('Errore nel caricamento:', error.message)
    } else {
      setUnita(data || [])
    }
    setCaricamento(false)
  }

  async function eliminaUnita(id) {
    if (!confirm("Sei sicuro di voler eliminare questo annuncio?")) return

    const { error } = await supabase
      .from('unita')
      .delete()
      .eq('id', id)

    if (error) {
      setMessaggio('Errore durante la cancellazione: ' + error.message)
    } else {
      setMessaggio('Annuncio eliminato con successo!')
      // Ricarica la lista aggiornata
      caricaMieiAnnunci()
    }
  }

  if (caricamento) return null

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1>I miei annunci</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Gestisci qui le tue unità e strutture pubblicate su Havenest.
        </p>

        {messaggio && <div style={{ padding: '10px', background: '#eef', marginBottom: '20px', borderRadius: '8px' }}>{messaggio}</div>}

        {unita.length === 0 ? (
          <p>Non hai ancora pubblicato nessun annuncio.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {unita.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '12px', background: '#fff' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{item.nome}</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                    Proprietà: <strong>{item.strutture?.nome}</strong> — Prezzo: <strong>€{item.prezzo}</strong> / notte
                  </p>
                </div>
                <button 
                  onClick={() => eliminaUnita(item.id)}
                  style={{ background: '#FF385C', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Elimina
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
