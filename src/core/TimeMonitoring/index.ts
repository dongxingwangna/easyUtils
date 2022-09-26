/**
 * @docName: index.ts
 * @Author: wdx
 * @Date: 2022/9/26  14:59
 */
import { debounce, sum } from 'lodash';
import moment = require('moment');

class time {
  private _startTime: string;
  private _endTime: string;
  private _total: number;

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get startTime(): string {
    return this._startTime;
  }

  set startTime(value: string) {
    this._startTime = value;
  }

  get endTime(): string {
    return this._endTime;
  }

  set endTime(value: string) {
    this._endTime = value;
  }

  constructor(startTime: string, endTime: string, total: number) {
    this._startTime = startTime;
    this._endTime = endTime;
    this._total = total;
  }
}

export class TimeMonitoring {
  private _el: HTMLElement;
  private _listeners: string[] = ['click'];
  private _currentTime: number = 0;
  private _totalTime: number = 0;
  private _startFun: Function;
  private _running: Function;
  private _end: Function;
  private _timeLine: time[] = [];
  private _autoPauseTime: number;
  private _timeOut: number = 0;
  private _startTime: moment.Moment = moment();
  private _isRunning: boolean = false;

  get isRunning(): boolean {
    return this._isRunning;
  }

  set isRunning(value: boolean) {
    this._isRunning = value;
  }

  get startTime(): moment.Moment {
    return this._startTime;
  }

  set startTime(value: moment.Moment) {
    this._startTime = value;
  }

  get timeOut(): number {
    return this._timeOut;
  }

  set timeOut(value: number) {
    this._timeOut = value;
  }

  constructor(
    el: HTMLElement,
    listeners: string[],
    autoPauseTime = 6000,
    startFun: Function,
    running: Function,
    end: Function,
  ) {
    this._el = el;
    this._listeners = listeners;
    this._startFun = startFun;
    this._running = running;
    this._autoPauseTime = autoPauseTime;
    this._end = end;
  }

  get el(): HTMLElement {
    return this._el;
  }

  set el(value: HTMLElement) {
    this._el = value;
  }

  get autoPauseTime(): number {
    return this._autoPauseTime;
  }

  set autoPauseTime(value: number) {
    this._autoPauseTime = value;
  }

  get listeners(): string[] {
    return this._listeners;
  }

  set listeners(value: string[]) {
    this._listeners = value;
  }

  get currentTime(): number {
    return this._currentTime;
  }

  set currentTime(value: number) {
    this._currentTime = value;
  }

  get totalTime(): number {
    return this._totalTime;
  }

  set totalTime(value: number) {
    this._totalTime = value;
  }

  get startFun(): Function {
    return this._startFun;
  }

  set startFun(value: Function) {
    this._startFun = value;
  }

  get running(): Function {
    return this._running;
  }

  set running(value: Function) {
    this._running = value;
  }

  get end(): Function {
    return this._end;
  }

  set end(value: Function) {
    this._end = value;
  }

  get timeLine(): time[] {
    return this._timeLine;
  }

  set timeLine(value: time[]) {
    this._timeLine = value;
  }

  run() {
    this.listeners.map((listener) => {
      this.el.addEventListener(listener, this.start);
    });
  }

  start() {
    if (!this.isRunning) {
      this.startFun && this.startFun();
      this.startTime = moment();
      this.calcTime();
    }
    this.pause();
  }

  calcTime() {
    let currentTime = moment();
    if (!this.isRunning) {
      this.isRunning = true;
    }
    if (this.running) {
      let total = sum(this.timeLine.map((time) => time.total));
      let currentSeconds = currentTime.seconds() - this.startTime.seconds();
      this.running(this.isRunning, currentSeconds, total + currentSeconds);
      this.timeOut = Number(setTimeout(this.calcTime, 1000));
    }
  }

  pause = debounce(this.stop, this.autoPauseTime, {
    leading: false,
    trailing: true,
  });

  stop() {
    let currentTime = moment();
    clearTimeout(this.timeOut);
    this.timeLine.push(
      new time(
        this.startTime.format('YYYY MM DD HH:mm:ss'),
        currentTime.format('YYYY MM DD HH:mm:ss'),
        currentTime.seconds() - this.startTime.seconds(),
      ),
    );
    this.isRunning = false;
    if (this.end) {
      let total = sum(this.timeLine.map((time) => time.total));
      this.end(this.isRunning, total, this.timeLine);
    }
  }

  getTime(autoDestroy: boolean = false): {
    total: number;
    timeLine: time[];
  } {
    let currentTime = moment();
    let total = sum(this.timeLine.map((time) => time.total));
    if (autoDestroy) {
      this.destroy();
    }
    return {
      total: total + this.startTime.seconds() - currentTime.seconds(),
      timeLine: this.timeLine,
    };
  }

  destroy() {
    clearTimeout(this.timeOut);
    this.listeners.map((listener) => {
      this.el.removeEventListener(listener, this.start);
    });
  }
}
