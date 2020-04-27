export class PlayerSkin {
  constructor(playerInterface) {
    this.playerInterface_ = playerInterface;
  }

  init() {
    return this.setupControllers_(this.playerInterface_.wrapper);
  }

  showBigPlayButton() {
    this.bigPlayButton_.className = "player-btn-big player-btn-big-visible";
  }

  setupControllers_(wrapperElement) {
    let controllerElement = document.createElement("div");
    controllerElement.className = "player-controller player-controller-hidden";

    let logoElement = document.createElement("div");
    logoElement.className = "player-logo";
    controllerElement.appendChild(logoElement);

    if (!this.playerInterface_.isLive) {
      controllerElement.appendChild(this.setupTimeline_());
    }

    let btnTogglePlay = document.createElement("div");
    btnTogglePlay.className = "player-btn-toggle-play player-btn-play";
    btnTogglePlay.addEventListener("mouseover", event => {
      event.target.className += " player-btn-hover";
    });
    btnTogglePlay.addEventListener("mouseout", event => {
      event.target.className = event.target.className.replace(
        "player-btn-hover",
        ""
      );
    });
    btnTogglePlay.addEventListener("click", () => {
      if (!this.playerInterface_.isPlaying) {
        this.playerInterface_.play();
      } else {
        this.playerInterface_.pause();
      }
    });
    controllerElement.appendChild(btnTogglePlay);

    let bigPlayButton = document.createElement("div");
    bigPlayButton.className = "player-btn-big player-btn-big-hidden";
    wrapperElement.appendChild(bigPlayButton);
    this.bigPlayButton_ = bigPlayButton;
    this.bigPlayButton_.addEventListener("click", () => {
      this.playerInterface_.play();
    });

    let btnToggleAudio = document.createElement("div");
    btnToggleAudio.className = "player-btn-toggle-audio player-btn-audio-on";
    btnToggleAudio.addEventListener("mouseover", event => {
      event.target.className += " player-btn-hover";
    });
    btnToggleAudio.addEventListener("mouseout", event => {
      event.target.className = event.target.className.replace(
        "player-btn-hover",
        ""
      );
    });
    btnToggleAudio.addEventListener("click", () => {
      if (!this.playerInterface_.isMuted) {
        this.playerInterface_.mute();
      } else {
        this.playerInterface_.unmute();
      }
    });
    controllerElement.appendChild(btnToggleAudio);

    this.playerInterface_.on("playing", () => {
      btnTogglePlay.className = "player-btn-toggle-play player-btn-pause";
      this.bigPlayButton_.className = "player-btn-big player-btn-big-hidden";
    });
    this.playerInterface_.on("paused", () => {
      btnTogglePlay.className = "player-btn-toggle-play player-btn-play";
    });
    this.playerInterface_.on("muted", () => {
      btnToggleAudio.className = "player-btn-toggle-audio player-btn-audio-off";
    });
    this.playerInterface_.on("unmuted", () => {
      btnToggleAudio.className = "player-btn-toggle-audio player-btn-audio-on";
    });

    wrapperElement.appendChild(controllerElement);

    wrapperElement.addEventListener("mousemove", () => {
      controllerElement.className =
        "player-controller player-controller-visible";

      this.controllerTimer = setTimeout(() => {
        controllerElement.className =
          "player-controller player-controller-hidden";
      }, 5000);
    });
  }

  setupTimeline_() {
    let timelineContainer = document.createElement("div");
    timelineContainer.className = "player-timeline-container";
    let timelineElement = document.createElement("div");
    timelineElement.className = "player-timeline";
    let durationElement = document.createElement("div");
    durationElement.className = "player-timeline-duration";
    let positionElement = document.createElement("div");
    positionElement.className = "player-timeline-position";

    timelineContainer.appendChild(positionElement);
    timelineContainer.appendChild(timelineElement);
    timelineContainer.appendChild(durationElement);

    this.timelineUpdateTimer = setInterval(() => {
      durationElement.innerHTML = this.formatPlayerTime_(
        this.playerInterface_.duration
      );
      // let w = timelineElement.clientWidth;
      let pos = this.playerInterface_.position;
      positionElement.innerHTML = this.formatPlayerTime_(pos);
      let progress = (pos / this.playerInterface_.duration) * 100; // percentage
      timelineElement.setAttribute(
        "style",
        `background: linear-gradient(90deg, #0FBAF0 ${progress}%, #000000 ${progress}%)`
      );
    }, 1000);

    timelineElement.addEventListener("click", ev => {
      let w = ev.target.clientWidth;
      let position = (ev.offsetX / w) * this.playerInterface_.duration;
      //console.log(`${(ev.offsetX / w) * 100}% position=${position}`);
      this.playerInterface_.position = position;
    });

    return timelineContainer;
  }

  formatPlayerTime_(secs) {
    let sec = parseInt(secs, 10);
    let h = Math.floor(sec / 3600) % 24;
    let m = Math.floor(sec / 60) % 60;
    let s = sec % 60;
    return [h, m, s]
      .map(v => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  }
}
