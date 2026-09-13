/**
 * VITAANIMAL - GUIDED VETERINARY CHATBOT ENGINE
 * Vanilla JavaScript decision tree processor with typing animations and urgency indicators.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const chatTrigger = document.getElementById('chatTrigger');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatReset = document.getElementById('chatReset');
  const chatMessages = document.getElementById('chatMessages');
  const chatOptions = document.getElementById('chatOptions');
  const badgeDot = document.getElementById('badgeDot');

  // State Variables
  let treeData = null;
  let currentNodeId = null;
  let isTyping = false;

  // Initialize Chatbot: Priority to inline JS data window.CHATBOT_TREE_DATA, fallback to fetch JSON
  async function initChatbot() {
    if (window.CHATBOT_TREE_DATA) {
      treeData = window.CHATBOT_TREE_DATA;
      return;
    }

    try {
      const response = await fetch('data/chatbot-tree.json');
      if (!response.ok) throw new Error('Error al cargar la base de conocimiento del chatbot');
      treeData = await response.json();
    } catch (error) {
      console.warn('Chatbot fetch fallback warning:', error);
      // Fallback message if both fail
      if (!treeData) {
        renderErrorMessage('Hubo un problema al cargar el asistente virtual. Por favor intenta recargar la página.');
      }
    }
  }

  // Toggle Chat Window Visibility
  chatTrigger.addEventListener('click', async () => {
    const isActive = chatWindow.classList.toggle('active');
    if (isActive) {
      if (badgeDot) badgeDot.style.display = 'none'; // Hide unread notification dot
      
      if (!treeData) {
        await initChatbot();
      }

      if (!currentNodeId && treeData) {
        startConversation();
      }
    }
  });

  if (chatClose) {
    chatClose.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });
  }

  if (chatReset) {
    chatReset.addEventListener('click', () => {
      if (isTyping) return;
      resetConversation();
    });
  }

  // Start initial conversation flow
  function startConversation() {
    if (!treeData) return;
    chatMessages.innerHTML = '';
    chatOptions.innerHTML = '';
    currentNodeId = null;
    
    // Add initial disclaimer bubble
    const disclaimerEl = document.createElement('div');
    disclaimerEl.className = 'chat-disclaimer';
    disclaimerEl.innerHTML = treeData.disclaimer;
    chatMessages.appendChild(disclaimerEl);

    // Render Welcome Message
    showBotMessage(treeData.welcomeMessage, () => {
      navigateToNode(treeData.startNode);
    });
  }

  // Reset conversation
  function resetConversation() {
    startConversation();
  }

  // Navigate to a node in the decision tree
  function navigateToNode(nodeId) {
    if (!treeData || !treeData.nodes[nodeId]) return;
    currentNodeId = nodeId;
    const node = treeData.nodes[nodeId];

    let fullText = node.message;

    showBotMessage(fullText, () => {
      renderOptions(node);
    }, node.urgency, node.urgencyColor);
  }

  // Render Bot Message with typing animation
  function showBotMessage(text, callback, urgency = null, urgencyColor = null) {
    isTyping = true;
    chatOptions.style.pointerEvents = 'none';

    // Create typing indicator element
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(typingIndicator);
    scrollToBottom();

    // Simulate thinking/typing duration proportional to text length
    const delay = Math.min(600 + text.length * 6, 1500);

    setTimeout(() => {
      // Remove typing indicator
      if (typingIndicator.parentNode) {
        chatMessages.removeChild(typingIndicator);
      }

      // Create message bubble
      const messageRow = document.createElement('div');
      messageRow.className = 'message-row bot';

      let innerHTML = '';
      if (urgency) {
        const colorClass = urgencyColor || 'warning';
        const icon = colorClass === 'danger' ? '🔴' : (colorClass === 'warning' ? '🟡' : '🟢');
        innerHTML += `<div class="urgency-pill ${colorClass}">${icon} Urgencia: ${urgency}</div>`;
      }

      innerHTML += `<div class="bubble">${parseMarkdown(text)}</div>`;
      messageRow.innerHTML = innerHTML;

      chatMessages.appendChild(messageRow);
      scrollToBottom();
      isTyping = false;
      chatOptions.style.pointerEvents = 'auto';

      if (callback) callback();
    }, delay);
  }

  // Render User Message bubble
  function showUserMessage(text) {
    const messageRow = document.createElement('div');
    messageRow.className = 'message-row user';
    messageRow.innerHTML = `<div class="bubble">${text}</div>`;
    chatMessages.appendChild(messageRow);
    scrollToBottom();
  }

  // Render clickable options
  function renderOptions(node) {
    chatOptions.innerHTML = '';

    // If node has options
    if (node.options && node.options.length > 0) {
      node.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'chat-option-btn';
        btn.innerHTML = `<span>${option.text}</span> <span>➔</span>`;
        btn.addEventListener('click', () => {
          if (isTyping) return;
          showUserMessage(option.text);
          chatOptions.innerHTML = '';
          navigateToNode(option.next);
        });
        chatOptions.appendChild(btn);
      });
    }

    // If node is a recommendation result node (leaf node with action)
    if (node.action) {
      const appointmentBtn = document.createElement('button');
      appointmentBtn.className = 'chat-option-btn chat-action-appointment-btn';
      appointmentBtn.innerHTML = `📅 ${node.action}`;
      appointmentBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const reasonInput = document.getElementById('motivoCita');
          if (reasonInput) {
            reasonInput.value = `Consulta orientada por Chatbot (${node.urgency ? 'Urgencia ' + node.urgency : 'Chequeo'})`;
          }
        }
      });
      chatOptions.appendChild(appointmentBtn);
    }

    // Add Reset option at the bottom
    const resetBtn = document.createElement('button');
    resetBtn.className = 'chat-reset-btn';
    resetBtn.innerText = '🔄 Reiniciar o hacer otra consulta';
    resetBtn.addEventListener('click', () => {
      if (isTyping) return;
      showUserMessage('Quiero hacer otra consulta');
      resetConversation();
    });
    chatOptions.appendChild(resetBtn);
  }

  // Parse simple markdown formatting (bold, headings, bullet lists)
  function parseMarkdown(text) {
    let formatted = text
      .replace(/^### (.*$)/gim, '<strong>$1</strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/- (.*$)/gim, '• $1<br>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
    return formatted;
  }

  // Auto-scroll chat container to latest message
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Render error message
  function renderErrorMessage(msg) {
    chatMessages.innerHTML = `<div class="chat-disclaimer" style="border-left-color: #EF4444; background: var(--urgency-danger-bg); color: var(--urgency-danger-text);">${msg}</div>`;
  }

  // Initialize immediately
  initChatbot();
});
