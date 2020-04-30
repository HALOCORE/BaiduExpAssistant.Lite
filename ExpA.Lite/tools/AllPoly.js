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
} catch (e) {
    window.external.notify("撒达娃");
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