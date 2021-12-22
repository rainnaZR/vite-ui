// 函数截流：持续触发事件时，保证一定时间段内只调用一次事件处理函数
const throttle = (cb, ms) => {
    let timer = null
    let startTime = Date.now()
    return () => {
        clearTimeout(timer)
        const currentTime = Date.now()
        const remaining = ms - (currentTime - startTime)
        if (remaining <= 0) {
            cb()
            startTime = Date.now()
        } else {
            timer = setTimeout(() => {
                cb()
            }, remaining)
        }
    };
};

// 函数防抖：持续触发事件时，函数在调用时的间隔时间应该大于指定时间
const debounce = (cb, ms) => {
    let timer = null
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            cb()
        }, ms)
    };
};

// 判断是否支持css3属性
const cssSupport = (attribute, value) => {
    if (window.CSS && window.CSS.supportsCSS) {
        if (typeof value === 'undefined') return window.CSS.supportsCSS(attribute)
        return window.CSS.supportsCSS(attribute, value)
    }

    const elem = document.createElement('div')
    if (attribute in elem.style) {
        elem.style[attribute] = value
        // 针对部分浏览器例如safari之类的对一些新属性只识别-webkit-xxx
        if (elem.style[attribute] !== value) {
            elem.style[attribute] = `-webkit-${value}`
            if (elem.style[attribute] === `-webkit-${value}`) {
                return true
            }
        }
        return false
    }
    return false
}

// 将hex色值幻化成rgba
const convertHEX2RGBA = (hexStr, alpha = 1) => {
    let hex = hexStr.replace(/^#/, '')
    if (hex.length === 3) {
        const [i, j, k] = [...hex]
        hex = i + i + j + j + k + k
    }
    const value = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4)].map(i => parseInt(i, 16)).join(',')
    return `rgba(${value},${alpha})`
};

export default {
    throttle,
    debounce,
    cssSupport,
    convertHEX2RGBA
}
