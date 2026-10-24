import { ArrowUpRight, Plus, Star } from 'lucide-react'
import { formatPrice } from '../utils.js'

export default function FoodCard({ food, onAdd, onDetails }) {
  return (
    <article className="food-card">
      <button className="food-image-wrap" onClick={() => onDetails(food)} aria-label={`View details for ${food.name}`}>
        <img src={food.image} alt={food.name} loading="lazy" />
        {food.badge && <span className="food-badge">{food.badge}</span>}
        <span className="food-image-arrow"><ArrowUpRight size={17} /></span>
      </button>
      <div className="food-card-body">
        <div className="food-meta"><span>{food.category}</span><span><Star size={13} fill="currentColor" /> {food.rating.toFixed(1)}</span></div>
        <button className="food-name-button" onClick={() => onDetails(food)}>{food.name}</button>
        <p>{food.description}</p>
        <div className="food-card-bottom"><strong>{formatPrice(food.price)}</strong><button className="add-button" onClick={() => onAdd(food)} aria-label={`Add ${food.name} to bag`}><Plus size={18} /><span>Add</span></button></div>
      </div>
    </article>
  )
}
