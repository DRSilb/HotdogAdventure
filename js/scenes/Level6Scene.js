import Stopwatch from '../Stopwatch.js';
import Default from '../Default.js';
import { levelStopwatches } from '../Default.js';
export default class Level6Scene extends Default {    constructor() {
      super({ key: 'Level6Scene' });
      this.stopwatch = new Stopwatch();
      this.stopwatchStarted = false;
    }

    init(data) {
      this.selectedHotdog = data.selectedHotdog || 'hotdog1';
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
        playerConfig, platformsConfig, condimentsConfig, obstaclesConfig,
        worldBounds: { width: 1600, height: 1200 },
        cameraBounds: { width: 1600, height: 1200 },
      });
      this.scoreCount(10, 'Level6');//amount of condiments in params
      this.doorCoords(600, 133);
      this.mobile();
      
    }

    update() {
      this.player.setVelocityX(0);
      this.speed(160);
      this.jump(-400);
      this.timeText.setText('Time: ' + this.stopwatch.getTimeFormatted());
      this.keys();
    }
    enterDoor(player, door) {
      this.skipToNextLevel();
    }
  
    skipToNextLevel() {
      this.stopwatch.stop();
      levelStopwatches['Level6'] = this.stopwatch.getTimeFormatted();
      this.scene.start('VictoryScene', { selectedHotdog: this.selectedHotdog });
    }
  }