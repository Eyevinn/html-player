import { HlsPlayer } from "./playerTechs/hls_player";
import { DashPlayer } from "./playerTechs/dash_player";
import { MssPlayer } from "./playerTechs/mss_player";
import { CONTENT_TYPE_MAP, ENUM_TYPE_HLS, ENUM_TYPE_MPEGDASH, ENUM_TYPE_MSS } from "./utils/constants";

export class PlayerTechFactory {
  constructor(wrapperId, manifestUrl) {
    this.wrapperId_ = wrapperId;
    this.manifestUrl_ = manifestUrl;
  }

  constructPlayerTech() {
    return new Promise((resolve, reject) => {
      this.determineType_(this.manifestUrl_)
        .then(type => {
          let player;
          if (type === ENUM_TYPE_HLS) {
            player = new HlsPlayer(this.wrapperId_, this.manifestUrl_);
          } else if (type === ENUM_TYPE_MPEGDASH) {
            player = new DashPlayer(this.wrapperId_, this.manifestUrl_);
          } else if (type === ENUM_TYPE_MSS) {
            player = new MssPlayer(this.wrapperId_, this.manifestUrl_);
          } else {
            reject("Internal error: no available player tech found!");
          }
          player
            .load()
            .then(() => {
              resolve(player);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  determineType_(uri) {
    return new Promise((resolve, reject) => {
      fetch(uri).then(resp => {
        let type = CONTENT_TYPE_MAP[resp.headers["content-type"]];
        if (!type) {
          if (uri.match(/\.m3u8/)) {
            type = ENUM_TYPE_HLS;
          } else if (uri.match(/\.mpd/)) {
            type = ENUM_TYPE_MPEGDASH;
          } else if (uri.match(/\/Manifest/)) {
            type = ENUM_TYPE_MSS;
          } else if (uri.match(/\/manifest/)) {
            type = ENUM_TYPE_MSS;
          }
        }
        resolve(type);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
  }
}
