import Phaser from 'phaser';

export default class extends Phaser.State {
  init(score) {
    let newScore = score || 0;
    this.highestScore = this.highestScore || 0;

    this.highestScore = Math.max(newScore, this.highestScore);
  }

  preload() {}

  create() {
    //rendering space tile
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
    //scroll the tile + speed
    this.background.autoScroll(-20, 0);

    //start game text
    let text = 'Tap to begin';
    let style = {font: '30px Arial', fill: '#fff', align: 'center'};
    const t = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
    t.anchor.set(0, 5);

    //high scores
    text = 'Highest score: ' + this.highestScore;
    style = {font: '15px Arial', fill: '#fff', align: 'center'};

    let h = this.game.add.text(this.game.width / 2, this.game.height / 2 + 50, text, style);
    h.anchor.set(0.5);
  }
  update() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
}
