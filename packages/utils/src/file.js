export default {
    /**
     * base64转换成blob数据
     */
    base64ToBlob({dataUrl, type}) {
        const arr = dataUrl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1] || type
        // 去掉url的头，并转化为byte
        const bytes = window.atob(arr[1])
        // 处理异常,将ascii码小于0的转换为大于0
        const ab = new ArrayBuffer(bytes.length)
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        const ia = new Uint8Array(ab)
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], {
            type: mime
        })
    }
};
