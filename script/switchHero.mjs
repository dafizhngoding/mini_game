const heroes = [
  { name: "Steve", img: "/assets/Main Character/Hero 1/Bernafas.gif" },
  { name: "Jett", img: "/assets/Main Character/Hero 2/Bernafas.gif" },
  { name: "Sova", img: "/assets/Main Character/Hero 3/Bernafas.gif" },
];

let selectedHero = 0;

function selectHero(index) {
  selectedHero = index;
  document.getElementById("hero-image").src = heroes[index].img;
  document.getElementById("hero-name").innerText = heroes[index].name;
}

function confirmSelection() {
  console.log(`Kamu memilih ${heroes[selectedHero].name}!`);
}

// Inisialisasi tampilan pertama
selectHero(0);
function selectHero(index) {
  const heroButton = document.getElementsByClassName("hero-option")[index];
  if (heroButton.classList.contains("locked")) {
    console.log("Hero is locked!");
    return;
  }

  selectedHero = index;
  document.getElementById("hero-image").src = heroes[index].img;
  document.getElementById("hero-name").innerText = heroes[index].name;
}
