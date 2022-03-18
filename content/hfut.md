---
title: "HFUT"
draft: false
---

**HFUT Webvpn 跳转**

<span>提示：</span> <span id="tips">点击「加密」二字进行加密</span>
<br/>
<button onClick="go()">加密：</button> <input id="url"/>
<br/>
<span>结果：</span> <a id="aHref"></a>

<script src="https://webvpn.hfut.edu.cn/wengine-vpn/js/js/jquery.min.js"></script>
<script src="https://webvpn.hfut.edu.cn/wengine-vpn/js/aes-js.js"></script>
<script src="https://webvpn.hfut.edu.cn/wengine-vpn/js/js/portal.js"></script>
<script>
var wrdvpnKey = 'wrdvpnisthebest!'
var wrdvpnIV = 'wrdvpnisthebest!'
var go = function () {
    url = $("#url").val();
    var protocol = parseProtocol(url);
    if (protocol == "") {
        protocol = "http";
    } else {
        url = url.replace(protocol + "://", "")
    }
    if (url == "") {
        $("#tips").text("请输入你所需要访问的地址！")
        return
    }
    var host = parseHost(url);
    if (host == "") {
        protocol = "https"
        url = "https://qw.duxiu.com/getPage?sw=" + $("#url").val().trim();
        $("#tips").text("将会跳转至读秀搜索此内容")
    }
    url = encrypUrl(protocol, url)
    $("#aHref").attr("href", "https://webvpn.hfut.edu.cn" + url);
    $("#aHref").text("https://webvpn.hfut.edu.cn" + url);
}
</script>