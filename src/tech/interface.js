class PlayerTechInterface {
  constructor(wrapperId, manifestUrl) {
    this.manifestUrl_ = manifestUrl;
    this.videoElement_ = null;
    this.init_(wrapperId);
  }

  play(startMuted) {
    if (startMuted) {
      this.videoElement_.muted = true;
    }
    this.videoElement_.play();
  }

  pause() {
    this.videoElement_.pause();
  }

  load() {
    return new Promise((resolve, reject) => {
      reject('Missing implementation of load() in player tech.');
    });
  }

  init_(wrapperId) {
    this.videoElement_ = document.createElement('video');
    this.videoElement_.className = 'eyevinn-player';
    this.videoElement_.style = 'width: 100%';
    let wrapperElement = document.getElementById(wrapperId);
    wrapperElement.appendChild(this.videoElement_);
  }  
}

module.exports = PlayerTechInterface;