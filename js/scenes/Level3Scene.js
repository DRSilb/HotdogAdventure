import Stopwatch from '../Stopwatch.js';
import Default from '../Default.js';
import { levelStopwatches } from '../Default.js';
export default class Level3Scene extends Default {  constructor() {
    super({ key: 'Level3Scene' });
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
      playerConfig, platformsConfig, condimentsConfig, obstaclesConfig,
      worldBounds: { width: 1600, height: 1200 },
      cameraBounds: { width: 1600, height: 1200 },
    });
    this.scoreCount(4, 'Level3');//amount of condiments in params
    this.doorCoords(1500, 500);
    this.mobile();
    
  }

  update() {
    this.player.setVelocityX(0);
    this.speed(160); 
    this.jump(-530);
    this.timeText.setText('Time: ' + this.stopwatch.getTimeFormatted());
    this.keys();
  }
  enterDoor(player, door) {
    this.skipToNextLevel();
  }

  skipToNextLevel() {
    this.stopwatch.stop();
    levelStopwatches['Level3'] = this.stopwatch.getTimeFormatted();
    this.scene.start('Level4Scene', { selectedHotdog: this.selectedHotdog });
  }
}