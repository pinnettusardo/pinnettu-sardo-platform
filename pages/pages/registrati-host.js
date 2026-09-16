import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabaseClient';

export default function RegistratiHost() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'host',
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push('/aggiungi-struttura');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Diventa Host - Pinnettu Sardo</title>
      </Head>
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl mx-auto mb-3">
              🏡
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Registrati come Host</h1>
            <p className="text-gray-600 text-sm">Pubblica i tuoi alloggi e gestisci le prenotazioni</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="nome@esempio.it"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Minimo 6 caratteri"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? 'Creazione account...' : 'Inizia come Host'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Vuoi solo viaggiare?{' '}
            <Link href="/registrati-guest" className="text-rose-600 font-medium hover:underline">
              Registrati come Ospite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
