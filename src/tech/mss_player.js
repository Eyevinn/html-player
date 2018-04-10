const PlayerTechInterface = require('./interface.js');
const DashJs = require('dashjs');
const DashJsMss = require('dashjs/build/es5/src/mss');

class MssPlayer extends PlayerTechInterface {
  constructor(wrapperId, manifestUrl) {
    super(wrapperId, manifestUrl);
  }

  load() {
    return new Promise((resolve, reject) => {
      let mediaPlayer = DashJs.MediaPlayer().create();
      mediaPlayer.getDebug().setLogToBrowserConsole(false);
      mediaPlayer.initialize();
      mediaPlayer.attachView(this.videoElement_);
      mediaPlayer.attachSource(this.manifestUrl_);
      mediaPlayer.on(DashJs.MediaPlayer.events.MANIFEST_LOADED, ev => {
        resolve();
      });
      mediaPlayer.on(DashJs.MediaPlayer.events.ERROR, ev => {
        reject(`Failed to load Mss Player: ${ev.event.message}`);
      });
    });
  }
}

module.exports = MssPlayer;