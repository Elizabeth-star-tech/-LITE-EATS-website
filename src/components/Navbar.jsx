import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Search, ShoppingBag, X } from 'lucide-react'

const links = [
  ['Home', '/'],
  ['Restaurants', '/restaurants'],
  ['Menu', '/menu'],
  ['Offers', '/#offers'],
  ['Our Story', '/#story'],
  ['Contact', '/#contact'],
]

export default function Navbar({ route, count, onNavigate, onCart, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const visit = (event, href) => {
    event.preventDefault()
    setMenuOpen(false)
    if (href.includes('#')) {
      const [path, id] = href.split('#')
      if (path && path !== '/') onNavigate(path)
      else if (route !== '/') onNavigate('/')
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
    } else onNavigate(href)
  }

  const submitSearch = (event) => {
    event.preventDefault()
    onSearch(query)
    setSearchOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <button className="brand-mark" type="button" onClick={() => onNavigate('/')} aria-label="Élite Eats home">
          <span className="brand-symbol">É</span>
          <span className="brand-type"><strong>ÉLITE EATS</strong><small>DINING, DELIVERED</small></span>
        </button>
        <nav className={`desktop-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={label} href={href} className={route === href ? 'active' : ''} onClick={(event) => visit(event, href)}>{label}</a>)}
          <button className="mobile-order-button" onClick={() => { setMenuOpen(false); onNavigate('/menu') }}>Order now <ArrowUpRight size={16} /></button>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-toggle" aria-label="Search food" onClick={() => setSearchOpen((open) => !open)}>{searchOpen ? <X size={18} /> : <Search size={18} />}</button>
          <button className="icon-button bag-button" aria-label={`Shopping bag, ${count} items`} onClick={onCart}><ShoppingBag size={18} /><span>Bag</span><i>{count}</i></button>
          <button className="header-order-button" onClick={() => onNavigate('/menu')}>Order now <ArrowUpRight size={15} /></button>
          <button className="icon-button mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {searchOpen && <form className="header-search" onSubmit={submitSearch}><Search size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes, kitchens, flavours..." aria-label="Search dishes and restaurants" /><button type="submit">Search <ArrowUpRight size={15} /></button></form>}
    </header>
  )
}
