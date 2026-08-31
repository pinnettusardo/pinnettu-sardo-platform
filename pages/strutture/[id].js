import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'

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
          <span className="nav-link">Diventa host</span>
          <button className="icon-btn">🌐</button>
          <div className="user-menu">
            <span>☰</span>
            <div className="user-icon">👤</div>
          </div>
        </div>
      </nav>

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
