import { Player } from "./src/player";

window.setupEyevinnPlayer = function(wrapperId, manifestUrl) {
  return new Promise((resolve, reject) => {
    const player = new Player(wrapperId, manifestUrl);
    player
      .init()
      .then(resolve)
      .catch(reject);
  });
};
