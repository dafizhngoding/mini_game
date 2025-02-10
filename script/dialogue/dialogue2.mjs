const dialogs = [
  {
    text: "Another place ruined by waste. I have to keep going… Wait, what’s that?!",
    speaker: "hero",
  },
  {
    text: "Hehehe… A clean one? You don’t belong here!",
    speaker: "goblin",
  },
  { text: "What happened to you?! Are you… human?", speaker: "hero" },
  {
    text: "Too late! The filth has changed us! And now… you’ll be next!",
    speaker: "goblin",
  },
  {
    text: "Press Space to attack! Be careful, Goblins will strike if you get too close!",
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
  nextBtn.innerText = currentDialog === dialogs.length - 1 ? "Play" : "Next";

  // Update image based on the speaker
  if (current.speaker === "hero") {
    characterImg.src = "/assets/Main Character/Hero 1/Bernafas.gif";
  } else if (current.speaker === "goblin") {
    characterImg.src = "/assets/Mobs/Goblin/Bernafas.gif"; // Update with Goblin image path
  } else if (current.speaker === "tutorial") {
    characterImg.src = "/assets/Icons/Heroic.png"; // Update with tutorial icon
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
