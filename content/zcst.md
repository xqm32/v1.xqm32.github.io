---
title: "代码"
draft: false
---

```python
import base64

def a(b):
    c = '6508b291b7172cadc9987137f8683f67'
    d = list(ord(i) for i in c)
    e = list(ord(i) for i in b)
    f = []
    for i in range(0, len(b)):
        f.append((255 & e[i]) + (255 & d[i % 32]))
    g = '.' + '.'.join(list(str(i) for i in f))
    return base64.b64encode(g.encode('UTF-8')).decode()
```

<script src="https://cdn.jsdelivr.net/npm/js-base64@3.7.2/base64.min.js"></script>
<script type="module"src="https://cdn.jsdelivr.net/npm/url-js@2.0.0-u/dist/url.min.js">
    import URLJS from 'url-js';
</script>

<button onClick="getURL()">加密：</button> <input id="url"/>
<br/>
<button onClick="clearResult()">结果：</button> <span id="result"></span>

<script>
  // 加密
  function ent(content) {
    md5 = "6508b291b7172cadc9987137f8683f67";
    R = [];
    for (i = 0; i < content.length; ++i) {
      C = content.charCodeAt(i);
      M = md5.charCodeAt(i % 32);
      R.push(C + M);
    }
    R = "." + R.join(".");
    return Base64.encode(R);
  }

  function getURL() {
    url = document.getElementById("url").value;

    switch (url) {
      case "bing":
        url = "https://www.bing.com";
        break;
      case "baidu":
        url = "https://www.baidu.com";
        break;
      case "cnki":
        url = "https://www.cnki.net";
    }

    protocol = URLJS.parseUrl(url, "protocol");
    protocol = protocol ? protocol.substring(0, protocol.length - 1) : "https";
    hostname = URLJS.parseUrl(url, "hostname");
    hostname = hostname ? hostname : "www.bing.com";
    pathname = URLJS.parseUrl(url, "pathname");
    pathname = pathname ? pathname : "/";
    search = URLJS.parseUrl(url, "search");
    search = search ? search : "";
    document.getElementById(
      "result"
    ).innerHTML = `<a href='https://vpn.zcst.edu.cn/webvpn/${ent(
      protocol
    )}/${ent(hostname)}${pathname}${search}'>${url ? url : "Search"}</a>`;
  }

  function clearResult() {
    document.getElementById("result").innerHTML = "";
  }
</script>