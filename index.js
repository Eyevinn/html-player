import { Player } from "./src/player";

window.setupEyevinnPlayer = async function(wrapperId, manifestUrl) {
  const player = new Player(wrapperId, manifestUrl);
  return await player.init();
};
