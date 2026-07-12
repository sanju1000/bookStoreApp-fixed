# bookStoreApp — Setup & What Was Fixed

## 1. What was wrong

- **Home page "Free Offered Courses" grid was empty**: the backend only had a `GET /book`
  route — there was no way to insert data, so the MongoDB `books` collection was empty.
  Fixed by adding a `seed.js` script (and a `POST /book` route) to populate sample books.
- **Book cover images weren't showing**: the original seed data pointed at an external
  image host (`picsum.photos`) which was being silently blocked by network/firewall
  rules. Fixed by generating self-contained SVG cover images as base64 data URIs directly
  in `seed.js` — no external network request is needed at all. Also added an `onError`
  fallback in `Cards.jsx` so any future broken image URL shows a clean placeholder
  instead of a blank/broken image.
- **Login crashed instead of returning a clean error** when an email didn't exist
  (`user.password` was accessed before checking if `user` was `null`). Fixed in
  `Backend/controller/user.controller.js`.
- **Signup/Login didn't actually update the logged-in state**: `Login.jsx` called
  `window.location.reload()` *before* `localStorage.setItem(...)` ran, so the reload
  interrupted execution and the session was never saved. Both `Signup.jsx` and
  `Login.jsx` now save to `localStorage` and update the shared `AuthProvider` context
  immediately, so the Navbar updates without needing a manual refresh.
- **Logout bug**: it was spreading the old user object instead of clearing it.
- **Password field in Signup used `type="text"`** instead of `type="password"`.
- **Contact/About nav links did nothing** (no `href`, no route). Added real `/about` and
  `/contact` pages and wired them into `App.jsx`, `Navbar.jsx`, and `Footer.jsx`. Also
  switched all nav links from plain `<a>` tags to React Router `<Link>` so navigation is
  client-side instead of doing full page reloads.
- **New Contact page** posts to a new `POST /contact` backend endpoint that stores
  messages in MongoDB (`Backend/model/contact.model.js`).

## 2. Requirements

- Node.js (v18+ recommended)
- MongoDB running locally (`mongodb://localhost:27017`) — install MongoDB Community
  Server if you don't have it, or point `MongoDBURI` in `Backend/.env` at a MongoDB Atlas
  connection string instead.

## 3. Setup

### Backend
```bash
cd Backend
npm install
npm run seed     # populates sample book data (run once, or anytime to reset)
npm start        # starts the API on http://localhost:4001
```

### Frontend
```bash
cd Frontend
npm install
npm run dev      # starts the app on http://localhost:5173 (default Vite port)
```

Open the frontend URL in your browser. You should now see:
- Free course cards on the Home page
- All courses on the `/course` page (after logging in)
- Working Signup/Login (state persists, no page reload needed)
- Working `/about` and `/contact` pages

## 4. Notes

- `Backend/.env` holds `PORT` and `MongoDBURI` — update `MongoDBURI` if you're using
  Atlas instead of a local MongoDB instance.
- `npm run seed` clears the `books` collection and reinserts 8 sample books (4 Free, 4
  Paid) with placeholder cover images from picsum.photos — replace with your own book
  data/images whenever you're ready.
