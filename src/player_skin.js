class PlayerSkin {
  constructor(playerInterface) {
    this.playerInterface_ = playerInterface;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.setupControllers_(this.playerInterface_.wrapper);
      resolve();
    });
  }

  setupControllers_(wrapperElement) {
    let controllerElement = document.createElement('div');
    controllerElement.className = 'player-controller player-controller-hidden';
    let logoElement = document.createElement('div');
    logoElement.className = 'player-logo';
    controllerElement.appendChild(logoElement);
    let btnTogglePlay = document.createElement('div');
    btnTogglePlay.className = 'player-btn-toggle-play';
    btnTogglePlay.addEventListener('mouseover', event => {
      event.target.className += ' player-btn-hover';
    });
    btnTogglePlay.addEventListener('mouseout', event => {
      event.target.className = event.target.className.replace('player-btn-hover', '');
    });
    btnTogglePlay.addEventListener('click', event => {
      if (!this.playerInterface_.isPlaying) {
        this.playerInterface_.play();
      } else {
        this.playerInterface_.pause();        
      }
    });
    controllerElement.appendChild(btnTogglePlay);

    let btnToggleAudio = document.createElement('div');
    btnToggleAudio.className = 'player-btn-toggle-audio';
    btnToggleAudio.addEventListener('mouseover', event => {
      event.target.className += ' player-btn-hover';
    });
    btnToggleAudio.addEventListener('mouseout', event => {
      event.target.className = event.target.className.replace('player-btn-hover', '');
    });
    btnToggleAudio.addEventListener('click', event => {
      if (!this.playerInterface_.isMuted) {
        this.playerInterface_.mute();
      } else {
        this.playerInterface_.unmute();        
      }
    });
    controllerElement.appendChild(btnToggleAudio);

    this.playerInterface_.on('playing', () => {
      btnTogglePlay.className = 'player-btn-toggle-play player-btn-pause';
    });
    this.playerInterface_.on('paused', () => {
      btnTogglePlay.className = 'player-btn-toggle-play player-btn-play';
    });
    this.playerInterface_.on('muted', () => {
      btnToggleAudio.className = 'player-btn-toggle-audio player-btn-audio-off';
    });
    this.playerInterface_.on('unmuted', () => {
      btnToggleAudio.className = 'player-btn-toggle-audio player-btn-audio-on';
    });

    wrapperElement.appendChild(controllerElement);

    wrapperElement.addEventListener('mousemove', event => {
      controllerElement.className = 'player-controller player-controller-visible';

      this.controllerTimer = setTimeout(() => {
        controllerElement.className = 'player-controller player-controller-hidden';
      }, 5000);
    });
  }
}

module.exports = PlayerSkin;