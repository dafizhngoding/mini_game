document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title");
  const stars = document.querySelectorAll(".stars img");
  const popup = document.querySelector(".popup");
  const scoreText = document.querySelector(".score span");
  const scorePointsText = document.querySelector(".score-text span");
  const nextLevelButton = document.getElementById("next-level-btn");
  const scoreImage = document.getElementById("score-image");

  // Ambil data sampah dari localStorage
  let collectedTrash =
    JSON.parse(localStorage.getItem("allItemCollected")) || [];
  let trashCount = collectedTrash.length; // Hitung jumlah sampah yang dikumpulkan

  // Ambil data mob dari localStorage
  let collectedMobs =
    JSON.parse(localStorage.getItem("allMobsCollected")) || [];
  let mobCount = collectedMobs.length; // Hitung jumlah mob yang dikumpulkan

  // Simpan data bintang ke localStorage berdasarkan level yang dimainkan
  const currentLevel =
    parseInt(sessionStorage.getItem("currentLevel")) ||
    parseInt(localStorage.getItem("currentLevel")) ||
    1; // Level saat ini

  if (currentLevel === 2) {
    // Jika level saat ini adalah 2, tampilkan gambar mob dan hitung skor berdasarkan mob
    scoreImage.src = "/assets/Mobs/Goblin/Bernafas.gif";
    scoreImage.classList.add("goblin"); // Tambahkan kelas goblin

    // Update tampilan skor mob yang terkumpul
    scoreText.textContent = `${mobCount} / 22`;

    // Hitung total skor (misalnya 300 poin per mob)
    let totalScore = mobCount * 300;

    // Atur gambar bintang berdasarkan jumlah mob yang dikumpulkan
    if (mobCount === 22 || mobCount >= 15) {
      stars.forEach((star) => (star.src = "/assets/items/star1.png"));
    } else if (mobCount < 15) {
      stars[0].src = "/assets/items/star1.png"; // Bintang pertama star1
      stars[1].src = "/assets/items/star2.png"; // Bintang kedua star2
      stars[2].src = "/assets/items/star2.png"; // Bintang ketiga star2
    } else {
      stars[0].src = "/assets/items/star1.png"; // Bintang pertama star1
      stars[1].src = "/assets/items/star1.png"; // Bintang kedua star1
      stars[2].src = "/assets/items/star2.png"; // Bintang ketiga star2
    }

    // Hitung jumlah bintang berdasarkan jumlah mob yang dikumpulkan
    let starCount = 1; // Default 1 bintang

    if (mobCount >= 22) {
      starCount = 3;
    } else if (mobCount >= 15) {
      starCount = 2;
    }

    // Simpan skor bintang hanya jika lebih tinggi dari sebelumnya
    let starsData = JSON.parse(sessionStorage.getItem("starsData")) || {}; // Ambil data bintang sebelumnya
    if (!starsData[currentLevel] || starsData[currentLevel] < starCount) {
      starsData[currentLevel] = starCount;
      let achievementDataLocal = JSON.parse(localStorage.getItem("achievementData")) || {};
      let achievementDataSession = JSON.parse(sessionStorage.getItem("achievementData")) || {};
      if (!achievementDataLocal && !achievementDataSession) {
        localStorage.setItem("achievementData", JSON.stringify({ [currentLevel]: starCount }));
        sessionStorage.setItem("achievementData", JSON.stringify({ [currentLevel]: starCount }));
      } else {
        if (achievementDataSession) {
          sessionStorage.setItem("achievementData", JSON.stringify({ ...achievementDataSession, [currentLevel]: starCount }));
        } else {
          sessionStorage.setItem("achievementData", JSON.stringify({ ...achievementDataLocal, [currentLevel]: starCount }));
        }
        localStorage.setItem("achievementData", JSON.stringify({ ...achievementDataLocal, [currentLevel]: starCount }));
      }
      let starSession = JSON.parse(sessionStorage.getItem("starsData"));
      let starLocal = JSON.parse(localStorage.getItem("starsData"));
      if (!starSession && !starLocal) {
        sessionStorage.setItem("starsData", JSON.stringify(starsData));
        localStorage.setItem("starsData", JSON.stringify(starsData));
      } else {
        if (starSession) {
          sessionStorage.setItem(
            "starsData",
            JSON.stringify({ ...starSession, [currentLevel]: starCount })
          );
        } else {
          sessionStorage.setItem(
            "starsData",
            JSON.stringify({ ...starLocal, [currentLevel]: starCount })
          );
        }
        localStorage.setItem(
          "starsData",
          JSON.stringify({ ...starLocal, [currentLevel]: starCount })
        );
      }
    }
  } else if (currentLevel === 3) {
    // Jika level saat ini adalah 3, tampilkan gambar sampah dan mob
    scoreImage.src = "/assets/items/2.png"; // Gambar sampah
    scoreImage.classList.remove("goblin"); // Hapus kelas goblin jika ada

    // Tambahkan gambar mob di bawah gambar sampah
    const mobImage = document.createElement("img");
    mobImage.src = "/assets/Mobs/Goblin/Bernafas.gif";
    mobImage.id = "mob-image";
    scoreImage.parentNode.appendChild(mobImage);

    // Tambahkan teks untuk jumlah mob yang dikumpulkan
    const mobCountText = document.createElement("div");
    mobCountText.classList.add("mob-count");
    mobCountText.textContent = `Mobs: ${mobCount} / 22`;
    scoreImage.parentNode.appendChild(mobCountText);

    // Update tampilan skor sampah dan mob yang terkumpul
    scoreText.textContent = `${trashCount} / 22 (Trash), ${mobCount} / 22 (Mobs)`;

    // Hitung total skor (misalnya 100 poin per sampah dan 300 poin per mob)
    let totalScore = trashCount * 100 + mobCount * 300;

    // Atur gambar bintang berdasarkan jumlah sampah dan mob yang dikumpulkan
    if (trashCount + mobCount >= 22) {
      stars.forEach((star) => (star.src = "/assets/items/star1.png"));
    } else if (trashCount + mobCount >= 15) {
      stars[0].src = "/assets/items/star1.png"; // Bintang pertama star1
      stars[1].src = "/assets/items/star2.png"; // Bintang kedua star2
      stars[2].src = "/assets/items/star2.png"; // Bintang ketiga star2
    } else {
      stars[0].src = "/assets/items/star1.png"; // Bintang pertama star1
      stars[1].src = "/assets/items/star1.png"; // Bintang kedua star1
      stars[2].src = "/assets/items/star2.png"; // Bintang ketiga star2
    }

    // Hitung jumlah bintang berdasarkan jumlah sampah dan mob yang dikumpulkan
    let starCount = 1; // Default 1 bintang

    if (trashCount + mobCount >= 22) {
      starCount = 3;
    } else if (trashCount + mobCount >= 15) {
      starCount = 2;
    }

    // Simpan skor bintang hanya jika lebih tinggi dari sebelumnya
    let starsData = JSON.parse(sessionStorage.getItem("starsData")) || {}; // Ambil data bintang sebelumnya
    if (!starsData[currentLevel] || starsData[currentLevel] < starCount) {
      starsData[currentLevel] = starCount;
      let achievementDataLocal = JSON.parse(localStorage.getItem("achievementData")) || {};
      let achievementDataSession = JSON.parse(sessionStorage.getItem("achievementData")) || {};
      if (!achievementDataLocal && !achievementDataSession) {
        localStorage.setItem("achievementData", JSON.stringify({ [currentLevel]: starCount }));
        sessionStorage.setItem("achievementData", JSON.stringify({ [currentLevel]: starCount }));
      } else {
        if (achievementDataSession) {
          sessionStorage.setItem("achievementData", JSON.stringify({ ...achievementDataSession, [currentLevel]: starCount }));
        } else {
          sessionStorage.setItem("achievementData", JSON.stringify({ ...achievementDataLocal, [currentLevel]: starCount }));
        }
        localStorage.setItem("achievementData", JSON.stringify({ ...achievementDataLocal, [currentLevel]: starCount }));
      }
      let starSession = JSON.parse(sessionStorage.getItem("starsData"));
      let starLocal = JSON.parse(localStorage.getItem("starsData"));
      if (!starSession && !starLocal) {
        sessionStorage.setItem("starsData", JSON.stringify(starsData));
        localStorage.setItem("starsData", JSON.stringify(starsData));
      } else {
        if (starSession) {
          sessionStorage.setItem(
            "starsData",
            JSON.stringify({ ...starSession, [currentLevel]: starCount })
          );
        } else {
          sessionStorage.setItem(
            "starsData",
            JSON.stringify({ ...starLocal, [currentLevel]: starCount })
          );
        }
        localStorage.setItem(
          "starsData",
          JSON.stringify({ ...starLocal, [currentLevel]: starCount })
        );
      }
    }
  } else {
    // Jika level saat ini bukan 2 atau 3, gunakan logika sampah yang ada
    // Update tampilan skor sampah yang terkumpul
    scoreText.textContent = `${trashCount} / 22`;

    // Hitung total skor (misalnya 100 poin per sampah)
    let totalScore = trashCount * 100;

    // Atur gambar bintang berdasarkan jumlah sampah yang dikumpulkan
    if (trashCount === 22 || trashCount >= 15) {
      stars.forEach((star) => (star.src = "/assets/items/star1.png"));
    } else if (trashCount < 15) {
      stars[0].src = "/assets/items/star1.png"; // Bintang pertama star1
      stars[1].src = "/assets/items/star2.png"; // Bintang kedua star2
      stars[2].src = "/assets/items/star2.png"; // Bintang ketiga star2
    } else {
      stars[0].src = "/assets/items/star1.png"; // Bintang pertama star1
      stars[1].src = "/assets/items/star1.png"; // Bintang kedua star1
      stars[2].src = "/assets/items/star2.png"; // Bintang ketiga star2
    }

    // Hitung jumlah bintang berdasarkan jumlah sampah yang dikumpulkan
    let starCount = 1; // Default 1 bintang

    if (trashCount >= 22) {
      starCount = 3;
    } else if (trashCount >= 15) {
      starCount = 2;
    }

    // Simpan skor bintang hanya jika lebih tinggi dari sebelumnya
    let starsData = JSON.parse(sessionStorage.getItem("starsData")) || {}; // Ambil data bintang sebelumnya
    if (!starsData[currentLevel] || starsData[currentLevel] < starCount) {
      starsData[currentLevel] = starCount;
      let achievementDataLocal = JSON.parse(localStorage.getItem("achievementData")) || {};
      let achievementDataSession = JSON.parse(sessionStorage.getItem("achievementData")) || {};
      if (!achievementDataLocal && !achievementDataSession) {
        localStorage.setItem("achievementData", JSON.stringify({ [currentLevel]: starCount }));
        sessionStorage.setItem("achievementData", JSON.stringify({ [currentLevel]: starCount }));
      } else {
        if (achievementDataSession) {
          sessionStorage.setItem("achievementData", JSON.stringify({ ...achievementDataSession, [currentLevel]: starCount }));
        } else {
          sessionStorage.setItem("achievementData", JSON.stringify({ ...achievementDataLocal, [currentLevel]: starCount }));
        }
        localStorage.setItem("achievementData", JSON.stringify({ ...achievementDataLocal, [currentLevel]: starCount }));
      }
      let starSession = JSON.parse(sessionStorage.getItem("starsData"));
      let starLocal = JSON.parse(localStorage.getItem("starsData"));
      if (!starSession && !starLocal) {
        sessionStorage.setItem("starsData", JSON.stringify(starsData));
        localStorage.setItem("starsData", JSON.stringify(starsData));
      } else {
        if (starSession) {
          sessionStorage.setItem(
            "starsData",
            JSON.stringify({ ...starSession, [currentLevel]: starCount })
          );
        } else {
          sessionStorage.setItem(
            "starsData",
            JSON.stringify({ ...starLocal, [currentLevel]: starCount })
          );
        }
        localStorage.setItem(
          "starsData",
          JSON.stringify({ ...starLocal, [currentLevel]: starCount })
        );
      }
    }
  }

  title.style.opacity = 0;
  stars.forEach((star) => (star.style.opacity = 0));
  popup.style.opacity = 0;
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
    const targetScore = currentLevel === 2 ? mobCount : trashCount;
    const interval = setInterval(() => {
      if (currentScore < targetScore) {
        currentScore++;
        scoreText.textContent = `${currentScore} / 22`;
      } else {
        clearInterval(interval);

        let currentPoints = 0;
        const targetPoints = currentLevel === 2 ? mobCount * 300 : trashCount * 100;
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

  // **Navigasi ke level berikutnya**
  nextLevelButton.addEventListener("click", () => {
    sessionStorage.setItem("currentLevel", currentLevel + 1);
    if (currentLevel >= 3) {
      window.location.href = "/src/pages/mainMenu.html";
      return;
    } else {
      window.location.href =
        "/src/pages/dialogue/dialogue" + (currentLevel + 1) + ".html";
    }
  });
});