const dialogs = [
  {
    text: "This place used to be full of life… Now it’s just another victim of pollution.",
    speaker: "hero",
  },
  { text: "RAAAAH!! Clean… bad! Filth… good!", speaker: "ogre" },
  {
    text: "Ogres are more aggressive and move faster! Time your attacks and dodge their strikes!",
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
  } else if (current.speaker === "ogre") {
    characterImg.src = "/assets/Mobs/Ogre/Bernafas.gif"; // Update with Goblin image path
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
    window.location.href = "/src/pages/levels/level_3.html";
  }
});

updateDialog();
