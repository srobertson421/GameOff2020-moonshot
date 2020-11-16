import Phaser from 'phaser';

export default {
  type: Phaser.WEBGL,
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
  maxLights: 10,
  input: {
    gamepad: true,
    keyboard: true
  }
}