// ============================================================
// chat.js — In-app Messaging
// ============================================================

let activeChatId = null;

// ---- START OR OPEN CHAT ----
async function startChat(itemId, sellerId, sellerName, itemTitle) {
  if (!currentUser) return requireAuth(() => { });

  const chatBtn = document.getElementById("btn-chat-now");
  const originalText = chatBtn ? chatBtn.textContent : "Chat with Seller";

  try {
    if (chatBtn) {
      chatBtn.disabled = true;
      chatBtn.textContent = "Connecting...";
    }

    const chat = await apiStartChat(itemId, sellerId);
    if (!chat || !chat._id) throw new Error("Invalid chat data");

    activeChatId = chat._id;

    openChatModal({
      _id: chat._id,
      participantName: sellerName,
      itemTitle: itemTitle,
      messages: chat.messages || []
    });

    if (chatBtn) {
      chatBtn.disabled = false;
      chatBtn.textContent = originalText;
    }
  } catch (err) {
    if (chatBtn) {
      chatBtn.disabled = false;
      chatBtn.textContent = originalText;
    }
    console.error("Chat start error:", err);
    showToast("Error starting chat: " + (err.message || "Server error"));
  }
}

// ---- OPEN CHAT MODAL ----
async function openChatModal(chat) {
  const header = document.getElementById('chat-header');
  const messagesContainer = document.getElementById('chat-messages');

  header.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px">
      <div class="chat-thread-avatar">${chat.participantName.charAt(0)}</div>
      <div>
        <div style="font-weight:600">${chat.participantName}</div>
        <div style="font-size:0.78rem; color:var(--text-muted)">Re: ${chat.itemTitle}</div>
      </div>
    </div>`;

  renderChatMessages(chat.messages, messagesContainer);
  openModal('chat-modal');

  // Polling for new messages (simple version)
  if (window.chatInterval) clearInterval(window.chatInterval);
  window.chatInterval = setInterval(() => loadMessages(chat._id), 3000);

  setTimeout(() => document.getElementById('chat-input').focus(), 200);
}

// ---- RENDER MESSAGES ----
function renderChatMessages(messages, container) {
  if (!messages || messages.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding: 40px 0; font-size:0.9rem">👋 Start the conversation!</div>`;
    return;
  }

  container.innerHTML = messages.map(msg => {
    const isSent = msg.sender === currentUser.id;
    return `
      <div class="chat-msg ${isSent ? 'sent' : 'received'}">
        ${msg.text}
        <div class="chat-msg-time">${timeAgo(msg.createdAt)}</div>
      </div>`;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

// ---- SEND MESSAGE ----
async function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text || !activeChatId) return;

  try {
    const chat = await apiSendMessage(activeChatId, text);
    input.value = "";
    renderChatMessages(chat.messages, document.getElementById('chat-messages'));
  } catch (err) {
    showToast("Failed to send message");
  }
}

// ---- LOAD MESSAGES ----
async function loadMessages(chatId) {
  if (!document.getElementById("chat-modal").classList.contains("hidden") && chatId === activeChatId) {
    const chat = await apiGetMessages(chatId);
    renderChatMessages(chat.messages, document.getElementById('chat-messages'));
  }
}

// ---- RENDER CHATS LIST ----
async function renderChatsList() {
  if (!currentUser) return;

  try {
    const chats = await apiGetChats();
    const container = document.getElementById("chats-list");
    const empty = document.getElementById("chats-empty");

    if (!chats.length) {
      empty.classList.remove("hidden");
      container.innerHTML = "";
      return;
    }

    empty.classList.add("hidden");
    container.innerHTML = chats.map(chat => {
      const other = (chat.participants || []).find(p => {
        const pId = p._id || p;
        return pId.toString() !== currentUser.id.toString();
      });

      const otherName = other ? (other.name || "Student") : "Unknown User";
      const itemTitle = chat.item ? chat.item.title : "Deleted Item";

      return `
        <div class="chat-thread" onclick="openChatFromList('${chat._id}')">
          <div class="chat-thread-avatar">${otherName.charAt(0)}</div>
          <div>
            <div class="chat-thread-name">${otherName}</div>
            <div class="chat-thread-preview">${itemTitle}</div>
          </div>
        </div>
      `;
    }).join("");
  } catch (err) {
    showToast("Failed to load chats");
  }
}

async function openChatFromList(chatId) {
  const chat = await apiGetMessages(chatId);
  const other = chat.participants.find(p => (p._id || p) != currentUser.id) || { name: "Student" };
  activeChatId = chatId;

  openChatModal({
    _id: chat._id,
    participantName: other.name,
    itemTitle: chat.item ? chat.item.title : "Deleted Item",
    messages: chat.messages
  });
}
