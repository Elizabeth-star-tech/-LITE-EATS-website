import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const subscribe = (event) => {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      setSubscribed(false)
      return
    }
    setError('')
    setSubscribed(true)
  }

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top">
        <div className="footer-brand"><button className="brand-mark footer-brand-mark" onClick={() => onNavigate('/')}><span className="brand-symbol">É</span><span className="brand-type"><strong>ÉLITE EATS</strong><small>DINING, DELIVERED</small></span></button><p>Exceptional taste, delivered beautifully. A more considered way to dine in.</p><div className="social-links"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="mailto:hello@eliteeats.example" aria-label="Email us"><Mail size={17} /></a></div></div>
        <div className="footer-column"><h3>EXPLORE</h3><button onClick={() => onNavigate('/')}>Our home</button><button onClick={() => onNavigate('/restaurants')}>Restaurants</button><button onClick={() => onNavigate('/menu')}>The menu</button><button onClick={() => onNavigate('/#offers')}>Offers & moments</button></div>
        <div className="footer-column"><h3>HERE TO HELP</h3><a href="mailto:hello@eliteeats.example">Get in touch</a><a href="tel:+254700000000">+254 700 000 000 <small>(demo)</small></a><span><MapPin size={14} /> Nairobi, Kenya</span><a href="mailto:hello@eliteeats.example">Privacy & terms</a></div>
        <div className="footer-newsletter"><span className="eyebrow">A NOTE FROM US</span><h3>Good taste.<br /><em>In your inbox.</em></h3><p>Invitations, new tables and the occasional little treat.</p><form onSubmit={subscribe}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit" aria-label="Subscribe to newsletter"><ArrowUpRight size={18} /></button></form>{error && <p className="newsletter-message error-text">{error}</p>}{subscribed && <p className="newsletter-message">Thank you — you’re on the list.</p>}</div>
      </div>
      <div className="footer-bottom"><span>© 2026 ÉLITE EATS. MADE FOR THE MOMENT.</span><span className="demo-note">A dining demonstration · No live restaurant or courier integration</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  )
}
