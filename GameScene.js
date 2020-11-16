import Phaser from 'phaser';

import Controls from './Controls';

import playerSheet from './assets/spaceman.png';
import playerNormalMap from './assets/spaceman_map.png';
import landscapeTiles from './assets/craters.png';
import landscapeTilesMap from './assets/craters_map.png';
import bgMusicOgg from './assets/bg.ogg';
import bgMusicMp3 from './assets/bg.mp3';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.controls = new Controls(this);
    this.walkSpeed = 80;
    this.runSpeed = 150;
    this.playerSpeed = this.walkSpeed;
    this.gameWidth = this.sys.game.config.width;
    this.gameHeight = this.sys.game.config.height;
    this.centerWidth = this.sys.game.config.width / 2;
    this.centerHeight = this.sys.game.config.height / 2;
  }

  preload() {
    this.load.spritesheet('player', [playerSheet, playerNormalMap], { frameWidth: 8, frameHeight: 8 });
    this.load.spritesheet('ground', [landscapeTiles, landscapeTilesMap], { frameWidth: 8, frameHeight: 8 });
    this.load.audio('bg-music', [
      bgMusicOgg,
      bgMusicMp3
    ]);
  }

  create() {
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
        // tile.setPipeline('Light2D');
      }
    }
  
    this.player = this.physics.add.sprite(this.centerWidth, this.centerHeight, 'player', 0);
    this.player.setCollideWorldBounds(true);
    this.player.setBodySize(8, 8);
    this.player.setScale(1.3);
    this.player.body.setMaxVelocity(this.runSpeed);
    this.player.setPipeline('Light2D');
  
    this.sun = this.lights.addLight(0, 0, 1000);
    // this.lights.cull(this.cameras.main);
    this.lights.enable().setAmbientColor(0x999999);
  
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(4);
    this.cameras.main.setBounds(0, 0, 800, 600);
  
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

    this.direction = null;

    this.idleFrames = {
      'down': 0,
      'right': 6,
      'up': 3,
      'left': 9
    }
  }

  update() {
    const sunPosX = this.player.body.x - (this.cameras.main.width / 2);
    const sunPosY = this.player.body.y;
    this.sun.setPosition(sunPosX, sunPosY);

    if(this.controls.arrows.shift.isDown) {
      this.playerSpeed = this.runSpeed;
    } else {
      this.playerSpeed = this.walkSpeed;
    }


    if(this.controls.left()) {
      this.player.body.setVelocityX(-this.playerSpeed);
      if(!this.direction || this.direction === 'right') {
        this.direction = 'left';
      }
    } else if(this.controls.right()) {
      this.player.body.setVelocityX(this.playerSpeed);
      if(!this.direction || this.direction === 'left') {
        this.direction = 'right';
      }
    } else {
      this.player.body.setVelocityX(0);
      if(this.direction === 'left' || this.direction === 'right') {
        this.player.anims.stop();
        this.player.setFrame(this.idleFrames[this.direction]);
        this.direction = null;
      }
    }

    if(this.controls.up()) {
      this.player.body.setVelocityY(-this.playerSpeed);
      if(!this.direction || this.direction === 'down') {
        this.direction = 'up';
      }
    } else if(this.controls.down()) {
      this.player.body.setVelocityY(this.playerSpeed);
      if(!this.direction || this.direction === 'up') {
        this.direction = 'down';
      }
    } else {
      this.player.body.setVelocityY(0);
      if(this.direction === 'up' || this.direction === 'down') {
        this.player.anims.stop();
        this.player.setFrame(this.idleFrames[this.direction]);
        this.direction = null;
      }
    }

    if(this.direction) {
      this.player.anims.play(`walk-${this.direction}`, true);
    }
  }

  destroy() {}
}