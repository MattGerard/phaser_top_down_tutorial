import Phaser from 'phaser';

import spaceImage from '../img/space.png';
import rockImage from '../img/rock.png';
import playerShip from '../img/player.png';
import powerImage from '../img/power.png';
import playerParticalImage from '../img/player-particle.png';
import collectAudio from '../audio/collect.ogg';
import explosionAudio from '../audio/explosion.ogg';

export default class extends Phaser.State {
  preload() {
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY + 128,
      'preloadbar'
    );
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load asset images

    this.load.image('space', spaceImage);
    this.load.image('rock', rockImage);
    this.load.spritesheet('playership', playerShip, 12, 12);
    this.load.spritesheet('power', powerImage, 12, 12);
    this.load.image('playerParticle', playerParticalImage);
    this.load.audio('collect', collectAudio);
    this.load.audio('explosion', explosionAudio);
  }

  create() {
    this.state.start('MainMenu');
  }
}
