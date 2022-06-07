---
title: "June"
draft: false
---

## 2022.6.8

```python3
#
# @lc app=leetcode.cn id=1037 lang=python3
#
# [1037] 有效的回旋镖
#

# @lc code=start
from typing import List


class Solution:
    def isBoomerang(self, points: List[List[int]]) -> bool:
        return (points[0][0] - points[1][0]) * (points[0][1] - points[2][1]) != (points[0][1] - points[1][1]) * (points[0][0] - points[2][0])
# @lc code=end

sol = Solution()
print(sol.isBoomerang([[1, 1], [2, 3], [3, 2]]))
print(sol.isBoomerang([[1, 1], [2, 2], [3, 3]]))
```

## 2022.6.6

```python3
#
# @lc app=leetcode.cn id=1624 lang=python3
#
# [1624] 两个相同字符之间的最长子字符串
#

# @lc code=start
class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        return max(-1, *(s.rfind(s[i], i + 1) - i - 1 for i in range(len(s) - 1)))


# @lc code=end
sol = Solution()
print(sol.maxLengthBetweenEqualCharacters("aa"))
print(sol.maxLengthBetweenEqualCharacters("abca"))
print(sol.maxLengthBetweenEqualCharacters("cbzxy"))
print(sol.maxLengthBetweenEqualCharacters("cabbac"))
print(sol.maxLengthBetweenEqualCharacters("mgntdygtxrvxjnwksqhxuxtrv"))
```

## 2022.6.5

前几天太忙了

```python3
#
# @lc app=leetcode.cn id=771 lang=python3
#
# [771] 宝石与石头
#

# @lc code=start
class Solution:
    def numJewelsInStones(self, jewels: str, stones: str) -> int:
        return sum(stones.count(i) for i in jewels)
# @lc code=end

sol = Solution()
print(sol.numJewelsInStones("aA", "aAAbbbb"))
print(sol.numJewelsInStones("z", "ZZ"))
```
