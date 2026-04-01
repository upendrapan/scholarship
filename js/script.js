const APP_CONFIG = window.APP_CONFIG || {};
const RECEIVER_NUMBER = APP_CONFIG.receiverNumber || "000000000000";

const form = document.getElementById("scholarshipForm");
const submitBtn = document.getElementById("submitBtn");

const resultOverlay = document.getElementById("resultOverlay");
const loaderContainer = document.getElementById("loaderContainerV8");
const successContainer = document.getElementById("successContainerV8");
const statusText = document.getElementById("v8StatusText");
const claimButton = document.getElementById("claimButtonV8");

function buildWhatsappUrl(data) {
  const { email, mobile, month, day, year, level, field } = data;
  const message = `Hi ScholarshipBoard! I just checked for scholarships. 
  
Profile:
- Email: ${email}
- Mobile: ${mobile}
- Birthday: ${month}/${day}/${year}
- Level: ${level}
- Field: ${field}

Please send me my scholarship guide!`;

  return `https://wa.me/${RECEIVER_NUMBER}?text=${encodeURIComponent(message)}`;
}

function validateForm() {
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const month = document.getElementById("birthMonth").value;
  const day = document.getElementById("birthDay").value;
  const year = document.getElementById("birthYear").value;
  const level = document.getElementById("studyLevel").value;
  const field = document.getElementById("fieldOfStudy").value;

  if (!email || !mobile || !month || !day || !year || !level || !field) {
    return null;
  }

  return { email, mobile, month, day, year, level, field };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = validateForm();
  if (!formData) {
    alert("Please fill in all fields.");
    return;
  }

  // UI state: Show Overlay & Reset View
  resultOverlay.classList.remove("hidden");
  loaderContainer.classList.remove("hidden");
  successContainer.classList.add("hidden");
  
  const steps = [
    "Analyzing profile...",
    "Scanning global database...",
    "Matching with 100% scholarships...",
    "Finalizing your matches!"
  ];
  
  let stepIndex = 0;
  const stepInterval = setInterval(() => {
    stepIndex++;
    if (stepIndex < steps.length) {
      statusText.textContent = steps[stepIndex];
    } else {
      clearInterval(stepInterval);
      showFinalResult(formData);
    }
  }, 1000);
});

function showFinalResult(data) {
  // Switch Views
  loaderContainer.classList.add("hidden");
  successContainer.classList.remove("hidden");
  
  // Set link
  claimButton.href = buildWhatsappUrl(data);
}

// Generic WhatsApp Links
const genericMsg = encodeURIComponent("Hi ScholarshipBoard! I want to know more about scholarships.");
const genericUrl = `https://wa.me/${RECEIVER_NUMBER}?text=${genericMsg}`;

const footerBtn = document.getElementById("footerWhatsappBtn");
const footerContact = document.getElementById("footerWhatsappContact");

if (footerBtn) footerBtn.href = genericUrl;
if (footerContact) footerContact.href = genericUrl;

// Mobile Menu Toggle Logic
const mobileToggle = document.querySelector(".mobile-toggle");
const navCenter = document.querySelector(".nav-center");
const hasDropdowns = document.querySelectorAll(".has-dropdown");

if (mobileToggle && navCenter) {
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    navCenter.classList.toggle("active");
  });
}

// Handle dropdowns on mobile (click to expand)
hasDropdowns.forEach(dropdown => {
  const link = dropdown.querySelector("a");
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      dropdown.classList.toggle("active");
    }
  });
});
// Testimonials Slider Logic (v12)
const TESTIMONIALS_DATA = [
  {
    quote: "ScholarshipBoard finally connected me with the right opportunities with clarity resulting in a full-ride scholarship.",
    sub: "Trust their matching engine — the curated list they delivered completely transformed my college application journey.",
    author: "Sarah Jenkins",
    title: "Undergraduate at Stanford University"
  },
  {
    quote: "The personalized matching saved me hundreds of hours. I found three perfectly matched scholarships in minutes.",
    sub: "As a postgraduate student, finding niche funding is hard. This platform made it effortless and successful.",
    author: "David Chen",
    title: "Master's Student at MIT"
  },
  {
    quote: "I never thought I could study abroad without taking huge loans. ScholarshipBoard matched me with 100% funding.",
    sub: "Their database is truly expert-vetted. Every lead I followed was legitimate and high-value.",
    author: "Elena Rodriguez",
    title: "PhD Candidate at Yale University"
  }
];

const testimonialAvatars = document.querySelectorAll('#testimonial-avatars .avatar-v12');
const testimonialInner = document.getElementById('testimonial-inner');

if (testimonialAvatars.length > 0 && testimonialInner) {
  const quoteText = testimonialInner.querySelector('.quote-text-v12');
  const quoteSub = testimonialInner.querySelector('.quote-sub-v12');
  const authorName = testimonialInner.querySelector('.author-name-v12');
  const authorTitle = testimonialInner.querySelector('.author-title-v12');

  testimonialAvatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
      const id = parseInt(avatar.getAttribute('data-id'));
      const data = TESTIMONIALS_DATA[id];

      if (!data || avatar.classList.contains('active-v12')) return;

      // Update Avatars UI
      testimonialAvatars.forEach(a => a.classList.remove('active-v12'));
      avatar.classList.add('active-v12');

      // Start Sliding Transition
      testimonialInner.classList.add('fade-out');

      setTimeout(() => {
        // Update Content
        quoteText.textContent = data.quote;
        quoteSub.textContent = data.sub;
        authorName.textContent = data.author;
        authorTitle.textContent = data.title;

        // Reset for Fade In
        testimonialInner.classList.remove('fade-out');
        testimonialInner.classList.add('fade-in');
        
        // Trigger Reflow
        void testimonialInner.offsetWidth;
        
        testimonialInner.classList.remove('fade-in');
      }, 400); // Wait for fade-out duration
    });
  });
}
