const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const categories = [
  { name: 'Gourmet Burgers', tag: '01 / HANDCRAFTED', image: photo('photo-1568901346375-23c9450c58cd'), icon: '🍔' },
  { name: 'Artisan Pizza', tag: '02 / WOOD-FIRED', image: photo('photo-1579751626657-72bc17010498'), icon: '🍕' },
  { name: 'Fine Dining', tag: '03 / CHEF’S TABLE', image: photo('photo-1547592180-85f173990554'), icon: '🍽️' },
  { name: 'Sushi & Asian Cuisine', tag: '04 / FRESH DAILY', image: photo('photo-1579871494447-9811cf80d66c'), icon: '🍣' },
  { name: 'Desserts', tag: '05 / A LITTLE INDULGENCE', image: photo('photo-1551024506-0bccd828d307'), icon: '🍰' },
  { name: 'Healthy Meals', tag: '06 / FEEL-GOOD FOOD', image: photo('photo-1512621776951-a57141f2eefd'), icon: '🥗' },
  { name: 'Premium Beverages', tag: '07 / RAISE A GLASS', image: photo('photo-1513558161293-cdaf765edfd7'), icon: '🥂' },
]

export const restaurants = [
  { id: 'savannah', name: 'Savannah Table', cuisine: 'Modern African', rating: 4.9, reviews: 328, time: 28, fee: 180, popularity: 98, open: true, image: photo('photo-1555939594-58d7cb561ad1'), note: 'A contemporary celebration of East African flavour.' },
  { id: 'atelier', name: 'Atelier No. 8', cuisine: 'French • European', rating: 4.8, reviews: 214, time: 35, fee: 220, popularity: 92, open: true, image: photo('photo-1517248135467-4c7edcad34c4'), note: 'Parisian craft, made for a Nairobi evening.' },
  { id: 'sora', name: 'Sora House', cuisine: 'Japanese • Sushi', rating: 4.9, reviews: 186, time: 32, fee: 200, popularity: 96, open: true, image: photo('photo-1579871494447-9811cf80d66c'), note: 'Thoughtful Japanese dining, beautifully prepared.' },
  { id: 'ember', name: 'Ember & Crust', cuisine: 'Italian • Pizza', rating: 4.7, reviews: 301, time: 26, fee: 150, popularity: 89, open: true, image: photo('photo-1579751626657-72bc17010498'), note: 'Slow-fermented dough and a proper wood-fired edge.' },
  { id: 'garden', name: 'The Garden Room', cuisine: 'Healthy • Mediterranean', rating: 4.8, reviews: 143, time: 24, fee: 160, popularity: 86, open: true, image: photo('photo-1512621776951-a57141f2eefd'), note: 'Seasonal, vibrant plates with ingredients in focus.' },
  { id: 'sugar', name: 'Sugar & Silk', cuisine: 'Desserts • Bakery', rating: 4.6, reviews: 97, time: 22, fee: 140, popularity: 81, open: false, image: photo('photo-1551024506-0bccd828d307'), note: 'Small-batch patisserie for the sweeter moments.' },
]

export const foods = [
  { id: 'savannah-burger', name: 'The Nairobi Classic', category: 'Gourmet Burgers', restaurantId: 'savannah', restaurant: 'Savannah Table', description: 'Dry-aged beef, smoked cheddar, tomato jam, crisp lettuce, toasted brioche.', price: 1450, rating: 4.9, popularity: 98, badge: 'BESTSELLER', image: photo('photo-1568901346375-23c9450c58cd'), vegetarian: false, spicy: false },
  { id: 'truffle-pasta', name: 'Wild Mushroom Tagliatelle', category: 'Fine Dining', restaurantId: 'atelier', restaurant: 'Atelier No. 8', description: 'Hand-cut pasta, forest mushrooms, aged parmesan, a whisper of truffle.', price: 1850, rating: 4.8, popularity: 94, badge: 'CHEF’S PICK', image: photo('photo-1473093295043-cdd812d0e601'), vegetarian: true, spicy: false },
  { id: 'sora-roll', name: 'Golden Hour Roll', category: 'Sushi & Asian Cuisine', restaurantId: 'sora', restaurant: 'Sora House', description: 'Salmon, avocado and cucumber, topped with a delicate yuzu glaze.', price: 1680, rating: 4.9, popularity: 97, badge: 'FRESH DAILY', image: photo('photo-1579871494447-9811cf80d66c'), vegetarian: false, spicy: false },
  { id: 'margherita', name: 'Burrata Margherita', category: 'Artisan Pizza', restaurantId: 'ember', restaurant: 'Ember & Crust', description: 'San Marzano tomato, creamy burrata, basil, extra-virgin olive oil.', price: 1550, rating: 4.8, popularity: 91, badge: '', image: photo('photo-1574071318508-1cdbab80d002'), vegetarian: true, spicy: false },
  { id: 'salmon-bowl', name: 'The Muthaiga Bowl', category: 'Healthy Meals', restaurantId: 'garden', restaurant: 'The Garden Room', description: 'Miso-glazed salmon, avocado, edamame, brown rice, sesame greens.', price: 1720, rating: 4.8, popularity: 89, badge: 'FEEL GOOD', image: photo('photo-1512621776951-a57141f2eefd'), vegetarian: false, spicy: false },
  { id: 'chocolate-tart', name: 'Midnight Chocolate Tart', category: 'Desserts', restaurantId: 'sugar', restaurant: 'Sugar & Silk', description: 'Silky 70% chocolate crémeux, buttery pastry, sea-salt praline.', price: 780, rating: 4.7, popularity: 85, badge: 'A LITTLE LUXURY', image: photo('photo-1578985545062-69928b1d9587'), vegetarian: true, spicy: false },
  { id: 'peri-peri', name: 'Charred Peri-Peri Chicken', category: 'Fine Dining', restaurantId: 'savannah', restaurant: 'Savannah Table', description: 'Free-range half chicken, house peri-peri, charred lemon, garden herbs.', price: 1980, rating: 4.9, popularity: 93, badge: 'A LITTLE HEAT', image: photo('photo-1532550907401-a500c9a57435'), vegetarian: false, spicy: true },
  { id: 'burrata-salad', name: 'Heirloom Tomato & Burrata', category: 'Healthy Meals', restaurantId: 'garden', restaurant: 'The Garden Room', description: 'Ripe heirloom tomatoes, cloud-soft burrata, basil oil, toasted sourdough.', price: 1250, rating: 4.7, popularity: 82, badge: 'VEGETARIAN', image: photo('photo-1512621776951-a57141f2eefd'), vegetarian: true, spicy: false },
  { id: 'tuna-tataki', name: 'Bluefin Tuna Tataki', category: 'Sushi & Asian Cuisine', restaurantId: 'sora', restaurant: 'Sora House', description: 'Lightly seared tuna, ponzu, pickled daikon, toasted sesame.', price: 2100, rating: 4.9, popularity: 91, badge: 'CHEF’S PICK', image: photo('photo-1579871494447-9811cf80d66c'), vegetarian: false, spicy: false },
  { id: 'pistachio-cake', name: 'Pistachio Cloud Cake', category: 'Desserts', restaurantId: 'sugar', description: 'Pistachio sponge, mascarpone cream, roasted nuts, rose petals.', price: 850, rating: 4.8, popularity: 87, badge: '', image: photo('photo-1578985545062-69928b1d9587'), vegetarian: true, spicy: false },
  { id: 'woodland-pizza', name: 'The Woodland', category: 'Artisan Pizza', restaurantId: 'ember', description: 'Wild mushrooms, fontina, thyme, garlic confit on sourdough crust.', price: 1690, rating: 4.7, popularity: 88, badge: 'WOOD-FIRED', image: photo('photo-1579751626657-72bc17010498'), vegetarian: true, spicy: false },
  { id: 'iced-tea', name: 'Rose & Hibiscus Cooler', category: 'Premium Beverages', restaurantId: 'savannah', restaurant: 'Savannah Table', description: 'A bright hibiscus infusion with rose, lime and a touch of honey.', price: 460, rating: 4.8, popularity: 78, badge: 'HOUSE POUR', image: photo('photo-1513558161293-cdaf765edfd7'), vegetarian: true, spicy: false },
]

export const promotions = [
  { code: 'FIRSTBITE', title: 'A little something on us', detail: 'Enjoy 10% off your first order over KSh 2,000.', accent: '01 / A WARM WELCOME', image: photo('photo-1547592180-85f173990554') },
  { code: 'GOLDENHOUR', title: 'Your evening, elevated', detail: 'KSh 300 off orders over KSh 3,500, tonight only.', accent: '02 / THE EVENING EDIT', image: photo('photo-1517248135467-4c7edcad34c4') },
  { code: 'TABLEFOR2', title: 'Make it a moment', detail: 'A chef-curated pairing for two, with delivery on us.', accent: '03 / SHARED MOMENTS', image: photo('photo-1555939594-58d7cb561ad1') },
]

export const testimonials = [
  { name: 'Wanjiku M.', place: 'Kilimani', quote: 'It feels like having a favourite restaurant on speed dial. The food arrives beautifully packed and every detail feels considered.', rating: 5 },
  { name: 'David K.', place: 'Lavington', quote: 'The best discovery I’ve made this year. Sora House is now our Friday ritual, and the little touches make it special.', rating: 5 },
  { name: 'Amara N.', place: 'Westlands', quote: 'Thoughtful options, genuinely great food, and a delivery experience that matches the quality. A lovely way to dine in.', rating: 5 },
]
