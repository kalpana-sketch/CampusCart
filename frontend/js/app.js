// ============================================================
// app.js — Main Application Controller
// ============================================================

let currentCategory = "all";
let allItems = [];

// ---------------- PAGE NAVIGATION ----------------
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
    p.classList.add("hidden");
  });

  const page = document.getElementById("page-" + pageId);
  if (page) {
    page.classList.remove("hidden");
    page.classList.add("active");
  }

  // Active nav state
  document.querySelectorAll('.nav-link').forEach(link => {
    const isTarget = link.textContent.toLowerCase().includes(pageId === 'home' ? 'browse' : pageId.replace('-', ' '));
    link.classList.toggle('active', isTarget);
  });

  if (pageId === "home") renderItems();
  if (pageId === "watchlist") renderWatchlist();
  if (pageId === "my-listings") renderMyListings();
  if (pageId === "chats") renderChatsList();
  if (pageId === "profile") renderProfile();
}

let userWatchlistIds = [];

// ---------------- RENDER ITEMS ----------------
async function renderItems() {
  const grid = document.getElementById("items-grid");
  if (!grid) return;

  try {
    let items = [];
    let watchlist = [];

    try {
      items = await apiGetItems();
    } catch (err) {
      console.error("Fetch items error:", err);
      showToast("Could not load items from server");
      return;
    }

    if (currentUser) {
      try {
        watchlist = await apiGetWatchlist();
      } catch (err) {
        console.error("Watchlist fetch error:", err);
        // Don't fail the whole page if just watchlist fails
      }
    }

    allItems = Array.isArray(items) ? items : [];
    userWatchlistIds = Array.isArray(watchlist) ? watchlist.map(i => i ? i._id : null).filter(Boolean) : [];

    applyFilters();
  } catch (err) {
    console.error("General load error:", err);
  }
}

function applyFilters() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();
  const condition = document.getElementById("filter-condition").value;
  const priceRange = document.getElementById("filter-price").value;
  const sort = document.getElementById("filter-sort").value;

  let filtered = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchesCondition = !condition || item.condition === condition;

    let matchesPrice = true;
    if (priceRange === 'free') matchesPrice = item.isFree || item.price === 0;
    else if (priceRange === '0-500') matchesPrice = item.price <= 500;
    else if (priceRange === '500-2000') matchesPrice = item.price > 500 && item.price <= 2000;
    else if (priceRange === '2000-10000') matchesPrice = item.price > 2000 && item.price <= 10000;
    else if (priceRange === '10000+') matchesPrice = item.price > 10000;

    return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
  });

  // Sorting
  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const grid = document.getElementById("items-grid");
  const noResults = document.getElementById("no-results");

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
    grid.innerHTML = filtered.map(item => renderItemCard(item)).join("");
  }

  updateStats();
}

function renderItemCard(item, isOwner = false) {
  if (!item) return "";
  const isSaved = (userWatchlistIds || []).includes(item._id);
  const display = item.image ? `<img src="${item.image}" class="item-img">` : `<div class="item-img">${getCategoryEmoji(item.category)}</div>`;

  const sellerNameLong = (item.seller && item.seller.name) ? item.seller.name : 'Former Student';
  const sellerName = sellerNameLong.split(' ')[0];
  const categoryLabel = (item.category || '').split(' ')[1] || item.category || 'Item';

  return `
    <div class="item-card" onclick="openItemDetail('${item._id}')">
      ${display}
      ${isOwner ? '' : `<button class="watchlist-btn ${isSaved ? 'saved' : ''}" onclick="toggleWatchlist(event, '${item._id}')">❤️</button>`}
      <div class="item-body">
        <h3 class="item-title">${item.title || 'Untitled Item'}</h3>
        <p class="item-meta">${item.condition || 'Used'} · ${categoryLabel}</p>
        <div class="item-footer">
          <span class="item-price ${item.isFree ? 'free' : ''}">${formatPrice(item.price, item.isFree)}</span>
          ${isOwner ? `<button class="btn-danger" onclick="handleDeleteItem(event, '${item._id}')">Delete</button>` : `<span class="item-seller">@${sellerName}</span>`}
        </div>
      </div>
    </div>
  `;
}

// ---------------- ITEM DETAIL ----------------
async function openItemDetail(itemId) {
  try {
    const res = await fetch(`${API_BASE}/items/${itemId}`);
    const item = await res.json();
    const reviews = await apiGetReviews(item.seller._id);
    const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0;

    const display = item.image ? `<img src="${item.image}" alt="${item.title}">` : getCategoryEmoji(item.category);

    const content = document.getElementById("detail-content");
    content.innerHTML = `
      <div class="detail-grid">
        <div class="detail-img-main">${display}</div>
        <div class="detail-info">
          <h2 class="detail-title">${item.title}</h2>
          <div class="detail-price ${item.isFree ? 'free' : ''}">${formatPrice(item.price, item.isFree)}</div>
          <div class="detail-badges">
            <span class="detail-badge">${item.category}</span>
            <span class="detail-badge">${item.condition}</span>
          </div>
          <p class="detail-desc">${item.description}</p>
          
          <div class="detail-seller-card">
            <div class="seller-avatar">${item.seller.name.charAt(0)}</div>
            <div class="seller-info">
              <div class="seller-name">${item.seller.name}</div>
              <div class="seller-rating">${starsHTML(avgRating)} (${reviews.length} reviews)</div>
              <div class="seller-college">${item.seller.college}</div>
            </div>
          </div>
          
          <div class="detail-actions">
            <button class="btn-primary full-width" id="btn-chat-now">Chat with Seller</button>
            <button class="btn-outline" onclick="toggleWatchlist(event, '${item._id}')">Save</button>
          </div>

          <div class="review-form-section" id="review-form-container">
            <h4>Leave a Review</h4>
            <div class="star-rating" id="review-stars">
              <span class="star" onclick="setReviewRating(1, event)">★</span>
              <span class="star" onclick="setReviewRating(2, event)">★</span>
              <span class="star" onclick="setReviewRating(3, event)">★</span>
              <span class="star" onclick="setReviewRating(4, event)">★</span>
              <span class="star" onclick="setReviewRating(5, event)">★</span>
            </div>
            <textarea id="review-text" placeholder="Write your experience..." class="input-field textarea"></textarea>
            <button class="btn-primary" onclick="submitReview(event, '${item.seller._id}')">Post Review</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("btn-chat-now").onclick = () => {
      startChat(item._id, item.seller._id, item.seller.name, item.title);
    };

    // Seller cannot review themselves
    const reviewForm = document.getElementById("review-form-container");
    if (currentUser && currentUser.id === item.seller._id && reviewForm) {
      reviewForm.classList.add("hidden");
    }

    // Reset review state
    currentReviewRating = 0;
    openModal("detail-modal");
  } catch (err) {
    console.error("Detail error:", err);
    showToast("Error loading item details");
  }
}

// ---------------- POST ITEM ----------------
async function handlePostItem() {
  const title = document.getElementById("post-title").value;
  const description = document.getElementById("post-desc").value;
  const category = document.getElementById("post-category").value;
  const condition = document.getElementById("post-condition").value;
  const price = parseFloat(document.getElementById("post-price").value) || 0;
  const isFree = document.getElementById("post-donate").checked;

  if (!title || !description || !category || !condition) {
    showToast("Please fill all required fields");
    return;
  }

  try {
    await apiCreateItem({ title, description, category, condition, price, isFree });
    showToast("Item listed successfully! 🎉");
    closeModal("post-modal");
    renderItems();
  } catch (err) {
    showToast("Failed to post item");
  }
}

// ---------------- WATCHLIST ----------------
async function toggleWatchlist(event, itemId) {
  event.stopPropagation();
  if (!currentUser) return requireAuth(() => { });

  const btn = event.currentTarget;

  try {
    const res = await apiAddToWatchlist(itemId);
    showToast(res.message);

    if (res.saved) {
      btn.classList.add("saved");
    } else {
      btn.classList.remove("saved");
    }

    updateWatchlistCount();
  } catch (err) {
    showToast("Failed to update watchlist");
  }
}

async function updateWatchlistCount() {
  if (!currentUser) return;
  try {
    const list = await apiGetWatchlist();
    const badge = document.getElementById("watchlist-count");
    if (Array.isArray(list) && list.length > 0) {
      badge.textContent = list.length;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  } catch (err) {
    console.error("Count refresh error");
  }
}

// ---------------- MODALS & HELPERS ----------------
function openModal(id) {
  // Hide all other modals first
  document.querySelectorAll(".modal").forEach(m => {
    if (m.id !== id) m.classList.add("hidden");
  });

  document.getElementById("modal-overlay").classList.remove("hidden");
  const target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
}

function closeModal(id) {
  if (id === "chat-modal") {
    if (window.chatInterval) {
      clearInterval(window.chatInterval);
      window.chatInterval = null;
    }
  }

  if (id) {
    document.getElementById(id).classList.add("hidden");
  } else {
    document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
  }
  document.getElementById("modal-overlay").classList.add("hidden");
}

function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  applyFilters();
}

function toggleDonate() {
  const priceInput = document.getElementById("post-price");
  const isDonate = document.getElementById("post-donate").checked;
  priceInput.disabled = isDonate;
  if (isDonate) priceInput.value = 0;
}

// ---------------- VIEW PAGES ----------------
async function renderWatchlist() {
  const grid = document.getElementById("watchlist-grid");
  const empty = document.getElementById("watchlist-empty");
  if (!grid) return;

  if (!currentUser) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }

  try {
    const list = await apiGetWatchlist();
    if (!Array.isArray(list) || list.length === 0) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
    } else {
      empty.classList.add("hidden");
      grid.innerHTML = list.filter(Boolean).map(item => renderItemCard(item)).join("");
    }
  } catch (err) {
    console.error("Watchlist render error:", err);
    showToast("Error loading watchlist. Try again.");
  }
}

async function renderMyListings() {
  const grid = document.getElementById("my-listings-grid");
  const empty = document.getElementById("my-listings-empty");
  if (!grid) return;

  try {
    const items = await apiGetItems();
    const myItems = items.filter(item => item.seller._id === currentUser.id);

    if (myItems.length === 0) {
      grid.innerHTML = "";
      empty.classList.remove("hidden");
    } else {
      empty.classList.add("hidden");
      grid.innerHTML = myItems.map(item => renderItemCard(item, true)).join("");
    }
  } catch (err) {
    showToast("Error loading your listings");
  }
}

async function renderProfile() {
  const content = document.getElementById("profile-content");
  if (!content || !currentUser) return;

  const reviews = await apiGetReviews(currentUser.id);
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0;

  content.innerHTML = `
    <div class="profile-page">
      <div class="profile-header">
        <div class="profile-avatar-lg">${currentUser.name.charAt(0)}</div>
        <div class="profile-info">
          <h2 class="profile-name">${currentUser.name}</h2>
          <div class="profile-college">🎓 ${currentUser.college}</div>
          <div class="profile-email">📧 ${currentUser.email}</div>
          <div class="profile-rating">${starsHTML(avgRating)} (${reviews.length} reviews)</div>
        </div>
        <button class="btn-secondary signout-btn" onclick="handleLogout()">Sign Out</button>
      </div>
      
      <h3>Recent Reviews</h3>
      <div class="reviews-section">
        ${reviews.length ? reviews.map(r => {
    const reviewerName = r.reviewer ? r.reviewer.name : "Former Student";
    return `
            <div class="review-card">
              <div class="review-header">
                <span class="review-author">${reviewerName}</span>
                <span class="seller-rating">${starsHTML(r.rating)}</span>
              </div>
              <p class="review-text">${r.text || 'No comment provided.'}</p>
            </div>
          `;
  }).join("") : '<p style="color:var(--text-muted)">No reviews yet.</p>'}
      </div>
    </div>
  `;
}

async function handleDeleteItem(event, itemId) {
  event.stopPropagation();
  if (!confirm("Are you sure you want to delete this listing?")) return;

  try {
    await apiDeleteItem(itemId);
    showToast("Listing deleted");
    renderMyListings();
    renderItems();
  } catch (err) {
    showToast("Failed to delete item");
  }
}

// ---------------- IMAGE HANDLING ----------------
let selectedImages = [];

function triggerImageUpload() {
  document.getElementById("post-images").click();
}

function previewImages(event) {
  const files = event.target.files;
  const container = document.getElementById("image-previews");
  container.innerHTML = "";
  selectedImages = [];

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImages.push(e.target.result);
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "preview-img";
      container.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}

// ---------------- POST ITEM ----------------
// Update handlePostItem to use images
async function handlePostItem() {
  const title = document.getElementById("post-title").value;
  const description = document.getElementById("post-desc").value;
  const category = document.getElementById("post-category").value;
  const condition = document.getElementById("post-condition").value;
  const price = parseFloat(document.getElementById("post-price").value) || 0;
  const isFree = document.getElementById("post-donate").checked;
  const image = selectedImages[0] || ""; // Just take the first image for now

  if (!title || !description || !category || !condition) {
    showToast("Please fill all required fields");
    return;
  }

  try {
    await apiCreateItem({ title, description, category, condition, price, isFree, image });
    showToast("Item listed successfully! 🎉");

    // Clear form
    document.getElementById("post-title").value = "";
    document.getElementById("post-desc").value = "";
    document.getElementById("post-price").value = "";
    document.getElementById("image-previews").innerHTML = "";
    selectedImages = [];

    closeModal("post-modal");
    renderItems();
  } catch (err) {
    showToast("Failed to post: " + err.message);
  }
}

function updateStats() {
  document.getElementById("stat-items").textContent = allItems.length;
  const colleges = new Set(allItems.map(i => i.seller.college));
  document.getElementById("stat-colleges").textContent = colleges.size;
  const users = new Set(allItems.map(i => i.seller._id));
  document.getElementById("stat-users").textContent = users.size || (currentUser ? 1 : 0);
}

// Update renderItemCard to show image
// Duplicate function check - removing or keeping consistent logic
// The duplicate renderItemCard at line 448 was outdated - using the one fixed above.

// ---------------- REVIEWS ----------------
let currentReviewRating = 0;

function setReviewRating(rating, event) {
  if (event) event.stopPropagation();
  currentReviewRating = rating;
  const container = document.getElementById("review-stars");
  if (!container) return;

  const stars = container.querySelectorAll(".star");
  stars.forEach((star, i) => {
    if (i < rating) {
      star.classList.add("filled");
      star.classList.remove("empty");
    } else {
      star.classList.remove("filled");
      star.classList.add("empty");
    }
  });
}

async function submitReview(event, sellerId) {
  if (!currentUser) return requireAuth(() => { });

  const btn = event ? event.target : null;
  const text = document.getElementById("review-text").value.trim();
  if (currentReviewRating === 0) return showToast("Please select stars to rate!");

  try {
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Posting...";
    }

    await apiPostReview(sellerId, currentReviewRating, text);
    showToast("Review posted! Thanks for sharing.");

    // Clear form
    const textArea = document.getElementById("review-text");
    if (textArea) textArea.value = "";
    setReviewRating(0);

    // Refresh item detail to show new reviews
    setTimeout(() => {
      closeModal("detail-modal");
    }, 800);
  } catch (err) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Post Review";
    }
    console.error("Review submission error:", err);
    showToast("Failed to post: " + err.message);
  }
}

// ---------------- INIT ----------------
document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  renderItems();
  updateWatchlistCount();

  document.getElementById("modal-overlay").onclick = () => closeModal();
});
