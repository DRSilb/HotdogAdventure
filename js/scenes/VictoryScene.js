import { levelStopwatches } from '../GlobalData.js'; // Assuming you have moved levelStopwatches to a shared global file

export default class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VictoryScene' });
  }

  create() {
    // Display victory message
    this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'You Win!', {
        fontSize: '64px',
        fill: '#000',
      })
      .setOrigin(0.5);

    // Display level times
    let yPosition = this.cameras.main.centerY - 50;
    if (Object.keys(levelStopwatches).length > 0) {
      for (const [level, time] of Object.entries(levelStopwatches)) {
        this.add.text(100, yPosition, `${level}: ${time}`, { fontSize: '32px', fill: '#000' });
        yPosition += 40;
      }
    } else {
      this.add.text(100, yPosition, 'No times recorded', { fontSize: '32px', fill: '#000' });
    }
    let totalTime = 0;
    for (const time of Object.values(levelStopwatches)) {
      const [minutes, seconds] = time.split(':').map(Number);
      totalTime += minutes * 60 + seconds;
    }
    const totalMinutes = Math.floor(totalTime / 60);
    const totalSeconds = totalTime % 60;
    this.add.text(100, yPosition, `Total Time: ${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`, {
      fontSize: '32px',
      fill: '#000',
    });
    // Instructions to restart
    this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY + 150, 'Press SPACE to Restart', {
        fontSize: '32px',
        fill: '#000',
      })
      .setOrigin(0.5);

    // Restart game on input
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('TitleScene');
    });
  }
}
