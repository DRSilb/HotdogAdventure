import BootScene from './scenes/BootScene.js';
import TitleScene from './scenes/TitleScene.js';
import GameScene from './scenes/GameScene.js';
import Level2Scene from './scenes/Level2Scene.js';
import Level3Scene from './scenes/Level3Scene.js';
import Level4Scene from './scenes/Level4Scene.js';
import Level5Scene from './scenes/Level5Scene.js';
import Level6Scene from './scenes/Level6Scene.js';
import VictoryScene from './scenes/VictoryScene.js';

// Global object to store level times
//var levelStopwatches = {};

const config = {
  type: Phaser.AUTO,
  width: 800, // Base width
  height: 600, // Base height
  backgroundColor: '#87CEEB',
  parent: 'game-container',
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    Level2Scene,
    Level3Scene,
    Level4Scene,
    Level5Scene,
    Level6Scene,
    VictoryScene,
  ],
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 300 }, debug: false },
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);
