const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#87CEEB',
  parent: 'game-container',
  scene: [BootScene, GameScene, Level2Scene, Level3Scene, Level4Scene, Level5Scene, VictoryScene],
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 300 }, debug: false }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
};

const game = new Phaser.Game(config);
