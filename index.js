import Phaser from 'phaser';

import man from './assets/man.png';

const gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
  this.playerSpeed = 200;
  this.gameWidth = this.sys.game.config.width;
  this.gameHeight = this.sys.game.config.height;
  this.centerWidth = this.sys.game.config.width / 2;
  this.centerHeight = this.sys.game.config.height / 2;
}

gameScene.preload = function() {
  this.load.spritesheet('player', man, { frameWidth: 50, frameHeight: 70 });
}

gameScene.create = function() {
  this.player = this.physics.add.sprite(this.centerWidth, this.centerHeight, 'player', 0);
  this.player.setCollideWorldBounds(true);

  this.cursorKeys = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
    frameRate: 10
  });
  this.anims.create({
    key: 'walk-right',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
    frameRate: 10
  });
  this.anims.create({
    key: 'walk-up',
    frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
    frameRate: 10
  });
  this.anims.create({
    key: 'walk-left',
    frames: this.anims.generateFrameNumbers('player', { start: 15, end: 19 }),
    frameRate: 10
  });
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('player', { start: 20, end: 21 }),
    frameRate: 10
  });
}

let hasLogged = false;

gameScene.update = function() {
  if(!hasLogged) {
    console.log(this);
    hasLogged = true;
  }


  if(this.cursorKeys.left.isDown) {
    this.player.body.setVelocityX(-this.playerSpeed);
    this.player.anims.play('walk-left', true);
  } else if(this.cursorKeys.right.isDown) {
    this.player.body.setVelocityX(this.playerSpeed);
    this.player.anims.play('walk-right', true);
  } else {
    this.player.body.setVelocityX(0);
    // this.player.setFrame(0);
  }

  if(this.cursorKeys.up.isDown) {
    this.player.body.setVelocityY(-this.playerSpeed);
    this.player.anims.play('walk-up', true);
  } else if(this.cursorKeys.down.isDown) {
    this.player.body.setVelocityY(this.playerSpeed);
    this.player.anims.play('walk-down', true);
  } else {
    this.player.body.setVelocityY(0);
    // this.player.setFrame(0);
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: gameScene
}

const game = new Phaser.Game(config);