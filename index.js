import Phaser from 'phaser';

import gameConfig from './GameConfig';
import GameScene from './GameScene';

gameConfig.scene = new GameScene();
new Phaser.Game(gameConfig);