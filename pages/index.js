import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

export async function getServerSideProps() {
  const { data: strutture } = await supabase.from('strutture').select('*')
  return { props: { strutture: strutture || [] } }
}

export default function Home({ strutture }) {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
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
        </div>
        <div className="navbar-right">
          <span className="nav-link">Diventa host</span>
          <button className="icon-btn">🌐</button>
          <div className="user-menu">
            <span>☰</span>
            <div className="user-icon">👤</div>
          </div>
        </div>
      </nav>

      <div className="tabs">
        <div className="tab active"><span className="tab-icon">🌐</span>Tutto</div>
        <div className="tab"><span className="tab-icon">🏠</span>Alloggi</div>
        <div className="tab"><span className="tab-icon">🎈</span>Esperienze</div>
        <div className="tab"><span className="tab-icon">🛎️</span>Servizi</div>
      </div>

      <div className="hero">
        <h1>Trova la tua vacanza perfetta</h1>
        <p>Scopri case e alloggi unici in tutto il mondo, per ogni tipo di viaggio</p>

        <div className="searchbar-full">
          <div className="search-segment">
            <label>Dove</label>
            <input placeholder="Cerca una destinazione" />
          </div>
          <div className="search-divider"></div>
          <div className="search-segment">
            <label>Check-in</label>
            <input type="date" />
          </div>
          <div className="search-divider"></div>
          <div className="search-segment">
            <label>Check-out</label>
            <input type="date" />
          </div>
          <div className="search-divider"></div>
          <div className="search-segment">
            <label>Ospiti</label>
            <input type="number" min="1" placeholder="1" />
          </div>
          <button className="search-btn">🔍</button>
        </div>
      </div>

      <div className="categorie">
        <div className="categoria"><span className="icona">🏖️</span>Mare</div>
        <div className="categoria"><span className="icona">🏔️</span>Montagna</div>
        <div className="categoria"><span className="icona">🏙️</span>Città</div>
        <div className="categoria"><span className="icona">🌾</span>Campagna</div>
        <div className="categoria"><span className="icona">🏡</span>Case intere</div>
        <div className="categoria"><span className="icona">🛏️</span>Camere</div>
      </div>

      <div className="grid">
        {strutture.map((s) => (
          <Link href={`/strutture/${s.id}`} key={s.id} className="card-link">
            <div className="card">
              <div className="card-image">
                {s.foto_url ? (
                  <img src={s.foto_url} alt={s.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  '🏠'
                )}
                <button className="heart-btn" onClick={(e) => e.preventDefault()}>🤍</button>
                <div className="badge">Nuovo su Havenest</div>
              </div>
              <div className="card-body">
                <h2>{s.nome}</h2>
                <div className="luogo">{s.luogo}</div>
                <div className="prezzo">{s.prezzo}€/notte</div>
                <div className="descrizione">{s.descrizione}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
