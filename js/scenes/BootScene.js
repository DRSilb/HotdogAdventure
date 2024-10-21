class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Existing asset loads
    this.load.image('background', 'assets/images/background.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('hotdog', 'assets/images/hotdog.png');
    this.load.image('condiment', 'assets/images/condiment.png');
    this.load.image('door', 'assets/images/door.png');
    this.load.image('leftButton', 'assets/images/leftButton.png');
    this.load.image('rightButton', 'assets/images/rightButton.png');
    this.load.image('jumpButton', 'assets/images/jumpButton.png');

    // Load obstacle images
    this.load.image('fork', 'assets/images/fork.png');
    this.load.image('knife', 'assets/images/knife.png');
  }

  create() {
    this.scene.start('GameScene');
  }
}
