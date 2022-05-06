---
title: "May"
draft: false
---

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
