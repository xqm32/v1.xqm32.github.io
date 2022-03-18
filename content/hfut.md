---
title: "LeetCode"
draft: false
---

**HFUT Webvpn 跳转**

<button onClick="go()">加密：</button> <input id="url"/>
<br/>
<button>结果：</button> <a id="aHref"></a>

<script src="https://webvpn.hfut.edu.cn/wengine-vpn/js/js/jquery.min.js"></script>
<script src="https://webvpn.hfut.edu.cn/wengine-vpn/js/aes-js.js"></script>
<script src="https://webvpn.hfut.edu.cn/wengine-vpn/js/js/portal.js"></script>
<script>
var wrdvpnKey = 'wrdvpnisthebest!'
var wrdvpnIV = 'wrdvpnisthebest!'
var go = function () {
    url = document.getElementById("url").value;
    document.getElementById("aHref").innerHTML = url;
    var protocol = parseProtocol(url);
    if (protocol == "") {
        protocol = $("select[name='protocol']").val();
    } else {
        url = url.replace(protocol + "://", "")
    }
    if (url == "") {
        alert("请输入你所需要访问的地址！")
        return
    }
    var host = parseHost(url);
    if (host == "") {
        protocol = "https"
        url = "www.baidu.com/s?wd=" + $("input[name='goUrl']").val().trim();;
    }
    url = encrypUrl(protocol, url)
    if (['http', 'https', 'ssh', 'telnet', 'rdp', 'vnc'].indexOf(protocol) != -1) {
        url = add_record(url)
    }
    $("#aHref").attr("href", "https://webvpn.hfut.edu.cn"+url);
    // document.getElementById("aHref").click()
}
</script>