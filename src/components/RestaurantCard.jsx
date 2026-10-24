import { ArrowUpRight, Clock3, Star } from 'lucide-react'
import { formatPrice } from '../utils.js'

export default function RestaurantCard({ restaurant, onMenu }) {
  return (
    <article className="restaurant-card">
      <button className="restaurant-image-wrap" onClick={() => onMenu(restaurant.id)} aria-label={`Explore ${restaurant.name} menu`}>
        <img src={restaurant.image} alt={`${restaurant.name} dining`} loading="lazy" />
        <span className={`open-status ${restaurant.open ? 'open' : ''}`}><i />{restaurant.open ? 'OPEN NOW' : 'OPENS TOMORROW'}</span>
        <span className="restaurant-arrow"><ArrowUpRight size={18} /></span>
      </button>
      <div className="restaurant-card-content">
        <div className="restaurant-heading"><div><h3>{restaurant.name}</h3><span>{restaurant.cuisine}</span></div><span className="restaurant-rating"><Star size={14} fill="currentColor" /> {restaurant.rating.toFixed(1)}</span></div>
        <p>{restaurant.note}</p>
        <div className="restaurant-card-footer"><span><Clock3 size={14} /> {restaurant.time}–{restaurant.time + 8} min</span><span>{formatPrice(restaurant.fee)} delivery</span><button onClick={() => onMenu(restaurant.id)}>View menu</button></div>
      </div>
    </article>
  )
}
