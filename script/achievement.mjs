document.addEventListener("DOMContentLoaded", () => {
  const achievements = document.querySelectorAll(".achievement");
  
  // Ambil achievementData dari localStorage
  const achievementData = JSON.parse(localStorage.getItem("achievementData")) || {};

  // Hitung jumlah achievement yang telah didapatkan
  const achievedCount = Object.keys(achievementData).length;

  // Atur kondisi untuk membuka achievement berdasarkan jumlah achievement yang diperoleh
  if (achievedCount >= 1) {
      achievements[0].classList.remove("locked"); // Trash Cleaner
  }
  if (achievedCount >= 2) {
      achievements[1].classList.remove("locked"); // Monster Slayer
      achievements[2].classList.remove("locked"); // Eco Heroes
  }
  if (achievedCount >= 3) {
      achievements[3].classList.remove("locked"); // Stars Collector
      achievements[4].classList.remove("locked"); // Savior of the world
  }

  // Event listener untuk menampilkan pop-up saat achievement diklik
  achievements.forEach((achievement) => {
      achievement.addEventListener("click", () => {
          if (achievement.classList.contains("locked")) return;

          const title = achievement.querySelector(".description").textContent;
          const description = achievement.querySelector("span").textContent;
          const iconSrc = achievement.querySelector("img").src;

          showAchievementPopup(title, description, iconSrc);
      });
  });

  // Fungsi untuk menampilkan pop-up achievement
  function showAchievementPopup(title, description, iconSrc) {
      let popup = document.querySelector(".achievement-popup");

      if (!popup) {
          popup = document.createElement("div");
          popup.classList.add("achievement-popup");
          popup.innerHTML = `
              <div class="popup-content">
                  <img class="popup-icon" src="" alt="Achievement Icon" />
                  <h2 class="popup-title"></h2>
                  <p class="popup-description"></p>
                  <button class="button close-popup">
                      <span class="button_lg">
                          <span class="button_sl"></span>
                          <span class="button_text">Close</span>
                      </span>
                  </button>
              </div>
          `;
          document.body.appendChild(popup);
      }

      const popupContent = popup.querySelector(".popup-content");
      popup.querySelector(".popup-icon").src = iconSrc;
      popup.querySelector(".popup-title").textContent = title;
      popup.querySelector(".popup-description").textContent = description;

      popup.style.display = "flex";
      popupContent.classList.add("show");

      popup.querySelector(".close-popup").addEventListener("click", () => {
          popupContent.classList.remove("show");
          popupContent.classList.add("hide");

          setTimeout(() => {
              popup.style.display = "none";
              popupContent.classList.remove("hide");
          }, 300);
      });
  }
});
