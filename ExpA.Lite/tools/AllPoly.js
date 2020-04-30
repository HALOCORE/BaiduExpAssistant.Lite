console.log("========== AllPoly.js ==========");
window._EXTENSION_IS_CHROME_ = false;
if (window.external.notify) {
    console.log("百度经验个人助手环境");
} else {
    console.log("浏览器环境");
    window._EXTENSION_IS_CHROME_ = true;
    window.external.notify = function(msg) {
        console.log("[window.external.notify]", msg);
    }
}