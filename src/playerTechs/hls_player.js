import { PlayerTechInterface } from "./interface";
import Hls from "hls.js";

export class HlsPlayer extends PlayerTechInterface {
  constructor(wrapperId, manifestUrl) {
    super(wrapperId, manifestUrl);
  }

  load() {
    return new Promise(resolve => {
      let hls = new Hls();

      if (this.videoElement_.canPlayType("application/vnd.apple.mpegurl")) {
        this.videoElement_.src = this.manifestUrl_;
        resolve();
      } else if (Hls.isSupported) {
        hls.attachMedia(this.videoElement_);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(this.manifestUrl_);
        });
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          //resolve();
        });
        hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
          this.isLive_ = data.details.live;
          resolve();
        });
        this.hls_ = hls;
      }
    });
  }

  get isLive() {
    if (this.hls_) {
      return this.isLive_;
    } else {
      return isNaN(this.videoElement_.duration);
    }
  }

  destroy() {
    if (this.hls_) {
      this.hls_.destroy();
    }
    super.destroy();
  }
}
