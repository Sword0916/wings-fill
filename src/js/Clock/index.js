


//时钟类
export default class Clock{
    constructor() {
        this.startTime = null;//开始时间
        this.finishTime = null;//结束时间
        this.deltaTime = null;//持续时间
        this.pauseTime = null;//暂停时间
        this.delayTime = 0;//延迟时长
        this.pauseDuration = 0;//暂停时长
    }

    //开始
    start() {
        this.pauseTime = null;
        this.pauseDuration = 0;
        this.startTime = Date.now();
    }

    //暂停
    pause() {
        this.pauseTime = Date.now();
    }

    //继续
    play() {
        this.pauseDuration += (this.pauseTime? Date.now() - this.pauseTime : 0);
    }

    delay(delayTime) {
        this.delayTime = delayTime;
    }

    //校时
    timing() {
        this.deltaTime = Date.now() - this.startTime - this.pauseDuration - this.delayTime;
        this.deltaTime = this.deltaTime > 0? this.deltaTime : 0;
    }

    //停止
    stop() {
        this.finishTime = Date.now();
        this.deltaTime = this.finishTime - this.startTime - this.pauseDuration - this.delayTime;
        this.deltaTime = this.deltaTime > 0? this.deltaTime : 0;
    }

    //修正时间
    correctTime(offsetTime) {
        this.startTime -= offsetTime;
    }

}