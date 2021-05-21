export class Clock {

  private startTime: bigint;

  constructor() {
    this.start();
  }

  start(): void {
    this.startTime = process.hrtime.bigint();
  }

  readMillis(): number {
    const elapsedNanos = process.hrtime.bigint() - this.startTime;
    const elapsedMillis = Math.round(Number((elapsedNanos / BigInt(1000000))));
    return elapsedMillis;
  }

  readString(): string {
    return `${this.readMillis()}ms`;
  }

  print(): void {
    console.debug(this.readString());
  }

}
