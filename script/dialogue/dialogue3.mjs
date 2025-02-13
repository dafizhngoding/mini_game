const dialogs = [
  {
    text: "Astaga! Hutan ini dulunya hijau dan indah, tapi sekarang sudah tercemar oleh banyaknya sampah",
    speaker: "hero",
  },
  { text: "GRRR... pembersih sampah!", speaker: "goblin" },
  { text: "Teman - teman, ada tukang rongsok!", speaker: "goblin" },
  { text: "HAHAHA... Tukang rongsok? bisa apa dia?", speaker: "ogre" },
  { text: "Kami sudah menjadi bagian dari semua kekacauan ini, sekarang kau juga akan menjadi bagian kami!", speaker: "orc" },
  {
    text: "Hati - hati! Goblin dapat menyerang dari sisi manapun Tetap waspada, Tekan E untuk bertarung dan jangan lupa untuk mengumpulkan sampah!",
    speaker: "tutorial",
  },
];

let currentDialog = 0;
const dialogText = document.getElementById("dialog-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const characterImg = document.getElementById("character-img");

function updateDialog() {
  const current = dialogs[currentDialog];
  dialogText.innerText = current.text;

  // Hide Prev button if on first dialog
  prevBtn.style.display = currentDialog === 0 ? "none" : "inline-block";

  // Change Next button to Play if on last dialog
  nextBtn.innerText = currentDialog === dialogs.length - 1 ? "Mulai" : "Berikutnya";

  // Update image based on the speaker
  if (current.speaker === "hero") {
    characterImg.src = "/assets/Main Character/Hero 1/Bernafas.gif";
  } else if (current.speaker === "ogre") {
    characterImg.src = "/assets/Mobs/Ogre/Bernafas.gif"; // Update with Goblin image path
  } else if (current.speaker === "tutorial") {
    characterImg.src = "/assets/Icons/Heroic.png"; // Update with tutorial icon
  } else if (current.speaker === "goblin") {
    characterImg.src = "/assets/Mobs/Goblin/Bernafas.gif"; // Update with tutorial icon
  } else if (current.speaker === "orc") {
    characterImg.src = "/assets/Mobs/Orc/Bernafas.gif"; // Update with tutorial icon
  }
}

prevBtn.addEventListener("click", () => {
  if (currentDialog > 0) {
    currentDialog--;
    updateDialog();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentDialog < dialogs.length - 1) {
    currentDialog++;
    updateDialog();
  } else {
    window.location.href = "/src/pages/levels/level_3.html";
  }
});

updateDialog();
