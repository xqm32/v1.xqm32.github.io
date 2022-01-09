---
title: "为 Hugo 博客加入 Gitalk"
date: 2022-01-09T20:36:22+08:00
tags: ['教程', 'Hugo', 'Gitalk']
categories: ['技术分享']
draft: false
---

一个好的博客往往需要评论区的支撑，但使用自建服务器做评论区显然有点略显奢侈了，而使用 `Gitalk` 搭建博客评论区显然是一个不错的选择。

# 加入 Gitalk 的方法

这里以 `PaperMod` 主题为例子，理论上也适用于其他主题，具体还请查阅所用主题的相关文档。

[在 PaperMod 主题中](https://github.com/adityatelange/hugo-PaperMod/wiki/Features#comments)，我们只需要在根目录下创建 `layouts/partials/comments.html` 文件即可（或者复制 `themes/PaperMod/layouts/partials/comments.html` 至根目录即可）。

此后，我们可以参照 [Gitalk 文档](https://github.com/gitalk/gitalk)，在 `comments.html` 加入如下内容：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
<script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
<div id="gitalk-container"></div>
<script>
var gitalk = new Gitalk({
  clientID: 'GitHub Application Client ID',
  clientSecret: 'GitHub Application Client Secret',
  repo: 'GitHub repo',      // The repository of store comments,
  owner: 'GitHub repo owner',
  admin: ['GitHub repo owner and collaborators, only these guys can initialize github issues'],
  id: location.pathname,      // Ensure uniqueness and length less than 50
  distractionFreeMode: false  // Facebook-like distraction free mode
})

gitalk.render('gitalk-container')
</script>
```

注意：这里的 `clientID` 等内容请参考[文档中 Usage](https://github.com/gitalk/gitalk#Usage) 进行申请。

此外，还应在 `config.yml` 中的 `params` 项下加入 `comments: true` 以使得评论系统生效。


