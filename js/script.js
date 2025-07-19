// ==== NavBar Toggle (Modern Mobile Nav) ====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Lock/unlock body scroll for nav and modal (used in both)
function lockBodyScroll() {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = 'fixed';
  document.body.style.width = '100vw';
  document.body.style.left = '0';
  document.body.style.overflow = 'hidden';
}
function unlockBodyScroll() {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.left = '';
  document.body.style.overflow = '';
  document.body.style.top = '';
  if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
  // For accessibility
  menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active') ? 'true' : 'false');
  if(window.innerWidth <= 900 && navLinks.classList.contains('active')){
    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }
});

// Auto close menu on link click (for mobile nav)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if(window.innerWidth <= 900 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      unlockBodyScroll();
    }
  });
});

// Close the nav menu if window is resized to desktop
window.addEventListener('resize', () => {
  if(window.innerWidth > 900) {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    unlockBodyScroll();
  }
});

// ==== Contact Form Handling ====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formMessage.classList.add('visible');
  setTimeout(() => {
    formMessage.classList.remove('visible');
    contactForm.reset();
  }, 3000);
});

// ==== Project Modal Gallery ====
// Album data for each project
const projectAlbums = {
  1: [
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
  ],
  2: [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80"
  ],
  3: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
  ],
  4: [
    "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80"
  ]
};

const workItems = document.querySelectorAll(".work-item");
const modal = document.getElementById("modalGallery");
const modalImage = document.getElementById("modalImage");
const modalThumbnails = document.getElementById("modalThumbnails");
const closeModal = document.getElementById("closeModal");
const modalIndex = document.getElementById("modalIndex");

let currentAlbum = [];
let currentIndex = 0;

// Open modal gallery for the selected project
workItems.forEach(item => {
  item.addEventListener('click', () => {
    const project = item.getAttribute('data-project');
    openAlbum(project);
  });
});

function openAlbum(project) {
  currentAlbum = projectAlbums[project];
  currentIndex = 0;
  renderAlbum(currentAlbum, currentIndex);
  modal.classList.add('active');
  lockBodyScroll();
  setTimeout(()=>modal.focus(),200); // accessibility
}

function renderAlbum(album, index) {
  modalImage.src = album[index];
  // Show Instagram-like image index
  if (modalIndex) modalIndex.textContent = `${index + 1} / ${album.length}`;
  modalThumbnails.innerHTML = '';
  album.forEach((imgSrc, i) => {
    const thumb = document.createElement('img');
    thumb.src = imgSrc;
    if(i === index) thumb.classList.add('active');
    thumb.addEventListener('click', () => {
      currentIndex = i;
      renderAlbum(album, i);
    });
    modalThumbnails.appendChild(thumb);
  });
}

function closeModalGallery() {
  modal.classList.remove('active');
  unlockBodyScroll();
}
closeModal.addEventListener('click', closeModalGallery);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModalGallery();
});
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('active')) return;
  if (e.key === "ArrowRight" && currentIndex < currentAlbum.length - 1) {
    currentIndex++;
    renderAlbum(currentAlbum, currentIndex);
  }
  if (e.key === "ArrowLeft" && currentIndex > 0) {
    currentIndex--;
    renderAlbum(currentAlbum, currentIndex);
  }
  if (e.key === "Escape") closeModalGallery();
});

// ==== Mobile swipe navigation for modal (Instagram style) ====
let startX = null, diffX = null;
const isMobile = () => window.innerWidth <= 700;

modalImage.addEventListener('touchstart', function(e) {
  if (!isMobile() || !modal.classList.contains('active')) return;
  if (e.touches.length === 1) {
    startX = e.touches[0].clientX;
  }
});
modalImage.addEventListener('touchmove', function(e) {
  if (!isMobile() || !modal.classList.contains('active')) return;
  if (!startX) return;
  diffX = e.touches[0].clientX - startX;
});
modalImage.addEventListener('touchend', function(e) {
  if (!isMobile() || !modal.classList.contains('active')) return;
  if (diffX === null) return;
  if (Math.abs(diffX) > 60) {
    if (diffX < 0 && currentIndex < currentAlbum.length - 1) {
      currentIndex++;
      renderAlbum(currentAlbum, currentIndex);
    } else if (diffX > 0 && currentIndex > 0) {
      currentIndex--;
      renderAlbum(currentAlbum, currentIndex);
    }
  }
  startX = null; diffX = null;
});
