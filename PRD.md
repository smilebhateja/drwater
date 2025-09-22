# 3D Hydration Experience Site — Product Requirements Document (PRD)

## 1. Objective
Create a minimal, experiential e-commerce site that showcases hydration products as interactive 3D objects. The primary goal is to help users quickly understand product form, size, and use cases, then convert through a streamlined purchase experience.

## 2. Target Users
- Active families
- Gym-goers
- Health-conscious adults
- Gift buyers (ages 25–55)

## 3. Core User Flows
1. **Home / Landing**
   - Arrive on the home page and immediately see a 3D hero carousel featuring 2–3 highlighted products.
   - Rotate and zoom the products with mouse or touch gestures.
2. **Product Exploration**
   - Select a product to open a full-screen 3D viewer.
   - Interact with three hotspots (Use, Specs, Buy), each revealing a short card with no more than 20 words.
3. **Purchase**
   - Add the product to cart and complete a quick checkout powered by Stripe.

## 4. Success Metrics
- Average time interacting with 3D product view exceeds 30 seconds.
- Add-to-cart rate from the product viewer.
- Conversion rate from the quick-checkout modal.

## 5. Non-Functional Requirements
- First meaningful paint under 1.5 seconds on mobile; lazy-load high-resolution 3D assets.
- Graceful fallback to 2D imagery for low-end or non-WebGL devices.
- Accessibility compliance including keyboard-based rotation controls and alternative text for 3D content.

## 6. UX / UI Principles
- Prioritize immersive experience: 3D canvas dominates layout with minimal text.
- Minimal chrome with a single prominent CTA and compact footer.
- Subtle motion and micro-interactions (e.g., hotspot hover reveals).
- Fully responsive layout with simplified controls on mobile.
- Progressive enhancement: show hero image with CTA when WebGL is unavailable.

## 7. Recommended Tech Stack
- **Frontend:** Next.js (React) for routing, SEO, and hosting flexibility.
- **3D Rendering:** React Three Fiber and @react-three/drei for GLTF loading, orbit controls, and HTML hotspots.
- **3D Assets:** glTF /.glb formats (low-poly with baked textures).
- **State Management:** Zustand or React Context; optionally integrate with commerce backends (e.g., Shopify).
- **Payments:** Stripe Checkout or Payment Links for rapid integration.
- **Infrastructure:** Deploy via Vercel or Netlify with CDN-backed asset hosting (e.g., Cloudflare).
- **Analytics:** Posthog or Google Analytics 4 to track interactions (rotate, zoom, hotspot clicks).
- **Optional:** Headless CMS (Sanity/Contentful) for product metadata and specs.

## 8. Implementation Plan
### Phase 0 — Preparation
- Define six core SKUs: filter, RO unit, glass bottle, hydrogen bottle, electrolyte pack, kettle.
- Create or commission low-poly glTF models with three levels of detail (low, medium, high). Include UV-mapped textures and export as Draco-compressed .glb files.

### Phase 1 — Starter Repository & Pages
1. Initialize project:
   ```bash
   npx create-next-app@latest hydration-3d --experimental-app
   cd hydration-3d
   npm install three @react-three/fiber @react-three/drei zustand stripe
   ```
2. Create foundational routes:
   - `/` — Home page with hero 3D carousel.
   - `/product/[slug]` — Product-specific viewer page.
   - `/checkout` — Redirect page for Stripe Checkout.

### Phase 2 — Core 3D Viewer
- Build a reusable `ProductViewer` component using React Three Fiber.
- Load .glb models with `useGLTF`, add constrained `OrbitControls`, and include HTML hotspots for micro-info cards.
- Default to manual rotation; enable auto-rotate only after user interaction.
- Add lazy-loading, progressive LOD switching, and a 2D fallback element for production readiness.

**Starter Component Example**
```jsx
// components/ProductViewer.jsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF, Preload } from "@react-three/drei";

function Model({ url }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} dispose={null} />;
}

function Hotspot({ position, children }) {
  return (
    <Html position={position} transform occlude>
      <div
        style={{
          padding: "8px 10px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: 8,
          fontSize: 13,
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        }}
      >
        {children}
      </div>
    </Html>
  );
}

export default function ProductViewer({ modelUrl }) {
  return (
    <div style={{ width: "100%", height: "70vh", borderRadius: 12, overflow: "hidden" }}>
      <Canvas camera={{ fov: 40, position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
          {/* sample hotspots - tweak positions to match model */}
          <Hotspot position={[0.3, 0.2, 0]}>
            <strong>Use</strong>
            <div>Perfect for gym recovery</div>
          </Hotspot>
          <Hotspot position={[-0.3, -0.2, 0]}>
            <strong>Specs</strong>
            <div>600ml, stainless steel</div>
          </Hotspot>
          <Preload all />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={1.2} maxDistance={4} />
      </Canvas>
    </div>
  );
}
```

### Phase 3 — Product Pages, Routing & Hotspots
- Structure product data in JSON or a headless CMS:
  ```json
  {
    "slug": "hydrogen-bottle",
    "title": "HydroSport H2 Bottle",
    "model": "/models/hydro-sport.glb",
    "price": 149,
    "highlights": ["Boosts clarity", "2.4ppm H2"],
    "hotspots": [
      { "pos": [0.3, 0.2, 0], "type": "use", "text": "Great for gym sessions" },
      { "pos": [-0.3, -0.2, 0], "type": "spec", "text": "600ml, Tritan" }
    ]
  }
  ```
- Map hotspot data into the `ProductViewer` component.

### Phase 4 — Cart & Checkout (Stripe)
- Implement a lightweight cart modal using Zustand or React Context.
- Create a Next.js API route to generate Stripe Checkout sessions:
  ```javascript
  // pages/api/create-checkout.js
  import Stripe from "stripe";
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  export default async function handler(req, res) {
    const { priceId, qty } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: qty }],
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/product`,
    });
    res.json({ url: session.url });
  }
  ```
- Use Stripe Price IDs or server-side mappings for product pricing.

### Phase 5 — Optimization & Polish
- Implement LOD streaming and progressive asset loading.
- Compress textures (Basis/KTX2) and serve assets via CDN.
- Track analytics events for 3D interactions.
- Experiment with CTA copy (A/B testing) to optimize engagement.
- Enhance accessibility with keyboard controls and downloadable product data sheets.

## 9. Performance & Production Guidelines
- Export glTF binaries with Draco compression and serve from CDN-backed storage.
- Provide fallback PNG/JPG hero images when WebGL is unsupported.
- Use `IntersectionObserver` to pause animations when offscreen.
- Compress textures using Basis Universal or KTX2 for rapid loading.
- Measure performance using WebPageTest and Lighthouse; iterate based on insights.

## 10. Content & Copy Strategy
- Limit hotspot text to 5–12 words; reserve detailed specs for an optional modal.
- Highlight a single badge per product (e.g., "3-year warranty" or "33% off").

## 11. Collaboration Prompts
- **3D Artist Brief:**
  > Create a web-optimized glTF (.glb) model of a 600ml hydrogen water bottle. Keep polycount low (under 20k triangles), provide baked PBR textures (albedo, roughness, normal), and export with Draco compression. Supply medium and low LOD versions and set the origin pivot at the bottle base.

- **Frontend Developer Brief:**
  > Build a Next.js product page that uses @react-three/fiber to load `/models/hydro-sport.glb`. Implement three Html hotspots (Use / Specs / Buy) positioned relative to the model. Hotspot clicks open a small panel. Integrate Stripe Checkout via serverless API route and handle fallback for non-WebGL devices.

- **Product Copy Brief:**
  > “HydroSport H2 — 600ml hydrogen bottle. Clarity. Focus. Energy. 2.4ppm H2. Gym-ready. 3-year warranty.”

