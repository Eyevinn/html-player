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
          //resolve();
        });
        hls.on(HlsJs.Events.LEVEL_LOADED, (event, data) => {
          this.isLive_ = data.details.live;
          resolve();
        });
        this.hls_ = hls;
      } else if (this.videoElement_.canPlayType('application/vnd.apple.mpegurl')) {
        this.videoElement_.src = this.manifestUrl_;
        resolve();
      }
    });
  }

  get isLive() {
    if (this.hls_) {
      return this.isLive_;
    } else {
      return (this.videoElement_.duration === NaN);
    }
  }
}

module.exports = HlsPlayer;