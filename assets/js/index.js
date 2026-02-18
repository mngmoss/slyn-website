const underlineColors = ["#fee402", "#ccff00", "#ff1111", "#fffed5"];

const pickRandomColor = () =>
  underlineColors[Math.floor(Math.random() * underlineColors.length)];

const listItems = Array.from(document.querySelectorAll("li")).filter((item) =>
  item.querySelector("a"),
);

listItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const color = pickRandomColor();
    item.style.setProperty("--hover-underline-color", color);
  });

  item.addEventListener("mouseleave", () => {
    item.style.removeProperty("--hover-underline-color");
  });
});

const projectLinks = Array.from(
  document.querySelectorAll(".project-feature__links a"),
);

projectLinks.forEach((link) => {
  const setColor = () => {
    const color = pickRandomColor();
    link.style.setProperty("--hover-underline-color", color);
  };

  const clearColor = () => {
    link.style.removeProperty("--hover-underline-color");
  };

  link.addEventListener("mouseenter", setColor);
  link.addEventListener("mouseleave", clearColor);
  link.addEventListener("focus", setColor);
  link.addEventListener("blur", clearColor);
});

const musicCards = Array.from(document.querySelectorAll(".music-card"));

musicCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const color = pickRandomColor();
    card.style.setProperty("--music-underline-color", color);
  });

  card.addEventListener("mouseleave", () => {
    card.style.removeProperty("--music-underline-color");
  });

  const togglePlayback = () => {
    const audio = card.querySelector(".music-card__audio");
    if (!audio) {
      return;
    }

    const source = card.dataset.audio;
    if (source && audio.src !== source) {
      audio.src = source;
    }

    if (!audio.src) {
      return;
    }

    musicCards.forEach((otherCard) => {
      if (otherCard === card) {
        return;
      }
      const otherAudio = otherCard.querySelector(".music-card__audio");
      if (otherAudio && !otherAudio.paused) {
        otherAudio.pause();
        otherAudio.currentTime = 0;
        otherCard.classList.remove("is-playing");
        otherCard.setAttribute("aria-pressed", "false");
      }
    });

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          card.classList.add("is-playing");
          card.setAttribute("aria-pressed", "true");
        })
        .catch(() => {
          // Autoplay restrictions or missing audio.
        });
    } else {
      audio.pause();
      card.classList.remove("is-playing");
      card.setAttribute("aria-pressed", "false");
    }
  };

  card.addEventListener("click", togglePlayback);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePlayback();
    }
  });
});
