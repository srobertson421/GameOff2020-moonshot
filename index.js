import Phaser from 'phaser';

import playerSheet from './assets/spaceman.png';
import landscapeTiles from './assets/craters.png';
import bgMusicOgg from './assets/bg-music.ogg';
import bgMusicMp3 from './assets/bg-music.mp3';

const gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
  this.walkSpeed = 80;
  this.runSpeed = 150;
  this.playerSpeed = this.walkSpeed;
  this.gameWidth = this.sys.game.config.width;
  this.gameHeight = this.sys.game.config.height;
  this.centerWidth = this.sys.game.config.width / 2;
  this.centerHeight = this.sys.game.config.height / 2;
}

gameScene.preload = function() {
  this.load.spritesheet('player', playerSheet, { frameWidth: 8, frameHeight: 8 });
  this.load.spritesheet('ground', landscapeTiles, { frameWidth: 8, frameHeight: 8 });
  this.load.audio('bg-music', [
    bgMusicOgg,
    bgMusicMp3
  ]);
}

gameScene.create = function() {
  this.sound.add('bg-music').play({
    volume: 0.5,
    loop: true
  });

  for(let x = 0; x < 100; x++) {
    for(let y = 0; y < 75; y++) {
      const tile = this.add.image(
        x * 8,
        y * 8,
        'ground',
        Phaser.Math.RND.pick([3,5])
      );

      tile.setOrigin(0);
    }
  }

  this.player = this.physics.add.sprite(this.centerWidth, this.centerHeight, 'player', 0);
  this.player.setCollideWorldBounds(true);
  this.player.setBodySize(8, 8);
  this.player.body.setMaxVelocity(this.runSpeed);

  this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  this.cameras.main.setZoom(4);
  this.cameras.main.setBounds(0, 0, 800, 600);

  this.cursorKeys = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
    frameRate: 7
  });
  this.anims.create({
    key: 'walk-right',
    frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
    frameRate: 7
  });
  this.anims.create({
    key: 'walk-up',
    frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
    frameRate: 7
  });
  this.anims.create({
    key: 'walk-left',
    frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
    frameRate: 7
  });
  // this.anims.create({
  //   key: 'idle',
  //   frames: this.anims.generateFrameNumbers('player', { start: 20, end: 21 }),
  //   frameRate: 7
  // });
}

// let hasLogged = false;

let direction = null;
const idleFrames = {
  'down': 0,
  'right': 6,
  'up': 3,
  'left': 9
}

gameScene.update = function() {
  // if(!hasLogged) {
  //   console.log(this);
  //   hasLogged = true;
  // }

  if(this.cursorKeys.shift.isDown) {
    this.player.anims.setTimeScale(1.75);
    this.playerSpeed = this.runSpeed;
  } else {
    this.player.anims.setTimeScale(1);
    this.playerSpeed = this.walkSpeed;
  }


  if(this.cursorKeys.left.isDown) {
    this.player.body.setVelocityX(-this.playerSpeed);
    if(!direction || direction === 'right') {
      direction = 'left';
    }
  } else if(this.cursorKeys.right.isDown) {
    this.player.body.setVelocityX(this.playerSpeed);
    if(!direction || direction === 'left') {
      direction = 'right';
    }
  } else {
    this.player.body.setVelocityX(0);
    if(direction === 'left' || direction === 'right') {
      this.player.anims.stop();
      this.player.setFrame(idleFrames[direction]);
      direction = null;
    }
  }

  if(this.cursorKeys.up.isDown) {
    this.player.body.setVelocityY(-this.playerSpeed);
    if(!direction || direction === 'down') {
      direction = 'up';
    }
  } else if(this.cursorKeys.down.isDown) {
    this.player.body.setVelocityY(this.playerSpeed);
    if(!direction || direction === 'up') {
      direction = 'down';
    }
  } else {
    this.player.body.setVelocityY(0);
    if(direction === 'up' || direction === 'down') {
      this.player.anims.stop();
      this.player.setFrame(idleFrames[direction]);
      direction = null;
    }
  }

  if(direction) {
    this.player.anims.play(`walk-${direction}`, true);
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
      debug: false
    }
  },
  scene: gameScene
}

const game = new Phaser.Game(config);