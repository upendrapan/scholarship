const WHEEL_REWARDS = [
  "Full Scholarship Guide for [Country]",
  "Partial Scholarship Guide for [Country]",
  "Top 10 Scholarships You Can Apply Now",
  "Scholarship Application Checklist",
  "Bonus Tips from Successful Students",
];

const APP_CONFIG = window.APP_CONFIG || {};
const RECEIVER_NUMBER = APP_CONFIG.receiverNumber || "000000000000";
const wheel = document.getElementById("wheel");
const form = document.getElementById("scholarshipForm");
const resultText = document.getElementById("resultText");
const claimButton = document.getElementById("claimButton");
const footerWhatsappBtn = document.getElementById("footerWhatsappBtn");
const footerWhatsappContact = document.getElementById("footerWhatsappContact");

let isSpinning = false;
let currentRotation = 0;

function formatRewardText(template, country) {
  return template.replace("[Country]", country);
}

function buildWhatsappUrl(country) {
  const message = `Hi ScholarshipBoard! I want my scholarship guide for ${country}`;
  return `https://wa.me/${RECEIVER_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildGenericWhatsappUrl() {
  const message = "Hi ScholarshipBoard! I want my scholarship guide";
  return `https://wa.me/${RECEIVER_NUMBER}?text=${encodeURIComponent(message)}`;
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const country = document.getElementById("country").value;
  const studyLevel = document.getElementById("studyLevel").value;
  const fieldOfStudy = document.getElementById("fieldOfStudy").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();

  if (!name || !country || !studyLevel || !fieldOfStudy || !whatsapp) {
    return { valid: false, message: "Please complete all fields before spinning." };
  }

  return { valid: true, country, name };
}

function spinWheel(country) {
  const slices = WHEEL_REWARDS.length;
  const sliceAngle = 360 / slices;
  const rewardIndex = Math.floor(Math.random() * slices);
  const spins = 6;

  // We rotate so the selected slice lands at the top pointer.
  const targetAngle = 360 - (rewardIndex * sliceAngle + sliceAngle / 2);
  currentRotation += spins * 360 + targetAngle;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const reward = formatRewardText(WHEEL_REWARDS[rewardIndex], country);
    resultText.textContent = `Congrats! You unlocked: ${reward}`;
    claimButton.classList.remove("hidden");
    claimButton.href = buildWhatsappUrl(country);
    isSpinning = false;
  }, 5200);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isSpinning) {
    return;
  }

  const validation = validateForm();
  if (!validation.valid) {
    resultText.textContent = validation.message;
    claimButton.classList.add("hidden");
    return;
  }

  isSpinning = true;
  resultText.textContent = "Spinning... good luck!";
  claimButton.classList.add("hidden");
  spinWheel(validation.country);
});

const genericWhatsappUrl = buildGenericWhatsappUrl();
if (footerWhatsappBtn) {
  footerWhatsappBtn.href = genericWhatsappUrl;
}
if (footerWhatsappContact) {
  footerWhatsappContact.href = genericWhatsappUrl;
}
