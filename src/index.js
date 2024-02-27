import Fill from "./js/Fill";
import {Tween} from "./js/utils/Tween";
const __proto__ = Object.getPrototypeOf(Fill);
__proto__.Easing = Tween; //挂载缓动函数

//在原型上绑定统一的update()方法
__proto__.instances = [];
__proto__.update = () => {
    __proto__.instances.forEach(o => {
        o.update();
    })
}


export default Fill