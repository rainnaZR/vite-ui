// 根据时间戳换算成时分秒的格式
function formatLeftTime(time) {
	let day = Math.floor(time / 1000 / 60 / 60 / 24)
	let leftTime = time % (1000 * 60 * 60 * 24)
	let hour = Math.floor(leftTime / 1000 / 60 / 60)
	leftTime = leftTime % (1000 * 60 * 60)
	let min = Math.floor(leftTime / 1000 / 60)
	leftTime = leftTime % (1000 * 60)
	let second = Math.floor(leftTime / 1000)

	return {
		day,
		hour: numFixed(hour),
		min: numFixed(min),
		second: numFixed(second),
	}
}

function numFixed(num) {
	return num < 10 && num > 0 ? `0${num}` : num
}

// 计算倒计时
function getCountDown(timestamp, cbFunc) {
	if (!timestamp) return
	if (typeof timestamp !== 'number') {
		timestamp = Number(timestamp)
	}

	let intervalId
	let change = () => {
		cbFunc({
			timestamp,
			...formatLeftTime(timestamp),
		})
		if (timestamp < 1000) {
			clearInterval(intervalId)
			return
		}
		timestamp -= 1000
	}
	intervalId = setInterval(change, 1000)
	change()
}

export default {
	formatLeftTime,
	getCountDown,
}
