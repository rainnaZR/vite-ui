// 函数截流：持续触发事件时，保证一定时间段内只调用一次事件处理函数
const throttle = (cb, ms) => {
  let timer = null;
  let startTime = Date.now();
  return () => {
    clearTimeout(timer);
    const currentTime = Date.now();
    const remaining = ms - (currentTime - startTime);
    if (remaining <= 0) {
      cb();
      startTime = Date.now();
    } else {
      timer = setTimeout(() => {
        cb();
      }, remaining);
    }
  };
};

// 函数防抖：持续触发事件时，函数在调用时的间隔时间应该大于指定时间
const debounce = (cb, ms) => {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb();
    }, ms);
  };
};

// 判断是否支持css3属性
const cssSupport = (attribute, value) => {
  if (window.CSS && window.CSS.supportsCSS) {
    if (typeof value === "undefined") return window.CSS.supportsCSS(attribute);
    return window.CSS.supportsCSS(attribute, value);
  }

  const elem = document.createElement("div");
  if (attribute in elem.style) {
    elem.style[attribute] = value;
    // 针对部分浏览器例如safari之类的对一些新属性只识别-webkit-xxx
    if (elem.style[attribute] !== value) {
      elem.style[attribute] = `-webkit-${value}`;
      if (elem.style[attribute] === `-webkit-${value}`) {
        return true;
      }
    }
    return false;
  }
  return false;
};

// 将hex色值幻化成rgba
const convertHEX2RGBA = (hexStr, alpha = 1) => {
  let hex = hexStr.replace(/^#/, "");
  if (hex.length === 3) {
    const [i, j, k] = [...hex];
    hex = i + i + j + j + k + k;
  }
  const value = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4)]
    .map((i) => parseInt(i, 16))
    .join(",");
  return `rgba(${value},${alpha})`;
};

// 字符串下划线转驼峰/驼峰转下划线
const keyFormat = (str, type) => {
  if (type === "underlineToHump") {
    return str.replace(/_([A-Za-z])/g, (all, letter) => letter.toUpperCase());
  }
  if (type === "humpToUnderline") {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
  return str;
};

// 下划线转驼峰
const dataFormat = (data, options = { type: "underlineToHump" }) => {
  if (data === undefined) return;
  if (Array.isArray(data)) {
    return data.map((item) => dataFormat(item, options));
  }
  if (Object.prototype.toString.call(data) === "[object Object]") {
    Object.keys(data).forEach((key) => {
      if (options.filterEmpty && [undefined, "", null].includes(data[key])) {
        delete data[key];
      } else {
        const newKey = keyFormat(key, options.type);
        data[newKey] = dataFormat(data[key], options);
        newKey !== key && delete data[key];
      }
    });
  }
  return data;
};

// 获取/设置对象指定prop的值 prop格式为'value[1].value1.value2.value3'
const onDoValueByProps = ({ object = {}, prop = "", value, type = "get" }) => {
  if (object.hasOwnProperty(prop)) {
    if (type === "get") {
      return object[prop];
    }
    if (type === "set") {
      object[prop] = value;
      return;
    }
  }
  prop = prop
    ?.replace(/\[(\w+)\]/g, ".$1")
    ?.replace(/^\./, "")
    ?.split(".");
  for (let i = 0, l = prop.length; i < l; i++) {
    const key = prop[i];
    if (type === "get") {
      if (key in object) {
        object = object[key];
      } else {
        object = "";
        break;
      }
    }
    if (type === "set") {
      if (key in object) {
        if (i === prop.length - 1) {
          object[key] = value;
        } else {
          object = object[key];
        }
      }
    }
  }
  if (type === "get") return object;
};

export default {
  throttle,
  debounce,
  cssSupport,
  convertHEX2RGBA,
  dataFormat,
  onDoValueByProps,
};
