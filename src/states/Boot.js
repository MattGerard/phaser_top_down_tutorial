import Phaser from 'phaser';
import logo from '../img/logo.png';
import preloadBar from '../img/preloader-bar.png';

import config from '../config/config';

export default class extends Phaser.State {
  preload() {
    this.load.image('logo', logo);
    this.load.image('preloadbar', preloadBar);
  }

  create() {
    //Game background color
    this.game.stage.backgroundColor = config.stageBackgroundColor;

    //scaling options
    this.scale.scaleMode = config.scaleMode;
    this.scale.minWidth = config.minWidth;
    this.scale.minHeight = config.minHeight;
    this.scale.maxWidth = config.maxWidth;
    this.scale.maxHeight = config.maxHeight;

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = config.pageAlignHorizontally;

    //screen size will be set automatically
    this.scale.setGameSize(config.maxWidth, config.maxHeight);

    //physics system for movement
    this.game.physics.startSystem(config.physicsStartSystem);

    this.state.start('Preload');
  }
}
