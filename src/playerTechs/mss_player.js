import { PlayerTechInterface } from "./interface";
import { MediaPlayer } from "dashjs";
// eslint-disable-next-line no-unused-vars
const mss = require("dashjs/build/es5/src/mss");

export class MssPlayer extends PlayerTechInterface {
  constructor(wrapperId, manifestUrl) {
    super(wrapperId, manifestUrl);
  }

  load() {
    return new Promise((resolve, reject) => {
      let mediaPlayer = MediaPlayer().create();
      mediaPlayer.initialize();
      mediaPlayer.attachView(this.videoElement_);
      mediaPlayer.attachSource(this.manifestUrl_);
      mediaPlayer.on(MediaPlayer.events.MANIFEST_LOADED, () => {
        resolve();
      });
      mediaPlayer.on(MediaPlayer.events.ERROR, ev => {
        reject(`Failed to load Mss Player: ${ev.error.message}`);
      });
      this.mediaPlayer_ = mediaPlayer;
    });
  }

  get isLive() {
    return this.mediaPlayer_.isDynamic();
  }
}
