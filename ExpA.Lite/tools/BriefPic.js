console.log("========== BriefPic.js ==========");
/* ----------------------------------------------------  */

let RNState = {};
let RNStyles = {
  mainCanvas: {
    width: 600,
    height: 240,
    border: "wheat solid 1px"
  },
  bigButton: {
    fontSize: 14,
    padding: "5px 15px",
    marginTop: "6px"
  },
  uploadEnabled: {
    fontSize: 14,
    padding: "5px 15px",
    marginTop: "6px",
    color: "green",
    fontWeight: 900
  },
  uploadDisabled: {
    fontSize: 14,
    padding: "5px 15px",
    marginTop: "6px"
  },
  blockLabel: {
    display: "block"
  },
  noteA: {
    width: 424,
    marginTop: 5,
    display: "block",
    fontSize: 12,
    padding: 3
  },
  noteB: {
    width: 424,
    marginTop: 5,
    display: "block",
    fontSize: 12,
    padding: 3
  },
  urlsTextArea: {
    display: "block",
    width: 515,
    height: 130,
    marginTop: 5,
    fontSize: 12,
    padding: 11,
    overflowX: "scroll",
    whiteSpace: "nowrap"
  },
  saveConfigButton: {
    fontSize: 16,
    padding: "5px 25px",
    marginTop: 6
  },
  hiddenImg: {
    display: "none"
  },
  currentUrlStatus: {
    fontSize: 12
  },
  configGroup: {
    padding: 10,
    margin: 5,
    marginBottom: 15,
    border: "2px solid gray"
  }
};

function closeBriefPic() {
  document.getElementById("brief-img-editor").style.display = "none";
}

function launchUrl(url) {
  try {
    window.external.notify("LAUNCH: " + url);
  } catch (e) {}
}

function saveCanvas(method) {
  var canvas = document.getElementById("brief-canvas");
  canvas.style.position = "fixed";
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.zIndex = 200000;
  canvas.style.transform = "scale(" + document.body.clientWidth / 600 / 1.5 + ")";
  canvas.style.transformOrigin = "0% 0%";

  if (method == 0) {
    setTimeout(saveCanvasPhrase20, 200);
  } else if (method === 1) {
    setTimeout(saveCanvasPhrase21, 200);
  } else if (method === 2) {
    setTimeout(saveCanvasPhrase22, 200);
  } else {
    console.error("# saveCanvas unknown method: " + method);
  }
}

function saveCanvasPhrase20() {
  try {
    window.external.notify("SAVE-PIC: " + 600 / 240 + " | 600 | 240");
  } catch (e) {}

  ;
  setTimeout(saveCanvasPhrase3, 200);
}

function saveCanvasPhrase21() {
  try {
    window.external.notify("SAVEAS-PIC: " + 600 / 240 + " | 600 | 240");
  } catch (e) {}

  ;
  setTimeout(saveCanvasPhrase3, 200);
}

function saveCanvasPhrase22() {
  try {
    console.log("# saveCanvasPhrase22 called.");
    window.external.getUploadPic(dataUrl => {
      console.log("# external.getUploadPic response with dataUrl.");
      let fakeFile = window.dataURLtoFakeFile(dataUrl, "brief.png");

      window._onUploadFileChange({
        type: "change",
        target: {
          "files": [fakeFile]
        }
      });
    });
  } catch (e) {}

  ;
  setTimeout(saveCanvasPhrase3, 200);
}

function saveCanvasPhrase3() {
  var canvas = document.getElementById("brief-canvas");
  canvas.style.position = "static";
  canvas.style.zIndex = "auto";
  canvas.style.transform = "initial";
  canvas.style.transformOrigin = "initial";

  try {
    window.external.notify("NOTIFY: 操作完成 | 界面恢复原来状态 | OK");
  } catch (e) {}

  ;
}

function TryLoadSettings() {
  try {
    if (CommonSetData) {
      var settings = CommonSetData["bigpics"];

      if (settings) {
        if (settings['brief-background-first-checked']) RNState['useBigPic'][1](settings['brief-background-first-checked']);
        if (settings['brief-background-text']) RNState['backgroundUrls'][1](settings['brief-background-text']);
        if (settings['brief-icon-text']) RNState['iconUrls'][1](settings['brief-icon-text']);
      }
    }
  } catch (e) {
    try {
      window.external.notify("ERROR: 简介图设置恢复不成功.");
    } catch (e) {}
  }
}

function saveConfig() {
  var saveObj = {};
  var isChecked = RNState['useBigPic'][0];
  var backgroundText = RNState['backgroundUrls'][0];
  var iconText = RNState['iconUrls'][0];
  saveObj['brief-background-first-checked'] = isChecked;
  saveObj['brief-background-text'] = backgroundText;
  saveObj['brief-icon-text'] = iconText;
  saveObj['group-id'] = "bigpics";
  var dataStr = JSON.stringify(saveObj);

  try {
    console.log("# saveConfig: " + dataStr);
    window.external.notify("SET-DATA: " + dataStr);
  } catch (e) {
    alert(dataStr);
  }
}

function RN_BriefPicSettingZone() {
  RNState['iconNote'] = React.useState(["最终图标为从上往下找到的第一个关键词匹配。", "darkcyan"]);
  let iconNote = RNState['iconNote'][0];
  RNState['backgroundNote'] = React.useState(["最终背景图为从上往下找到的第一个关键词匹配。", "darkcyan"]);
  let backgroundNote = RNState['backgroundNote'][0];
  RNState['useBigPic'] = React.useState(false);
  let [useBigPic, setUseBigPic] = RNState['useBigPic'];
  RNState['backgroundUrls'] = React.useState(`unity = http://pic.nipic.com/2007-11-02/20071128716391_2.jpg
win = http://image.tianjimedia.com/uploadImages/2016/097/17/U7SP0XU4SSRD_windows-10-expected-to-beat-windows-7-in-first-12-months-performance-502625-2.jpg
word = https://cn.bing.com/th?id=OIP.2l4mI6F0_MiyyGcPB-aoYAHaEK&pid=Api&rs=1
chrome = http://img.mp.sohu.com/upload/20170526/ee6776da5af84cec81f68e3fce9274aa_th.png

= http://b.hiphotos.baidu.com/image/pic/item/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg`);
  let [backgroundUrls, setBackgroundUrls] = RNState['backgroundUrls'];
  RNState['iconUrls'] = React.useState(`word = https://www.easyicon.net/api/resizeApi.php?id=1212930&size=128
谷歌浏览器 = https://www.easyicon.net/api/resizeApi.php?id=1212918&size=128
android = https://www.easyicon.net/api/resizeApi.php?id=1229034&size=128
win = https://www.easyicon.net/api/resizeApi.php?id=1229085&size=128

= https://www.easyicon.net/api/resizeApi.php?id=1236657&size=128`);
  let [iconUrls, setIconUrls] = RNState['iconUrls'];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    style: {
      paddingRight: 20
    }
  }, "\u6BCF\u4E00\u884C\u8F93\u5165\u683C\u5F0F:"), " ", /*#__PURE__*/React.createElement("b", null, "\u5173\u952E\u8BCD=\u56FE\u7247\u94FE\u63A5")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    style: {
      paddingRight: 20
    }
  }, "\u6700\u540E\u4E00\u884C\u8F93\u5165\u683C\u5F0F(\u8868\u793A\u9ED8\u8BA4\u56FE\u6807\u6216\u56FE\u7247):"), " ", /*#__PURE__*/React.createElement("b", null, "=\u56FE\u7247\u94FE\u63A5"))), /*#__PURE__*/React.createElement("div", {
    style: RNStyles.configGroup
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "\u80CC\u666F\u56FE\uFF1A"), /*#__PURE__*/React.createElement("button", {
    onClick: () => launchUrl('https://image.baidu.com/')
  }, "\u767E\u5EA6\u56FE\u7247"), /*#__PURE__*/React.createElement("button", {
    onClick: () => launchUrl('https://cn.bing.com/images/')
  }, "Bing\u56FE\u7247"), /*#__PURE__*/React.createElement("button", {
    onClick: () => launchUrl('https://pic.sogou.com/')
  }, "\u641C\u72D7\u56FE\u7247")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    checked: useBigPic,
    onChange: () => setUseBigPic(!useBigPic),
    type: "checkbox",
    style: {
      marginLeft: 15
    }
  }), " \u4F7F\u7528\u5927\u56FE\u7247\u6846\u4E2D\u7684\u56FE\uFF08\u4E0D\u4F7F\u7528\u8FD9\u91CC\u7684\u5173\u952E\u8BCD\u5339\u914D\uFF09"), /*#__PURE__*/React.createElement("div", {
    style: RNStyles.noteB
  }, /*#__PURE__*/React.createElement("span", {
    id: "background-urls-note",
    style: {
      color: backgroundNote[1]
    }
  }, backgroundNote[0])), /*#__PURE__*/React.createElement("textarea", {
    id: "background-urls-textarea",
    style: RNStyles.urlsTextArea,
    value: backgroundUrls,
    onChange: e => setBackgroundUrls(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: RNStyles.configGroup
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "\u56FE\u6807\uFF1A"), /*#__PURE__*/React.createElement("button", {
    onClick: () => launchUrl('https://www.easyicon.net/')
  }, "\u56FE\u6807\u7F51\u7AD9")), /*#__PURE__*/React.createElement("div", {
    style: RNStyles.noteA
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: iconNote[1]
    }
  }, iconNote[0])), /*#__PURE__*/React.createElement("textarea", {
    id: "icon-urls-textarea",
    style: RNStyles.urlsTextArea,
    value: iconUrls,
    onChange: e => setIconUrls(e.target.value)
  })), /*#__PURE__*/React.createElement("p", null, "\u6CE8\u610F\u4E8B\u9879\uFF1A\u56FE\u7247\u56FE\u6807\u5728\u6D4F\u89C8\u5668\u67E5\u627E\uFF0C\u6D4F\u89C8\u5668\u4E2D\u53F3\u952E\u56FE\u7247\uFF0C\u53EF\u4EE5\u590D\u5236\u56FE\u7247\u5730\u5740\u3002", /*#__PURE__*/React.createElement("br", null), "\u5982\u679C\u5E0C\u671B\u8BBE\u7F6E\u53EF\u4EE5\u4FDD\u5B58\u53EF\u4EE5\u4FDD\u7559\u5230\u4E0B\u6B21\u4F7F\u7528\uFF0C\u70B9\u51FB\u4FDD\u5B58\u914D\u7F6E\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "\u751F\u6210\u7B80\u4ECB\u56FE\u540E\uFF0C\u5E76\u4E0D\u4F1A\u81EA\u52A8\u4E0A\u4F20\uFF0C\u8BF7\u70B9\u51FB\u53E6\u5B58\u4E3A\uFF0C\u6216\u8005\u4FDD\u5B58\u56FE\u7247\uFF0C\u518D\u4E0A\u4F20\u3002")), /*#__PURE__*/React.createElement("button", {
    id: "brief-conf-save",
    onClick: saveConfig,
    style: RNStyles.saveConfigButton
  }, "\u4FDD\u5B58\u914D\u7F6E"), /*#__PURE__*/React.createElement("img", {
    className: "brief-img",
    style: RNStyles.hiddenImg,
    id: "brief-backgroundImage"
  }), /*#__PURE__*/React.createElement("img", {
    className: "brief-img",
    style: RNStyles.hiddenImg,
    id: "brief-iconImage"
  }));
}

function RN_BriefCurrentUrlsZone() {
  RNState['backgroundSrc'] = React.useState("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4061924083,1937802988&fm=26&gp=0.jpg");
  let backgroundSrc = RNState['backgroundSrc'][0];
  RNState['iconSrc'] = React.useState("https://www.easyicon.net/api/resizeApi.php?id=1236657&size=128");
  let iconSrc = RNState['iconSrc'][0];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: RNStyles.currentUrlStatus
  }, "\u80CC\u666F\u56FE: ", backgroundSrc), /*#__PURE__*/React.createElement("p", {
    style: RNStyles.currentUrlStatus
  }, "\u56FE\u6807: ", iconSrc));
}

function RN_BriefControlZone(props) {
  let {
    settingsVisible,
    setSettingsVisible
  } = props;
  const [isAutoWrap, setIsAutoWrap] = RNState['isAutoWrap'] = React.useState(true);
  const [isUploaderHacked] = RNState['isUploaderHacked'] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    id: "toggle-settings",
    onClick: () => setSettingsVisible(!settingsVisible),
    style: RNStyles.bigButton
  }, settingsVisible ? "↑ 收起设置 ↑" : "↓ 展开设置 ↓", " "), /*#__PURE__*/React.createElement("button", {
    onClick: () => saveCanvas(0),
    style: RNStyles.bigButton
  }, "\u4FDD\u5B58\u7B80\u4ECB\u56FE"), /*#__PURE__*/React.createElement("button", {
    onClick: () => saveCanvas(1),
    style: RNStyles.bigButton
  }, "\u7B80\u4ECB\u56FE\u53E6\u5B58\u4E3A"), /*#__PURE__*/React.createElement("button", {
    disabled: !isUploaderHacked,
    style: isUploaderHacked ? RNStyles.uploadEnabled : RNStyles.uploadDisabled,
    onClick: () => saveCanvas(2)
  }, isUploaderHacked ? '>>> 一键上传 >>>' : '请先上传步骤图片', " "), /*#__PURE__*/React.createElement("input", {
    checked: isAutoWrap,
    onChange: () => setIsAutoWrap(!isAutoWrap),
    type: "checkbox",
    style: {
      marginLeft: 15
    }
  }), "\u81EA\u52A8\u6362\u884C");
}

function RN_BriefPicEditor() {
  const [settingsVisible, setSettingsVisible] = RNState['settingsVisible'] = React.useState(false);
  console.log("# RN_BriefPicEditor called");
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RN_BriefCurrentUrlsZone, null), /*#__PURE__*/React.createElement("canvas", {
    width: "600",
    height: "240",
    style: RNStyles.mainCanvas,
    id: "brief-canvas"
  }), /*#__PURE__*/React.createElement(RN_BriefControlZone, {
    settingsVisible: settingsVisible,
    setSettingsVisible: setSettingsVisible
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: settingsVisible ? "block" : "none",
      padding: 15,
      bordeRadius: 10,
      background: "white",
      marginRight: 85
    }
  }, /*#__PURE__*/React.createElement(RN_BriefPicSettingZone, null)));
}

function AddBriefImgEditor() {
  let existEditor = document.getElementById("brief-img-editor");

  if (existEditor) {
    console.log("# AddBriefImgEditor 简介图已经添加, 修改display.");
    existEditor.style.display = "block";
    return;
  }

  let title = document.getElementById("title");
  let titleInput = title.getElementsByClassName("title pr")[0].getElementsByTagName("input")[0];
  let oldCompInputVal = "<<init>>";
  let editorBox = document.createElement("div");
  editorBox.id = "brief-img-editor";
  editorBox.style.marginTop = "20px";
  editorBox.style.marginBottom = "20px";
  editorBox.style.paddingRight = "30px";
  title.appendChild(editorBox);
  console.log("# start ReactDOM.render");
  ReactDOM.render( /*#__PURE__*/React.createElement(RN_BriefPicEditor, null), editorBox);

  function backgroundShowNote(note, color) {
    if (!note) {
      note = "最终背景图为从上往下找到的第一个关键词匹配。";
      color = "darkcyan";
    }

    if (note !== RNState['backgroundNote'][0][0] || color !== RNState['backgroundNote'][0][1]) {
      RNState['backgroundNote'][1]([note, color]);
    }
  }

  function iconShowNote(note, color) {
    if (!note) {
      note = "最终图标为从上往下找到的第一个关键词匹配。";
      color = "darkcyan";
    }

    if (note !== RNState['iconNote'][0][0] || color !== RNState['iconNote'][0][1]) {
      RNState['iconNote'][1]([note, color]);
    }
  }

  setInterval(updateBriefImage, 800);
  let oldBackgroundSrc = "";
  let oldIconSrc = "";
  let briefImgEditorElement = document.getElementById("brief-img-editor");

  function updateBriefImage() {
    if (briefImgEditorElement.style.display == "none") return;
    let [isUploaderHacked, setIsUploaderHacked] = RNState['isUploaderHacked'];

    if (window._onUploadFileChange && !isUploaderHacked) {
      console.log("# updateBriefImage found isUploaderHacked.");
      setIsUploaderHacked(true);
    } //update brief icon


    let pairs = [];

    try {
      let urltxt = document.getElementById("icon-urls-textarea");
      let lines = urltxt.value.split("\n").map(x => x.trim()).filter(x => x != "");
      pairs = lines.map(x => x.split("=")).map(y => [y[0], y.slice(1).join("=")].map(z => z.trim()));

      for (let elem of pairs) {
        if (elem.length != 2) throw "error";
        if (!elem[1].startsWith("http") && !elem[1].startsWith("ms-appdata")) throw "error";
      }

      iconShowNote();
    } catch (e) {
      iconShowNote("输入格式不正确!", "red");
    }

    for (let p of pairs) {
      if (titleInput.value.toLowerCase().indexOf(p[0].toLowerCase()) >= 0) {
        RNState['iconSrc'][1](p[1]);
        break;
      }
    } //update brief background


    pairs = [];

    try {
      let urltxt = document.getElementById("background-urls-textarea");
      let lines = urltxt.value.split("\n").map(x => x.trim()).filter(x => x != "");
      pairs = lines.map(x => x.split("=")).map(y => [y[0], y.slice(1).join("=")].map(z => z.trim()));

      for (let elem of pairs) {
        if (elem.length != 2) throw "error";
        if (!elem[1].startsWith("http") && !elem[1].startsWith("ms-appdata")) throw "error";
      }

      backgroundShowNote();
    } catch (e) {
      backgroundShowNote("输入格式不正确!", "red");
    }

    if (RNState['useBigPic'][0]) {
      let myimg = document.getElementById("my-bigimg");

      if (myimg && myimg.src) {
        RNState['backgroundSrc'][1](myimg.src);
      } else {
        RNState['backgroundSrc'][1]("大图片框图片不存在");
      }
    } else {
      for (let p of pairs) {
        if (titleInput.value.toLowerCase().indexOf(p[0].toLowerCase()) >= 0) {
          RNState['backgroundSrc'][1](p[1]);
          break;
        }
      }
    } //check canvas update.


    let isBksrc1Checked = RNState['useBigPic'][0];
    let wrapLineEnabled = RNState['isAutoWrap'][0];
    let backgroundSrc = RNState['backgroundSrc'][0];
    let iconSrc = RNState['iconSrc'][0];
    var newCompInputVal = titleInput.value + " | " + backgroundSrc + " | " + iconSrc + " | " + wrapLineEnabled + " | " + isBksrc1Checked;
    if (oldCompInputVal == newCompInputVal) return;
    console.log("# updateBriefImage 比较值变化: " + newCompInputVal);
    oldCompInputVal = newCompInputVal;

    if (iconSrc != oldIconSrc) {
      //there's no ?t in new/old src var.
      window.external.getImage(iconSrc, dataUrl => {
        console.log("# dataUrl for Icon recieved.");
        document.getElementById("brief-iconImage").src = dataUrl;
        setTimeout(() => drawCanvas(titleInput), 200);
      });
      oldIconSrc = iconSrc;
    }

    if (backgroundSrc != oldBackgroundSrc) {
      window.external.getImage(backgroundSrc, dataUrl => {
        console.log("# dataUrl for Background recieved.");
        document.getElementById("brief-backgroundImage").src = dataUrl;
        setTimeout(() => drawCanvas(titleInput), 200);
      });
      oldBackgroundSrc = backgroundSrc;
    }

    drawCanvas(titleInput);
  }
} ////////////////////////////////////////////////////////////////////////
//////////////////////////// Canvas Graphic 


function drawCanvas(titleInput) {
  //获得画布元素
  var briefCanvas1 = document.getElementById("brief-canvas"); //获得2维绘图的上下文

  var ctx = briefCanvas1.getContext("2d"); //清除

  ctx.clearRect(0, 0, 600, 240); //图片

  let apple = document.getElementById("brief-backgroundImage"); //TODO
  //将图像绘制到画布的，图片的左上角

  try {
    ctx.drawImage(apple, 0, 0, apple.width - 30, apple.height - 30, 0, 0, 600, 240);
  } catch (e) {
    console.error("# drawCanvas background not succeed: " + e.message);
  } //画一个实心矩形


  fillRoundRect(ctx, 66, 66, 468, 108, 12, "white"); //TODO

  apple = document.getElementById("brief-iconImage");

  try {
    //将图像绘制到画布的，图片的左上角
    ctx.drawImage(apple, 96, 79.2, 81.6, 81.6);
  } catch (e) {
    console.error("# drawCanvas icon not succeed: " + e.message);
  } // 设置颜色


  ctx.fillStyle = "black"; // 设置水平对齐方式

  ctx.textAlign = "left"; // 设置垂直对齐方式

  ctx.textBaseline = "middle"; // 设置字体

  ctx.font = "32px bold 黑体"; // 测量单行能否放下

  var words = [].concat.apply([], titleInput.value.split(/([a-zA-Z0-9]+)/g).map(x => x.trim() != "" && !x.match(/[a-zA-Z0-9]+/g) ? x.split("") : [x]));
  var firstLine = "";
  var secondLine = "";
  var oneLineOK = true;

  for (var word of words) {
    if (!oneLineOK) {
      secondLine += word;
    } else {
      firstLine += word;
      var metrics = ctx.measureText(firstLine);

      if (metrics.width > 297.6 + 30) {
        oneLineOK = false;
      }
    }
  }

  if (secondLine.trim() == "") oneLineOK = true;

  if (oneLineOK || !RNState['isAutoWrap'][0]) {
    // 绘制文字（参数：要写的字，x坐标，y坐标）
    ctx.fillText(firstLine + secondLine, 201.6, 122.4, 297.6);
  } else {
    ctx.font = "28px bold 黑体"; // 绘制文字（参数：要写的字，x坐标，y坐标）

    ctx.fillText(firstLine, 201.6, 104.4, 297.6);
    ctx.fillText(secondLine, 201.6, 141.6, 297.6);
  }
}

;

function fillRoundRect(cxt, x, y, width, height, radius,
/*optional*/
fillColor) {
  //圆的直径必然要小于矩形的宽高
  if (2 * radius > width || 2 * radius > height) {
    return false;
  }

  cxt.save();
  cxt.translate(x, y); //绘制圆角矩形的各个边

  drawRoundRectPath(cxt, width, height, radius);
  cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值

  cxt.fill();
  cxt.restore();
}

function drawRoundRectPath(cxt, width, height, radius) {
  cxt.beginPath(0); //从右下角顺时针绘制，弧度从0到1/2PI

  cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2); //矩形下边线

  cxt.lineTo(radius, height); //左下角圆弧，弧度从1/2PI到PI

  cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI); //矩形左边线

  cxt.lineTo(0, radius); //左上角圆弧，弧度从PI到3/2PI

  cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2); //上边线

  cxt.lineTo(width - radius, 0); //右上角圆弧

  cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2); //右边线

  cxt.lineTo(width, height - radius);
  cxt.closePath();
} //////////////////////////// Canvas Graphic 
////////////////////////////////////////////////////////////////////////


(function () {
  try {
    // AddMyImg();
    AddBriefImgEditor();
    window.external.notify("2ND-GOTO: https://www.easyicon.net/");
    setTimeout(TryLoadSettings, 100); //no reason yet.

    window.external.notify("NOTIFY: 添加成功 | 大图片框和简介图已载入 | OK");
  } catch (e) {
    var emm = document.createElement("div");
    emm.innerText = e.message;

    try {
      window.external.notify("SHOW-DIALOG: 添加大图片框失败 | 可能的原因:\n1. 当前页面可能不是编辑器页面\n2. 代码运行出错" + emm.innerText.replace("|", " I "));
    } catch (e2) {}

    ;
  }
})();

console.log("^^^^^^^^^^ BriefPic.js ^^^^^^^^^^");