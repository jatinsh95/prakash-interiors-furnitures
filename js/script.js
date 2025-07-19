// ========== NavBar Toggle (Mobile) ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  menuToggle.classList.toggle('active');
});

// ========== Contact Form Handling ==========
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

// ========== Project Modal Gallery ==========

// 1. Album data for each project. Use your own images
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
  document.body.style.overflow = 'hidden'; // Prevent background scroll
  setTimeout(()=>modal.focus(),200); // for accessibility
}

// Render main image and thumbnails in modal
function renderAlbum(album, index) {
  modalImage.src = album[index];
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

// Close modal when cross button or backdrop is clicked
closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});
modal.addEventListener('click', e => {
  if(e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Keyboard navigation for modal (left/right/esc)
document.addEventListener('keydown', (e) => {
  if(!modal.classList.contains('active')) return;
  if(e.key === "ArrowRight") {
    if(currentIndex < currentAlbum.length - 1) {
      currentIndex++;
      renderAlbum(currentAlbum, currentIndex);
    }
  }
  if(e.key === "ArrowLeft") {
    if(currentIndex > 0) {
      currentIndex--;
      renderAlbum(currentAlbum, currentIndex);
    }
  }
  if(e.key === "Escape") {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});
