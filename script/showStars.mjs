document.addEventListener("DOMContentLoaded", () => {
  let starsData = JSON.parse(sessionStorage.getItem("starsData")) || JSON.parse(localStorage.getItem("starsData")) || {};
  let levels = document.querySelectorAll(".level");

  levels.forEach((level, index) => {
    let levelNumber = parseInt(level.dataset.level);
    let starContainer = level.querySelector(".stars-display");

    // Kosongkan dulu sebelum menambahkan bintang baru
    starContainer.innerHTML = "";

    // Ambil jumlah bintang dari localStorage
    let starCount = starsData[levelNumber] || 0;

    // Tampilkan bintang sesuai jumlah yang tersimpan
    for (let i = 0; i < starCount; i++) {
      let starImg = document.createElement("img");
      starImg.src = "/assets/items/star1.png"; // Gambar bintang
      starImg.alt = "Star";
      starImg.classList.add("star-icon");
      starContainer.appendChild(starImg);
    }

    // Jika level ini sudah selesai (dapat minimal 1 bintang), buka level berikutnya
    if (starCount > 0) {
      let nextLevel = levels[index + 1]; // Ambil level setelahnya
      if (nextLevel) {
        nextLevel.classList.remove("locked"); // Hapus class "locked"
      }
    }
  });
});
