import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabaseClient';

export default function RegistratiGuest() {
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
          role: 'guest',
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Registrati come Ospite - Pinnettu Sardo</title>
      </Head>
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Crea un account Ospite</h1>
            <p className="text-gray-600 text-sm">Trova e prenota i tuoi soggiorni in Sardegna</p>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                placeholder="Minimo 6 caratteri"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 text-white py-3 rounded-xl font-medium hover:bg-rose-700 transition disabled:opacity-50"
            >
              {loading ? 'Registrazione in corso...' : 'Registrati come Ospite'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Sei un proprietario?{' '}
            <Link href="/registrati-host" className="text-rose-600 font-medium hover:underline">
              Registrati come Host
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
