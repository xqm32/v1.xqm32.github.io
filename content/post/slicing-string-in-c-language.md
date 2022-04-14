---
title: "C 语言实现字符串切片"
date: 2021-09-04T16:33:50+08:00
tags: ["编程"]
categories: ["技术分享"]
draft: false
---

搬运一篇笔者在知乎发的文章：[C 语言实现字符串切片](https://zhuanlan.zhihu.com/p/56543803)

基于 Python 的切片的格式实现的 C 语言字符串切片：

```c
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef long long SizeType;

size_t fgetln(FILE* stream, char* dest, size_t size) {
    size_t i;
    for (i = 0, *dest = fgetc(stream);
         *dest != '\n' && !feof(stream) && --size > 0;
         ++i, *++dest = fgetc(stream))
        ;
    *dest = '\0';
    return i;
}

// 读取一行字符串。

size_t slice(char* from,
             char* to,
             SizeType begin,
             SizeType end,
             SizeType interval) {
    SizeType i;
    begin += begin < 0 ? strlen(from) : 0;
    end += end > 0 ? 0 : strlen(from);
    interval = interval ? interval : 1;
    for (i = 0; from[begin] != '\0' && begin < end; ++i, begin += interval)
        to[i] = from[begin];
    to[i] = '\0';
    return i;
}

// 切片函数。

char* StrSize(char* from, SizeType* m, SizeType* n, SizeType* o) {
    *m = atoll(from);
    from = strchr(from, ':');
    if (!from)
        return from;
    *n = atoll(++from);
    from = strchr(from, ':');
    if (!from)
        return from;
    *o = atoll(++from);
    return from;
}

// 字符串解析成数字，由 ":" 分隔。

size_t strslice(char* format, char* from, char* to) {
    SizeType m = 0, n = 0, o = 0;
    StrSize(format, &m, &n, &o);
    // printf("%lld, %lld, %lld\n", m, n, o);
    return slice(from, to, m, n, o);
}

// 用字符串作为切片的格式的切片函数。

int main(int argc, char* argv[]) {
    char* String = malloc(128);
    char* Format = malloc(128);
    char* Save = malloc(128);
    for (;;) {
        memset(String, 0, 128);
        memset(Format, 0, 128);
        memset(Save, 0, 128);
        fgetln(stdin, String, 128);
        fgetln(stdin, Format, 128);
        strslice(Format, String, Save);
        printf("%s\n", Save);
    }
}
```

测试：

```markdown
Hello world
::
Hello world

Hello world
1
ello world

Hello world
-1
d

Hello world
1:
ello world

Hello world
-1:
d

Hello world
:1
H

Hello world
:-1
Hello worl

Hello world
::1
Hello world

Hello world
::2
Hlowrd

Hello world
1:-1
ello worl

Hello world
2:1
[无输出]

Hello world
-2:-1
l

Hello world
-1:-2
[无输出]
```
