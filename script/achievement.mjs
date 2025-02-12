document.addEventListener("DOMContentLoaded", () => {
    const achievements = document.querySelectorAll(".achievement");
  
    achievements.forEach((achievement) => {
      achievement.addEventListener("click", () => {
        if (achievement.classList.contains("locked")) return;
  
        const title = achievement.querySelector(".description").textContent;
        const description = achievement.querySelector("span").textContent;
        const iconSrc = achievement.querySelector("img").src;
  
        showAchievementPopup(title, description, iconSrc);
      });
    });
  
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
        }, 300); // Delay 300ms sesuai dengan animasi fade-out
      });
    }
  });
  