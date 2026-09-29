/**
 * VITAANIMAL - MAIN INTERACTIVE LOGIC
 * Theme switcher, mobile menu, appointment form handling, smooth scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Elements
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // Check saved theme in localStorage or system preference
  const savedTheme = localStorage.getItem('vitaanimal-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.textContent = '☀️';
      localStorage.setItem('vitaanimal-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.textContent = '🌙';
      localStorage.setItem('vitaanimal-theme', 'light');
    }
  }

  // Mobile Menu Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // Appointment Form Submission Handling (Static Simulation)
  const appointmentForm = document.getElementById('appointmentForm');
  const formFeedback = document.getElementById('formFeedback');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nombreCliente').value.trim();
      const pet = document.getElementById('nombreMascota').value.trim();
      const date = document.getElementById('fechaCita').value;

      if (!name || !pet || !date) {
        showFeedback('Por favor completa todos los campos requeridos.', 'danger');
        return;
      }

      // Show loading state
      const submitBtn = appointmentForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⌛ Procesando agendamiento...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        appointmentForm.reset();

        showFeedback(
          `¡Excelente, ${name}! Cita agendada con éxito para <strong>${pet}</strong> el día <strong>${date}</strong>. Nos comunicaremos para confirmación.`,
          'success'
        );
      }, 1200);
    });
  }

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.style.display = 'block';
    formFeedback.className = `chat-disclaimer ${type === 'danger' ? 'urgency-danger' : 'urgency-success'}`;
    formFeedback.style.backgroundColor = type === 'danger' ? 'var(--urgency-danger-bg)' : 'var(--urgency-success-bg)';
    formFeedback.style.color = type === 'danger' ? 'var(--urgency-danger-text)' : 'var(--urgency-success-text)';
    formFeedback.style.borderLeftColor = type === 'danger' ? '#EF4444' : '#10B981';
    formFeedback.style.marginTop = '1rem';
    formFeedback.innerHTML = message;
  }

  // ==================== SIMPLE IN-MEMORY LOGIN & PET MANAGEMENT ====================
  let currentUser = null;
  let petsList = [
    { name: 'Toby', species: 'Perro', breed: 'Golden Retriever', age: '3 años', weight: '25 kg' },
    { name: 'Luna', species: 'Gato', breed: 'Siamesa', age: '1.5 años', weight: '4 kg' }
  ];

  // Modal Elements
  const loginModalOverlay = document.getElementById('loginModalOverlay');
  const openLoginBtn = document.getElementById('openLoginBtn');
  const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');
  const loginForm = document.getElementById('loginForm');
  const userNavSection = document.getElementById('userNavSection');

  const addPetModalOverlay = document.getElementById('addPetModalOverlay');
  const openAddPetModalBtn = document.getElementById('openAddPetModalBtn');
  const closeAddPetModalBtn = document.getElementById('closeAddPetModalBtn');
  const addPetForm = document.getElementById('addPetForm');
  const petsGrid = document.getElementById('petsGrid');
  const petStatusText = document.getElementById('petStatusText');

  // Open/Close Login Modal
  if (openLoginBtn && loginModalOverlay) {
    openLoginBtn.addEventListener('click', () => loginModalOverlay.classList.add('active'));
  }
  if (closeLoginModalBtn && loginModalOverlay) {
    closeLoginModalBtn.addEventListener('click', () => loginModalOverlay.classList.remove('active'));
  }
  if (loginModalOverlay) {
    loginModalOverlay.addEventListener('click', (e) => {
      if (e.target === loginModalOverlay) loginModalOverlay.classList.remove('active');
    });
  }

  // Login Form Submit (In-Memory Only, No backend/database)
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUser').value.trim();
      if (!username) return;

      currentUser = username.split('@')[0];
      loginModalOverlay.classList.remove('active');
      loginForm.reset();
      updateUserUI();
    });
  }

  function updateUserUI() {
    if (currentUser) {
      userNavSection.innerHTML = `
        <span style="font-weight: 600; font-size: 0.9rem; color: var(--primary);">👤 ${currentUser}</span>
        <button class="btn btn-outline" id="logoutBtn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Salir</button>
      `;
      if (petStatusText) {
        petStatusText.innerHTML = `👋 Bienvenido <strong>${currentUser}</strong>. Aquí están tus mascotas registradas:`;
      }
      document.getElementById('logoutBtn').addEventListener('click', () => {
        currentUser = null;
        updateUserUI();
      });
    } else {
      userNavSection.innerHTML = `
        <button class="btn btn-outline" id="openLoginBtn" style="padding: 0.5rem 1rem; font-size: 0.9rem;">🔑 Iniciar Sesión</button>
      `;
      document.getElementById('openLoginBtn').addEventListener('click', () => loginModalOverlay.classList.add('active'));
      if (petStatusText) {
        petStatusText.innerHTML = `💡 Inicia sesión o añade tus mascotas para gestionarlas en tu visita.`;
      }
    }
  }

  // Open/Close Add Pet Modal
  if (openAddPetModalBtn && addPetModalOverlay) {
    openAddPetModalBtn.addEventListener('click', () => addPetModalOverlay.classList.add('active'));
  }
  if (closeAddPetModalBtn && addPetModalOverlay) {
    closeAddPetModalBtn.addEventListener('click', () => addPetModalOverlay.classList.remove('active'));
  }
  if (addPetModalOverlay) {
    addPetModalOverlay.addEventListener('click', (e) => {
      if (e.target === addPetModalOverlay) addPetModalOverlay.classList.remove('active');
    });
  }

  // Add Pet Form Submit
  if (addPetForm) {
    addPetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalPetName').value.trim();
      const species = document.getElementById('modalPetSpecies').value;
      const breed = document.getElementById('modalPetBreed').value.trim() || 'No especificada';
      const age = document.getElementById('modalPetAge').value.trim() || 'No especificada';
      const weight = document.getElementById('modalPetWeight').value.trim() || 'N/A';

      if (!name) return;

      petsList.push({ name, species, breed, age, weight });
      renderPetsGrid();

      addPetModalOverlay.classList.remove('active');
      addPetForm.reset();
    });
  }

  // Render Pets Grid Function
  function renderPetsGrid() {
    if (!petsGrid) return;
    petsGrid.innerHTML = '';

    if (petsList.length === 0) {
      petsGrid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1 / -1;">No hay mascotas registradas aún. ¡Añade la primera!</p>`;
      return;
    }

    petsList.forEach((pet, index) => {
      const emoji = pet.species === 'Perro' ? '🐶' : pet.species === 'Gato' ? '🐱' : pet.species === 'Ave' ? '🦜' : '🐰';
      const card = document.createElement('div');
      card.className = 'pet-card';
      card.innerHTML = `
        <div>
          <div class="pet-card-header">
            <div class="pet-avatar">${emoji}</div>
            <div class="pet-title">
              <h4>${pet.name}</h4>
              <span>${pet.species} • ${pet.breed}</span>
            </div>
          </div>
          <ul class="pet-info-list">
            <li><span>Edad:</span> <strong>${pet.age}</strong></li>
            <li><span>Peso:</span> <strong>${pet.weight}</strong></li>
            <li><span>Estado:</span> <strong style="color: #10B981;">Al Día</strong></li>
          </ul>
        </div>
        <div class="pet-card-actions">
          <button class="btn btn-outline" style="width:100%; font-size:0.85rem; padding: 0.5rem;" onclick="agendarParaMascota('${pet.name}', '${pet.species}')">📅 Agendar Cita</button>
        </div>
      `;
      petsGrid.appendChild(card);
    });
  }

  // Helper window function for booking from pet card
  window.agendarParaMascota = function(name, species) {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const petInput = document.getElementById('nombreMascota');
      const speciesSelect = document.getElementById('especie');
      if (petInput) petInput.value = name;
      if (speciesSelect) {
        if (species === 'Perro') speciesSelect.value = 'Perro';
        else if (species === 'Gato') speciesSelect.value = 'Gato';
        else speciesSelect.value = 'Ave / Exótico';
      }
    }
  };

  // Initial render of pets
  renderPetsGrid();
});
