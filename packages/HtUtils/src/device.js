const ua = window.navigator.userAgent.toLowerCase();
const isIOS = /(iPhone|iPod|iPad)/i.test(ua);
const system = isIOS ? "ios" : "android";
const inIphoneX = isInIphoneX();
const platform = getPlatform();

/**
 * 判断当前设备是否是iphoneX
 */
function isInIphoneX() {
  return isIOS && screen.height === 812 && screen.width === 375;
}

/**
 * 判断当前浏览器环境是否在微信内
 */
function isInWeixin() {
  return ua.toLocaleLowerCase().indexOf("micromessenger") > -1;
}

/**
 * 判断当前环境是小程序
 */
function isInMiniprogram() {
  return (
    window.__wxjs_environment === "miniprogram" ||
    ua.indexOf("miniprogram") > -1
  );
}

/**
 * 获取当前web页面环境
 */
function getPlatform() {
  return isInWeixin() ? "weixin" : isInMiniprogram() ? "miniprogram" : "web";
}

export default {
  isIOS,
  system,
  inIphoneX,
  platform,
};
