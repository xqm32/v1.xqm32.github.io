---
title: "June"
draft: false
---

## 2022.6.11

力扣似乎抽风了（）

```python3
#
# @lc app=leetcode.cn id=414 lang=python3
#
# [414] 第三大的数
#

from typing import List

# @lc code=start
class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        nums=list(set(nums))
        nums.sort()
        if len(nums)<3:
            return nums[-1]
        else:
            return nums[-3]
# @lc code=end

sol = Solution()
print(sol.thirdMax([3,2,1]))
print(sol.thirdMax([1,2]))
print(sol.thirdMax([2,2,3,1]))
```

## 2022.6.10

```python3
#
# @lc app=leetcode.cn id=1816 lang=python3
#
# [1816] 截断句子
#

# @lc code=start
class Solution:
    def truncateSentence(self, s: str, k: int) -> str:
        for i in range(len(s)):
            if s[i] == ' ':
                k = k-1
            if k == 0:
                return s[:i]
        return s
# @lc code=end

sol = Solution()
print(sol.truncateSentence(""Hello how are you Contestant", 4))   
print(sol.truncateSentence("What is the solution to this problem", 4))
print(sol.truncateSentence("chopper is not a tanuki", 5))
```

## 2022.6.9

```python3
#
# @lc app=leetcode.cn id=1935 lang=python3
#
# [1935] 可以输入的最大单词数
#

# @lc code=start
class Solution:
    def canBeTypedWords(self, text: str, brokenLetters: str) -> int:
        return sum(1 for i in text.split() if not set(brokenLetters) & set(i))
# @lc code=end

sol = Solution()
print(sol.canBeTypedWords("hello world", "ad"))
print(sol.canBeTypedWords("leet code", "lt"))
print(sol.canBeTypedWords("leet code", "e"))
```

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
