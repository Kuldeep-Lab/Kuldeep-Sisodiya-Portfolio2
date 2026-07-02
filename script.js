// ── Typewriter
const roles = ["Frontend Developer", "Web Designer"];
let roleIdx = 0,
  charIdx = 0,
  deleting = false;
const tw = document.getElementById("typewriter-text");
function typeWriter() {
  const cur = roles[roleIdx];
  if (!deleting) {
    tw.textContent = cur.slice(0, ++charIdx);
    if (charIdx === cur.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    tw.textContent = cur.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, deleting ? 50 : 90);
}
typeWriter();

// ── Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// <!-- cyan color - #00CEEA -->
//  color: #a78bfa;
//                        <!-- voliet color - #7c3aed -->
// rgba(46, 190, 211, 0.5)
// rgba(124, 58, 237, 0.12)

// ── Mobile nav
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  iconOpen.classList.toggle("hidden");
  iconClose.classList.toggle("hidden");
});
function closeMobile() {
  mobileMenu.classList.remove("open");
  iconOpen.classList.remove("hidden");
  iconClose.classList.add("hidden");
}

// ── Navbar shadow on scroll
window.addEventListener("scroll", () => {
  document.getElementById("navbar").style.boxShadow =
    window.scrollY > 20 ? "0 4px 30px rgba(0,0,0,0.4)" : "none";
});

// ── Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("submit-btn");
  btn.textContent = "Sending…";
  btn.disabled = true;
  setTimeout(() => {
    btn.style.display = "none";
    document.getElementById("form-success").style.display = "block";
  }, 1200);
}

// ── Bounce keyframe for scroll caret
const style = document.createElement("style");
style.textContent = `@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}`;
document.head.appendChild(style);

const slider = document.getElementById("projectsSlider");
const slides = document.querySelectorAll(".project-slide");

let current = 0;

function slidesPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function updateSlider() {
  const visible = slidesPerView();

  const maxIndex = Math.max(0, slides.length - visible);

  if (current > maxIndex) current = maxIndex;

  const move = (100 / visible) * current;

  slider.style.transform = `translateX(-${move}%)`;
}

document.getElementById("nextProject").addEventListener("click", () => {
  const visible = slidesPerView();

  if (current < slides.length - visible) {
    current++;
    updateSlider();
  }
});

document.getElementById("prevProject").addEventListener("click", () => {
  if (current > 0) {
    current--;
    updateSlider();
  }
});

window.addEventListener("resize", updateSlider);

updateSlider();

setInterval(() => {
  const visible = slidesPerView();

  if (current >= slides.length - visible) {
    current = 0;
  } else {
    current++;
  }

  updateSlider();
}, 3000);
