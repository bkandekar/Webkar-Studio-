/**
 * Webkar Studio - Interactive JavaScript Application
 * Handcrafted pure Vanilla JS (No external libraries)
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '919876543210';

  // Helper: Open WhatsApp with encoded message
  window.openWhatsApp = function(customMessage) {
    const text = customMessage || "नमस्कार Webkar Studio, मला नवीन वेबसाईटबद्दल फ्री कन्सल्टेशन हवे आहे.";
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  /* -------------------------------------------------------------------------
   * 1. Mobile Navigation Drawer
   * ------------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  /* -------------------------------------------------------------------------
   * 2. Active Scroll Navigation Link Highlight
   * ------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  /* -------------------------------------------------------------------------
   * 3. Portfolio Project Filtering
   * ------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  /* -------------------------------------------------------------------------
   * 4. Auto-Sliding Testimonials Carousel
   * ------------------------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  let currentIndex = 0;
  let autoSlideTimer = null;

  function updateSliderPosition() {
    if (!track) return;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
    if (slides.length === 0) return;
    currentIndex = (currentIndex + 1) % slides.length;
    updateSliderPosition();
  }

  function prevSlide() {
    if (slides.length === 0) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSliderPosition();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 4500);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  if (track) {
    track.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    track.addEventListener('mouseleave', startAutoSlide);
    startAutoSlide();
  }

  /* -------------------------------------------------------------------------
   * 5. FAQ Accordion
   * ------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* -------------------------------------------------------------------------
   * 6. Booking Modal Logic
   * ------------------------------------------------------------------------- */
  const modalOverlay = document.getElementById('consultationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const triggerBtns = document.querySelectorAll('.open-modal-btn');
  const modalForm = document.getElementById('modalForm');

  window.openModal = function(planName) {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      if (planName && document.getElementById('modalProjectReq')) {
        document.getElementById('modalProjectReq').value = planName;
      }
    }
  };

  window.closeModal = function() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  };

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || '';
      openModal(plan);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value.trim();
      const phone = document.getElementById('modalPhone').value.trim();
      const req = document.getElementById('modalProjectReq').value;

      const message = `नमस्कार Webkar Studio,\n\nमी वेबसाईटसाठी कन्सल्टेशन बुक करत आहे:\n👤 नाव: ${name}\n📞 फोन: ${phone}\n🎯 गरज / प्लॅन: ${req}\n\nकृपया माझ्याशी लवकरात लवकर संपर्क साधा.`;
      
      closeModal();
      openWhatsApp(message);
    });
  }

  /* -------------------------------------------------------------------------
   * 7. Main Contact Form Submission
   * ------------------------------------------------------------------------- */
  const contactForm = document.getElementById('mainContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const service = document.getElementById('contactService').value;
      const details = document.getElementById('contactMessage').value.trim();

      const message = `नमस्कार Webkar Studio,\n\nमाझी वेबसाईट इन्क्वायरी:\n👤 नाव: ${name}\n📞 फोन: ${phone}\n💼 सर्व्हिस: ${service}\n📝 अधिक माहिती: ${details || 'माहिती उपलब्ध नाही'}\n\nमला ही वेबसाईट लवकरात लवकर बनवायची आहे.`;

      openWhatsApp(message);
    });
  }
});
