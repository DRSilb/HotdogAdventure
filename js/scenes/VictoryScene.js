class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VictoryScene' });
  }

  create() {
    // Display victory message
    this.add.text(400, 300, 'You Win!', { fontSize: '64px', fill: '#000' }).setOrigin(0.5);

    // Restart game on input
    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('GameScene');
    });

    // Instructions
    this.add.text(400, 400, 'Press SPACE to Restart', { fontSize: '32px', fill: '#000' }).setOrigin(0.5);
  }
}
