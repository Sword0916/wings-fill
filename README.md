# wings-fill(补间动画)

git地址：https://github.com/Sword0916/wings-fill

## 一、项目安装和引用
### 1、安装
```
npm i @sword0916/wings-fill
```

### 2、引用
```
import WingsFill from "@sword0916/wings-fill"
```

## 二、创建补间动画对象
### 1、初始化一个“补间动画”对象
```javascript
//x,y用2秒的时间由(0, 0)移动到(200, 200)
let entity = {x: 0, y: 0 };
let wingsFill = new WingsFill(entity)
        .to({x: 200, y: 200}, 2000)
        .start();
```
### 2、参数列表

|序号|类型|默认值|说明|
|----|----|----|----|
|1|对象| |要控制的对象|

## 三、设置重复次数
默认只执行一次，不重复。

如果需要重复，可以使用.repeat()方法设置重复次数。

repeat方法的参数应该是正整数，如果不传参或者参数为非正整数则视为无限循环。
```javascript
//x,y用2秒的时间由(0, 0)移动到(200, 200)。重复两次
let entity = {x: 0, y: 0};
let wingsFill = new WingsFill(entity)
    .to({x: 200, y: 200}, 2000)
    .repeat(2)//重复2次。如果设置2.5则会转为2
    .start();
```

```javascript
//rotate用2秒的时间由0到360；无限循环
let entity = {rotate: 0};
let wingsFill = new WingsFill(entity)
    .to({rotate: 360}, 2000)
    .repeat()//无限循环
    .start();
```

## 四、设置yoyo

如果需要yoyo效果，可以使用.yoyo(true)。
```javascript
//x,y用2秒的时间由(0, 0)移动到(200, 200)。
//然后用2秒的时间由(200, 200)移动到(0, 0)。
//循环往复
let entity = {x: 0, y: 0};
let wingsFill = new WingsFill(entity)
    .to({x: 200, y: 200}, 2000)
    .yoyo(true)// 设置yoyo
    .start();
```


## 五、设置延时

如果需要延时执行，可以使用.delay()方法
```javascript
//x,y用2秒的时间由(0, 0)移动到(200, 200)。
//然后用2秒的时间由(200, 200)移动到(0, 0)。
//延时3秒执行
let entity = {x: 0, y: 0};
let wingsFill = new WingsFill(entity)
    .to({x: 200, y: 200}, 2000)
    .delay(3000)// 设置延时时长，单位是毫秒
    .start();
```



## 六、事件钩子
预留了onStart、onUpdate、onPause、onPlay、onComplete四个事件钩子，分别是“开始”、“更新”、“暂停”、“继续”、“完成”。
```javascript
let entity = {x: 0, y: 0, r: 0, g: 0, b:255, rotate: 0};
let wingsFill = new WingsFill(entity)
    .to({x: 200, y: 200, r: 0, g: 255, b: 0, rotate: 360}, 2000)
    .onStart(startFun)
    .onUpdate(updateFun)
    .onPause(pauseFun)
    .onPlay(playFun)
    .onComplete(completeFun)
    .start();

//开始的回调方法
function startFun(obj) {
    console.log("startFun", obj);
}
//更新的回调方法
function updateFun(obj) {
    console.log("updateFun", obj);
}
//暂停的回调方法
function pauseFun(obj) {
    console.log("pauseFun", obj);
}
//继续的回调方法
function playFun(obj) {
    console.log("playFun", obj);
}
//完成的回调方法
function completeFun(obj) {
    console.log("completeFun", obj);
}
```

## 七、暂停和继续

```javascript
//暂停方法
wingsFill.pause();
//继续方法
wingsFill.play();
```

## 八、顺序执行
把多个WingsFill按照顺序组合，可以实现多个补间动画顺序执行。

特别注意：chain方法返回的是下一个补间动画对象（即chain方法的参数），不是本补间动画对象！！！！！连点的时候一定要注意！！！！！
```javascript
let entity = {x: 0, y: 0, r: 255, g: 0, b: 0, rotate: 0};
//补间动画1
let wingsFill1 = new WingsFill(entity)
    .to({x: 0, y: 200, r: 0, g: 255, b: 0, rotate: 90}, 2000)
    .start();

//补间动画2
//如果不传参，则表示将前一个补间动画对象的控制目标作为自己的控制目标（即WingsFill1中的entity）。如果传参则表示操作自己的控制目标。
let wingsFill2 = new WingsFill()
    .to({x: 200, y: 200, r: 0, g: 0, b: 255}, 2000);

//补间动画3
//如果不传参，则表示将前一个补间动画对象的控制目标作为自己的控制目标（即WingsFill2中的entity）。如果传参则表示操作自己的控制目标。
let wingsFill3 = new WingsFill()
    .to({x: 200, y: 0, r: 255, g: 0, b: 0, rotate: 0}, 2000);

//补间动画4
//如果不传参，则表示将前一个补间动画对象的控制目标作为自己的控制目标（即WingsFill3中的entity）。如果传参则表示操作自己的控制目标。
let wingsFill4 = new WingsFill()
    .to({x: 0, y: 0, r: 0, g: 255, b: 0}, 2000);

//按照顺序组合成链
//wingsFill1 到 wingsFill2 到 wingsFill3 到 wingsFill4 只运行一次
 //wingsFill1.chain(wingsFill2).chain(wingsFill3).chain(wingsFill4);

//按照顺序组合成链环
//wingsFill1 到 wingsFill2 到 wingsFill3 到 wingsFill4 一直重复循环
 wingsFill1.chain(wingsFill2).chain(wingsFill3).chain(wingsFill4).chain(wingsFill1);
```

## 九、设置缓动函数

提供了一些现成的缓动函数（参照examples/assets/Tween.js）,挂载到WingsFill的Easing属性了。

按照它们表示的方程类型进行分组：线性、二次、三次、四次、五次、正弦、指数、圆形、弹性、后退和反弹，然后按缓动类型：In、Out 和 InOut。

也可以设置一个遵循约定自定义缓动函数。
参数必须依次为：t初始时间,b起始位置,c移动的距离,d缓动执行多长时间


```javascript
let entity = {x: 0, y: 0};
let wingsFill = new WingsFill(entity)
    .to({x: 200, y: 0}, 2000)
    .easing(WingsFill.Easing.Bounce.easeInOut) //设置缓动函数
    .start();
```

## 十、驱动补间动画
所有的补间动画实例都需要驱动方法来驱动才能正常工作。

### 1、驱动具体实例
```javascript
function animate() {
    /**
    * wingsFill1是已经实例化的补间动画对象。
    * 此对象上提供了update()方法，此方法可以驱动本补间动画实例，以及补间动画链中此实例之后的实例对象。
    * 例如：wingsFill1.chain(wingsFill2).chain(wingsFill3).chain(wingsFill4);此补间动画链，仅使用wingsFill1的update()方法即可完整驱动。
    */
    wingsFill1.update();
    requestAnimationFrame(animate);
}

animate();
```


### 2、驱动全部实例
```javascript
function animate() {
    /**
    * WingsFill是引入的WingsFill类。
    * 类的原型上提供了update()方法，此方法可以驱动全部的补间动画实例。
    */
    WingsFill.update();
    requestAnimationFrame(animate);
}

animate();
```


