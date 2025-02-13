const dialogs = [
  {
    text: "A.. Aku Dimana?",
    speaker: "hero",
  },
  {
    text: "S.. Siapa kalian?",
    speaker: "hero",
  },
  {
    text: "Kalian Manusia kan?",
    speaker: "hero",
  },
  {
    text: "HAHAHA... Terlambat! Kotoran - kotoran ini telah mengubah kami",
    speaker: "goblin",
  },
  {
    text: "Kau tukang rongsok tidak layak mengusik wilayah kami!",
    speaker: "ogre",
  },
  {
    text: "Hati - hati! Mereka akan menyerangmu apabila terlalu dekat, Tekan E untuk bertarung",
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

  prevBtn.style.display = currentDialog === 0 ? "none" : "inline-block";

  nextBtn.innerText = currentDialog === dialogs.length - 1 ? "Mulai" : "Berikutnya";

  if (current.speaker === "hero") {
    characterImg.src = "/assets/Main Character/Hero 1/Bernafas.gif";
  } else if (current.speaker === "goblin") {
    characterImg.src = "/assets/Mobs/Goblin/Bernafas.gif";
  } else if (current.speaker === "ogre") {
    characterImg.src = "/assets/Mobs/Ogre/Bernafas.gif";
  } else if (current.speaker === "tutorial") {
    characterImg.src = "/assets/Icons/Heroic.png";
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
    window.location.href = "/src/pages/levels/level_2.html";
  }
});

updateDialog();
