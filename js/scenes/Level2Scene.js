import Stopwatch from '../Stopwatch.js'; 
import {levelStopwatches} from '../GlobalData.js'; 
import Default from '../Default.js';
export default class Level2Scene extends Default {  constructor() {
    super({ key: 'Level2Scene' });
    this.stopwatch = new Stopwatch();
    this.stopwatchStarted = false; // Add this line
  }

  init(data) {
    // Store the selected hotdog from the TitleScene
    this.selectedHotdog = data.selectedHotdog || 'hotdog1'; // Default to 'hotdog1' if no data is provided
  }

  create() {
    // Initialize inputs
    this.initializeInputs();

    const playerConfig = {
      x: 100, y: 1100, sprite: this.selectedHotdog,
    };

    // Platforms
    this.platforms = this.physics.add.staticGroup();

    const platformsConfig = {
      additional: [
        { x: 100, y: 800 },
        { x: 700, y: 1100 },
        { x: 250, y: 900 },
        { x: 1100, y: 600 },
        { x: 800, y: 800 },
        { x: 1500, y: 566 },
      ],
    };
    const condimentsConfig = {
      positions: [
        { x: 100, y: 700 },
        { x: 700, y: 750 },
        { x: 1100, y: 550 },
      ],
    };

    const obstaclesConfig = {
      positions: [
        {x: 500, y: 1070, sprite: 'fork', shouldMove: true, fromX: 500, toX: 700, speed: 3000},
        {x: 900, y: 870, sprite: 'knife', shouldMove: true, fromY: 870, toY: 1000, speed: 2000},
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

    this.text = this.add.text(16, 50, 'Level2', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
  
    // Door (initialize as null)
    this.door = this.add.sprite(1500, 500, 'door_outline');

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
      .text(16, 75, 'Time: 0:00', { fontSize: '32px', fill: '#000' })
      .setScrollFactor(0);

    // Overlaps
    this.physics.add.overlap(this.player,this.condiments,this.collectCondiment.bind(this, 3, 1500, 500),null,this);
  }
  update() {
    this.player.setVelocityX(0); //stop player
    this.speed(160); // speed and movement
    this.jump(-400); //jumpheight
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
    levelStopwatches['Level2'] = this.stopwatch.getTimeFormatted();
    console.log('Level 2', levelStopwatches['Level2Scene']);
    this.scene.start('Level3Scene', { selectedHotdog: this.selectedHotdog });
  }
}
