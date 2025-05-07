import {isNumeric} from "../utils";


//起止边缘类
export default class Edge {
    constructor(entity) {
        this.original = new Map();
        this.saveOriginal(entity);
    }

    //保存原始值
    saveOriginal (entity) {
        for (let key in entity) {
            const oldValue = entity[key];
            if(isNumeric(oldValue)) {
                this.original.set(key, oldValue);
            }
        }
    }

    //是否有值
    has(key) {
        return this.original.has(key);
    }

    //取值
    get(key) {
        return this.original.has(key)? this.original.get(key) : null;
    }

}