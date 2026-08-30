import { supabase } from '../lib/supabaseClient'

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
            <path d="M50 92 C50 92 6 62 6 32 C6 14 22 4 38 12 C45 16 50 24 50 24 C50 24 55 16 62 12 C78 4 94 14 94 32 C94 62 50 92 50 92 Z" fill="#d9532b"/>
            <path d="M50 34 L70 62 L30 62 Z" fill="#ffffff"/>
            <rect x="44" y="50" width="12" height="14" fill="#d9532b"/>
          </svg>
          Havenest
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
          <div key={s.id} className="card">
            <div className="card-image">
              {s.foto_url ? (
                <img src={s.foto_url} alt={s.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                '🏠'
              )}
              <button className="heart-btn">🤍</button>
              <div className="badge">Nuovo su Havenest</div>
            </div>
            <div className="card-body">
              <h2>{s.nome}</h2>
              <div className="luogo">{s.luogo}</div>
              <div className="prezzo">{s.prezzo}€/notte</div>
              <div className="descrizione">{s.descrizione}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
