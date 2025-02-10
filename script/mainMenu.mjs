// Ambil semua tombol di dalam main menu
const buttons = document.querySelectorAll(".btn-main-menu, .btn-switchHero");

// Ambil elemen audio
const clickSound = document.getElementById("click-sound");

// Fungsi untuk memainkan suara klik
function playClickSound() {
  clickSound.currentTime = 0; // Reset audio agar bisa dimainkan dari awal
  clickSound.play().catch((error) => console.error("Gagal memutar suara:", error));
}

// Tambahkan event listener ke semua tombol
buttons.forEach((button) => {
  button.addEventListener("click", playClickSound);
});

// Fungsi untuk tombol "Quit"
const quit = document.getElementById("quit");
quit.addEventListener("click", () => {
  window.location.href = "about:blank"; // Redirect ke halaman kosong
});
