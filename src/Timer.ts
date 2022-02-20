class Timer {
  private timeStart = 0;
  private elapsedTime = 0;
  private timerId: number
  public millisecondsPassed: number;
  public hours: number;
  public minutes: number;
  public seconds: number;

  private calculateTime(): void {
    this.millisecondsPassed = Date.now() - this.timeStart;
    const hrsDiff = (this.millisecondsPassed) / 3600000;
    this.hours = Math.floor(hrsDiff);
    const minDiff = (hrsDiff - this.hours) * 60;
    this.minutes = Math.floor(minDiff);
    const secDiff = (minDiff - this.minutes) * 60;
    this.seconds = Math.floor(secDiff);
  }
  
  public getElapsedTimeString(): string {
    this.calculateTime();
    const hoursString = this.hours.toString().padStart(2, "0");
    const minutesString = this.minutes.toString().padStart(2, "0");
    const secondsString = this.seconds.toString().padStart(2, "0");
    return `${hoursString}:${minutesString}:${secondsString}`
  }
  
  public start(): void {
    this.timeStart = Date.now() - this.elapsedTime;
    
    this.timerId = setInterval(() => {
      this.elapsedTime = Date.now() - this.timeStart;
      this.print(this.getElapsedTimeString());
    }, 1000);
  }

  public pause() {
    clearInterval(this.timerId);
  }

  public reset() {
    this.timeStart = 0;
    this.elapsedTime = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.millisecondsPassed = 0;
    this.print("00:00:00");
    clearInterval(this.timerId);
  }

  public print(time: string): void {
    const elapsedTimeElement = document.querySelector('#elapsedTime');

    elapsedTimeElement.textContent = time;
  }
}


export default Timer;