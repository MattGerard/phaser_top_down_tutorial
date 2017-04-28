import Phaser from 'phaser';

export default class extends Phaser.State {
  init() {}

  preload() {}

  render() {
    this.state.start('Splash');
  }
}
