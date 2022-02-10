---
title: "Wordle"
draft: false
---

# 使用说明

点击单词：拉取所有单词

点击剩余：计算剩余单词

状态按照颜色 w(white), y(yellow), g(green) 进行填写

<button onClick="fetchIt()">单词：</button> <input id="word"/> <span id="tips"></span>
<br/>
<button onClick="">状态：</button> <input id="state"/>
<br/>
<button onClick="wordle()">剩余：</button> <span id="rest"></span>

<script>
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
            wordCount = 0;
            YandGCount = 0;
            wordArray = Array.from(w);
            wordArray.forEach((alpha) => (wordCount += alpha == word[i] ? 1 : 0));
            YandG.forEach((alpha) => (YandGCount += alpha == word[i] ? 1 : 0));
            console.log(`word: ${wordCount}, YandG: ${YandGCount}`);
            return (
            w.search(word[i]) == -1 ||
            (wordCount != 0 && wordCount <= YandGCount)
            );
        });
        }
    }
    if (words.length == 0)
        document.getElementById("rest").innerHTML = "There's nothing";
    else document.getElementById("rest").innerHTML = words;
    }
</script>
