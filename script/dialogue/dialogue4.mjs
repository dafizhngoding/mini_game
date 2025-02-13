const dialogs = [
  {
    text: "",
    speaker: "hero",
  },
  {
    text: "",
    speaker: "hero",
  },
  {
    text: "",
    speaker: "jedd",
  },
  {
    text: "",
    speaker: "hero",
  },
  {
    text: "",
    speaker: "jedd",
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
  } else if (current.speaker === "jedd") {
    characterImg.src = "/assets/Main Character/Hero 2/Bernafas.gif";
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
