// ============================================================
// data.js — Centralized Data & API Handlers
// ============================================================

const API_BASE = "http://localhost:5000/api";

// ---- AUTH HELPERS ----
function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token && token !== "null" && token !== "undefined") {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// ---- ITEM API ----
async function apiGetItems() {
  try {
    const res = await fetch(`${API_BASE}/items`);
    return await res.json();
  } catch (err) {
    console.error("API Error (getItems):", err);
    return [];
  }
}

async function apiCreateItem(itemData) {
  const res = await fetch(`${API_BASE}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(itemData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || "Failed to create item");
  return data;
}

async function apiDeleteItem(itemId) {
  const res = await fetch(`${API_BASE}/items/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete item");
  return data;
}

// ---- WATCHLIST API ----
async function apiGetWatchlist() {
  try {
    const res = await fetch(`${API_BASE}/users/watchlist`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) return [];
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Watchlist API error:", err);
    return [];
  }
}

async function apiAddToWatchlist(itemId) {
  const res = await fetch(`${API_BASE}/users/watchlist/${itemId}`, {
    method: "POST",
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to update watchlist");
  return data;
}

// ---- CHAT API ----
async function apiGetChats() {
  const res = await fetch(`${API_BASE}/chat`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch chats");
  return data;
}

async function apiStartChat(itemId, sellerId) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ itemId, sellerId })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to start chat");
  return data;
}

async function apiSendMessage(chatId, text) {
  const res = await fetch(`${API_BASE}/chat/${chatId}/message`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to send message");
  return data;
}

async function apiGetMessages(chatId) {
  const res = await fetch(`${API_BASE}/chat/${chatId}`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch messages");
  return data;
}

// ---- REVIEW API ----
async function apiGetReviews(sellerId) {
  try {
    const res = await fetch(`${API_BASE}/reviews/${sellerId}`);
    const data = await res.json();
    if (!res.ok) return [];
    return data;
  } catch (err) {
    console.error("Fetch reviews error:", err);
    return [];
  }
}

async function apiPostReview(sellerId, rating, text) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ sellerId, rating, text })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to post review");
  return data;
}

// ---- UTILITIES ----
function timeAgo(timestamp) {
  if (!timestamp) return 'Recently';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return 'Recently';
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
  return Math.floor(seconds / 86400) + 'd ago';
}

function formatPrice(price, isFree) {
  if (isFree || price === 0) return 'Free';
  return '₹' + price.toLocaleString('en-IN');
}

function starsHTML(rating) {
  let html = '';
  const r = rating || 0;
  for (let i = 1; i <= 5; i++) {
    html += `<span class="star ${i <= Math.round(r) ? 'filled' : 'empty'}">★</span>`;
  }
  return html;
}

const CATEGORY_EMOJIS = {
  '📚 Textbooks': '📚',
  '🔬 Lab Equipment': '🔬',
  '💻 Electronics': '💻',
  '🛋️ Furniture': '🛋️',
  '👕 Clothing': '👕',
  '🎒 Supplies': '🎒',
  '🎮 Entertainment': '🎮',
  '🔧 Tools': '🔧'
};

function getCategoryEmoji(cat) {
  return CATEGORY_EMOJIS[cat] || '📦';
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3000);
}