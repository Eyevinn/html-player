import { Player } from "./src/player";
import { DEFAULT_OPTIONS } from "./src/utils/constants";

window.setupEyevinnPlayer = async function(wrapperId, manifestUrl, opts) {
  const options = Object.assign({}, DEFAULT_OPTIONS, opts);
  const player = new Player(wrapperId, manifestUrl, options);
  return await player.init();
};
