function numFixed(num) {
  return num < 10 && num > 0 ? `0${num}` : num;
}

// 根据时间戳换算成时分秒的格式
function formatLeftTime(time) {
  const day = Math.floor(time / 1000 / 60 / 60 / 24);
  let leftTime = time % (1000 * 60 * 60 * 24);
  const hour = Math.floor(leftTime / 1000 / 60 / 60);
  leftTime %= 1000 * 60 * 60;
  const minute = Math.floor(leftTime / 1000 / 60);
  leftTime %= 1000 * 60;
  const second = Math.floor(leftTime / 1000);

  return {
    day,
    hour: numFixed(hour),
    minute: numFixed(minute),
    second: numFixed(second),
  };
}

// 计算倒计时
function getCountDown(timestamp, cbFunc) {
  if (!timestamp) return;
  if (typeof timestamp !== "number") {
    timestamp = Number(timestamp);
  }

  let intervalId;
  const change = () => {
    cbFunc({
      timestamp,
      ...formatLeftTime(timestamp),
    });
    if (timestamp < 1000) {
      clearInterval(intervalId);
      return;
    }
    timestamp -= 1000;
  };
  intervalId = setInterval(change, 1000);
  change();
}

// 计算当天剩余时间，单位s
function getTodayLeftTime() {
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  const tomorrow = now.getTime() / 1000 + 24 * 3600;
  const today = Date.now() / 1000;
  return tomorrow - today;
}

export default {
  formatLeftTime,
  getCountDown,
  getTodayLeftTime,
};
