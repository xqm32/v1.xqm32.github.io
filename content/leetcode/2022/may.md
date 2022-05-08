---
title: "May"
draft: false
---

## 2022.5.8

```python3
#
# @lc app=leetcode.cn id=442 lang=python3
#
# [442] 数组中重复的数据
#
from collections import Counter
from typing import List
import fire
# @lc code=start
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        return [i for i, j in Counter(nums).items() if j == 2]
    # @lc code=end
    func = findDuplicates
fire.Fire(Solution)
```

## 2022.5.7

这绝对不是简单题......😭

```python3
#
# @lc app=leetcode.cn id=925 lang=python3
#
# [925] 长按键入
#
from collections import Counter
from functools import reduce
import fire
# @lc code=start
class Solution:
    def isLongPressedName(self, name: str, typed: str) -> bool:
        return (
            False
            if len(name) > len(typed)
            else False
            if len(set(name)) != len(set(typed))
            else False
            if not Counter(typed) >= Counter(name)
            else reduce(lambda x, y: x.lstrip(y), [typed] + list(name)) == ""
            and reduce(lambda x, y: x.removeprefix(y), [name] + list(typed)) == ""
        )

    # @lc code=end
    func = isLongPressedName
fire.Fire(Solution)
```

## 2022.5.6

```python3
#
# @lc app=leetcode.cn id=933 lang=python3
#
# [933] 最近的请求次数
#
# @lc code=start
class RecentCounter:
    def __init__(self):
        self.t = []
        self.l = 0

    def ping(self, t: int) -> int:
        self.t.append(t)
        for i in range(self.l, len(self.t)):
            if self.t[i] >= t - 3000:
                self.l = i
                break
        return len(self.t) - self.l
# Your RecentCounter object will be instantiated and called as such:
# obj = RecentCounter()
# param_1 = obj.ping(t)
# @lc code=end
```

## 2022.5.5

```python3
#
# @lc app=leetcode.cn id=1512 lang=python3
#
# [1512] 好数对的数目
#
import math
from collections import Counter
from typing import List
import fire
# @lc code=start
class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        return sum(
            math.comb(i, 2) for i in filter(lambda i: i > 1, Counter(nums).values())
        )

    # @lc code=end
    func = numIdenticalPairs
fire.Fire(Solution)
```

## 2022.5.4

```python3
#
# @lc app=leetcode.cn id=1823 lang=python3
#
# [1823] 找出游戏的获胜者
#
import fire
# @lc code=start
class Solution:
    def findTheWinner(self, n: int, k: int) -> int:
        players = [i for i in range(1, n+1)]
        pos = 0
        while len(players) > 1:
            pos = (pos + k - 1) % len(players)
            players.pop(pos)
        return players[0]
# @lc code=end
    func = findTheWinner
fire.Fire(Solution)
```
