document.addEventListener("DOMContentLoaded", () => {
  const buttonClickSound = new Audio("/assets/Sounds/button-click.wav");

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      buttonClickSound.currentTime = 0; // Reset waktu audio agar bisa dimainkan berulang kali tanpa delay
      buttonClickSound.play();
    });
  });
});
