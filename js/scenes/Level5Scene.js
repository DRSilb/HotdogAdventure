import Stopwatch from '../Stopwatch.js';
import Default from '../Default.js';
import { levelStopwatches } from '../Default.js';
export default class Level5Scene extends Default {    constructor() {
      super({ key: 'Level5Scene' });
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
          { x: 800, y: 750 },
          { x: 1200, y: 950 },
          { x: 1200, y: 550 },
          { x: 1500, y: 616 },
        ],
      };
      
      const condimentsConfig = {
        positions: [
          { x: 200, y: 1000 },
          { x: 600, y: 850 },
          { x: 1000, y: 650 },
        ],
      };

      const obstaclesConfig = {
        positions: [
          { x: 150, y: 1125, sprite: 'knife' },
          { x: 250, y: 1125, sprite: 'knife' },
          { x: 350, y: 1125, sprite: 'knife' },
          { x: 450, y: 1125, sprite: 'knife' },
          { x: 550, y: 1125, sprite: 'knife' },
          { x: 650, y: 1125, sprite: 'knife' },
        ],
      };

      this.createDefaults({
        playerConfig, platformsConfig, condimentsConfig, obstaclesConfig,
        worldBounds: { width: 1600, height: 1200 },
        cameraBounds: { width: 1600, height: 1200 },
      });
    this.scoreCount(3, 'Level5');//amount of condiments in params
    this.doorCoords(1500, 550, 3);
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
      levelStopwatches['Level5'] = this.stopwatch.getTimeFormatted();
      this.scene.start('Level6Scene', { selectedHotdog: this.selectedHotdog });
    }
  }