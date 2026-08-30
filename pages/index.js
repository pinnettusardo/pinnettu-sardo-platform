import { supabase } from '../lib/supabaseClient'

export async function getServerSideProps() {
  const { data: strutture } = await supabase.from('strutture').select('*')
  return { props: { strutture: strutture || [] } }
}

export default function Home({ strutture }) {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">🏝️ Pinnettu Sardo</div>
        <button>Accedi</button>
      </nav>

      <div className="hero">
        <h1>Trova la tua vacanza perfetta</h1>
        <p>Case e strutture in Sardegna e non solo</p>
        <div className="searchbar">
          <input placeholder="Dove vuoi andare?" />
          <button>Cerca</button>
        </div>
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
