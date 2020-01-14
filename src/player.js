import { PlayerTechFactory } from "./player_tech_factory";
import { PlayerSkin } from "./player_skin";

export class Player {
  constructor(wrapperId, manifestUrl) {
    this.wrapperId_ = wrapperId;
    this.manifestUrl_ = manifestUrl;
    this.playerTechFactory_ = new PlayerTechFactory(
      this.wrapperId_,
      this.manifestUrl_
    );
  }

  async init() {
    const player = await this.playerTechFactory_.constructPlayerTech();
    const skin = new PlayerSkin(player);
    skin.init();
    player.attachControllerSkin(skin);
    return player;
  }
}
