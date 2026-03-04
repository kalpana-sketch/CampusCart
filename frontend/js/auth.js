// ============================================================
// auth.js — User Authentication
// ============================================================

let currentUser = null;

// ---- CHECK IF USER IS ALREADY LOGGED IN ----
function initAuth() {
  currentUser = getCurrentUser();
  if (currentUser) {
    onLoginSuccess();
  }
}

// ---- SIGN UP ----
async function handleSignup() {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const college = document.getElementById("signup-college").value;
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !college || !password) {
    showToast("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, college, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");

    showToast("Account created! Please sign in.");
    switchAuthTab('login');
  } catch (err) {
    showToast(err.message);
  }
}

// ---- LOG IN ----
async function handleLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    currentUser = data.user;

    onLoginSuccess();
    closeModal("auth-modal");
    showToast("Welcome back, " + currentUser.name + "!");
  } catch (err) {
    showToast(err.message);
  }
}

// ---- CALLED AFTER SUCCESSFUL LOGIN ----
function onLoginSuccess() {
  document.getElementById('auth-btn').style.display = 'none';
  document.getElementById('post-btn').style.display = 'block';

  const avatar = document.getElementById('user-avatar');
  avatar.classList.remove('hidden');
  avatar.textContent = currentUser.name.charAt(0).toUpperCase();

  updateStats();
  if (typeof renderItems === 'function') renderItems();
}

// ---- LOG OUT ----
function handleLogout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  currentUser = null;

  document.getElementById('auth-btn').style.display = 'block';
  document.getElementById('post-btn').style.display = 'none';
  document.getElementById('user-avatar').classList.add('hidden');

  showPage('home');
  showToast('👋 Signed out successfully');
}

// ---- SWITCH BETWEEN LOGIN & SIGNUP TABS ----
function switchAuthTab(tab) {
  document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
  document.getElementById('signup-form').classList.toggle('hidden', tab !== 'signup');

  document.querySelectorAll('.auth-tab').forEach((btn) => {
    const isLoginTab = btn.textContent.toLowerCase().includes('sign in');
    btn.classList.toggle('active', (tab === 'login' && isLoginTab) || (tab === 'signup' && !isLoginTab));
  });
}

// ---- REQUIRE AUTH ----
function requireAuth(callback) {
  if (!currentUser) {
    showToast('🔒 Please sign in first');
    openModal('auth-modal');
    return;
  }
  callback();
}