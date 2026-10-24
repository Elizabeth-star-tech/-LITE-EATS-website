import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'elite-eats-cart'

function readCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)
  const [promoCode, setPromoCode] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const addItem = (food) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === food.id)
      return existing
        ? current.map((item) => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...food, quantity: 1 }]
    })
    setNotice(`${food.name} added to your bag`)
  }

  const changeQuantity = (id, delta) => setItems((current) => current
    .map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id))
  const clearCart = () => { setItems([]); setPromoCode('') }

  const value = useMemo(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    promoCode,
    setPromoCode,
    notice,
    setNotice,
    addItem,
    changeQuantity,
    removeItem,
    clearCart,
  }), [items, promoCode, notice])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
