document.addEventListener("DOMContentLoaded", function () {
  const levels = document.querySelectorAll(".level");
  const levelPopup = document.getElementById("level-popup");
  const levelTitle = document.getElementById("level-title");
  const enterLevelBtn = document.getElementById("enter-level-btn");
  const cancelLevelBtn = document.getElementById("cancel-level-btn");
  const closeLevelBtn = document.getElementById("close-level-btn");
  const nextChapterBtn = document.getElementById("next-chapter-btn");
  const nextChapterPopup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("close-btn");
  let selectedLevel = null;

  function showPopup(popup) {
    popup.classList.add("show");
  }

  function hidePopup(popup) {
    popup.classList.remove("show");
  }

  levels.forEach((level) => {
    level.addEventListener("click", function () {
      if (!this.classList.contains("locked")) {
        selectedLevel = this.getAttribute("data-level");
        levelTitle.textContent = `Enter Level ${selectedLevel}`;
        showPopup(levelPopup);
      }
    });
  });

  enterLevelBtn.addEventListener("click", function () {
    window.location.href = "/src/pages/levels/level_" + selectedLevel + ".html";
    hidePopup(levelPopup);
  });

  cancelLevelBtn.addEventListener("click", function () {
    hidePopup(levelPopup);
  });

  closeLevelBtn.addEventListener("click", function () {
    hidePopup(levelPopup);
  });

  nextChapterBtn.addEventListener("click", function () {
    showPopup(nextChapterPopup);
  });

  closePopupBtn.addEventListener("click", function () {
    hidePopup(nextChapterPopup);
  });

  window.addEventListener("click", function (event) {
    if (event.target === levelPopup) {
      hidePopup(levelPopup);
    }
    if (event.target === nextChapterPopup) {
      hidePopup(nextChapterPopup);
    }
  });
});
