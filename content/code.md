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
