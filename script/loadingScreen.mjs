let image = document.getElementById("loading-image");
let loadingBar = document.getElementsByClassName("loading-bar-fill");
let BarTextLoading = document.getElementById("text-bar")
let styleLoadingBar = window.getComputedStyle(loadingBar[0])
let loadingText = document.getElementById("loading-text")
console.log(styleLoadingBar.width);

let dots = 0; // Buat hitungan titik
setInterval(() => {
  dots = (dots + 1) % 4; // Loop dari 0 ke 3
  loadingText.innerText = "LOADING" + ".".repeat(dots);
}, 500);

setTimeout(() => {
  loadingBar[0].style.width = "20%"
  BarTextLoading.innerText = "20%"
  setTimeout(() => {
    loadingBar[0].style.width = "80%"
      BarTextLoading.innerText = "80%"
    setTimeout(() => {
      loadingBar[0].style.width = "100%"
      BarTextLoading.innerText = "100%"
      if(BarTextLoading.innerText === "100%") {
        setTimeout(() => {
          window.location.href = "/src/pages/mainMenu.html"
        }, 1000)
      }
    }, 1500)
  },2000)
}, 1000)
console.log(image.src);
