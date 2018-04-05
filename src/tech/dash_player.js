const PlayerTechInterface = require('./interface.js');
const Shaka = require('shaka-player');

class DashPlayer extends PlayerTechInterface {
  constructor(wrapperId, manifestUrl) {
    super(wrapperId, manifestUrl);
  }

  load() {
    return new Promise((resolve, reject) => {
      let shakap = new Shaka.Player(this.videoElement_);
      shakap.load(this.manifestUrl_).then(() => {
        resolve();
      });
    });
  }
}

module.exports = DashPlayer;