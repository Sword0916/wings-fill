function o(t) {
  return (typeof t == "number" || t instanceof Number) && !isNaN(t);
}
function p(t) {
  return typeof t == "boolean";
}
function h(t) {
  return typeof t == "function";
}
class d {
  constructor() {
    this.startTime = null, this.finishTime = null, this.deltaTime = null, this.pauseTime = null, this.delayTime = 0, this.pauseDuration = 0;
  }
  //开始
  start() {
    this.pauseTime = null, this.pauseDuration = 0, this.startTime = Date.now();
  }
  //暂停
  pause() {
    this.pauseTime = Date.now();
  }
  //继续
  play() {
    this.pauseDuration += this.pauseTime ? Date.now() - this.pauseTime : 0;
  }
  delay(i) {
    this.delayTime = i;
  }
  //校时
  timing() {
    this.deltaTime = Date.now() - this.startTime - this.pauseDuration - this.delayTime, this.deltaTime = this.deltaTime > 0 ? this.deltaTime : 0;
  }
  //停止
  stop() {
    this.finishTime = Date.now(), this.deltaTime = this.finishTime - this.startTime - this.pauseDuration - this.delayTime, this.deltaTime = this.deltaTime > 0 ? this.deltaTime : 0;
  }
  //修正时间
  correctTime(i) {
    this.startTime -= i;
  }
}
class c {
  constructor(i) {
    this.original = /* @__PURE__ */ new Map(), this.saveOriginal(i);
  }
  //保存原始值
  saveOriginal(i) {
    for (let e in i) {
      const s = i[e];
      o(s) && this.original.set(e, s);
    }
  }
  //是否有值
  has(i) {
    return this.original.has(i);
  }
  //取值
  get(i) {
    return this.original.has(i) ? this.original.get(i) : null;
  }
}
const l = {
  Linear: function(t, i, e, s) {
    return e * t / s + i;
  },
  Quad: {
    //二次方缓动效果
    easeIn: function(t, i, e, s) {
      return e * (t /= s) * t + i;
    },
    easeOut: function(t, i, e, s) {
      return -e * (t /= s) * (t - 2) + i;
    },
    easeInOut: function(t, i, e, s) {
      return (t /= s / 2) < 1 ? e / 2 * t * t + i : -e / 2 * (--t * (t - 2) - 1) + i;
    }
  },
  Cubic: {
    //三次方缓动效果
    easeIn: function(t, i, e, s) {
      return e * (t /= s) * t * t + i;
    },
    easeOut: function(t, i, e, s) {
      return e * ((t = t / s - 1) * t * t + 1) + i;
    },
    easeInOut: function(t, i, e, s) {
      return (t /= s / 2) < 1 ? e / 2 * t * t * t + i : e / 2 * ((t -= 2) * t * t + 2) + i;
    }
  },
  Quart: {
    //四次方缓动效果
    easeIn: function(t, i, e, s) {
      return e * (t /= s) * t * t * t + i;
    },
    easeOut: function(t, i, e, s) {
      return -e * ((t = t / s - 1) * t * t * t - 1) + i;
    },
    easeInOut: function(t, i, e, s) {
      return (t /= s / 2) < 1 ? e / 2 * t * t * t * t + i : -e / 2 * ((t -= 2) * t * t * t - 2) + i;
    }
  },
  Quint: {
    //五次方缓动效果
    easeIn: function(t, i, e, s) {
      return e * (t /= s) * t * t * t * t + i;
    },
    easeOut: function(t, i, e, s) {
      return e * ((t = t / s - 1) * t * t * t * t + 1) + i;
    },
    easeInOut: function(t, i, e, s) {
      return (t /= s / 2) < 1 ? e / 2 * t * t * t * t * t + i : e / 2 * ((t -= 2) * t * t * t * t + 2) + i;
    }
  },
  Sine: {
    //正弦缓动效果
    easeIn: function(t, i, e, s) {
      return -e * Math.cos(t / s * (Math.PI / 2)) + e + i;
    },
    easeOut: function(t, i, e, s) {
      return e * Math.sin(t / s * (Math.PI / 2)) + i;
    },
    easeInOut: function(t, i, e, s) {
      return -e / 2 * (Math.cos(Math.PI * t / s) - 1) + i;
    }
  },
  Expo: {
    //指数缓动效果
    easeIn: function(t, i, e, s) {
      return t == 0 ? i : e * Math.pow(2, 10 * (t / s - 1)) + i;
    },
    easeOut: function(t, i, e, s) {
      return t == s ? i + e : e * (-Math.pow(2, -10 * t / s) + 1) + i;
    },
    easeInOut: function(t, i, e, s) {
      return t == 0 ? i : t == s ? i + e : (t /= s / 2) < 1 ? e / 2 * Math.pow(2, 10 * (t - 1)) + i : e / 2 * (-Math.pow(2, -10 * --t) + 2) + i;
    }
  },
  Circ: {
    //圆形缓动函数
    easeIn: function(t, i, e, s) {
      return -e * (Math.sqrt(1 - (t /= s) * t) - 1) + i;
    },
    easeOut: function(t, i, e, s) {
      return e * Math.sqrt(1 - (t = t / s - 1) * t) + i;
    },
    easeInOut: function(t, i, e, s) {
      return (t /= s / 2) < 1 ? -e / 2 * (Math.sqrt(1 - t * t) - 1) + i : e / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + i;
    }
  },
  Elastic: {
    //指数衰减正弦曲线缓动函数
    easeIn: function(t, i, e, s, n, r) {
      var u;
      return t == 0 ? i : (t /= s) == 1 ? i + e : (typeof r > "u" && (r = s * 0.3), !n || n < Math.abs(e) ? (u = r / 4, n = e) : u = r / (2 * Math.PI) * Math.asin(e / n), -(n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * s - u) * (2 * Math.PI) / r)) + i);
    },
    easeOut: function(t, i, e, s, n, r) {
      var u;
      return t == 0 ? i : (t /= s) == 1 ? i + e : (typeof r > "u" && (r = s * 0.3), !n || n < Math.abs(e) ? (n = e, u = r / 4) : u = r / (2 * Math.PI) * Math.asin(e / n), n * Math.pow(2, -10 * t) * Math.sin((t * s - u) * (2 * Math.PI) / r) + e + i);
    },
    easeInOut: function(t, i, e, s, n, r) {
      var u;
      return t == 0 ? i : (t /= s / 2) == 2 ? i + e : (typeof r > "u" && (r = s * (0.3 * 1.5)), !n || n < Math.abs(e) ? (n = e, u = r / 4) : u = r / (2 * Math.PI) * Math.asin(e / n), t < 1 ? -0.5 * (n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * s - u) * (2 * Math.PI) / r)) + i : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * s - u) * (2 * Math.PI) / r) * 0.5 + e + i);
    }
  },
  Back: {
    //超过范围的三次方的缓动函数
    easeIn: function(t, i, e, s, n) {
      return typeof n > "u" && (n = 1.70158), e * (t /= s) * t * ((n + 1) * t - n) + i;
    },
    easeOut: function(t, i, e, s, n) {
      return typeof n > "u" && (n = 1.70158), e * ((t = t / s - 1) * t * ((n + 1) * t + n) + 1) + i;
    },
    easeInOut: function(t, i, e, s, n) {
      return typeof n > "u" && (n = 1.70158), (t /= s / 2) < 1 ? e / 2 * (t * t * (((n *= 1.525) + 1) * t - n)) + i : e / 2 * ((t -= 2) * t * (((n *= 1.525) + 1) * t + n) + 2) + i;
    }
  },
  Bounce: {
    //指数衰减的反弹曲线缓动函数
    easeIn: function(t, i, e, s) {
      return e - l.Bounce.easeOut(s - t, 0, e, s) + i;
    },
    easeOut: function(t, i, e, s) {
      return (t /= s) < 1 / 2.75 ? e * (7.5625 * t * t) + i : t < 2 / 2.75 ? e * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + i : t < 2.5 / 2.75 ? e * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + i : e * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + i;
    },
    easeInOut: function(t, i, e, s) {
      return t < s / 2 ? l.Bounce.easeIn(t * 2, 0, e, s) * 0.5 + i : l.Bounce.easeOut(t * 2 - s, 0, e, s) * 0.5 + e * 0.5 + i;
    }
  }
};
class f {
  constructor(i) {
    this.startEntity = i, this.endEntity = null, this.startEdge = null, this.endEdge = null, this.duration = 100, this.isLoop = !1, this.repeatNum = 1, this.startFun = null, this.updateFun = null, this.pauseFun = null, this.playFun = null, this.completeFun = null, this.easingFun = l.Linear, this.clock = new d(), this.previousFill = null, this.nextFill = null, this.isStart = !1, this.isPause = !1, this.isComplete = !1, this.isReverse = !1, this.isYoyo = !1, Object.getPrototypeOf(f).instances.push(this);
  }
  //反向
  reverse() {
    return this.isReverse = !this.isReverse, [this.startEdge, this.endEdge] = [this.endEdge, this.startEdge], this.isReverse ? this.previousFill && this.previousFill.isReverse != this.isReverse && this.previousFill.reverse() : this.nextFill && this.nextFill.isReverse != this.isReverse && this.nextFill.reverse(), this;
  }
  //设置开始状态
  from(i) {
    return this.startEntity = i, this;
  }
  //设置结束状态
  to(i, e) {
    return this.endEntity = i, this.duration = o(e) && e != 0 ? e : this.duration, this;
  }
  yoyo(i) {
    return this.isYoyo = p(i) ? i : !1, this;
  }
  //设置重复次数
  repeat(i) {
    return this.isLoop = !(o(i) && i >= 1), this.repeatNum = this.isLoop ? 1 : Number.parseInt(i), this;
  }
  //设置缓动函数
  easing(i) {
    return this.easingFun = h(i) ? i : l.Linear, this;
  }
  //开始
  start() {
    return this.isStart = !0, this.isPause = !1, this.isComplete = !1, this.startEdge = this.startEdge || new c(this.startEntity), this.endEdge = this.endEdge || new c(this.endEntity), this.clock.start(), this.startFun && this.startFun(this.startEntity), this;
  }
  //延迟
  delay(i) {
    return o(i) && this.clock.delay(i), this;
  }
  //更新方法
  update(i = !1) {
    if (!this.isStart && !this.isComplete)
      return this;
    if (!this.isComplete && !this.isPause) {
      this.clock.timing();
      let e = this.clock.deltaTime / this.duration;
      !this.isLoop && e >= this.repeatNum && (this.clock.stop(), this.isStart = !1, this.isComplete = !0), this._updateEntityValue(), this.updateFun && this.updateFun(this.startEntity), this.isComplete && this._handleComplete();
    } else !i && this.isComplete && this.nextFill && this.nextFill.update();
    return this;
  }
  //暂停
  pause(i = !1) {
    return !this.isStart && !this.isComplete ? this : (!this.isComplete && !this.isPause ? (this.isPause = !0, this.clock.pause(), this.pauseFun && this.pauseFun(this.startEntity)) : !i && this.isComplete && this.nextFill && this.nextFill.pause(), this);
  }
  //继续
  play(i = !1) {
    return !this.isStart && !this.isComplete ? this : (!this.isComplete && this.isPause ? (this.isPause = !1, this.clock.play(), this.playFun && this.playFun(this.startEntity)) : !i && this.isComplete && this.nextFill && this.nextFill.play(), this);
  }
  //下一步补间动画
  chain(i) {
    return i instanceof f ? (this.nextFill = i, this.nextFill.yoyo(this.isYoyo), this.nextFill.previousFill = this) : this.nextFill = null, this.nextFill;
  }
  //修改当前的值
  _updateEntityValue() {
    const i = this.clock.deltaTime % this.duration;
    this.endEdge.original.forEach((e, s) => {
      if (this.startEdge.has(s)) {
        const n = this.startEdge.get(s), r = e - n;
        this.startEntity[s] = this.isComplete ? e : this.easingFun(i, n, r, this.duration);
      }
    });
  }
  //完成处理方法
  _handleComplete() {
    this.completeFun && this.completeFun(this.startEntity), !this.isReverse && this.nextFill ? (this.nextFill.startEntity || this.nextFill.from(this.startEntity), this.nextFill.start(), this.nextFill.clock.correctTime(this.clock.deltaTime % this.duration)) : this.isReverse && this.previousFill ? (this.previousFill.startEntity || this.previousFill.from(this.startEntity), this.previousFill.start(), this.previousFill.clock.correctTime(this.clock.deltaTime % this.duration)) : this.isYoyo && (this.reverse().start(), this.clock.correctTime(this.clock.deltaTime % this.duration));
  }
  //开始的钩子
  onStart(i) {
    return this.startFun = h(i) ? i : null, this;
  }
  //更新的钩子
  onUpdate(i) {
    return this.updateFun = h(i) ? i : null, this;
  }
  //完成的钩子
  onComplete(i) {
    return this.completeFun = h(i) ? i : null, this;
  }
  //暂停的钩子
  onPause(i) {
    return this.pauseFun = h(i) ? i : null, this;
  }
  //继续的钩子
  onPlay(i) {
    return this.playFun = h(i) ? i : null, this;
  }
}
const a = Object.getPrototypeOf(f);
a.Easing = l;
a.instances = [];
a.update = () => {
  a.instances.forEach((t) => {
    t.update(!0);
  });
};
a.pause = () => {
  a.instances.forEach((t) => {
    t.pause(!0);
  });
};
a.play = () => {
  a.instances.forEach((t) => {
    t.play(!0);
  });
};
export {
  f as default
};
