export const formatPrice = (amount) => `KSh ${Math.round(amount).toLocaleString('en-KE')}`

export const promotionsByCode = {
  FIRSTBITE: { type: 'percent', value: 10, minimum: 2000 },
  GOLDENHOUR: { type: 'fixed', value: 300, minimum: 3500 },
  TABLEFOR2: { type: 'delivery', value: 1, minimum: 2500 },
}

export const calculateDiscount = (code, subtotal, deliveryFee) => {
  const promotion = promotionsByCode[code]
  if (!promotion || subtotal < promotion.minimum) return 0
  if (promotion.type === 'percent') return Math.round(subtotal * promotion.value / 100)
  if (promotion.type === 'fixed') return promotion.value
  return deliveryFee
}
