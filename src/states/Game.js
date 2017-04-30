import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    //set wolrd dimensions
    this.game.world.setBounds(0, 0, 1920, 1920);
    //adding stars sprite to background tile
    this.background = this.game.add.tileSprite(
      0,
      0,
      this.game.world.width,
      this.game.world.height,
      'space'
    );

    //creating player
    this.player = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'playership'
    );
    this.player.scale.setTo(2);

    this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
    this.player.animations.play('fly');

    this.playerScore = 0;

    //enable player physics
    this.game.physics.arcade.enable(this.player);
    this.playerSpeed = 120;
    this.player.body.collideWorldBounds = true;

    //camera follow
    this.game.camera.follow(this.player);

    this.generateAsteriods();
    this.generateCollectables();

    //show score
    this.showLabels();

    //sounds
    this.explosionSound = this.game.add.audio('explosion');
    this.collectSound = this.game.add.audio('collect');
  }

  update() {
    if (this.game.input.activePointer.justPressed()) {
      //move on direction of input
      this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
    }

    //collision between player and asteroids
    this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);

    //overlapping between player and collectables
    this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
  }

  generateAsteriods = () => {
    this.asteroids = this.game.add.group();

    //enable physics in them
    this.asteroids.enableBody = true;
    this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
    const numAsteroids = this.game.rnd.integerInRange(150, 200);
    let asteriod;

    for (let i = 0; i < numAsteroids; i++) {
      //add sprite
      asteriod = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
      asteriod.scale.setTo(this.game.rnd.integerInRange(10, 40) / 10);

      //physics properties
      asteriod.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
      asteriod.body.immovable = true;
      asteriod.body.collideWorldBounds = true;
    }
  };

  hitAsteroid = (player, asteroid) => {
    //play explosion sound
    this.explosionSound.play();

    //make the player explode
    const emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
    emitter.makeParticles('playerParticle');
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    emitter.start(true, 1000, null, 100);
    this.player.kill();

    //call the gameOver method in 800 milliseconds, we haven't created this method yet
    this.game.time.events.add(800, this.gameOver, this);
  };

  generateCollectables = () => {
    this.collectables = this.game.add.group();

    //enable physics in them
    this.collectables.enableBody = true;
    this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

    //phaser's random number generator
    const numCollectables = this.game.rnd.integerInRange(100, 150);
    let collectable;

    for (let i = 0; i < numCollectables; i++) {
      //add sprite
      collectable = this.collectables.create(
        this.game.world.randomX,
        this.game.world.randomY,
        'power'
      );
      collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
      collectable.animations.play('fly');
    }
  };

  collect = (player, collectable) => {
    //play collect sound
    this.collectSound.play();

    //update score
    this.playerScore++;
    this.scoreLabel.text = this.playerScore;

    //remove sprite
    collectable.destroy();
  };

  showLabels = () => {
    //score text
    let text = '0';
    const style = {font: '20px Arial', fill: '#fff', align: 'center'};
    this.scoreLabel = this.game.add.text(this.game.width - 50, this.game.height - 50, text, style);
    //stick to screen
    this.scoreLabel.fixedToCamera = true;
  };

  gameOver() {
    //pass it the score as a parameter
    this.game.state.start('MainMenu', true, false, this.playerScore);
  }
}
