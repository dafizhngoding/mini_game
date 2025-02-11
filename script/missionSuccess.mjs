document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title");
  const stars = document.querySelectorAll(".stars img");
  const popup = document.querySelector(".popup");
  const scoreText = document.querySelector(".score span");
  const scorePointsText = document.querySelector(".score-text span");

  title.style.opacity = 0;
  stars.forEach((star) => (star.style.opacity = 0));
  popup.style.opacity = 0;
  scoreText.textContent = "0 / 20";
  scorePointsText.textContent = "0";

  setTimeout(() => {
    title.style.transition = "opacity 1s ease";
    title.style.opacity = 1;
  }, 500);

  stars.forEach((star, index) => {
    setTimeout(() => {
      star.style.transition = "opacity 0.7s ease, transform 0.5s ease";
      star.style.opacity = 1;
      star.style.transform = "scale(1.2)";
      setTimeout(() => (star.style.transform = "scale(1)"), 500);
    }, 1500 + index * 500);
  });

  setTimeout(() => {
    popup.style.transition = "opacity 1s ease, transform 0.5s ease";
    popup.style.opacity = 1;
    popup.style.transform = "scale(1)";

    let currentScore = 0;
    const targetScore = 16;
    const interval = setInterval(() => {
      if (currentScore < targetScore) {
        currentScore++;
        scoreText.textContent = `${currentScore} / 20`;
      } else {
        clearInterval(interval);

        let currentPoints = 0;
        const targetPoints = 2300;
        const pointsInterval = setInterval(() => {
          if (currentPoints < targetPoints) {
            currentPoints += 50;
            if (currentPoints > targetPoints) currentPoints = targetPoints;
            scorePointsText.textContent = currentPoints;
          } else {
            clearInterval(pointsInterval);
          }
        }, 50);
      }
    }, 100);
  }, 3000);
});
