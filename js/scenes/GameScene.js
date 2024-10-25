// GameScene.js
import Stopwatch from '../Stopwatch.js';
import Default from '../Default.js';
import { levelStopwatches } from '../GlobalData.js';

export default class GameScene extends Default {
  constructor() {
    super({ key: 'GameScene' });
    this.stopwatch = new Stopwatch();
    this.stopwatchStarted = false;
  }

  init(data) {
    // Store the selected hotdog from the TitleScene
    this.selectedHotdog = data.selectedHotdog || 'hotdog1'; // Default to 'hotdog1' if no data is provided
  }

  create() {
    // Initialize inputs
    this.initializeInputs();

    // Scene-specific configurations
    const playerConfig = {
      x: 100, y: 1100, sprite: this.selectedHotdog,
    };

    const platformsConfig = {
      additional: [
        { x: 400, y: 1100 },
        { x: 800, y: 900 },
        { x: 1200, y: 700 },
      ],
    };

    const condimentsConfig = {
      positions: [
        { x: 400, y: 750 },
        { x: 800, y: 1000 },
        { x: 1200, y: 650 },
      ],
    };

    const obstaclesConfig = {
      positions: [
        { x: 600, y: 1070, sprite: 'fork' },
        { x: 1000, y: 870, sprite: 'knife' },
      ],
    };

    // Call createDefaults with configurations
    this.createDefaults({
      playerConfig,
      platformsConfig,
      condimentsConfig,
      obstaclesConfig,
      worldBounds: { width: 1600, height: 1200 },
      cameraBounds: { width: 1600, height: 1200 },
    });

    // Score
    this.score = 0;
    this.scoreText = this.add
      .text(16, 16, 'Condiments: 0 / 3', { fontSize: '32px', fill: '#000' })
      .setScrollFactor(0);

    // Door (initialize as null)
    this.door = null;
    
    this.buttonY = this.sys.game.config.height / 6;

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
      this.createTouchControls();
    }

    // Resize event
    window.addEventListener('resize', this.resizeGame.bind(this));
    this.resizeGame();

    this.input.on('pointerdown', this.startStopwatch, this);
    this.input.keyboard.on('keydown', this.startStopwatch, this);

    // Display stopwatch time
    this.timeText = this.add
      .text(16, 50, 'Time: 0:00', { fontSize: '32px', fill: '#000' })
      .setScrollFactor(0);

    // Overlaps
    this.physics.add.overlap(this.player,this.condiments,this.collectCondiment.bind(this, 3, 1500, 500),null,this);
  }

  update() {
    this.player.setVelocityX(0); //stop player
    this.speed(200); // speed and movement
    this.jump(-350); //jumpheight
    this.timeText.setText('Time: ' + this.stopwatch.getTimeFormatted()); //time

    if (Phaser.Input.Keyboard.JustDown(this.nextLevelKey1) && Phaser.Input.Keyboard.JustDown(this.nextLevelKey2)) {
      this.skipToNextLevel();
    }
  }
  enterDoor(player, door) {
    this.skipToNextLevel();
  }

  skipToNextLevel() {
    this.stopwatch.stop();
    levelStopwatches['Level1'] = this.stopwatch.getTimeFormatted();
    console.log('GameScene completed in:', levelStopwatches['GameScene']);
    this.scene.start('Level2Scene', { selectedHotdog: this.selectedHotdog });
  }
}
