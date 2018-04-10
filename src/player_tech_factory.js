const request = require('request');
const HLSPlayer = require('./tech/hls_player.js');
const DashPlayer = require('./tech/dash_player.js');
const MssPlayer = require('./tech/mss_player.js');

const ENUM_TYPE_HLS = 'HLS';
const ENUM_TYPE_MPEGDASH = 'MPD';
const ENUM_TYPE_MSS = 'MSS';
const ENUM_TYPE_NO_CONTENT_TYPE = 'BAD_CONTENT_TYPE';

const CONTENT_TYPE_MAP = {
  'application/x-mpegURL': ENUM_TYPE_HLS,
  'application/octet-stream': ENUM_TYPE_NO_CONTENT_TYPE,
  'binary/octet-stream': ENUM_TYPE_NO_CONTENT_TYPE,
  'application/vnd.apple.mpegurl': ENUM_TYPE_HLS,
  'application/dash+xml': ENUM_TYPE_MPEGDASH,
  'application/vnd.apple.mpegurl;charset=UTF-8': ENUM_TYPE_HLS,
  'application/vnd.ms-sstr+xml': ENUM_TYPE_MSS,
};

class PlayerTechFactory {
  constructor(wrapperId, manifestUrl) {
    this.wrapperId_ = wrapperId;
    this.manifestUrl_ = manifestUrl;
  }

  constructPlayerTech() {
    return new Promise((resolve, reject) => {
      this.determineType_(this.manifestUrl_).then(type => {
        let player;
        if (type === ENUM_TYPE_HLS) {
          player = new HLSPlayer(this.wrapperId_, this.manifestUrl_);
        } else if (type === ENUM_TYPE_MPEGDASH) {
          player = new DashPlayer(this.wrapperId_, this.manifestUrl_);
        } else if (type === ENUM_TYPE_MSS) {
          player = new MssPlayer(this.wrapperId_, this.manifestUrl_);
        } else {
          reject('Internal error: no available player tech found!');
        }
        player.load().then(() => {
          resolve(player)
        }).catch(reject);
      }).catch(reject);
    });
  }

  determineType_(uri) {
    return new Promise((resolve, reject) => {
      request(uri, (err, resp, body) => {
        if (err || resp.statusCode !== 200) {
          if (resp.statusCode === 404) {
            reject('Stream not found');
          } else {
            console.error(err);
            reject(err);
          }
        } else {
          let type = CONTENT_TYPE_MAP[resp.headers['content-type']];
          if (!type) {
            reject(`Unsupported content '${resp.headers['content-type']}'`);
          } else {
            if (type === ENUM_TYPE_NO_CONTENT_TYPE) {
              if (uri.match(/\.m3u8/)) {
                type = ENUM_TYPE_HLS;
              } else if (uri.match(/\.mpd/)) {
                type = ENUM_TYPE_MPEGDASH;
              }
            }
            resolve(type);
          }
        }
      });
    });
  }

}

module.exports = PlayerTechFactory;