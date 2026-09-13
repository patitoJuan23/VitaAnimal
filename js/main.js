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
});
