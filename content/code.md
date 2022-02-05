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

<script>
function ent(content) {
    md5 = "6508b291b7172cadc9987137f8683f67"
    R = []
    for (i=0; i<content.length; ++i) {
        C = content.charCodeAt(i)
        M = md5.charCodeAt(i%32)
        R.push(C+M)
    }
    R = '.'+R.join('.')
    return Base64.encode(R)
}

function getURL() {
    content = document.getElementById("content").value
    it = content.split('://')
    scheme = it[0]
    host = it[1]
    document.getElementById("result").innerHTML = `<a href='https://vpn.zcst.edu.cn/webvpn/${ent(scheme)}/${ent(host)}/'>${content}</a>`
}
</script>

<button onClick="getURL()">加密：</button> <input id="content"/>

<span>结果：</span> <span id="result"></span>
