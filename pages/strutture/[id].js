import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'
import Navbar from '../../components/Navbar'

export async function getServerSideProps({ params }) {
  const { data: struttura } = await supabase
    .from('strutture')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!struttura) {
    return { notFound: true }
  }

  return { props: { struttura } }
}

export default function DettaglioStruttura({ struttura }) {
  return (
    <div>
      <Navbar />

      <div className="detail-container">
        <Link href="/" className="back-link">← Torna alla ricerca</Link>

        <div className="detail-hero">
          {struttura.foto_url ? (
            <img src={struttura.foto_url} alt={struttura.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            '🏠'
          )}
        </div>

        <div className="detail-grid">
          <div className="detail-info">
            <h1>{struttura.nome}</h1>
            <div className="detail-luogo">{struttura.luogo}</div>
            <p className="detail-descrizione">{struttura.descrizione}</p>
            <div className="detail-host">Ospitato da {struttura.proprietario}</div>
          </div>

          <div className="booking-box">
            <div className="booking-prezzo">{struttura.prezzo}€ <span>/notte</span></div>
            <div className="booking-dates">
              <div className="booking-date">
                <label>Check-in</label>
                <input type="date" />
              </div>
              <div className="booking-date">
                <label>Check-out</label>
                <input type="date" />
              </div>
            </div>
            <div className="booking-guests">
              <label>Ospiti</label>
              <input type="number" min="1" placeholder="1" />
            </div>
            <button className="booking-btn">Prenota</button>
          </div>
        </div>
      </div>
    </div>
  );
}
