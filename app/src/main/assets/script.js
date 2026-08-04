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
   * 8. Live Theme Switcher Engine
   * ------------------------------------------------------------------------- */
  window.switchTheme = function(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);

    // Update active state in navbar pills
    document.querySelectorAll('.theme-pill').forEach(pill => {
      if (pill.classList.contains(themeName)) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    const themeTitles = {
      cyber: 'Midnight Cyber Mode',
      gold: 'Royal Gold Luxury',
      emerald: 'Swadeshi Emerald Green',
      crimson: 'Sunset Crimson Tech',
      light: 'Clean Corporate Light'
    };

    window.showToast(`थीम बदलली: ${themeTitles[themeName] || themeName}`);
  };

  /* -------------------------------------------------------------------------
   * 9. Toast Notification System
   * ------------------------------------------------------------------------- */
  window.showToast = function(msg) {
    const toast = document.getElementById('toastNotification');
    const msgSpan = document.getElementById('toastMessage');
    if (toast && msgSpan) {
      msgSpan.textContent = msg;
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 3000);
    }
  };

  /* -------------------------------------------------------------------------
   * 10. Design Inspector Engine
   * ------------------------------------------------------------------------- */
  const inspectorModal = document.getElementById('inspectorModal');

  window.inspectDesign = function(title, category, color1, color2, color3, featuresStr) {
    document.getElementById('inspectorTitle').textContent = title;
    document.getElementById('inspectorCategoryTag').textContent = category;
    document.getElementById('inspectorFeatures').textContent = `✨ ${featuresStr}`;
    
    document.getElementById('swatch1').style.backgroundColor = color1;
    document.getElementById('swatch2').style.backgroundColor = color2;
    document.getElementById('swatch3').style.backgroundColor = color3;

    document.getElementById('mockupUrlBar').textContent = `https://webkarstudio.com/preview/${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    // Generate dynamic live CSS canvas preview
    const canvas = document.getElementById('mockupCanvas');
    canvas.innerHTML = `
      <div style="background:${color2};padding:14px 18px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;">
        <div style="font-weight:800;color:#FFF;font-size:1.1rem;display:flex;align-items:center;gap:6px;">
          <span style="width:12px;height:12px;border-radius:50%;background:${color1};"></span>
          ${title}
        </div>
        <div style="font-size:0.75rem;background:${color1};color:#FFF;padding:4px 10px;border-radius:20px;font-weight:700;">Live Demo</div>
      </div>

      <div style="background:rgba(255,255,255,0.04);border:1px solid ${color1}40;padding:20px;border-radius:12px;margin-top:10px;">
        <h4 style="color:${color1};font-size:1.2rem;font-weight:800;margin-bottom:8px;">${title} - Lead Engine</h4>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:14px;">हे लेआउट खास ${category} साठी बनवले असून ग्राहकांना आकर्षित करणारे आहे.</p>
        
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:10px;">
          <div style="background:${color2};padding:10px;border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:${color1};font-size:0.9rem;">Fast Speed</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">99/100 Score</div>
          </div>
          <div style="background:${color2};padding:10px;border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:${color1};font-size:0.9rem;">Mobile Ready</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">100% Adaptive</div>
          </div>
          <div style="background:${color2};padding:10px;border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:${color1};font-size:0.9rem;">SEO Ready</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">Google Rank #1</div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('inspectorWhatsAppBtn').onclick = function() {
      window.openWhatsApp(`नमस्कार Webkar Studio, मला ${title} (${category}) टेम्पलेट निवडायचे आहे.`);
    };

    if (inspectorModal) inspectorModal.classList.add('active');
  };

  window.closeInspectorModal = function() {
    if (inspectorModal) inspectorModal.classList.remove('active');
  };

  window.setInspectorDevice = function(deviceType) {
    const frame = document.getElementById('mockupFrame');
    const btns = document.querySelectorAll('.device-btn');

    btns.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if (frame) {
      frame.className = `mockup-viewport-frame ${deviceType}`;
    }
  };

  /* -------------------------------------------------------------------------
   * 11. Website Cost Estimator Calculator Engine
   * ------------------------------------------------------------------------- */
  let currentCategory = { name: 'Starter Landing Page', price: 7999, time: '3-5 Days' };
  let selectedAddons = [];

  window.selectCalcCategory = function(card, name, price, time) {
    document.querySelectorAll('.calc-radio-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    currentCategory = { name, price, time };
    updateCalcTotal();
  };

  window.toggleCalcAddon = function(card, name, price) {
    card.classList.toggle('checked');
    const index = selectedAddons.findIndex(a => a.name === name);
    if (index > -1) {
      selectedAddons.splice(index, 1);
    } else {
      selectedAddons.push({ name, price });
    }
    updateCalcTotal();
  };

  function updateCalcTotal() {
    let total = currentCategory.price;
    selectedAddons.forEach(a => total += a.price);

    const priceEl = document.getElementById('calcTotalPrice');
    const timeEl = document.getElementById('calcDeliveryTime');
    const breakdownEl = document.getElementById('calcBreakdownList');

    if (priceEl) priceEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    if (timeEl) timeEl.textContent = `⚡ ${currentCategory.time} मध्ये तयार!`;

    if (breakdownEl) {
      let html = `<li class="calc-breakdown-item"><span>${currentCategory.name}</span><span>₹${currentCategory.price.toLocaleString('en-IN')}</span></li>`;
      selectedAddons.forEach(a => {
        html += `<li class="calc-breakdown-item"><span>+ ${a.name}</span><span>+₹${a.price.toLocaleString('en-IN')}</span></li>`;
      });
      breakdownEl.innerHTML = html;
    }
  }

  window.sendCalculatedQuote = function() {
    let total = currentCategory.price;
    let text = `नमस्कार Webkar Studio,\n\nमी Cost Estimator द्वारे वेबसाईटचे बजेट कॅल्क्युलेट केले आहे:\n\n📌 पॅकेज: ${currentCategory.name} (₹${currentCategory.price.toLocaleString('en-IN')})\n`;
    
    if (selectedAddons.length > 0) {
      text += `➕ अ‍ॅड-ऑन्स:\n`;
      selectedAddons.forEach(a => {
        text += `- ${a.name} (+₹${a.price.toLocaleString('en-IN')})\n`;
        total += a.price;
      });
    }

    text += `\n💰 एकूण अंदाजित खर्च: ₹${total.toLocaleString('en-IN')}\n⚡ अंदाजित कालावधी: ${currentCategory.time}\n\nमला हा प्लॅन फायनल करायचा आहे.`;
    window.openWhatsApp(text);
  };
});
