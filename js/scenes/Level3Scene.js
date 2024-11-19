import Stopwatch from '../Stopwatch.js';
import Default from '../Default.js';
import { levelStopwatches } from '../GlobalData.js';
export default class Level3Scene extends Default {  constructor() {
    super({ key: 'Level3Scene' });
    this.stopwatch = new Stopwatch();
    this.stopwatchStarted = false; // Add this line
  }

  init(data) {
    // Store the selected hotdog from the TitleScene
    this.selectedHotdog = data.selectedHotdog || 'hotdog1'; // Default to 'hotdog1' if no data is provided
  }

  create() {

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
        { x: 400, y: 500 },
        { x: 800, y: 300 },
        { x: 1500, y: 566 },
      ],
    };

    const condimentsConfig = {
      positions: [
        //{ x: 400, y: 1050 },
        { x: 800, y: 850 },
        { x: 1200, y: 650 },
        { x: 400, y: 450 },
        { x: 800, y: 250 },
      ],
    };

    const obstaclesConfig = {
      positions: [
        { x: 600, y: 1070, sprite: 'fork' },
        { x: 1000, y: 870, sprite: 'knife' },
        { x: 600, y: 670, sprite: 'fork' },
        { x: 1000, y: 470, sprite: 'knife' },
      ],
    };
    
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
      .text(16, 16, 'Condiments: 0 / 4', { fontSize: '32px', fill: '#000' })
      .setScrollFactor(0);

    this.text = this.add.text(16, 50, 'Level3', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
  
    // Door (initialize as null)
    this.door = this.add.sprite(1500, 500, 'door_outline');
    this.buttonY = this.sys.game.config.height / 6;

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
      this.createTouchControls();

          // Resize event
    window.addEventListener('resize', this.resizeGame.bind(this));
    this.resizeGame();
    }

    this.input.on('pointerdown', this.startStopwatch, this);
    this.input.keyboard.on('keydown', this.startStopwatch, this);

    // Display stopwatch time
    this.timeText = this.add.text(16, 75, 'Time: 0:00', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
    this.physics.add.overlap(this.player,this.condiments,this.collectCondiment.bind(this, 4, 1500, 500),null,this);

  }

  update() {
    this.player.setVelocityX(0); //stop player
    this.speed(160); // speed and movement
    this.jump(-530); //jumpheight
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
    levelStopwatches['Level3'] = this.stopwatch.getTimeFormatted();
    console.log('Level 3 completed in:', levelStopwatches['Level3Scene']);
    this.scene.start('Level4Scene', { selectedHotdog: this.selectedHotdog });
  }
}