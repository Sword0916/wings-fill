//是否是数字
export function isNumeric(value) {
    return (
        (typeof value === 'number' || value instanceof Number) && !isNaN(value)
    );
}

//是否是布尔
export function isBoolean(value) {
    return (typeof value === 'boolean');
}

//是否是方法
export function isFunction(value) {
    return (typeof value === 'function');
}

