import {isBoolean, isFunction, isNumeric} from "../utils"
import Clock from "../Clock";
import Edge from "../Edge";
import {Tween} from "../utils/Tween";

//补间动画类
export default class Fill{
    constructor(entity) {
        this.startEntity = entity;
        this.endEntity = null;

        this.startEdge = null;//初始状态
        this.endEdge = null;//结束状态

        this.duration = 100;//默认持续时间
        this.isLoop = false;//无限循环
        this.repeatNum = 1;//重复次数

        this.startFun = null;//开始的回调
        this.updateFun = null;//更新的回调
        this.pauseFun = null;//暂停的回调
        this.playFun = null;//继续的回调
        this.completeFun = null;//完成的回调
        this.easingFun = Tween.Linear;//缓动函数(默认线性)
        this.clock = new Clock();//时钟对象
        this.previousFill = null;//上一个补间动画
        this.nextFill = null;//下一个补间动画

        this.isStart = false;//是否开始
        this.isPause = false;//是否继续
        this.isComplete = false;//是否完成
        this.isReverse = false;//是否倒序
        this.isYoyo = false;//是否yoyo

        //将实例添加到原型中的实例数组中
        Object.getPrototypeOf(Fill).instances.push(this);
    }

    //反向
    reverse() {
        this.isReverse = !this.isReverse;
        [this.startEdge, this.endEdge] = [this.endEdge, this.startEdge];
        this.isReverse ?
            (this.previousFill && this.previousFill.isReverse != this.isReverse && this.previousFill.reverse()) :
            (this.nextFill && this.nextFill.isReverse != this.isReverse && this.nextFill.reverse());
        return this;
    }

    //设置开始状态
    from(entity) {
        this.startEntity = entity;
        return this;
    }

    //设置结束状态
    to(entity, duration) {
        this.endEntity = entity;
        this.duration = isNumeric(duration) && duration != 0? duration : this.duration;
        return this;
    }

    yoyo(isYoyo) {
        this.isYoyo = isBoolean(isYoyo)? isYoyo : false;
        return this;
    }

    //设置重复次数
    repeat(repeatNum) {
        this.isLoop = !(isNumeric(repeatNum) && repeatNum >= 1);
        this.repeatNum = !this.isLoop ? Number.parseInt(repeatNum) : 1;
        return this;
    }

    //设置缓动函数
    easing(easingFun) {
        this.easingFun = isFunction(easingFun)? easingFun: Tween.Linear;
        return this;
    }

    //开始
    start() {
        this.isStart = true;
        this.isPause = false;
        this.isComplete = false;
        this.startEdge = this.startEdge || new Edge(this.startEntity);
        this.endEdge = this.endEdge || new Edge(this.endEntity);
        this.clock.start();
        this.startFun && this.startFun(this.startEntity);
        return this;
    }

    //延迟
    delay(delayTime) {
        isNumeric(delayTime) && this.clock.delay(delayTime);
        return this;
    }

    //更新方法
    update() {
        if(!this.isStart) {
            return this;
        }

        if(!this.isComplete && !this.isPause) {
            this.clock.timing();
            let repeatCount = this.clock.deltaTime / this.duration;
            if(!this.isLoop && repeatCount >= this.repeatNum) {
                this.clock.stop();
                this.isComplete = true;
            }

            this._updateEntityValue();
            this.updateFun && this.updateFun(this.startEntity);

            this.isComplete && this._handleComplete();

        } else if(this.isComplete && this.nextFill) {
            this.nextFill.update();
        }
        return this;
    }

    //暂停
    pause() {
        if(!this.isComplete && !this.isPause) {
            this.isPause = true;
            this.clock.pause();
            this.pauseFun && this.pauseFun(this.startEntity);
        } else if(this.nextFill){
            this.nextFill.pause();
        }
    }

    //继续
    play() {
        if(!this.isComplete && this.isPause) {
            this.isPause = false;
            this.clock.play();
            this.playFun && this.playFun(this.startEntity);
        } else if(this.nextFill) {
            this.nextFill.play();
        }
    }

    //下一步补间动画
    chain(nextFill) {
        if(nextFill instanceof Fill) {
            this.nextFill = nextFill;
            this.nextFill.yoyo(this.isYoyo);//传递isYoyo
            this.nextFill.previousFill = this;
        } else {
            this.nextFill = null;
        }
        return this.nextFill;
    }

    //修改当前的值
    _updateEntityValue() {
        const deltaTime = this.clock.deltaTime % this.duration;
        this.endEdge.original.forEach((value, key) => {
            if(this.startEdge.has(key)) {
                const startValue = this.startEdge.get(key);
                const changeValue = value - startValue;
                this.startEntity[key] = this.isComplete? value: this.easingFun(deltaTime, startValue, changeValue, this.duration);
            }
        })
    }

    //完成处理方法
    _handleComplete() {
        this.completeFun && this.completeFun(this.startEntity);
        if(!this.isReverse && this.nextFill) {//正序且有下一步
            if(!this.nextFill.startEntity) {
                //没有初始实体的，用当前的实体。
                this.nextFill.from(this.startEntity);
            }
            this.nextFill.start();
            //修正开始时间
            this.nextFill.clock.correctTime(this.clock.deltaTime % this.duration);
        } else if(this.isReverse && this.previousFill) {//倒序且有上一步
            if(!this.previousFill.startEntity) {
                //没有初始实体的，用当前的实体。
                this.previousFill.from(this.startEntity);
            }
            this.previousFill.start();
            //修正开始时间
            this.previousFill.clock.correctTime(this.clock.deltaTime % this.duration);
        } else if(this.isYoyo) {
            this.reverse().start();
            //修正开始时间
            this.clock.correctTime(this.clock.deltaTime % this.duration);
        }
    }

    //开始的钩子
    onStart(startFun) {
        this.startFun = isFunction(startFun) ? startFun : null;
        return this;
    }

    //更新的钩子
    onUpdate(updateFun) {
        this.updateFun = isFunction(updateFun) ? updateFun : null;
        return this;
    }

    //完成的钩子
    onComplete(completeFun) {
        this.completeFun = isFunction(completeFun) ? completeFun : null;
        return this;
    }

    //暂停的钩子
    onPause(pauseFun) {
        this.pauseFun = isFunction(pauseFun) ? pauseFun : null;
        return this;
    }

    //继续的钩子
    onPlay(playFun) {
        this.playFun = isFunction(playFun) ? playFun : null;
        return this;
    }

}