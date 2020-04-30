let babelCore = require("@babel/core");
let presetReact = require("@babel/preset-react");
var fs = require('fs');

let code = fs.readFileSync('./AllComps.jsx', {"encoding": "utf8"});
let result = babelCore.transform(code, {
    presets: [presetReact],
});
fs.writeFileSync('./AllComps.js', result.code, {"encoding": "utf8"});
