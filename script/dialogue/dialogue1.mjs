const dialogs = [
  {
    text: "This place is a mess… If I don’t start cleaning, who will?",
speaker: "hero"
    ,
  },
  {
    text: "Press F to pick up trash and clean the area.",
speaker:  "tutorial"

  }, {
    text: "What was that sound? … Maybe just the wind. I should keep going.",
speaker: "hero",
  }
];
let currentDialog = 0;
const dialogText = document.getElementById("dialog-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const characterImg = document.getElementById("character-img");

function updateDialog() {
  dialogText.innerText = dialogs[currentDialog];

  // Hide Prev button if on first dialog
  prevBtn.style.display = currentDialog === 0 ? "none" : "inline-block";

  // Change Next button to Play if on last dialog
  if (currentDialog === dialogs.length - 1) {
    nextBtn.innerText = "Play";
  } else {
    nextBtn.innerText = "Next";
  }

  // Change character image at second dialog
  if (currentDialog === 1) {
    characterImg.src = "/assets/Icons/Heroic.png";
  } else {
    characterImg.src = "/assets/Main Character/Hero 1/Bernafas.gif";
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
    window.location.href = "/src/pages/levels/level_1.html";
  }
});

updateDialog();
