function initRouter(href) {
    if (String(href).indexOf("passport.douyu.com") != -1 && String(href).indexOf("exid=chun") != -1) {
        // 账号
        initRouter_Passport();
	} else if (String(href).indexOf("msg.douyu.com") != -1) {
        // 车队
        if (href.indexOf("?exClean") != -1) {
            initRouter_CleanMsg();
        } else {
            initRouter_Motorcade();
        }
    } else if (String(href).indexOf("yuba.douyu.com") != -1) {
        // 鱼吧
        if (String(href).indexOf("?exClean") != -1) {
            initRouter_CleanYuba();
        } else {
            initRouter_Yuba();
        }
        
    } else if (String(href).indexOf("v.douyu.com") != -1 && String(href).indexOf("?exClean") != -1) {
        // 视频
        initRouter_CleanVideo();
    } else {
        if (String(href).indexOf("exid=chun") != -1) {
            // 主站
            initRouter_DouyuRoom_Popup();
        } else {
            initRouter_DouyuRoom_Main();
        }
    }
}

function initRouter_Motorcade() {
    // 车队
    if (getQueryString("exid") == "chun") {
        signMotorcade_Sign();
    }
}

function initRouter_DouyuRoom_Popup() {
    // 画中画
    let intID = setInterval(() => {
        if (typeof(document.querySelector('div.wfs-2a8e83')) != "undefined") {
            document.querySelector('div.wfs-2a8e83').click();
            document.querySelector('label.layout-Player-asidetoggleButton').click();
            let l = document.querySelectorAll(".tip-e3420a > ul > li").length;
            document.querySelectorAll(".tip-e3420a > ul > li")[l - 1].click();
            clearInterval(intID);
        }
    }, 1000);
}


function initRouter_DouyuRoom_Main() {
    // 主要
    document.domain = "douyu.com";
    init();
    let intID = setInterval(() => {
        if (typeof(document.getElementsByClassName("BackpackButton")[0]) != "undefined" && typeof(document.getElementsByClassName("Barrage-main")[0]) != "undefined") {
            setTimeout(() => {
                initStyles();
                initPkg();
                initPkgSpecial();
                initTimer();
            }, 1500)
            clearInterval(intID);
        }
    }, 1000);
}

function initPkgSpecial() {
    if (rid == "5189167") {
        initPkg_Point();
    }
}

// function initRouter_Novel() {
//     startWatchNovel();
// }

function initRouter_Yuba() {
    document.domain = "douyu.com";
}

function initRouter_Passport() {
    let cmd = getStrMiddle(window.location.href, "cmd=", "&");
    let uid = getStrMiddle(window.location.href, "uid=", "&");
    let domain = getStrMiddle(window.location.href, "domain=", "&");
    if (cmd !== "clean") {
        addAccountPassport(uid);
    }
    switch (cmd) {
        case "clean":
            // 清空cookie，用于重新登录
            cleanCookie(() => {
                window.parent.postMessage("cleanOver", decodeURIComponent(domain));
            });
            break;
        case "switch":
            // 切换用户
            switchAccountPassport(uid, () => {
                window.parent.postMessage("switchOver", decodeURIComponent(domain));
            });
            break;
        case "delete":
            // 删除用户
            deleteAccountPassport(uid, () => {
                window.parent.postMessage("deleteOver", decodeURIComponent(domain));
            });
            break;
        default:
            break;
    }
    return;
}

function initRouter_CleanMsg() {
    let domain = getStrMiddle(window.location.href, "domain=", "&");
    cleanCookie(() => {
        window.parent.postMessage("msgCleanOver", decodeURIComponent(domain));
    });
}

function initRouter_CleanYuba() {
    let domain = getStrMiddle(window.location.href, "domain=", "&");
    cleanCookie(() => {
        window.parent.postMessage("yubaCleanOver", decodeURIComponent(domain));
    });
}

function initRouter_CleanVideo() {
    let domain = getStrMiddle(window.location.href, "domain=", "&");
    cleanCookie(() => {
        window.parent.postMessage("videoCleanOver", decodeURIComponent(domain));
    });
}
