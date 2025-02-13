const dialogs = [
  {
    text: "Akhirnya sampah - sampah ini sudah berhasil aku dibersihkan!",
    speaker: "hero",
  },
  {
    text: "Aku harus segera pergi ke daerah perkotaan untuk membersihkan sampah disana!",
    speaker: "hero",
  },
  {
    text: "Menakjubkan! aku telah memperhatikanmu sejak tadi, kamu benar - benar hebat!",
    speaker: "jedd",
  },
  {
    text: "S..siapa kamu?",
    speaker: "hero",
  },
  {
    text: "Salam Kenal, Jedd. Kebetulan aku juga memiliki tujuan yang sama denganmu, yaitu mengembalikan keindahan bumi kita!",
    speaker: "jedd",
  },
];

let currentDialog = 0;
const dialogText = document.getElementById("dialog-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const characterImg = document.getElementById("character-img");



function updateDialog() {
  const current = dialogs[currentDialog];
  dialogText.innerText = current.text;

  prevBtn.style.display = currentDialog === 0 ? "none" : "inline-block";

  nextBtn.innerText = currentDialog === dialogs.length - 1 ? "Tamat" : "Berikutnya";

  if (current.speaker === "hero") {
    characterImg.src = "/assets/Main Character/Hero 1/Bernafas.gif";
  } else if (current.speaker === "jedd") {
    characterImg.src = "/assets/Main Character/Hero 2/Bernafas.gif";
  }
}

prevBtn.addEventListener("click", () => {
  if (currentDialog > 0) {
    currentDialog--;
    updateDialog();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentDialog < dialogs.length - 1) {
    currentDialog++;
    updateDialog();
  } else {
    window.location.href = "/src/pages/theEnd.html";
  }
});

updateDialog();
