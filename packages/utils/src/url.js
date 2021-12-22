// 获取url的参数
const getUrlParam = function(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    const r = window.location.search.substr(1).match(reg) // 匹配目标参数
    return (r && r.length) ? decodeURI(r[2]) : ''
}

// 添加参数
const setUrlParam = function(options = {}, url){
    url = url || window.location.href

    let suffix = url.indexOf('?') > -1 ? '&' : '?'
    Object.keys(options).forEach(key => {
        suffix += `${key}=${encodeURI(options[key])}`
    })

    return `${url}${suffix}`
}

export default {
    getUrlParam,
    setUrlParam,
}
