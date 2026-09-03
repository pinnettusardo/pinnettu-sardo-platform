import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
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
      </nav>

      <div className="container">
        <h1>Benvenuti a Pinnettu Sardo</h1>
        <p>Il sito è in fase di configurazione.</p>
      </div>
    </div>
  );
}
