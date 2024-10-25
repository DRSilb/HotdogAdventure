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
    const time = this.getTime();
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
