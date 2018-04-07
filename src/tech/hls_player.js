const PlayerTechInterface = require('./interface.js');
const HlsJs = require('hls.js');

class HlsPlayer extends PlayerTechInterface {
  constructor(wrapperId, manifestUrl) {
    super(wrapperId, manifestUrl);
  }

  load() {
    return new Promise((resolve, reject) => {
      let hls = new HlsJs();

      if (HlsJs.isSupported) {
        hls.attachMedia(this.videoElement_);
        hls.on(HlsJs.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(this.manifestUrl_);
        });
        hls.on(HlsJs.Events.MANIFEST_PARSED, (event, data) => {
          resolve();
        });
      } else if (this.videoElement_.canPlayType('application/vnd.apple.mpegurl')) {
        this.videoElement_.src = this.manifestUrl_;
        resolve();
      }
    });
  }
}

module.exports = HlsPlayer;