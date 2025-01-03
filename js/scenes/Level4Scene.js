import Stopwatch from '../Stopwatch.js';
import Default from '../Default.js';
import { levelStopwatches } from '../Default.js';
export default class level4Scene extends Default {  constructor() {
    super({ key: 'Level4Scene' });
    this.stopwatch = new Stopwatch();
    this.stopwatchStarted = false;
  }

  init(data) {
    this.selectedHotdog = data.selectedHotdog || 'hotdog1';
  }

  create() {

    this.initializeInputs();

    const playerConfig = {
      x: 200, y: 100, sprite: this.selectedHotdog,
    };

    const platformsConfig = {
      additional: [
        { x: 600, y: 900 },
        { x: 1000, y: 700 },
        { x: 1400, y: 500 },
        { x: 800, y: 300 },
        { x: 200, y: 1100 },
      ],
    };

    const condimentsConfig = {
      positions: [
        { x: 200, y: 1000 },
        { x: 600, y: 850 },
        { x: 1000, y: 650 },
        { x: 1400, y: 450 },
        { x: 800, y: 250 },
      ],
    };

    const obstaclesConfig = {
      positions: [
        { x: 400, y: 1070, sprite: 'fork' },
        { x: 800, y: 870, sprite: 'knife' },
        { x: 1200, y: 670, sprite: 'fork' },
        { x: 600, y: 470, sprite: 'knife' },
        { x: 150, y: 1050, sprite: 'knife' },
        { x: 250, y: 1050, sprite: 'knife' },
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
    this.scoreCount(5, 'Level4');//amount of condiments in params
    this.doorCoords(1400, 434, 5);
    this.mobile();
  }
  
  update() {
    this.player.setVelocityX(0);
    this.speed(160);
    this.jump(-430);
    this.timeText.setText('Time: ' + this.stopwatch.getTimeFormatted());
    this.keys();
  }
  enterDoor(player, door) {
    this.skipToNextLevel();
  }

  skipToNextLevel() {
    this.stopwatch.stop();
    levelStopwatches['Level4'] = this.stopwatch.getTimeFormatted();
    this.scene.start('Level5Scene', { selectedHotdog: this.selectedHotdog });
  }
}
