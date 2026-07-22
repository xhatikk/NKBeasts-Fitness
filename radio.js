(() => {
  const audio = document.getElementById("radioAudio");
  const toggle = document.getElementById("radioToggle");
  const status = document.getElementById("radioStatus");
  const station = document.getElementById("radioStation");
  const volume = document.getElementById("radioVolume");
  const genreButtons = [...document.querySelectorAll(".radio-genre")];

  if (!audio || !toggle || !status || !station || !volume) return;

  const readyText = () => {
    try {
      return window.i18n?.[window.currentLang]?.radioReady || "Gati për play";
    } catch {
      return "Gati për play";
    }
  };

  const setPlayingUI = playing => {
    toggle.textContent = playing ? "Ⅱ" : "▶";
    status.textContent = playing ? "LIVE" : readyText();
  };

  const playRadio = async () => {
    try {
      await audio.play();
      setPlayingUI(true);
    } catch (error) {
      setPlayingUI(false);
      status.textContent = "Stream unavailable";
      console.warn("NKBEASTS radio:", error);
    }
  };

  toggle.addEventListener("click", async () => {
    if (audio.paused) {
      await playRadio();
    } else {
      audio.pause();
      setPlayingUI(false);
    }
  });

  volume.addEventListener("input", event => {
    audio.volume = Number(event.target.value);
  });
  audio.volume = Number(volume.value);

  genreButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const wasPlaying = !audio.paused;
      const stream = button.dataset.stream;
      const name = button.dataset.name || button.textContent.trim();

      genreButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      station.textContent = name;

      if (stream && audio.src !== stream) {
        audio.pause();
        audio.src = stream;
        audio.load();
      }

      localStorage.setItem("nkRadioGenre", name);

      if (wasPlaying) {
        await playRadio();
      } else {
        setPlayingUI(false);
      }
    });
  });

  const savedGenre = localStorage.getItem("nkRadioGenre");
  if (savedGenre) {
    const savedButton = genreButtons.find(button => button.dataset.name === savedGenre);
    if (savedButton) savedButton.click();
  }

  audio.addEventListener("playing", () => setPlayingUI(true));
  audio.addEventListener("pause", () => {
    if (!audio.ended) setPlayingUI(false);
  });
  audio.addEventListener("error", () => {
    setPlayingUI(false);
    status.textContent = "Stream unavailable";
  });
})();
