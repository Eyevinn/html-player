import { HlsPlayer } from "./playerTechs/hls_player";
import { DashPlayer } from "./playerTechs/dash_player";
import { MssPlayer } from "./playerTechs/mss_player";

const ENUM_TYPE_HLS = "HLS";
const ENUM_TYPE_MPEGDASH = "MPD";
const ENUM_TYPE_MSS = "MSS";
const ENUM_TYPE_NO_CONTENT_TYPE = "BAD_CONTENT_TYPE";

const CONTENT_TYPE_MAP = {
  "application/x-mpegURL": ENUM_TYPE_HLS,
  "application/octet-stream": ENUM_TYPE_NO_CONTENT_TYPE,
  "binary/octet-stream": ENUM_TYPE_NO_CONTENT_TYPE,
  "application/vnd.apple.mpegurl": ENUM_TYPE_HLS,
  "application/dash+xml": ENUM_TYPE_MPEGDASH,
  "application/vnd.apple.mpegurl;charset=UTF-8": ENUM_TYPE_HLS,
  "application/vnd.ms-sstr+xml": ENUM_TYPE_MSS
};

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
