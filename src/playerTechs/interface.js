const VERSION = require("../../package.json").version;

export class PlayerTechInterface {
  constructor(wrapperId, manifestUrl) {
    this.manifestUrl_ = manifestUrl;
    this.videoElement_ = null;
    this.wrapperElement_ = this.init_(wrapperId);

    this.eventListeners_ = {
      playing: [],
      paused: [],
      muted: [],
      unmuted: []
    };
  }

  get version() {
    return VERSION;
  }

  get wrapper() {
    return this.wrapperElement_;
  }

  get isPlaying() {
    return !this.videoElement_.paused;
  }

  get isMuted() {
    return this.videoElement_.muted;
  }

  get isLive() {
    throw new Error(
      "Missing implementation of isLive() property in player tech."
    );
  }

  get duration() {
    if (!this.isLive) {
      return this.videoElement_.duration;
    }
    return NaN;
  }

  get position() {
    if (!this.isLive) {
      return this.videoElement_.currentTime;
    }
    return NaN;
  }

  set position(newpos) {
    if (!this.isLive) {
      this.videoElement_.currentTime = newpos;
    }
  }

  on(event, func) {
    this.eventListeners_[event].push(func);
  }

  attachControllerSkin(skin) {
    this.controllerSkin_ = skin;
  }

  play(startMuted) {
    if (startMuted) {
      this.videoElement_.muted = true;
    } else {
      this.videoElement_.muted = false;
    }
    let evname = this.videoElement_.muted ? "muted" : "unmuted";
    for (let f of this.eventListeners_[evname]) {
      f();
    }
    let playPromise = this.videoElement_.play();

    if (playPromise !== undefined) {
      playPromise
        .catch(() => {
          console.log("Auto-play was prevented, show big play button");
          this.controllerSkin_.showBigPlayButton();
        })
        .then(() => {});
    }
  }

  pause() {
    this.videoElement_.pause();
  }

  mute() {
    this.videoElement_.muted = true;
  }

  unmute() {
    this.videoElement_.muted = false;
  }

  load() {
    return new Promise((resolve, reject) => {
      reject("Missing implementation of load() in player tech.");
    });
  }

  init_(wrapperId) {
    this.videoElement_ = document.createElement("video");
    this.videoElement_.className = "eyevinn-player";
    let wrapperElement = document.getElementById(wrapperId);
    wrapperElement.appendChild(this.videoElement_);
    wrapperElement.style.setProperty("position", "relative");

    this.videoElement_.addEventListener("playing", () => {
      for (let f of this.eventListeners_["playing"]) {
        f();
      }
    });

    this.videoElement_.addEventListener("pause", () => {
      for (let f of this.eventListeners_["paused"]) {
        f();
      }
    });

    this.videoElement_.addEventListener("volumechange", () => {
      let evname = this.videoElement_.muted ? "muted" : "unmuted";
      for (let f of this.eventListeners_[evname]) {
        f();
      }
    });

    return wrapperElement;
  }
}
