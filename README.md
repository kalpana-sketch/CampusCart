# 🎓 CampusSwap — Campus Second-Hand Marketplace

A complete buy/sell/donate marketplace exclusively for verified college students.

---

## ✅ FEATURES INCLUDED

- 🔐 **Student Verification** — Only .edu and .ac.in email addresses accepted
- 📦 **Post Items** — Title, description, category, condition, price, free/donate toggle, photo upload
- 🔍 **Browse & Filter** — Search, filter by category, condition, price range, sort
- 💬 **In-App Chat** — Negotiate with sellers directly
- 🔖 **Watchlist** — Save items you're interested in
- ⭐ **Ratings & Reviews** — Rate sellers after a transaction
- 👤 **User Profile** — See your listings, reviews, stats
- 🗑️ **Manage Listings** — Delete your own listings

---

## 📁 FILE STRUCTURE (explained for beginners)

```
campus-marketplace/
│
├── index.html          ← The main webpage (structure/layout)
│
├── css/
│   └── style.css       ← All the visual styling (colors, fonts, layout)
│
├── js/
│   ├── data.js         ← Stores and retrieves data (localStorage)
│   ├── auth.js         ← Login, signup, logout logic
│   ├── app.js          ← Main app: browse, filter, post, watchlist
│   └── chat.js         ← In-app messaging system
│
└── README.md           ← This guide!
```

**How these files work together:**
- `index.html` is the skeleton — it defines what's on the page
- `style.css` is the appearance — colors, fonts, spacing
- `data.js` is the memory — saves/loads everything
- `auth.js` handles who you are (login/signup)
- `app.js` handles what you do (browse, post, watch)
- `chat.js` handles messages

---

## 🚀 HOW TO RUN (Zero Setup Required!)

Since this app uses only HTML, CSS, and JavaScript (no server needed!):

### Option 1 — Double Click (Easiest)
1. Download/save all files keeping the folder structure
2. Double-click `index.html`
3. It opens in your browser. Done! 🎉

### Option 2 — VS Code Live Server (Recommended for development)
1. Install [VS Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension (search in Extensions tab)
3. Open the `campus-marketplace` folder in VS Code
4. Right-click `index.html` → "Open with Live Server"
5. Your browser opens with the app running!

### Option 3 — Deploy Online (Share with others)
**Free hosting on Netlify:**
1. Go to [netlify.com](https://netlify.com) and create a free account
2. Drag and drop your `campus-marketplace` folder onto the Netlify dashboard
3. You get a live URL like `https://campusswap-abc123.netlify.app`
4. Share it with your college friends!

---

## 🧪 HOW TO TEST THE APP

1. Open the app in your browser
2. Click **Sign In** → **Sign Up** tab
3. Enter your name, a college email (e.g., `test@iit.ac.in`), your college name, and a password
4. You're logged in!
5. Click **+ List Item** to post something
6. Browse items, click on one, and use **Chat with Seller**
7. Click ❤️ on any item to add to watchlist
8. Click **My Listings** to see what you posted

---

## 💡 UNDERSTANDING THE DATA STORAGE

This app uses **localStorage** — your browser's built-in mini database. 

- All data (users, items, chats) is saved in your browser
- If you clear browser history, the data is gone
- Data is NOT shared across different browsers or computers
- For a real app, you'd use a cloud database

**To reset all data and start fresh:**
Open the browser console (F12) and type:
```javascript
localStorage.clear(); location.reload();
```

---

## 🔧 HOW TO CUSTOMIZE

### Change the college email domains (auth.js, line ~25):
```javascript
const validDomains = ['.edu', '.ac.in', '.edu.in', '.college.in'];
// Add your college's domain:
const validDomains = ['.edu', '.ac.in', '.yourcollegedomain.com'];
```

### Change the currency (data.js, line ~100):
```javascript
function formatPrice(price, isFree) {
  if (isFree) return 'Free';
  return '₹' + price.toLocaleString('en-IN'); // Change ₹ to $ or € etc.
}
```

### Change colors (css/style.css, top section):
```css
:root {
  --primary: #1a6b3c;     /* Change this to any color! */
  --accent: #f5a623;      /* This is the orange accent */
}
```

### Add a new category:
In `index.html` (Post Modal), add a new `<option>`:
```html
<option>🔭 Optical Equipment</option>
```
In `app.js`, add the emoji mapping:
```javascript
'🔭 Optical Equipment': '🔭',
```
In `index.html` (Categories row), add a button:
```html
<button class="cat-btn" onclick="filterCategory('🔭 Optical Equipment', this)">🔭 Optics</button>
```

---

## 🚀 UPGRADING TO A REAL APP (Next Steps)

When you're ready to make this production-ready:

| Feature | Tool/Service |
|---------|-------------|
| Real database | Firebase Firestore (free tier available) |
| Real authentication | Firebase Auth |
| Real-time chat | Firebase Realtime Database |
| Email verification | Firebase Auth with email link |
| Image storage | Firebase Storage or Cloudinary |
| Hosting | Vercel, Netlify, or Firebase Hosting |

**Recommended learning path:**
1. Learn basic JavaScript (you already have a great example here!)
2. Learn HTML/CSS fundamentals
3. Learn [Firebase](https://firebase.google.com) (free, easy, Google-backed)
4. Convert this app step by step

---

## 📝 LIMITATIONS (For Demo Purposes)

- ❌ Passwords stored in plain text (use Firebase Auth in production!)
- ❌ Data only saved in browser (not shared across devices)
- ❌ Chat auto-replies are simulated (not real other users)
- ❌ Image upload stores images in browser memory (not a server)
- ❌ No email verification (just domain check)

---

## 💬 NEED HELP?

If you're stuck, these resources are great:
- [MDN Web Docs](https://developer.mozilla.org) — Best HTML/CSS/JS reference
- [javascript.info](https://javascript.info) — Learn JavaScript from scratch
- [Firebase Docs](https://firebase.google.com/docs) — For the database upgrade
- Stack Overflow — For any specific coding questions

Good luck building your marketplace! 🎓
