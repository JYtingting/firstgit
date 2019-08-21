const browser = {
    versions: (function () {
        const u = navigator.userAgent
        return {
            // IE内核
            trident: u.indexOf('Trident') > -1,
            // opera内核
            presto: u.indexOf('Presto') > -1,
            // 苹果、谷歌内核
            webKit: u.indexOf('AppleWebKit') > -1,
            // 火狐内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
            // 是否为移动终端
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            // ios终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            // android终端或者uc浏览器
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            // 是否为iPhone
            iPhone: u.indexOf('iPhone') > -1,
            // 是否iPad
            iPad: u.indexOf('iPad') > -1,
            // 微信端打开
            wx: u.indexOf('MicroMessenger') > -1
        }
    }()),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
