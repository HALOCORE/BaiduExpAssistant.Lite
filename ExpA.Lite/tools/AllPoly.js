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
    
    //hacking pic uploader.
    console.log("# hacking pic uploader...");
    var criticalElem = document.getElementsByClassName("webuploader-element-invisible")[0];
    function cloneNodeGen(clone) {
        return function() {
            var ret = clone.apply(this, arguments);
            console.log("# clone: " + ret.tagName.toLowerCase());
            ret.cloneNode = cloneNodeGen(ret.cloneNode);
            ret.addEventListener = function(adder) {
                return function() {
                    var ret = adder.apply(this, arguments);
                    console.log("# addEventListener.", arguments);
                    if(arguments[0] === "change") {
                        console.log("# change EventListener found.", arguments[1]);
                        window._onUploadFileChange = arguments[1];
                    }
                    return ret;
                }
            }(ret.addEventListener);
            return ret;
        };
    }
    criticalElem.cloneNode = cloneNodeGen(criticalElem.cloneNode);

    function dataURLtoFakeFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let file = new Blob([u8arr], { type: mime });
        file.lastModifiedDate = new Date();
        file.name = filename;
        return file;
    }
    //window._onUploadFileChange({type:"change", target:{"files": [fakeFile]}})
} catch (e) {
    console.log("浏览器环境");
    window._EXTENSION_IS_CHROME_ = true;
    console.log(">>> Pollyfill window.external.notify");
    window.external.notify = function (msg) {
        console.log("[window.external.notify]", msg);
    }

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let file =new File([u8arr], filename, {type:mime});
        return file;
    }
}

// let testRoot = document.createElement("div");
// document.body.appendChild(testRoot);
// ReactDOM.render(RNE_Test, testRoot);
// console.log("# ReactDOM.render called.");

console.log("^^^^^^^^^^ AllPoly.js ^^^^^^^^^^");