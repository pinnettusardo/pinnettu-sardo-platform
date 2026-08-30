import { supabase } from '../lib/supabaseClient'

export async function getServerSideProps() {
  const { data: strutture } = await supabase.from('strutture').select('*')
  return { props: { strutture: strutture || [] } }
}

export default function Home({ strutture }) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Le nostre strutture</h1>
      <p>Trova e prenota la struttura perfetta per la tua vacanza.</p>
      <div style={{ display: "grid", gap: "20px", marginTop: "30px" }}>
        {strutture.map((s) => (
          <div key={s.id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "20px" }}>
            <h2>{s.nome}</h2>
            <p>{s.luogo}</p>
            <p><strong>{s.prezzo}€/notte</strong></p>
            <p>{s.descrizione}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
