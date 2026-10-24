import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, Heart, MapPin, Minus, Plus, Search, ShieldCheck, Star, X } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import FoodCard from './components/FoodCard.jsx'
import RestaurantCard from './components/RestaurantCard.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Footer from './components/Footer.jsx'
import { useCart } from './context/CartContext.jsx'
import { categories, foods, promotions, restaurants, testimonials } from './data.js'
import { calculateDiscount, formatPrice } from './utils.js'

function useRoute() {
  const [route, setRoute] = useState(() => `${window.location.pathname}${window.location.search}`)
  useEffect(() => {
    const onPop = () => setRoute(`${window.location.pathname}${window.location.search}`)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const navigate = (path) => {
    const target = path.startsWith('/') ? path : `/${path}`
    window.history.pushState({}, '', target)
    setRoute(`${window.location.pathname}${window.location.search}`)
    if (!target.includes('#')) window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return [route, navigate]
}

function SectionHeading({ eyebrow, title, detail, action, onAction }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{detail && <p>{detail}</p>}</div>{action && <button className="text-link" onClick={onAction}>{action}<ArrowUpRight size={17} /></button>}</div>
}

function HomePage({ onNavigate, onAdd, onDetails }) {
  const featuredRestaurants = restaurants.slice(0, 3)
  const featuredFoods = foods.slice(0, 4)
  return (
    <main>
      <section className="hero-section" id="top">
        <div className="hero-backdrop" />
        <div className="hero-content">
          <span className="hero-kicker"><i /> THE ART OF EATING WELL <span>—</span> NAIROBI, KENYA</span>
          <h1>Luxury has never<br />tasted <em>this good.</em></h1>
          <p>Discover extraordinary flavours from exceptional kitchens, delivered straight to your door.</p>
          <div className="hero-actions"><button className="button button-gold" onClick={() => onNavigate('/menu')}>Explore the menu <ArrowUpRight size={17} /></button><button className="button button-outline" onClick={() => onNavigate('/restaurants')}>Discover restaurants <ArrowRight size={16} /></button></div>
          <div className="hero-proof"><div className="proof-avatars"><span>W</span><span>A</span><span>D</span><span>+</span></div><p><strong>4.9 / 5</strong><span>Loved around Nairobi</span></p><span className="proof-star"><Star size={14} fill="currentColor" /></span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-image-frame"><img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=90" alt="Gourmet burger with fresh greens and toasted brioche" fetchpriority="high" /></div>
          <div className="hero-image-shade" />
          <div className="hero-food-caption"><span>THE HOUSE CLASSIC</span><strong>A little extraordinary.</strong></div>
          <div className="floating-rating"><span className="rating-icon"><Star size={15} fill="currentColor" /></span><div><strong>4.9 <small>/ 5.0</small></strong><span>from 300+ lovely reviews</span></div></div>
          <div className="floating-delivery"><span className="delivery-icon"><Clock3 size={17} /></span><div><span>AT YOUR DOOR IN</span><strong>28—35 min</strong></div></div>
          <div className="hero-index">01 <span>—</span> 04</div>
        </div>
        <div className="hero-bottom"><span>GOOD FOOD. GOOD FEELING.</span><span>SCROLL TO DISCOVER <ArrowDown size={14} /></span><span>EST. FOR THE MOMENT · 2026</span></div>
      </section>

      <section className="category-section section-pad">
        <div className="section-intro-row"><div><span className="eyebrow">A WORLD OF GOOD TASTE</span><h2>What are you<br /><em>in the mood for?</em></h2></div><p>From the first bite to the last little treat,<br />there’s something worth savouring.</p></div>
        <div className="category-grid">{categories.map((category, index) => <button className={`category-card category-${index + 1}`} key={category.name} onClick={() => onNavigate(`/menu?category=${encodeURIComponent(category.name)}`)}><img src={category.image} alt="" loading="lazy" /><span className="category-overlay" /><span className="category-number">{category.tag}</span><span className="category-emoji">{category.icon}</span><span className="category-label">{category.name}</span><span className="category-explore">EXPLORE <ArrowUpRight size={14} /></span></button>)}</div>
      </section>

      <section className="restaurant-section section-pad">
        <SectionHeading eyebrow="GOOD PEOPLE. GREAT PLATES." title={<>The tables we <em>love.</em></>} detail="A carefully chosen collection of Nairobi’s most loved kitchens." action="All restaurants" onAction={() => onNavigate('/restaurants')} />
        <div className="restaurant-grid">{featuredRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} onMenu={(id) => onNavigate(`/menu?restaurant=${id}`)} />)}</div>
      </section>

      <section className="signature-section section-pad">
        <div className="signature-top"><div><span className="eyebrow">A FEW HOUSE FAVOURITES</span><h2>Made with care.<br /><em>Meant to be savoured.</em></h2></div><p>Real kitchens. Beautiful ingredients.<br />Something special, whenever you are.</p></div>
        <div className="food-grid food-grid-featured">{featuredFoods.map((food) => <FoodCard key={food.id} food={food} onAdd={onAdd} onDetails={onDetails} />)}</div>
        <button className="button button-dark-outline signature-cta" onClick={() => onNavigate('/menu')}>Explore every dish <ArrowRight size={16} /></button>
      </section>

      <section className="offers-section section-pad" id="offers">
        <SectionHeading eyebrow="A LITTLE SOMETHING EXTRA" title={<>Good things come <em>to the table.</em></>} detail="A few thoughtful ways to make an excellent meal even better." />
        <div className="offers-grid">{promotions.map((offer, index) => <article className={`offer-card offer-${index + 1}`} key={offer.code}><img src={offer.image} alt="" loading="lazy" /><div className="offer-shade" /><span className="offer-tag">{offer.accent}</span><div className="offer-copy"><span>THE ÉLITE EDIT</span><h3>{offer.title}</h3><p>{offer.detail}</p><button onClick={() => { navigator.clipboard?.writeText(offer.code); window.dispatchEvent(new CustomEvent('elite-toast', { detail: `${offer.code} copied — use it in your bag.` })) }}>COPY {offer.code} <ArrowUpRight size={14} /></button></div><span className="offer-index">0{index + 1}</span></article>)}</div>
        <p className="offer-disclaimer">Offers are demonstrations. Enter the displayed code in your bag to see eligibility and savings.</p>
      </section>

      <section className="story-section section-pad" id="story">
        <div className="story-image"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85" alt="Beautifully plated seasonal food, thoughtfully prepared" loading="lazy" /><span className="story-image-label">THE BEAUTY IS IN THE DETAILS</span><span className="story-stamp">É<br /><small>EST. 2026</small></span></div>
        <div className="story-copy"><span className="eyebrow">A BETTER WAY TO DINE IN</span><h2>More than a meal.<br /><em>It’s an experience.</em></h2><p>We believe an ordinary evening can become something memorable. So we bring together Nairobi’s most thoughtful kitchens, the dishes they make with love, and the little details that make you feel looked after.</p><p>Good food deserves a beautiful journey — from their kitchen to your table.</p><button className="text-link" onClick={() => onNavigate('/restaurants')}>Meet our kitchens <ArrowUpRight size={17} /></button><div className="story-signature">Made for the moment <span>— Élite Eats</span></div></div>
      </section>

      <section className="testimonial-section section-pad">
        <span className="eyebrow">KIND WORDS, SHARED TABLES</span><h2>A good meal leaves<br /><em>a little feeling.</em></h2>
        <div className="testimonial-grid">{testimonials.map((review) => <article className="testimonial-card" key={review.name}><div className="testimonial-stars">{Array.from({ length: review.rating }, (_, i) => <Star key={i} size={13} fill="currentColor" />)}</div><p>“{review.quote}”</p><div className="review-person"><span>{review.name.charAt(0)}</span><div><strong>{review.name}</strong><small>{review.place} · Demonstration review</small></div></div></article>)}</div>
        <p className="sample-content-note">Customer stories shown for demonstration purposes.</p>
      </section>
      <section className="final-cta"><div className="cta-decoration">É</div><div className="cta-copy"><span className="eyebrow">YOUR NEXT FAVOURITE IS CLOSER THAN YOU THINK</span><h2>Set the table<br /><em>for something lovely.</em></h2><p>Exceptional taste is just a few taps away.</p><button className="button button-gold" onClick={() => onNavigate('/menu')}>Find your next favourite <ArrowUpRight size={17} /></button></div><div className="cta-image"><img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85" alt="Fresh, colourful food ready to enjoy" loading="lazy" /></div></section>
    </main>
  )
}

function RestaurantsPage({ onNavigate }) {
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('All cuisines')
  const [minRating, setMinRating] = useState('Any rating')
  const [maxTime, setMaxTime] = useState('Any time')
  const [openOnly, setOpenOnly] = useState(false)
  const [sort, setSort] = useState('popular')
  const cuisineOptions = ['All cuisines', ...new Set(restaurants.map((item) => item.cuisine.split(' • ')[0].split(' •')[0]))]
  const filtered = useMemo(() => restaurants.filter((item) => {
    const query = search.toLowerCase()
    return (!query || `${item.name} ${item.cuisine} ${item.note}`.toLowerCase().includes(query))
      && (cuisine === 'All cuisines' || item.cuisine.toLowerCase().includes(cuisine.toLowerCase()))
      && (minRating === 'Any rating' || item.rating >= Number(minRating))
      && (maxTime === 'Any time' || item.time <= Number(maxTime))
      && (!openOnly || item.open)
  }).sort((a, b) => sort === 'rating' ? b.rating - a.rating : sort === 'time' ? a.time - b.time : b.popularity - a.popularity), [search, cuisine, minRating, maxTime, openOnly, sort])
  return <main className="listing-page"><div className="page-masthead restaurant-masthead"><span className="eyebrow">THE ÉLITE TABLE · NAIROBI</span><h1>Good people.<br /><em>Great kitchens.</em></h1><p>Meet the restaurants making every meal feel like an occasion.</p><div className="masthead-aside">06 CURATED KITCHENS<br /><span>LOCAL · LOVED · EXCEPTIONAL</span></div></div>
    <div className="listing-content"><div className="listing-toolbar"><label className="search-field"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a restaurant or cuisine..." aria-label="Search restaurants" /></label><label className="filter-select"><span>CUISINE</span><select value={cuisine} onChange={(event) => setCuisine(event.target.value)}>{cuisineOptions.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={14} /></label><label className="filter-select"><span>RATING</span><select value={minRating} onChange={(event) => setMinRating(event.target.value)}><option>Any rating</option><option value="4.9">4.9 & up</option><option value="4.8">4.8 & up</option><option value="4.7">4.7 & up</option></select><ChevronDown size={14} /></label><label className="filter-select"><span>DELIVERY</span><select value={maxTime} onChange={(event) => setMaxTime(event.target.value)}><option value="Any time">Any time</option><option value="25">Under 25 min</option><option value="30">Under 30 min</option><option value="35">Under 35 min</option></select><ChevronDown size={14} /></label><label className="open-filter"><input type="checkbox" checked={openOnly} onChange={(event) => setOpenOnly(event.target.checked)} /><span className="fake-check"><Check size={12} /></span> Open now</label><label className="sort-select"><span>SORT</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Most loved</option><option value="rating">Top rated</option><option value="time">Quickest</option></select></label></div>
      <div className="result-count"><span>{filtered.length} {filtered.length === 1 ? 'kitchen' : 'kitchens'} to discover</span><span>CURATED FOR YOU</span></div>
      {filtered.length ? <div className="restaurant-grid listing-grid">{filtered.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} onMenu={(id) => onNavigate(`/menu?restaurant=${id}`)} />)}</div> : <div className="empty-results"><span>É</span><h2>Nothing on the table just yet.</h2><p>Try broadening your search or changing your filters.</p><button className="button button-dark-outline" onClick={() => { setSearch(''); setCuisine('All cuisines'); setMinRating('Any rating'); setMaxTime('Any time'); setOpenOnly(false) }}>Clear filters</button></div>}
    </div></main>
}

function MenuPage({ onAdd, onDetails, onNavigate, initialSearch }) {
  const params = new URLSearchParams(window.location.search)
  const [search, setSearch] = useState(initialSearch || '')
  const [restaurant, setRestaurant] = useState(params.get('restaurant') || 'all')
  const [category, setCategory] = useState(params.get('category') || 'All dishes')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('popular')
  const [priceError, setPriceError] = useState('')
  const selectedRestaurant = restaurants.find((item) => item.id === restaurant)
  const filtered = useMemo(() => foods.filter((food) => {
    const query = search.toLowerCase()
    return (!query || `${food.name} ${food.category} ${food.restaurant} ${food.description}`.toLowerCase().includes(query))
      && (restaurant === 'all' || food.restaurantId === restaurant)
      && (category === 'All dishes' || food.category === category)
      && (minPrice === '' || food.price >= Number(minPrice))
      && (maxPrice === '' || food.price <= Number(maxPrice))
  }).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'rating' ? b.rating - a.rating : b.popularity - a.popularity), [search, restaurant, category, minPrice, maxPrice, sort])
  const updatePrice = (setter, value) => {
    setter(value)
    setPriceError('')
  }
  const validateRange = () => {
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) setPriceError('Minimum price cannot be higher than maximum price.')
    else setPriceError('')
  }
  return <main className="listing-page menu-page"><div className="page-masthead menu-masthead"><span className="eyebrow">SOMETHING WORTH SAVOURING</span><h1>{selectedRestaurant ? <>At the table<br /><em>of {selectedRestaurant.name}.</em></> : <>The menu.<br /><em>Made for the moment.</em></>}</h1><p>Beautifully prepared by Nairobi’s most thoughtful kitchens.</p><div className="masthead-aside">12 HOUSE FAVOURITES<br /><span>PREPARED FRESH · DELIVERED WITH CARE</span></div></div>
    <div className="listing-content"><div className="menu-filters"><label className="search-field"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a dish, an ingredient..." aria-label="Search food menu" /></label><label className="filter-select"><span>KITCHEN</span><select value={restaurant} onChange={(event) => setRestaurant(event.target.value)}><option value="all">All kitchens</option>{restaurants.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select><ChevronDown size={14} /></label><label className="filter-select"><span>COLLECTION</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All dishes</option>{categories.map((item) => <option key={item.name}>{item.name}</option>)}</select><ChevronDown size={14} /></label><div className="price-filter"><span>PRICE · KSH</span><div><input type="number" min="0" value={minPrice} onChange={(event) => updatePrice(setMinPrice, event.target.value)} onBlur={validateRange} placeholder="Min" aria-label="Minimum price" /><i>—</i><input type="number" min="0" value={maxPrice} onChange={(event) => updatePrice(setMaxPrice, event.target.value)} onBlur={validateRange} placeholder="Max" aria-label="Maximum price" /></div></div><label className="sort-select"><span>SORT BY</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Most loved</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div>{priceError && <p className="inline-error filter-error">{priceError}</p>}
      <div className="menu-category-pills"><button className={category === 'All dishes' ? 'selected' : ''} onClick={() => setCategory('All dishes')}>All dishes <span>{foods.length}</span></button>{categories.map((item) => <button key={item.name} className={category === item.name ? 'selected' : ''} onClick={() => setCategory(item.name)}>{item.name}<span>{foods.filter((food) => food.category === item.name).length}</span></button>)}</div>
      <div className="result-count"><span>{filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'} to fall for</span><span>{selectedRestaurant ? selectedRestaurant.name.toUpperCase() : 'A TASTE OF NAIROBI'}</span></div>
      {filtered.length ? <div className="food-grid listing-food-grid">{filtered.map((food) => <FoodCard key={food.id} food={food} onAdd={onAdd} onDetails={onDetails} />)}</div> : <div className="empty-results"><span>É</span><h2>Nothing quite like that on today’s menu.</h2><p>Try another search or open the table to all dishes.</p><button className="button button-dark-outline" onClick={() => { setSearch(''); setRestaurant('all'); setCategory('All dishes'); setMinPrice(''); setMaxPrice('') }}>Clear filters</button></div>}
      <div className="menu-note"><ShieldCheck size={17} /><span>Every dish is prepared fresh by its restaurant. Sample dishes and prices are for demonstration.</span></div>
    </div></main>
}

function CheckoutPage({ onNavigate, onPlaceOrder }) {
  const { items, subtotal, promoCode } = useCart()
  const delivery = items.length ? 220 : 0
  const discount = calculateDiscount(promoCode, subtotal, delivery)
  const total = Math.max(0, subtotal + delivery - discount)
  const [values, setValues] = useState({ name: '', phone: '', email: '', address: '', estate: '', city: 'Nairobi', instructions: '', payment: 'Cash on delivery', contactless: false })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const validate = (form) => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your full name.'
    if (!/^\+?[\d\s()-]{9,16}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number, including your area code.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (!form.address.trim()) next.address = 'Please enter your delivery address.'
    if (!form.estate.trim()) next.estate = 'Please add your estate or neighbourhood.'
    if (!form.city.trim()) next.city = 'Please enter your city or town.'
    return next
  }
  const update = (field, value) => {
    const next = { ...values, [field]: value }
    setValues(next)
    if (touched[field]) setErrors(validate(next))
  }
  const blur = (field) => {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors(validate(values))
  }
  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({ name: true, phone: true, email: true, address: true, estate: true, city: true })
    if (!items.length) {
      onNavigate('/menu')
      return
    }
    if (Object.keys(nextErrors).length) {
      document.querySelector('.field-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    onPlaceOrder({ number: `EE-${Date.now().toString().slice(-8)}`, customer: { ...values }, items: items.map((item) => ({ ...item })), subtotal, delivery, discount, promoCode, total, createdAt: new Date().toISOString() })
  }
  const field = (name, label, type = 'text', placeholder = '') => <label className={`form-field ${errors[name] ? 'has-error' : ''}`}><span>{label} <i>*</i></span><input name={name} type={type} value={values[name]} onChange={(event) => update(name, event.target.value)} onBlur={() => blur(name)} placeholder={placeholder} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <small className="field-error" id={`${name}-error`}>{errors[name]}</small>}</label>
  if (!items.length) return <main className="checkout-page"><div className="empty-results"><span>É</span><h2>Your bag is waiting for something lovely.</h2><p>Add a dish to begin your order.</p><button className="button button-gold" onClick={() => onNavigate('/menu')}>Explore the menu <ArrowRight size={16} /></button></div></main>
  return <main className="checkout-page"><div className="checkout-masthead"><button className="text-link" onClick={() => onNavigate('/menu')}>← Continue browsing</button><span className="eyebrow">A FEW DETAILS, THEN THE GOOD PART</span><h1>Let’s make this<br /><em>moment yours.</em></h1><p>This is a demonstration checkout. No real payment is collected.</p></div>
    <form className="checkout-layout" onSubmit={submit} noValidate>
      <div className="checkout-form">
        <section className="form-section"><div className="form-section-heading"><span>01</span><div><h2>Who are we bringing it to?</h2><p>Your details, only for this demonstration order.</p></div></div><div className="form-grid">{field('name', 'Full name', 'text', 'e.g. Amina Kamau')}{field('phone', 'Phone number', 'tel', '+254 7XX XXX XXX')}{field('email', 'Email address', 'email', 'you@example.com')}</div></section>
        <section className="form-section"><div className="form-section-heading"><span>02</span><div><h2>Where should it find you?</h2><p>Serving Nairobi and nearby neighbourhoods.</p></div></div><div className="form-grid">{field('address', 'Delivery address', 'text', 'Building, street, house or apartment')}{field('estate', 'Estate / neighbourhood', 'text', 'e.g. Kilimani, Lavington')}{field('city', 'City / town', 'text', 'Nairobi')}</div><label className="form-field"><span>Delivery notes <small>OPTIONAL</small></span><textarea value={values.instructions} onChange={(event) => update('instructions', event.target.value)} placeholder="Anything that will help us find you..." rows="3" /></label><label className="contactless-option"><input type="checkbox" checked={values.contactless} onChange={(event) => update('contactless', event.target.checked)} /><span className="fake-check"><Check size={12} /></span><span><strong>Leave at my door</strong><small>Contactless drop-off, if preferred.</small></span></label></section>
        <section className="form-section payment-section"><div className="form-section-heading"><span>03</span><div><h2>How would you like to pay?</h2><p>Demonstration payment only — no payment credentials collected.</p></div></div><div className="payment-options">{['Cash on delivery', 'M-Pesa · demonstration'].map((method) => <label key={method} className={values.payment === method ? 'payment-selected' : ''}><input type="radio" name="payment" value={method} checked={values.payment === method} onChange={(event) => update('payment', event.target.value)} /><span className="radio-mark" /><span><strong>{method}</strong><small>{method.startsWith('Cash') ? 'Pay the courier when your meal arrives.' : 'Simulated option. No PIN or payment details required.'}</small></span></label>)}</div></section>
        <div className="checkout-assurance"><ShieldCheck size={17} /><span>Your information is used only to prepare this sample order. No real restaurant or courier service is connected.</span></div>
      </div>
      <aside className="order-summary"><span className="eyebrow">A FINAL LOOK</span><h2>Your order <sup>{items.reduce((count, item) => count + item.quantity, 0)}</sup></h2><div className="summary-items">{items.map((item) => <div className="summary-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>{item.quantity} × {formatPrice(item.price)}</small></div><b>{formatPrice(item.quantity * item.price)}</b></div>)}</div><div className="checkout-totals"><div><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div><div><span>Delivery · flat rate</span><b>{formatPrice(delivery)}</b></div>{discount > 0 && <div className="discount-row"><span>Offer · {promoCode}</span><b>− {formatPrice(discount)}</b></div>}<div className="summary-total"><span>Total</span><b>{formatPrice(total)}</b></div></div><p className="checkout-delivery-note"><MapPin size={14} /> Delivery to {values.estate || 'your neighbourhood'}, {values.city || 'Nairobi'}</p><button className="button button-gold place-order-button" type="submit">Place demonstration order <ArrowRight size={17} /></button><small className="secure-note"><ShieldCheck size={13} /> No real payment will be taken</small></aside>
    </form></main>
}

function ConfirmationPage({ order, onNavigate }) {
  if (!order) return <main className="confirmation-page"><div className="confirmation-card"><span className="success-seal"><Check size={30} /></span><span className="eyebrow">A DEMONSTRATION ORDER</span><h1>Your table is<br /><em>beautifully set.</em></h1><p>There isn’t a live restaurant or courier connected, so no real order was placed. Here’s a preview of the confirmation experience.</p><button className="button button-gold" onClick={() => onNavigate('/menu')}>Continue exploring <ArrowRight size={16} /></button></div></main>
  const { customer, items, number, subtotal, delivery, discount, total, payment, createdAt, promoCode: code } = order
  return <main className="confirmation-page"><div className="confirmation-card"><div className="success-orbit"><span className="success-seal"><Check size={30} /></span><span /><span /></div><span className="eyebrow">A DEMONSTRATION ORDER · {new Date(createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</span><h1>Something lovely<br /><em>is on its way.</em></h1><p>Your sample order has been recorded for the demonstration. No restaurant or courier has been notified.</p><div className="order-number"><span>YOUR DEMO REFERENCE</span><strong>{number}</strong><button onClick={() => { navigator.clipboard?.writeText(number); window.dispatchEvent(new CustomEvent('elite-toast', { detail: 'Order reference copied.' })) }}>COPY</button></div><div className="confirmation-details"><section><span className="eyebrow">DELIVERING TO</span><strong>{customer.name}</strong><p>{customer.address}<br />{customer.estate}, {customer.city}<br />{customer.phone}</p>{customer.instructions && <small>Note: {customer.instructions}</small>}</section><section><span className="eyebrow">PAYMENT</span><strong>{customer.payment}</strong><p>Payment is not collected in this demonstration.</p></section></div><div className="confirmation-items"><span className="eyebrow">SOMETHING TO SAVOUR</span>{items.map((item) => <div key={item.id}><span>{item.quantity} × {item.name}</span><strong>{formatPrice(item.price * item.quantity)}</strong></div>)}</div><div className="confirmation-totals"><div><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div><div><span>Delivery</span><b>{formatPrice(delivery)}</b></div>{discount > 0 && <div><span>Offer · {code}</span><b>− {formatPrice(discount)}</b></div>}<div className="summary-total"><span>Demonstration total</span><b>{formatPrice(total)}</b></div></div><div className="timeline"><span className="eyebrow">A SAMPLE DELIVERY JOURNEY</span><div className="timeline-steps"><span className="timeline-active"><i><Check size={13} /></i><b>Order received</b><small>Just now</small></span><span><i>02</i><b>Thoughtfully prepared</b><small>About 20–30 min</small></span><span><i>03</i><b>At your door</b><small>About 30–45 min</small></span></div></div><div className="confirmation-actions"><button className="button button-gold" onClick={() => onNavigate('/menu')}>Explore more dishes <ArrowRight size={16} /></button><button className="text-link" onClick={() => onNavigate('/')}>Return home <ArrowUpRight size={16} /></button></div></div></main>
}

function FoodModal({ food, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1)
  useEffect(() => { setQuantity(1) }, [food?.id])
  if (!food) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="food-modal" role="dialog" aria-modal="true" aria-labelledby="food-modal-title"><button className="modal-close icon-button" onClick={onClose} aria-label="Close dish details"><X /></button><img src={food.image} alt={food.name} /><div className="food-modal-copy"><span className="eyebrow">{food.restaurant} · {food.category}</span><h2 id="food-modal-title">{food.name}</h2><p>{food.description}</p><div className="modal-rating"><Star size={15} fill="currentColor" /> {food.rating.toFixed(1)} <span>·</span> {food.badge || 'A house favourite'}</div><div className="modal-add-row"><div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={14} /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus size={14} /></button></div><button className="button button-gold" onClick={() => { for (let i = 0; i < quantity; i += 1) onAdd(food); onClose() }}>Add to bag · {formatPrice(food.price * quantity)} <ArrowRight size={16} /></button></div></div></section></div>
}

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return undefined
    const timer = window.setTimeout(onClose, 2800)
    return () => window.clearTimeout(timer)
  }, [message, onClose])
  if (!message) return null
  return <div className="toast-message" role="status"><span><Check size={15} /></span>{message}<button onClick={onClose} aria-label="Dismiss notification"><X size={15} /></button></div>
}

export default function App() {
  const [route, navigate] = useRoute()
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedFood, setSelectedFood] = useState(null)
  const [order, setOrder] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const { count, addItem, notice, setNotice, clearCart } = useCart()
  const path = route.split('?')[0]

  useEffect(() => {
    const handleToast = (event) => setToastMessage(event.detail)
    window.addEventListener('elite-toast', handleToast)
    return () => window.removeEventListener('elite-toast', handleToast)
  }, [])
  useEffect(() => { if (notice) setToastMessage(notice) }, [notice])
  const dismissToast = () => { setToastMessage(''); setNotice('') }
  const handleSearch = (query) => { setSearchQuery(query); navigate(`/menu${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ''}`) }
  const placeOrder = (nextOrder) => { setOrder(nextOrder); clearCart(); navigate('/order-confirmation') }

  let page
  if (path === '/restaurants') page = <RestaurantsPage onNavigate={navigate} />
  else if (path === '/menu') page = <MenuPage key={route} onAdd={addItem} onDetails={setSelectedFood} onNavigate={navigate} initialSearch={new URLSearchParams(route.split('?')[1] || '').get('search') || searchQuery} />
  else if (path === '/checkout') page = <CheckoutPage onNavigate={navigate} onPlaceOrder={placeOrder} />
  else if (path === '/order-confirmation') page = <ConfirmationPage order={order} onNavigate={navigate} />
  else page = <HomePage onNavigate={navigate} onAdd={addItem} onDetails={setSelectedFood} />

  useEffect(() => {
    const titles = { '/': 'ÉLITE EATS — Exceptional Taste, Delivered Beautifully', '/restaurants': 'Restaurants — ÉLITE EATS', '/menu': 'The Menu — ÉLITE EATS', '/checkout': 'Checkout — ÉLITE EATS', '/order-confirmation': 'Order Confirmation — ÉLITE EATS' }
    document.title = titles[path] || titles['/']
  }, [path])

  return <div className="app-shell"><Navbar route={path} count={count} onNavigate={navigate} onCart={() => setCartOpen(true)} onSearch={handleSearch} />{page}<Footer onNavigate={navigate} /><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onNavigate={navigate} /><FoodModal food={selectedFood} onClose={() => setSelectedFood(null)} onAdd={addItem} /><Toast message={toastMessage} onClose={dismissToast} /></div>
}
