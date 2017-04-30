import Phaser from 'phaser';

export default {
  minWidth: 800,
  minHeight: 600,
  maxWidth: 800,
  maxHeight: 600,
  localStorageName: 'phaserBoilerPlateWebpack2',
  scaleMode: Phaser.ScaleManager.SHOW_ALL,
  pageAlignHorizontally: true,
  setGameSize: true,
  physicsStartSystem: Phaser.Physics.ARCADE,
  stageBackgroundColor: '#fff',
};
