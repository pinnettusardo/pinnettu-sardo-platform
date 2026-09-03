import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

export default function Home() {
  const [blocchi, setBlocchi] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlocks()
  }, [])

  async function fetchBlocks() {
    try {
      const { data, error } = await supabase
        .from('site_blocks')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setBlocchi(data || [])
    } catch (error) {
      console.error('Errore nel caricamento dei blocchi:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <nav className="navbar">
        <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
          Pinnettu Sardo
        </Link>
        <div className="nav-links">
          <Link href="/accedi">Accedi</Link>
          <Link href="/registrati">Registrati</Link>
        </div>
      </nav>

      <div className="container" style={{ padding: '40px 20px' }}>
        <h1>Benvenuti a Pinnettu Sardo</h1>
        
        {loading ? (
          <p>Caricamento contenuti in corso...</p>
        ) : blocchi.length === 0 ? (
          <p>Nessun blocco trovato nel database. Aggiungi il primo blocco su Supabase!</p>
        ) : (
          <div className="blocks-grid">
            {blocchi.map((block) => (
              <div key={block.id} className="block-card" style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h2>{block.title}</h2>
                <p>{block.content}</p>
                {block.image_url && <img src={block.image_url} alt={block.title} style={{ maxWidth: '100%', borderRadius: '6px' }} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
