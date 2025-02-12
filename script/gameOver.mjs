document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title");
  const skullIcon = document.querySelector(".game-box");
  const retryButton = document.getElementById("retry-btn");
  const levelText = document.querySelector(".level-text span");
  const container = document.querySelector(".container-game-over");

  // Retrieve current level and background from localStorage
  const currentLevel = localStorage.getItem("currentLevel") || 1;
  const backgroundPath = `/assets/Backgrounds/Backgrounds/game_background_${currentLevel}.png`;

  levelText.textContent = currentLevel;
  container.style.backgroundImage = `url('${backgroundPath}')`;

  // Glitch effect for title
  setInterval(() => {
    title.classList.toggle("glitch");
  }, 500);

  // Vibration effect for skull icon
  setInterval(() => {
    skullIcon.classList.toggle("shake");
  }, 200);

  // Retry button event listener
  retryButton.addEventListener("click", () => {
    window.location.href = `/src/pages/level_${currentLevel}.html`;
  });
});

const style = document.createElement("style");
style.innerHTML = `
    @keyframes glitch {
      0% { text-shadow: 4px 4px #0f1923, -4px -4px gray; }
      25% { text-shadow: -4px -4px #0f1923, 4px 4px gray; }
      50% { text-shadow: 4px -4px #0f1923, -4px 4px gray; }
      75% { text-shadow: -4px 4px #0f1923, 4px -4px gray; }
      100% { text-shadow: 4px 4px #0f1923, -4px -4px gray; }
    }
  
    .glitch {
      animation: glitch 0.1s infinite alternate;
    }
  `;
document.head.appendChild(style);
