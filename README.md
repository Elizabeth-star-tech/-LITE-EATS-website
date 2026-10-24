# ÉLITE EATS

A luxury-inspired Nairobi food-delivery experience built with React and Vite. This is a front-end demonstration using local sample restaurant and menu data; no live restaurants, couriers, or payment services are connected.

GitHub repository: https://github.com/Elizabeth-star-tech/-LITE-EATS-website

## Features

- Responsive home page, restaurant directory, menu, checkout and order-confirmation routes.
- Local restaurant and dish search, category/cuisine, rating, delivery-time and price filters, and sorting.
- Shopping bag with quantity controls, item removal, dynamic totals, sample promotional codes and cart persistence in `localStorage`.
- Checkout validation for contact and delivery details. Payment choices are demonstrations and do not collect payment credentials.
- Demonstration order reference, receipt, customer summary and delivery timeline.
- Newsletter demo state, promotional-code copy actions, keyboard focus indicators and reduced-motion support.

## Technology

- React 18 and JavaScript
- Vite
- Lucide React
- Modern CSS with responsive layouts and motion effects

## Requirements

- Node.js 18 or newer
- npm

## Run in VS Code

1. Open this project folder in VS Code.
2. Open **Terminal → New Terminal** and install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite (typically `http://localhost:5173`). Vite is configured to open the site in your default browser; set Firefox as the default browser if you want it to open there.

You can also start the server from **Terminal → Run Task → ÉLITE EATS: Start Vite**. Do not use the **Go Live** button from the Live Server extension for this React app: Live Server serves source files without compiling JSX, so the page will not run correctly. Use the Vite server instead.

To create and preview a production build:

```bash
npm run build
npm run preview
```

Food photography is loaded from Unsplash and requires an internet connection. Shopping-bag contents are saved in the browser's local storage. Sample contact details, testimonials, promotions, payment options, prices, and orders are for demonstration only.

## Push updates to GitHub

After making changes, open a terminal in this project folder and run:

```bash
git add .
git commit -m "Update ÉLITE EATS website"
git push -u origin main
```

GitHub may ask you to sign in or authorize Git Credential Manager the first time you push.
