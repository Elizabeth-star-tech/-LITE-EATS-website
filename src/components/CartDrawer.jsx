import { useState } from 'react'
import { ArrowLeft, ArrowRight, Minus, Plus, Tag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { calculateDiscount, formatPrice, promotionsByCode } from '../utils.js'

export default function CartDrawer({ open, onClose, onNavigate }) {
  const { items, subtotal, promoCode, setPromoCode, changeQuantity, removeItem, clearCart, setNotice } = useCart()
  const [codeInput, setCodeInput] = useState(promoCode)
  const [promoMessage, setPromoMessage] = useState('')
  const delivery = items.length ? 220 : 0
  const discount = calculateDiscount(promoCode, subtotal, delivery)

  const applyCode = (event) => {
    event.preventDefault()
    const candidate = codeInput.trim().toUpperCase()
    if (!promotionsByCode[candidate]) {
      setPromoMessage('That code is not recognised. Try FIRSTBITE, GOLDENHOUR or TABLEFOR2.')
      return
    }
    if (subtotal < promotionsByCode[candidate].minimum) {
      setPromoMessage(`Add ${formatPrice(promotionsByCode[candidate].minimum - subtotal)} more to use this offer.`)
      return
    }
    setPromoCode(candidate)
    setPromoMessage(`${candidate} applied — your offer is reflected below.`)
  }

  return (
    <>
      <button className={`drawer-scrim ${open ? 'visible' : ''}`} aria-label="Close shopping bag" onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'drawer-open' : ''}`} aria-hidden={!open} aria-label="Shopping bag">
        <div className="drawer-header"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your bag <sup>{items.reduce((total, item) => total + item.quantity, 0)}</sup></h2></div><button className="icon-button" onClick={onClose} aria-label="Close bag"><X /></button></div>
        {items.length ? <>
          <div className="cart-items">
            {items.map((item) => <div className="cart-line" key={item.id}>
              <img src={item.image} alt="" />
              <div className="cart-line-info"><span>{item.restaurant}</span><strong>{item.name}</strong><b>{formatPrice(item.price)}</b><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}><Plus size={13} /></button></div></div>
              <button className="remove-line" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={16} /></button>
            </div>)}
          </div>
          <button className="text-action clear-cart" onClick={() => { clearCart(); setNotice('Your bag has been cleared') }}>Clear your bag</button>
          <form className="promo-form" onSubmit={applyCode}><label htmlFor="promo-code"><Tag size={15} /> PROMO CODE</label><div><input id="promo-code" value={codeInput} onChange={(event) => setCodeInput(event.target.value)} placeholder="Enter your code" /><button type="submit">{promoCode ? 'Update' : 'Apply'}</button></div>{promoMessage && <p className={promoCode && promoCode === codeInput.toUpperCase() ? 'success-message' : 'inline-error'}>{promoMessage}</p>}{promoCode && <button type="button" className="text-action remove-promo" onClick={() => { setPromoCode(''); setPromoMessage('Offer removed.') }}>Remove {promoCode}</button>}</form>
          <div className="cart-summary"><div><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div><div><span>Delivery <small> · flat rate</small></span><b>{formatPrice(delivery)}</b></div>{discount > 0 && <div className="discount-row"><span>Offer <small> · {promoCode}</small></span><b>− {formatPrice(discount)}</b></div>}<div className="summary-total"><span>Total</span><b>{formatPrice(Math.max(0, subtotal + delivery - discount))}</b></div><p>Delivery is a flat KSh 220. Offers apply at the minimum spend shown in each promotion.</p></div>
          <button className="button button-gold checkout-button" onClick={() => { onClose(); onNavigate('/checkout') }}>Continue to checkout <ArrowRight size={17} /></button>
          <button className="continue-shopping" onClick={onClose}><ArrowLeft size={15} /> Keep exploring</button>
        </> : <div className="empty-bag"><span className="empty-bag-icon"><span>É</span></span><h3>A beautiful meal<br />awaits.</h3><p>Your bag is taking a little breather. Discover something worth savouring.</p><button className="button button-gold" onClick={() => { onClose(); onNavigate('/menu') }}>Explore the menu <ArrowRight size={16} /></button></div>}
      </aside>
    </>
  )
}
