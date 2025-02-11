export function showLoadingScreen() {
  let loadingScreen = document.querySelector(".loading-screen");

  if (!loadingScreen) {
    loadingScreen = document.createElement("div");
    loadingScreen.classList.add("loading-screen");
    loadingScreen.innerHTML = `
        <div class="loading-content">
          <img src="/assets/loading.gif" alt="Loading..." />
          <p>Loading...</p>
        </div>
      `;
    document.body.appendChild(loadingScreen);
  }

  loadingScreen.style.display = "flex";
}

export function hideLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen");
  if (loadingScreen) {
    loadingScreen.style.display = "none";
  }
}
