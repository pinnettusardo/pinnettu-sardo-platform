import { supabase } from '../lib/supabaseClient'

export async function getServerSideProps() {
  const { data: strutture } = await supabase.from('strutture').select('*')
  return { props: { strutture: strutture || [] } }
}

export default function Home({ strutture }) {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">🏡 Havenest</div>
        <div className="navbar-right">
          <span className="nav-link">Diventa host</span>
          <button className="icon-btn">🌐</button>
          <div className="user-menu">
            <span>☰</span>
            <div className="user-icon">👤</div>
          </div>
        </div>
      </nav>

      <div className="hero">
        <h1>Trova la tua vacanza perfetta</h1>
        <p>Scopri case e alloggi unici in tutto il mondo, per ogni tipo di viaggio</p>
        <div className="searchbar">
          <input placeholder="Dove vuoi andare?" />
          <button>Cerca</button>
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
