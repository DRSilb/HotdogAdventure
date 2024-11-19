import Stopwatch from '../Stopwatch.js';
import Default from '../Default.js';
import { levelStopwatches } from '../GlobalData.js';

export default class Level5Scene extends Default {    constructor() {
      super({ key: 'Level6Scene' });
      this.stopwatch = new Stopwatch();
      this.stopwatchStarted = false; // Add this line
    }

    init(data) {
      // Store the selected hotdog from the TitleScene
      this.selectedHotdog = data.selectedHotdog || 'hotdog1'; // Default to 'hotdog1' if no data is provided
    }
  
    create() {
      
      
      this.initializeInputs();

      const playerConfig = {
        x: 75, y: 1100, sprite: this.selectedHotdog,
      };

      const platformsConfig = {
        additional: [
          { x: 400, y: 1000 },
          { x: 800, y: 800 },
          { x: 600, y: 600 },
          { x: 150, y: 400 },
          { x: 600, y: 200 },
        ],
      };
      
      const condimentsConfig = {
        positions: [
          { x: 200, y: 1000 },
          { x: 600, y: 850 },
          { x: 1000, y: 650 },
          { x: 800, y: 250 },
          { x: 600, y: 200 },
          { x: 150, y: 400 },
          { x: 600, y: 600 },
          { x: 800, y: 800 },
          { x: 400, y: 1000 },
          { x: 800, y: 750 },
          // { x: 1200, y: 950 },
          // { x: 1200, y: 550 },
          // { x: 200, y: 1000 },
          // { x: 600, y: 850 },
          // { x: 1000, y: 650 },
          // { x: 400, y: 750 },
          // { x: 800, y: 1000 },
          // { x: 1200, y: 650 },
          // { x: 400, y: 333 },
          // { x: 555, y: 555 },
          // { x: 550, y: 1125 },
          // { x: 650, y: 1125 },
          // { x: 1111, y: 1222 },
          // { x: 1222, y: 3133 },
          // { x: 444, y: 333 },
          // { x: 555, y: 555 },
          // { x: 550, y: 1125 },
          // { x: 650, y: 1125 },
          // { x: 200, y: 1000 },
          // { x: 600, y: 850 },
          // { x: 1000, y: 650 },
          // { x: 1400, y: 450 },
        ],
      };

      const obstaclesConfig = {
        positions: [
          {x: 500, y: 1070, sprite: 'fork', shouldMove: true, fromX: 500, toX: 700, speed: 3000},
        {x: 900, y: 870, sprite: 'knife', shouldMove: true, fromY: 870, toY: 1000, speed: 2000},
        {x: 100, y: 770, sprite: 'fork', shouldMove: true, fromX: 100, toX: 300, speed: 3000},
        {x: 700, y: 720, sprite: 'knife', shouldMove: true, fromY: 720, toY: 850, speed: 2000},
        {x: 1100, y: 520, sprite: 'fork', shouldMove: true, fromX: 1100, toX: 1300, speed: 3000},
        {x: 500, y: 320, sprite: 'knife', shouldMove: true, fromY: 320, toY: 450, speed: 2000},
        {x: 900, y: 170, sprite: 'fork', shouldMove: true, fromX: 900, toX: 1100, speed: 3000},
        {x: 100, y: 70, sprite: 'knife', shouldMove: true, fromY: 70, toY: 200, fromX: 100, toX: 300, speed: 2000},
        {x: 700, y: 870, sprite: 'knife', shouldMove: true, fromX: 870, toX: 1000, speed: 2000},
        {x: 1100, y: 670, sprite: 'fork', shouldMove: true, fromY: 1100, toY: 1300, speed: 3000},
        {x: 900, y: 270, sprite: 'fork', shouldMove: true, fromY: 900, toY: 1100, speed: 3000},
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
      this.physics.add.overlap(this.player,this.condiments,this.collectCondiment.bind(this, 10, 600, 133),null,this); // this, amount, x, y
  
      // Score
      this.score = 0;
      this.scoreText = this.add
        .text(16, 16, 'Condiments: 0 / 10', { fontSize: '32px', fill: '#000' })
        .setScrollFactor(0);
  
      this.text = this.add.text(16, 50, 'Level6', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
  
      // Door (initialize as null)
      this.door = this.add.sprite(600, 133, 'door_outline');

      this.buttonY = this.sys.game.config.height / 6;

      if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
        this.createTouchControls();
      }

      window.addEventListener('resize', this.resizeGame.bind(this));
      this.resizeGame();

      this.input.on('pointerdown', this.startStopwatch, this);
      this.input.keyboard.on('keydown', this.startStopwatch, this);
  
      // Display stopwatch time
      this.timeText = this.add.text(16, 75, 'Time: 0:00', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
    
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
      levelStopwatches['Level6'] = this.stopwatch.getTimeFormatted();
      console.log('Level 6 completed in:', levelStopwatches['Level6Scene']);
      this.scene.start('VictoryScene', { selectedHotdog: this.selectedHotdog });
    }
  }