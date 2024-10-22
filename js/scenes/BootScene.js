class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Load assets
    this.load.image('background', 'assets/images/background.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('hotdog1', 'assets/images/hotdog1.png');
    this.load.image('hotdog2', 'assets/images/hotdog2.png');
    this.load.image('hotdog3', 'assets/images/hotdog3.png');
    this.load.image('condiment', 'assets/images/condiment.png');
    this.load.image('door', 'assets/images/door.png');
    this.load.image('leftButton', 'assets/images/leftButton.png');
    this.load.image('rightButton', 'assets/images/rightButton.png');
    this.load.image('jumpButton', 'assets/images/jumpButton.png');
    this.load.image('startButton', 'assets/images/startButton.png');

    // Load obstacle images
    this.load.image('fork', 'assets/images/fork.png');
    this.load.image('knife', 'assets/images/knife.png');
  }

  create() {
    this.scene.start('TitleScene');
  }
}
