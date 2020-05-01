console.log("========== AllPoly.js ==========");
window._EXTENSION_IS_CHROME_ = false;
try {
    window.external.notify("TEST_NOTIFY");
    console.log("百度经验个人助手环境");
    console.logerr = (err) => {
        var hiddenErrB = document.createElement('div');
        hiddenErrB.innerText = err.message;
        console.error("# LOGERR:" + hiddenErrB.innerText);
    }
    window.external._getImageDict = {};
    window.external.getImage = (url, onSucceed, onFailed) => {
        url = url.trim();
        console.log("# externalGetImage: " + url);
        window.external._getImageDict[url] = {};
        window.external._getImageDict[url]['onSucceed'] = onSucceed;
        window.external._getImageDict[url]['onFailed'] = onFailed;
        try {
          window.external.notify("IMAGE-GET: " + url);
        }
        catch (e) { console.error(e); }
    }
    window.external_getImageSucceed = (url, dataUrl) => {
        console.log("# external_getImageSucceed: " + url);
        try {
            window.external._getImageDict[url]['onSucceed'](dataUrl);
        } catch(e) { console.error(e); }
    }
    window.external_getImageFailed = (url, message) => {
        console.log("# external_getImageFailed: " + url);
        try {
            window.external._getImageDict[url]['onFailed'](message);
        } catch(e) { console.error(e); }
    }
} catch (e) {
    console.log("浏览器环境");
    window._EXTENSION_IS_CHROME_ = true;
    console.log(">>> Pollyfill window.external.notify");
    window.external.notify = function (msg) {
        console.log("[window.external.notify]", msg);
    }
}

// let testRoot = document.createElement("div");
// document.body.appendChild(testRoot);
// ReactDOM.render(RNE_Test, testRoot);
// console.log("# ReactDOM.render called.");

console.log("^^^^^^^^^^ AllPoly.js ^^^^^^^^^^");