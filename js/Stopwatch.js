export default class Stopwatch {
  constructor() {
    this.startTime = null;
    this.elapsedTime = 0;
  }

  start() {
    if (!this.startTime) {
      this.startTime = Date.now();
    }
  }

  stop() {
    if (this.startTime) {
      this.elapsedTime += Date.now() - this.startTime;
      this.startTime = null;
    }
  }

  reset() {
    this.startTime = null;
    this.elapsedTime = 0;
  }

  getTime() {
    if (this.startTime) {
      return this.elapsedTime + (Date.now() - this.startTime);
    }
    return this.elapsedTime;
  }

  getTimeFormatted() {
    const time = this.getTime(); // Total elapsed time in milliseconds
    
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(time % 1000);
  
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  }
}
