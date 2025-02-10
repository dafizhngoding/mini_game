document.addEventListener("DOMContentLoaded", () => {
  const heroButtons = document.querySelectorAll(".hero-option");
  const errorSound = document.querySelector(
    "audio source[src='/assets/Sounds/button-error.wav']"
  ).parentElement;

  heroButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("locked")) {
        console.log("Hero is locked!");

        // Pastikan suara error dimainkan
        errorSound.currentTime = 0; // Restart audio dari awal
        errorSound
          .play()
          .catch((error) => console.log("Gagal memutar audio:", error));
      } else {
        selectHero(index);
      }
    });
  });
});

function playErrorSound() {
  const errorSound = document.getElementById("error-sound");
  errorSound.currentTime = 0; // Reset audio agar bisa dimainkan berulang kali
  errorSound
    .play()
    .catch((error) => console.error("Gagal memutar suara:", error));
}
