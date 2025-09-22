# DrWater 3D Hydration Experience

Immersive, mobile-first ecommerce concept that showcases hydration products as interactive 3D objects built with Next.js and React Three Fiber.

## Getting started

```bash
npm install
npm run dev
```

The app expects WebGL support for the 3D viewers. If WebGL isn&apos;t available, a graceful fallback message is shown.

## Environment variables

Create a `.env.local` file with your Stripe secret key to enable checkout:

```
STRIPE_SECRET_KEY=sk_test_...
```

Without a key the checkout endpoint returns an explanatory error.

## Available scripts

- `npm run dev` – start the development server on `http://localhost:3000`
- `npm run build` – create an optimized production build
- `npm run start` – run the production server locally
- `npm run lint` – run ESLint using Next.js settings

## Architecture highlights

- **3D viewer**: Built with React Three Fiber and Drei to load glTF assets (procedural shapes are used as placeholders).
- **Hotspots**: Html overlays in the 3D scene surface use, specs, and buy CTAs with minimal copy.
- **Cart & checkout**: Global cart powered by Zustand with a slide-over sheet. Stripe Checkout integration lives in an edge-ready API route.
- **Responsive UX**: Hero carousel focuses on three featured SKUs, with quick access to the complete catalog grid.
- **Accessibility**: Orbit controls support keyboard navigation, and the experience offers a fallback for non-WebGL devices.

Refer to `PRD.md` for the original product requirements.
