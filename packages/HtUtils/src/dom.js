const windowWidth = getClientWidth();
const windowHeight = getClientHeight();

/**
 * 获取元素的可视距离
 */
function getClientWidth(_elem) {
  if (_elem) {
    return _elem.clientWidth;
  }
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
}
function getClientHeight(_elem) {
  if (_elem) {
    return _elem.clientHeight;
  }
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
}

/**
 * 获取元素的容器高度，包括不可视高度
 */
function getOffsetHeight(_elem) {
  if (_elem) {
    return _elem.offsetHeight;
  }
  return document.documentElement.offsetHeight || document.body.offsetHeight;
}

/**
 * 获取元素的滚动距离
 */
function getScrollHeight(_elem) {
  if (_elem) {
    return _elem.scrollHeight;
  }
  return document.documentElement.scrollHeight || document.body.scrollHeight;
}

/**
 * 获取元素距离屏幕的可视距离
 */
function getBoundingClientRect(_elem, callbackFunc) {
  _elem.rect = _elem.getBoundingClientRect();

  return callbackFunc(_elem);
}

/**
 * 元素滚动至指定距离，此处为相对距离
 */
function scrollByElement(options = { x: 0, y: 0 }) {
  let { elem, x, y, clientWidth, isAnimate = false } = options;
  // 横轴移动
  if (Math.abs(x) > 0) {
    const { scrollLeft } = elem;
    // 元素滚动到最左边时
    if (scrollLeft == 0 && x <= 0) {
      return;
    }
    // 元素滚动到最右边时
    if (scrollLeft + windowWidth >= clientWidth && x >= 0) {
      return;
    }

    if (!isAnimate) {
      // 不启用动画，直接定位
      elem.scrollLeft = x;
    } else {
      // 开启动画，以动画形式缓慢移动
      let offsetX = scrollLeft;
      let timer;
      let n = 10;

      if (timer) clearTimeout(timer);

      const moveElement = () => {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
          // console.log(`导航滑动：偏移量为${offsetX}`)
          // console.log(`导航滑动：最终偏移量为${x}`)
          n--;
          if (n <= 0) {
            n = 1;
          }
          if (x < 0) {
            x = 0;
          }
          offsetX = parseInt(offsetX + (x - offsetX) / n);
          if (parseInt(offsetX) == parseInt(x)) {
            offsetX = x;
            elem.scrollLeft = offsetX;
            clearTimeout(timer);
          } else {
            elem.scrollLeft = offsetX;
            moveElement();
          }
        }, 16);
      };
      moveElement();

      return timer;
    }
  }

  // 纵轴移动
  if (Math.abs(y) > 0) {
    // 不启用动画，直接定位
    if (!isAnimate) {
      const scrollTop = elem ? elem.scrollTop : this.getScrollTop();
      this.setScrollTop(scrollTop + y, elem);
    }
  }
}

/**
 * 获取元素向上滚动的距离
 */
function getScrollTop(_elem) {
  if (_elem) {
    let actualTop = _elem.offsetTop;
    let current = _elem.offsetParent;
    while (current != null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }
  return (
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.pageYOffset
  );
}

/**
 * 设置元素向上滚动的距离
 */
function setScrollTop(value, _elem) {
  if (_elem) {
    _elem.scrollTop = value;
  } else {
    document.documentElement.scrollTop = value;
    document.body.scrollTop = value;
  }
}

/**
 * 是否展示返回顶部按钮
 */
function onShowGoTop(times = 1.5) {
  const scrollTop = getScrollTop();
  return windowHeight * times < scrollTop;
}

/**
 * 创建元素
 */
function createElement(id) {
  const elem = document.createElement("div");
  elem.id = id;
  document.body.appendChild(elem);
}

/**
 * 复制
 */
function onCopy(value, node, tagClassName = "j-copy-textarea-only") {
  return new Promise((resolve, reject) => {
    if (!value || !value.trim()) {
      return reject("复制内容不能为空");
    }

    const elem = node || document.body;
    let textarea = elem.querySelector(`.${tagClassName}`);
    // 如果复制标签不存在，则新建textarea标签
    if (!textarea) {
      textarea = document.createElement("textarea");
      textarea.className = tagClassName;
      textarea.style.cssText = "position:absolute;left:-9999999px;";
      textarea.setAttribute("readonly", "readonly");
      elem.appendChild(textarea);
    }
    textarea.value = value;
    textarea.select(); // 选中文本
    document.execCommand("copy"); // 执行复制命令
    resolve("复制成功");
  });
}

/**
 * 全屏
 */
function onRequestFullScreen() {
  const docElm = document.documentElement;
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
  }
}

/**
 * 退出全屏
 */
function onExitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}

/**
 * 是否全屏
 */
function onIsFullScreen() {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullScreenElement
  );
}

export default {
  windowWidth,
  windowHeight,
  getClientWidth,
  getClientHeight,
  getOffsetHeight,
  getScrollHeight,
  getBoundingClientRect,
  scrollByElement,
  getScrollTop,
  setScrollTop,
  onShowGoTop,
  createElement,
  onCopy,
  onRequestFullScreen,
  onExitFullScreen,
  onIsFullScreen,
};
