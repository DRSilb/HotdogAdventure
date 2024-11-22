import Stopwatch from '../Stopwatch.js'; 
import { levelStopwatches } from '../Default.js';
import Default from '../Default.js';
export default class Level2Scene extends Default {  constructor() {
    super({ key: 'Level2Scene' });
    this.stopwatch = new Stopwatch();
    this.stopwatchStarted = false;
  }

  init(data) {
    this.selectedHotdog = data.selectedHotdog || 'hotdog1';
  }

  create() {
    this.initializeInputs();

    const playerConfig = {
      x: 100, y: 1100, sprite: this.selectedHotdog,
    };

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
     this.createDefaults({
      playerConfig, platformsConfig, condimentsConfig, obstaclesConfig,
      worldBounds: { width: 1600, height: 1200 },
      cameraBounds: { width: 1600, height: 1200 },
    });
    
    this.scoreCount(3, 'Level2');//amount of condiments in params
    this.doorCoords(1500, 500);
    this.mobile();
  }
  update() {
    this.player.setVelocityX(0);
    this.speed(160);
    this.jump(-400);
    this.timeText.setText('Time: ' + this.stopwatch.getTimeFormatted());
    this.keys();
  }

  skipToNextLevel() {
    this.stopwatch.stop();
    levelStopwatches['Level2'] = this.stopwatch.getTimeFormatted();
    this.scene.start('Level3Scene', { selectedHotdog: this.selectedHotdog });
  }
}
