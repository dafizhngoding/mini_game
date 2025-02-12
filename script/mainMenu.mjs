// window.location.href = "/src/loadingScreen.html"
// Ambil semua tombol di dalam main menu
const buttons = document.querySelectorAll(".btn-main-menu, .btn-switchHero");

// Ambil elemen audio
const clickSound = document.getElementById("click-sound");

// Tambahkan event listener ke semua tombol
buttons.forEach((button) => {
  button.addEventListener("click", playClickSound);
});

// Fungsi untuk tombol "Quit"
function quitGame() {
  window.location.href = "about:blank";
}
