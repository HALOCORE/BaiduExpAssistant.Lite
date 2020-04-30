console.log("========== BriefPic.js ==========");
/* ----------------------------------------------------  */

function saveConfig() {
  var saveObj = {};
  var isChecked = document.getElementById("brief-img-source-check1").checked;
  var backgroundText = document.getElementById("background-urls-textarea").value;
  var iconText = document.getElementById("icon-urls-textarea").value;
  saveObj['brief-background-first-checked'] = isChecked;
  saveObj['brief-background-text'] = backgroundText;
  saveObj['brief-icon-text'] = iconText;
  saveObj['group-id'] = "bigpics";
  var dataStr = JSON.stringify(saveObj);

  try {
    window.external.notify("SET-DATA: " + dataStr);
  } catch (e) {
    alert(dataStr);
  }
}

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
  var oldPosition = canvas.style.position;
  canvas.style.position = "fixed";
  canvas.style.left = 0;
  canvas.style.top = 0;
  var oldZIndex = canvas.style.zIndex;
  canvas.style.zIndex = 200000;
  var oldTransform = canvas.style.transform;
  canvas.style.transform = "scale(" + document.body.clientWidth / 600 / 1.5 + ")";
  var oldTransformOrigin = canvas.style.transformOrigin;
  canvas.style.transformOrigin = "0% 0%";

  if (method == 0) {
    setTimeout(saveCanvasPhrase20, 200);
  } else {
    setTimeout(saveCanvasPhrase21, 200);
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
        if (settings['brief-background-first-checked']) document.getElementById("brief-img-source-check1").checked = settings['brief-background-first-checked'];
        if (settings['brief-background-first-checked']) document.getElementById("brief-img-source-check2").checked = !settings['brief-background-first-checked'];
        if (settings['brief-background-text']) document.getElementById("background-urls-textarea").value = settings['brief-background-text'];
        if (settings['brief-icon-text']) document.getElementById("icon-urls-textarea").value = settings['brief-icon-text'];
      }
    }
  } catch (e) {
    try {
      window.external.notify("ERROR: 简介图设置恢复不成功.");
    } catch (e) {}
  }
}

let RNStyles = {
  mainCanvas: {
    width: 600,
    height: 240,
    border: "wheat solid 1px"
  },
  bigButton: {
    fontSize: 16,
    padding: "5px 25px",
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
    width: 560,
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
  }
};
let RNState = {};

function RN_BriefPicSettingZone() {
  RNState['iconNote'] = React.useState(["最终图标为从上往下找到的第一个关键词匹配。", "darkcyan"]);
  let iconNote = RNState['iconNote'][0];
  RNState['backgroundNote'] = React.useState(["最终背景图为从上往下找到的第一个关键词匹配。", "darkcyan"]);
  let backgroundNote = RNState['backgroundNote'][0];
  RNState['backgroundSrc'] = React.useState("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4061924083,1937802988&fm=26&gp=0.jpg");
  let backgroundSrc = RNState['backgroundSrc'][0];
  RNState['iconSrc'] = React.useState("https://www.easyicon.net/api/resizeApi.php?id=1236657&size=128");
  let iconSrc = RNState['iconSrc'][0];
  RNState['useBigPic'] = React.useState(false);
  let [useBigPic, setUseBigPic] = RNState['useBigPic'];
  RNState['backgroundUrls'] = React.useState(`unity = http://pic.nipic.com/2007-11-02/20071128716391_2.jpg
win = http://image.tianjimedia.com/uploadImages/2016/097/17/U7SP0XU4SSRD_windows-10-expected-to-beat-windows-7-in-first-12-months-performance-502625-2.jpg
word = https://cn.bing.com/th?id=OIP.2l4mI6F0_MiyyGcPB-aoYAHaEK&pid=Api&rs=1
chrome = http://img.mp.sohu.com/upload/20170526/ee6776da5af84cec81f68e3fce9274aa_th.png

= http://b.hiphotos.baidu.com/image/pic/item/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg`);
  RNState['iconUrls'] = React.useState(`word = https://www.easyicon.net/api/resizeApi.php?id=1212930&size=128
谷歌浏览器 = https://www.easyicon.net/api/resizeApi.php?id=1212918&size=128
android = https://www.easyicon.net/api/resizeApi.php?id=1229034&size=128
win = https://www.easyicon.net/api/resizeApi.php?id=1229085&size=128

= https://www.easyicon.net/api/resizeApi.php?id=1236657&size=128`);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "\u80CC\u666F\uFF1A", backgroundSrc, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    style: RNStyles.blockLabel
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: useBigPic,
    onChange: () => setUseBigPic(!useBigPic)
  }), "\u4F7F\u7528\u60AC\u6D6E\u5927\u56FE\u7247\u6846\u4E2D\u7684\u56FE\u7247\uFF08\u4E0A\u4F20\u56FE\u7247\u4E4B\u4E00\uFF09"), /*#__PURE__*/React.createElement("label", {
    style: RNStyles.blockLabel
  }, "\u5173\u952E\u8BCD\u5339\u914D\uFF08\u548C\u56FE\u6807\u7C7B\u4F3C\uFF09", /*#__PURE__*/React.createElement("button", {
    onclick: () => launchUrl('https://image.baidu.com/')
  }, "\u767E\u5EA6\u56FE\u7247"), /*#__PURE__*/React.createElement("span", null, "(\u6CE8\u610Ftimgsa.baidu.com\u5F00\u5934\u7684\u65E0\u6548)"), /*#__PURE__*/React.createElement("input", {
    id: "brief-background",
    style: {
      display: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: RNStyles.noteB
  }, /*#__PURE__*/React.createElement("span", {
    id: "background-urls-note",
    style: {
      color: backgroundNote[1]
    }
  }, backgroundNote[0])), /*#__PURE__*/React.createElement("textarea", {
    id: "background-urls-textarea",
    style: RNStyles.urlsTextArea
  }, RNState['backgroundUrls'][0]))), /*#__PURE__*/React.createElement("div", null, "\u56FE\u6807\uFF1A", /*#__PURE__*/React.createElement("button", {
    onclick: () => launchUrl('https://www.easyicon.net/')
  }, "\u56FE\u6807\u7F51\u7AD9")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "\u6BCF\u4E00\u884C\u8F93\u5165\u683C\u5F0F:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "\u5173\u952E\u8BCD=\u56FE\u7247\u94FE\u63A5")), /*#__PURE__*/React.createElement("p", null, "\u6700\u540E\u4E00\u884C\u8F93\u5165\u683C\u5F0F\uFF08\u8868\u793A\u9ED8\u8BA4\u56FE\u6807\uFF09:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "=\u56FE\u7247\u94FE\u63A5"))), /*#__PURE__*/React.createElement("div", {
    style: RNStyles.noteA
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: iconNote[1]
    }
  }, iconNote[0])), /*#__PURE__*/React.createElement("textarea", {
    id: "icon-urls-textarea",
    style: RNStyles.urlsTextArea
  }, RNState['iconUrls'][0]), /*#__PURE__*/React.createElement("p", null, "\u6CE8\u610F\u4E8B\u9879\uFF1A\u56FE\u7247\u56FE\u6807\u5728\u6D4F\u89C8\u5668\u67E5\u627E\uFF0C\u6D4F\u89C8\u5668\u4E2D\u53F3\u952E\u56FE\u7247\uFF0C\u53EF\u4EE5\u590D\u5236\u56FE\u7247\u5730\u5740\u3002", /*#__PURE__*/React.createElement("br", null), "\u5982\u679C\u5E0C\u671B\u8BBE\u7F6E\u53EF\u4EE5\u4FDD\u5B58\u53EF\u4EE5\u4FDD\u7559\u5230\u4E0B\u6B21\u4F7F\u7528\uFF0C\u70B9\u51FB\u4FDD\u5B58\u914D\u7F6E\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "\u751F\u6210\u7B80\u4ECB\u56FE\u540E\uFF0C\u5E76\u4E0D\u4F1A\u81EA\u52A8\u4E0A\u4F20\uFF0C\u8BF7\u70B9\u51FB\u53E6\u5B58\u4E3A\uFF0C\u6216\u8005\u4FDD\u5B58\u56FE\u7247\uFF0C\u518D\u4E0A\u4F20\u3002")), /*#__PURE__*/React.createElement("button", {
    id: "brief-conf-save",
    onclick: saveConfig,
    style: RNStyles.saveConfigButton
  }, "\u4FDD\u5B58\u914D\u7F6E"), /*#__PURE__*/React.createElement("img", {
    className: "brief-img",
    style: {
      display: "none"
    },
    id: "brief-backgroundImage"
  }), /*#__PURE__*/React.createElement("img", {
    className: "brief-img",
    style: {
      display: "none"
    },
    id: "brief-iconImage"
  }));
}

function RN_BriefPicEditor() {
  const [settingsVisible, setSettingsVisible] = RNState['settingsVisible'] = React.useState(false);
  const [isAutoWrap, setIsAutoWrap] = RNState['isAutoWrap'] = React.useState(true);
  console.log("# RN_BriefPicEditor called");
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("canvas", {
    width: "600",
    height: "240",
    style: RNStyles.mainCanvas,
    id: "brief-canvas"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => saveCanvas(0),
    style: RNStyles.bigButton
  }, "\u4FDD\u5B58\u7B80\u4ECB\u56FE"), /*#__PURE__*/React.createElement("button", {
    onClick: () => saveCanvas(1),
    style: RNStyles.bigButton
  }, "\u7B80\u4ECB\u56FE\u53E6\u5B58\u4E3A"), /*#__PURE__*/React.createElement("button", {
    id: "toggle-settings",
    onClick: () => setSettingsVisible(!settingsVisible),
    style: RNStyles.bigButton
  }, settingsVisible ? "↑ 收起设置 ↑" : "↓ 展开设置 ↓", " "), /*#__PURE__*/React.createElement("button", {
    onClick: () => closeBriefPic(),
    style: RNStyles.bigButton
  }, "\u9690\u85CF"), /*#__PURE__*/React.createElement("input", {
    checked: isAutoWrap,
    onChange: () => setIsAutoWrap(!isAutoWrap),
    type: "checkbox",
    style: {
      marginLeft: 15
    }
  }), "\u81EA\u52A8\u6362\u884C"), /*#__PURE__*/React.createElement("div", {
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
  var existEditor = document.getElementById("brief-img-editor");

  if (existEditor) {
    /* var title = document.getElementById("title");
    var alreadyThere = document.createElement("p");
    alreadyThere.innerText = "简介图编辑器已经添加。";
    title.appendChild(alreadyThere); */
    existEditor.style.display = "block";
    return;
  }

  var title = document.getElementById("title");
  var titleInput = title.getElementsByClassName("title pr")[0].getElementsByTagName("input")[0];
  var oldCompInputVal = "<<init>>";
  var editorBox = document.createElement("div");
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

    RNState['backgroundNote'][1]([note, color]);
  }

  function iconShowNote(note, color) {
    if (!note) {
      note = "最终图标为从上往下找到的第一个关键词匹配。";
      color = "darkcyan";
    }

    RNState['iconNote'][1]([note, color]);
  } //let images = new Array(20).fill().map((e,i)=>`/images/${i + 1}.png`);


  setInterval(updateBriefImage, 800);
  var oldsrc1 = "";
  var oldsrc2 = "";
  var forceBg = false;
  var forceIc = false;

  function updateBriefImage() {
    if (document.getElementById("brief-img-editor").style.display == "none") return; //update brief icon

    var pairs = [];

    try {
      var urltxt = document.getElementById("icon-urls-textarea");
      var lines = urltxt.value.split("\n").map(x => x.trim()).filter(x => x != "");
      pairs = lines.map(x => x.split("=")).map(y => [y[0], y.slice(1).join("=")].map(z => z.trim()));

      for (var elem of pairs) {
        if (elem.length != 2) throw "error";
        if (!elem[1].startsWith("http") && !elem[1].startsWith("ms-appdata")) throw "error";
      }

      iconShowNote();
    } catch (e) {
      iconShowNote("输入格式不正确!", "red");
    }

    for (var p of pairs) {
      if (titleInput.value.toLowerCase().indexOf(p[0].toLowerCase()) >= 0) {
        document.getElementById("brief-icon").value = p[1];
        break;
      }
    } //update brief background


    pairs = [];

    try {
      var urltxt = document.getElementById("background-urls-textarea");
      var lines = urltxt.value.split("\n").map(x => x.trim()).filter(x => x != "");
      pairs = lines.map(x => x.split("=")).map(y => [y[0], y.slice(1).join("=")].map(z => z.trim()));

      for (var elem of pairs) {
        if (elem.length != 2) throw "error";
        if (!elem[1].startsWith("http") && !elem[1].startsWith("ms-appdata")) throw "error";
      }

      backgroundShowNote();
    } catch (e) {
      backgroundShowNote("输入格式不正确!", "red");
    }

    for (var p of pairs) {
      if (titleInput.value.toLowerCase().indexOf(p[0].toLowerCase()) >= 0) {
        document.getElementById("brief-background").value = p[1];
        break;
      }
    } //check canvas update.


    var isBksrc1Checked = RNState['useBigPic'][0];
    var wrapLineEnabled = RNState['isAutoWrap'][0];
    var newCompInputVal = titleInput.value + " | " + $("#brief-background-bigbox").val() + " | " + $("#brief-background").val() + " | " + $("#brief-icon").val() + " | " + wrapLineEnabled + " | " + document.getElementById("brief-fontColor").innerText + " | " + isBksrc1Checked + " | " + forceBg + " | " + forceIc;
    console.log(newCompInputVal);
    if (oldCompInputVal == newCompInputVal) return;
    oldCompInputVal = newCompInputVal;
    var newsrc1 = "";

    if (isBksrc1Checked) {
      var newsrc1 = $("#brief-background-bigbox").val();
    } else {
      var newsrc1 = $("#brief-background").val();
    }

    var newsrc2 = $("#brief-icon").val();

    if (newsrc1 != oldsrc1 || forceBg) {
      //there's no ?t in new/old src var.
      $("#brief-backgroundImage").attr("src", newsrc1 + "?t=" + Date.now());
      oldsrc1 = newsrc1;
      forceBg = false;
      console.log("# forceBg");
    }

    if (newsrc2 != oldsrc2 || forceIc) {
      $("#brief-iconImage").attr("src", newsrc2 + "?t=" + Date.now());
      oldsrc2 = newsrc2;
      forceIc = false;
      console.log("# forceIc");
    }

    $.when.apply(null, $(".brief-img").map(function (i, e) {
      var dfd = $.Deferred();

      if (e.complete) {
        dfd.resolve();
      }

      e.onload = function () {
        dfd.resolve();
      };

      return dfd;
    }).toArray()).done(function () {
      //获得画布元素
      var briefCanvas1 = document.getElementById("brief-canvas"); //获得2维绘图的上下文

      var ctx = briefCanvas1.getContext("2d"); //清除

      ctx.clearRect(0, 0, 600, 240); //图片

      var apple = document.getElementById("brief-backgroundImage"); //将图像绘制到画布的，图片的左上角

      try {
        if (!isBksrc1Checked) {
          ctx.drawImage(apple, 0, 0, apple.width - 30, apple.height - 30, 0, 0, 600, 240);
        } else {
          ctx.drawImage(apple, 0, 0, apple.width - 260, apple.height - 120, 0, 0, 600, 240);
        }
      } catch (e) {
        forceBg = true; //force update next time.
      } //画一个实心矩形


      fillRoundRect(ctx, 66, 66, 468, 108, 12, document.getElementById("brief-fontColor").innerText);
      apple = document.getElementById("brief-iconImage");

      try {
        //将图像绘制到画布的，图片的左上角
        ctx.drawImage(apple, 96, 79.2, 81.6, 81.6);
      } catch (e) {
        forceIc = true; //force update next time.
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

      if (oneLineOK || !document.getElementById("wrap-line-enabled").checked) {
        // 绘制文字（参数：要写的字，x坐标，y坐标）
        ctx.fillText(firstLine + secondLine, 201.6, 122.4, 297.6);
      } else {
        ctx.font = "28px bold 黑体"; // 绘制文字（参数：要写的字，x坐标，y坐标）

        ctx.fillText(firstLine, 201.6, 104.4, 297.6);
        ctx.fillText(secondLine, 201.6, 141.6, 297.6);
      }
    });

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
    }
  }
}

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