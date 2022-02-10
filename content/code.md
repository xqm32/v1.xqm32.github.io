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

<hr/>
<button onClick="fetchIt()">单词：</button> <input id="word"/> <span id="tips"></span>
<br/>
<button onClick="">状态：</button> <input id="state"/>
<br/>
<button onClick="wordle()">剩余：</button> <span id="rest"></span>

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

  // Wordle
  words = [];
  len = 0;
  fetchIt();

  async function fetchIt() {
    await fetch("/des.txt").then((r) =>
      r.text().then((t) => {
        words = t.split("\n");
      })
    );
    len = words[0].length;
    document.getElementById("tips").innerHTML = "Fetching words.";
    setTimeout(
      'document.getElementById("tips").innerHTML = "Words fetched"',
      1000
    );
  }

  function wordle() {
    word = document.getElementById("word").value;
    state = document.getElementById("state").value;
    YandG = [];

    for (i = 0; i < len; ++i) {
      switch (state[i]) {
        case "y":
          // 存在且不匹配
          words = words.filter(
            (w) => w[i] != word[i] && w.search(word[i]) != -1
          );
          YandG.push(word[i]);
          break;
        case "g":
          // 存在且匹配
          words = words.filter((w) => w[i] == word[i]);
          YandG.push(word[i]);
          break;
      }
    }

    for (i = 0; i < len; ++i) {
      if (state[i] == "w") {
        words = words.filter((w) => {
          j = 0;
          k = 0;
          wordArray = Array.from(w);
          wordArray.forEach((a) => (j += a == word[i] ? 1 : 0));
          YandG.forEach((a) => (k += a == word[i] ? 1 : 0));
          return w.search(word[i]) == -1 && j <= k;
        });
      }
    }
    if (words.length == 0)
      document.getElementById("rest").innerHTML = "There's nothing";
    else document.getElementById("rest").innerHTML = words;
  }
</script>
