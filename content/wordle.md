---
title: "Wordle"
draft: false
---

# 使用说明

点击拉取：拉取所有单词

点击剩余：计算剩余单词

状态按照颜色 w(white), y(yellow), g(green) 进行填写

<hr/>
<span>提示：</span> <span id="tips"></span>
<br/>
<button onClick="fetchIt()">拉取</button> | <button onClick="undo()">撤销</button> | <button onClick="redo()">重做</button> @ <span id="nowWords"></span>
<br/>
<span>单词：</span> <input id="word"/>
<br/>
<span>状态：</span> <input id="state"/>
<br/>
<button onClick="wordle()">剩余：</button> <span id="rest"></span>

<script>
  // Wordle
  // Fix Bug: apple | yygwy | double 'p'
  historyWords = [];
  nowWords = -1;

  words = [];
  len = 0;
  fetchIt();

  setInterval(()=>{
      document.getElementById("nowWords").innerHTML = nowWords
  }, 1000)

  async function fetchIt() {
    await fetch("/des.txt").then((r) =>
      r.text().then((t) => {
        words = t.split("\n");
      })
    );
    len = words[0].length;
    
    historyWords.push(words);
    nowWords = 0
    document.getElementById("word").value = ""
    document.getElementById("state").value = ""
    document.getElementById("rest").innerHTML = ""

    document.getElementById("tips").innerHTML = "拉取单词中";
    setTimeout(
      'document.getElementById("tips").innerHTML = "单词拉取完毕"',
      1000
    );
  }

  function undo() {
    words = historyWords[--nowWords];
    document.getElementById("rest").innerHTML = words
  }

  function redo() {
    words = historyWords[++nowWords];
    document.getElementById("rest").innerHTML = words
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
          return (
            w.search(word[i]) == -1 ||
            (wordCount != 0 && wordCount <= YandGCount)
          );
        });
      }
    }

    if (words.length == 0)
      document.getElementById("rest").innerHTML = "There's nothing";
    else if (words.length == 1)
      document.getElementById("rest").innerHTML = `The answer is ${words[0]}`;
    else {
        document.getElementById("word").value = words[0];
        document.getElementById("rest").innerHTML = words;
    }

    historyWords.push(words);
    nowWords += 1
  }
</script>
