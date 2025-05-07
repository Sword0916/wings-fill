import Fill from "./js/Fill";
import {Tween} from "./js/utils/Tween";
const __proto__ = Object.getPrototypeOf(Fill);
__proto__.Easing = Tween; //挂载缓动函数

//在原型上绑定统一的update()方法
__proto__.instances = [];

//统一的驱动方法
__proto__.update = () => {
    __proto__.instances.forEach(o => {
        o.update(true);
    })
}

//全部暂停方法
__proto__.pause = () => {
    __proto__.instances.forEach(o => {
        o.pause(true);
    })
}

//全部继续方法
__proto__.play = () => {
    __proto__.instances.forEach(o => {
        o.play(true);
    })
}

export default Fill