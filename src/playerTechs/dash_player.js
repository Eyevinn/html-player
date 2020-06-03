import { PlayerTechInterface } from "./interface";
import * as Shaka from "shaka-player";

export class DashPlayer extends PlayerTechInterface {
  constructor(wrapperId, manifestUrl) {
    super(wrapperId, manifestUrl);
  }

  load() {
    return new Promise(resolve => {
      let shakap = new Shaka.Player(this.videoElement_);
      shakap.load(this.manifestUrl_).then(() => {
        resolve();
      });
      this.shakap_ = shakap;
    });
  }

  get isLive() {
    return this.shakap_.isLive();
  }

  destroy() {
    if (this.shakap_) {
      this.shakap_.destroy();
    }
    super.destroy();
  }
}
