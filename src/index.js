import 'pixi';
import 'p2';
import Phaser from 'phaser';

import styles from './styles/style.css';

import BootState from './states/Boot';
import PreLoadState from './states/PreLoad';
import GameState from './states/Game';
import MainMenueState from './states/MainMenue';

import config from './config/config';

class Game extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement;
    const width = docElement.clientWidth > config.maxWidth
      ? config.maxWidth
      : docElement.clientWidth;
    const height = docElement.clientHeight > config.maxHeight
      ? config.maxHeight
      : docElement.clientHeight;

    super(width, height, Phaser.AUTO, 'app', null);

    this.state.add('Boot', BootState, false);
    this.state.add('Preload', PreLoadState, false);
    this.state.add('MainMenu', MainMenueState, false);
    this.state.add('Game', GameState, false);
    this.state.start('Boot');
  }
}

window.game = new Game();

if (module.hot) {
  module.hot.accept();
}
