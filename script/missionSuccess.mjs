document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title");
  const stars = document.querySelectorAll(".stars img");
  const popup = document.querySelector(".popup");
  const scoreText = document.querySelector(".score span");
  const scorePointsText = document.querySelector(".score-text span");
  const nextLevelButton = document.getElementById("next-level-btn");
  const scoreImage = document.getElementById("score-image");
  const achievementContainer = document.getElementById("achievement-container");
  const achievementList = document.getElementById("achievement-list");

  // Ambil data sampah dari localStorage
  let collectedTrash = JSON.parse(localStorage.getItem("allItemCollected")) || [];
  let trashCount = collectedTrash.length; // Hitung jumlah sampah yang dikumpulkan

  // Ambil data mob dari localStorage
  let collectedMobs = JSON.parse(localStorage.getItem("allMobs")) || [];
  let mobCount = collectedMobs.length; // Hitung jumlah mob yang dikumpulkan

  // Simpan data bintang ke localStorage berdasarkan level yang dimainkan
  const currentLevel = parseInt(sessionStorage.getItem("currentLevel")) ||
    parseInt(localStorage.getItem("currentLevel")) || 1; // Level saat ini

  // Fungsi untuk menambahkan pencapaian ke dalam container
  function addAchievement(achievement, imgSrc) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = achievement;
    img.classList.add("achievement-img");
    li.appendChild(img);
    li.appendChild(document.createTextNode(achievement));
    achievementList.appendChild(li);
  }

  // Tambahkan pencapaian berdasarkan level yang dimainkan
  if (currentLevel === 1) {
    addAchievement("Trash Cleaner", "/assets/Icons/Sampah.png");
  } else if (currentLevel === 2) {
    addAchievement("Pembasmi Monster", "/assets/Icons/Sword.png");
    addAchievement("Heroik", "/assets/Icons/Heroic.png");
  } else if (currentLevel === 3) {
    addAchievement("Star Collector", "/assets/items/star1.png");
    addAchievement("Penyelamat Bumi", "/assets/Icons/Bumi.png");
  }

  // Periksa data pencapaian di localStorage dan tambahkan ke dalam container
  let achievementData = JSON.parse(localStorage.getItem("achievementData")) || {};
  if (achievementData[currentLevel]) {
    Object.keys(achievementData[currentLevel]).forEach((key) => {
      addAchievement(achievementData[currentLevel][key], "/assets/achievements/default.png");
    });
  }

  if (currentLevel === 2) {
    // Jika level saat ini adalah 2, tampilkan gambar mob dan hitung skor berdasarkan mob
    scoreImage.src = "/assets/Mobs/Goblin/Bernafas.gif";
    scoreImage.classList.add("goblin"); // Tambahkan kelas goblin

    // Update tampilan skor mob yang terkumpul
    scoreText.textContent = `${mobCount} / 9`;

    // Hitung total skor (misalnya 150 poin per mob)
    let totalScore = mobCount * 150;

    // Atur gambar bintang berdasarkan jumlah mob yang dikumpulkan
    if (mobCount === 9 || mobCount >= 6) {
      stars.forEach((star) => (star.src = "/assets/items/star1.png"));
    } else if (mobCount <= 5) {
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

    if (mobCount >= 6) {
      starCount = 3;
    } else if (mobCount < 6) {
      starCount = 2;
    }

    // Simpan skor bintang hanya jika lebih tinggi dari sebelumnya
    let starsData = JSON.parse(sessionStorage.getItem("starsData")) || {}; // Ambil data bintang sebelumnya
    if (!starsData[currentLevel] || starsData[currentLevel] < starCount) {
      starsData[currentLevel] = starCount;
      let achievementDataLocal =
        JSON.parse(localStorage.getItem("achievementData")) || {};
      let achievementDataSession =
        JSON.parse(sessionStorage.getItem("achievementData")) || {};
      if (!achievementDataLocal && !achievementDataSession) {
        localStorage.setItem(
          "achievementData",
          JSON.stringify({ [currentLevel]: starCount })
        );
        sessionStorage.setItem(
          "achievementData",
          JSON.stringify({ [currentLevel]: starCount })
        );
      } else {
        if (achievementDataSession) {
          sessionStorage.setItem(
            "achievementData",
            JSON.stringify({
              ...achievementDataSession,
              [currentLevel]: starCount,
            })
          );
        } else {
          sessionStorage.setItem(
            "achievementData",
            JSON.stringify({
              ...achievementDataLocal,
              [currentLevel]: starCount,
            })
          );
        }
        localStorage.setItem(
          "achievementData",
          JSON.stringify({ ...achievementDataLocal, [currentLevel]: starCount })
        );
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
    localStorage.setItem("allMobs", JSON.stringify([]));
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
    mobCountText.textContent = `Mobs: ${mobCount} / 9`;
    scoreImage.parentNode.appendChild(mobCountText);

    // Update tampilan skor sampah dan mob yang terkumpul
    scoreText.textContent = `${trashCount} / 8, ${mobCount} / 9`;

    // Hitung total skor (misalnya 100 poin per sampah dan 150 poin per mob)
    let totalScore = trashCount * 100 + mobCount * 150;

    // Atur gambar bintang berdasarkan jumlah sampah dan mob yang dikumpulkan
    if (trashCount + mobCount >= 17) {
      stars.forEach((star) => (star.src = "/assets/items/star1.png"));
    } else if (trashCount + mobCount >= 12) {
      stars[0].src = "/assets/items/star1.png"; // Bintang pertama star1
      stars[1].src = "/assets/items/star1.png"; // Bintang kedua star2
      stars[2].src = "/assets/items/star2.png"; // Bintang ketiga star2
    } else {
      stars[0].src = "/assets/items/star1.png"; // Bintang pertama star1
      stars[1].src = "/assets/items/star2.png"; // Bintang kedua star1
      stars[2].src = "/assets/items/star2.png"; // Bintang ketiga star2
    }

    // Hitung jumlah bintang berdasarkan jumlah sampah dan mob yang dikumpulkan
    let starCount = 1; // Default 1 bintang

    if (trashCount + mobCount >= 17) {
      starCount = 3;
    } else if (trashCount + mobCount >= 12) {
      starCount = 2;
    }

    // Simpan skor bintang hanya jika lebih tinggi dari sebelumnya
    let starsData = JSON.parse(sessionStorage.getItem("starsData")) || {}; // Ambil data bintang sebelumnya
    if (!starsData[currentLevel] || starsData[currentLevel] < starCount) {
      starsData[currentLevel] = starCount;
      let achievementDataLocal =
        JSON.parse(localStorage.getItem("achievementData")) || {};
      let achievementDataSession =
        JSON.parse(sessionStorage.getItem("achievementData")) || {};
      if (!achievementDataLocal && !achievementDataSession) {
        localStorage.setItem(
          "achievementData",
          JSON.stringify({ [currentLevel]: starCount })
        );
        sessionStorage.setItem(
          "achievementData",
          JSON.stringify({ [currentLevel]: starCount })
        );
      } else {
        if (achievementDataSession) {
          sessionStorage.setItem(
            "achievementData",
            JSON.stringify({
              ...achievementDataSession,
              [currentLevel]: starCount,
            })
          );
        } else {
          sessionStorage.setItem(
            "achievementData",
            JSON.stringify({
              ...achievementDataLocal,
              [currentLevel]: starCount,
            })
          );
        }
        localStorage.setItem(
          "achievementData",
          JSON.stringify({ ...achievementDataLocal, [currentLevel]: starCount })
        );
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
    scoreText.textContent = `${trashCount} / 8`;

    // Hitung total skor (misalnya 100 poin per sampah)
    let totalScore = trashCount * 100;

    // Atur gambar bintang berdasarkan jumlah sampah yang dikumpulkan
    if (trashCount === 8 || trashCount >= 5) {
      stars.forEach((star) => (star.src = "/assets/items/star1.png"));
    } else if (trashCount < 5) {
      stars[0].src = "/assets/items/star1.png"; // Bintang pertama star1
      stars[1].src = "/assets/items/star1.png"; // Bintang kedua star2
      stars[2].src = "/assets/items/star2.png"; // Bintang ketiga star2
    } else {
      stars[0].src = "/assets/items/star1.png"; // Bintang pertama star1
      stars[1].src = "/assets/items/star2.png"; // Bintang kedua star1
      stars[2].src = "/assets/items/star2.png"; // Bintang ketiga star2
    }

    // Hitung jumlah bintang berdasarkan jumlah sampah yang dikumpulkan
    let starCount = 1; // Default 1 bintang

    if (trashCount >= 5) {
      starCount = 3;
    } else if (trashCount < 5) {
      starCount = 2;
    }

    // Simpan skor bintang hanya jika lebih tinggi dari sebelumnya
    let starsData = JSON.parse(sessionStorage.getItem("starsData")) || {}; // Ambil data bintang sebelumnya
    if (!starsData[currentLevel] || starsData[currentLevel] < starCount) {
      starsData[currentLevel] = starCount;
      let achievementDataLocal =
        JSON.parse(localStorage.getItem("achievementData")) || {};
      let achievementDataSession =
        JSON.parse(sessionStorage.getItem("achievementData")) || {};
      if (!achievementDataLocal && !achievementDataSession) {
        localStorage.setItem(
          "achievementData",
          JSON.stringify({ [currentLevel]: starCount })
        );
        sessionStorage.setItem(
          "achievementData",
          JSON.stringify({ [currentLevel]: starCount })
        );
      } else {
        if (achievementDataSession) {
          sessionStorage.setItem(
            "achievementData",
            JSON.stringify({
              ...achievementDataSession,
              [currentLevel]: starCount,
            })
          );
        } else {
          sessionStorage.setItem(
            "achievementData",
            JSON.stringify({
              ...achievementDataLocal,
              [currentLevel]: starCount,
            })
          );
        }
        localStorage.setItem(
          "achievementData",
          JSON.stringify({ ...achievementDataLocal, [currentLevel]: starCount })
        );
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
        if (currentLevel === 3) {
          scoreText.textContent = `${currentScore} / 8`;
        } else if (currentLevel === 2) {
          scoreText.textContent = `${currentScore} / 9`;
        } else {
          scoreText.textContent = `${currentScore} / 22`;
        }
      } else {
        clearInterval(interval);

        let currentPoints = 0;
        const targetPoints =
          currentLevel === 2 ? mobCount * 150 : trashCount * 100; // Perbaiki poin per mob menjadi 150
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
      window.location.href = "/src/pages/dialogue/dialogue4.html";
      return;
    } else {
      window.location.href =
        "/src/pages/dialogue/dialogue" + (currentLevel + 1) + ".html";
    }
  });
});