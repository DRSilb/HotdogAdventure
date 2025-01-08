export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
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
    this.load.image('door_outline', 'assets/images/door_outline.png');
    this.load.image('fork', 'assets/images/fork.png');
    this.load.image('knife', 'assets/images/knife.png');

    this.load.audio('walk', 'assets/sounds/Walk.mp3');
    this.load.audio('jump', 'assets/sounds/Jump.mp3');
    this.load.audio('death', 'assets/sounds/Death.mp3');
    this.load.audio('ketchup', 'assets/sounds/Ketchup.mp3');
    // this.load.audio('background', 'assets/music/background.mp3');
  }

  create() {
    this.scene.start('TitleScene');
  }
}
