class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VictoryScene' });
  }

  create() {
    // Display victory message
    this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, 'You Win!', {
        fontSize: '64px',
        fill: '#000',
      })
      .setOrigin(0.5);

    // Instructions
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 100,
        'Press SPACE to Restart',
        { fontSize: '32px', fill: '#000' }
      )
      .setOrigin(0.5);

    // Restart game on input
    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}
