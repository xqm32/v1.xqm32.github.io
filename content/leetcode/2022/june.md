---
title: "June"
draft: false
---

## 2022.6.25

```python
#
# @lc app=leetcode.cn id=1437 lang=python3
#
# [1437] 是否所有 1 都至少相隔 k 个元素
#

from typing import List

# @lc code=start
class Solution:
    def kLengthApart(self, nums: List[int], k: int) -> bool:
        s = "".join(str(i) for i in nums)
        one = s.count("1")
        zero = s.count("1"+"0"*k)
        if zero < one-1:
            return False
        return True
# @lc code=end

sol = Solution()
print(sol.kLengthApart(nums = [1,0,0,0,1,0,0,1], k = 2))
print(sol.kLengthApart(nums = [1,0,0,1,0,1], k = 2))
print(sol.kLengthApart(nums = [1,0,0,0,1,0,0,1], k = 2))
print(sol.kLengthApart(nums = [0,1,0,1], k = 1))
print(sol.kLengthApart(nums = [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1], k = 2))
```

## 2022.6.24

```python
#
# @lc app=leetcode.cn id=292 lang=python3
#
# [292] Nim 游戏
#

# @lc code=start
class Solution:
    def canWinNim(self, n: int) -> bool:
        return n % 4 != 0


# @lc code=end

```

## 2022.6.23

```python
#
# @lc app=leetcode.cn id=389 lang=python3
#
# [389] 找不同
#

# @lc code=start
from collections import Counter


class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        sc = Counter(s)
        tc = Counter(t)
        for i in tc:
            if i not in sc or sc[i] != tc[i]:
                return i

# @lc code=end

sol = Solution()
print(sol.findTheDifference("abcd", "abcde"))
print(sol.findTheDifference("", "y"))
```

## 2022.6.22

```python
#
# @lc app=leetcode.cn id=1748 lang=python3
#
# [1748] 唯一元素的和
#

from collections import Counter
from typing import List

# @lc code=start
class Solution:
    def sumOfUnique(self, nums: List[int]) -> int:
        return sum(i[0] for i in filter(lambda x: x[1] == 1, Counter(nums).items()))
# @lc code=end

sol = Solution()
print(sol.sumOfUnique([1,2,3,2]))
print(sol.sumOfUnique([1,1,1,1,1]))
```

## 2022.6.21

```python
#
# @lc app=leetcode.cn id=1295 lang=python3
#
# [1295] 统计位数为偶数的数字
#

from typing import List

# @lc code=start
class Solution:
    def findNumbers(self, nums: List[int]) -> int:
        return sum(1 for i in nums if len(str(i)) % 2 == 0)


# @lc code=end

sol = Solution()
print(sol.findNumbers([12, 345, 2, 6, 7896]))
print(sol.findNumbers([555, 901, 482, 1771]))
```

## 2022.6.20

```python
#
# @lc app=leetcode.cn id=844 lang=python3
#
# [844] 比较含退格的字符串
#

import re

# @lc code=start
class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        reg = re.compile(r"([a-z]#)|^#")
        while reg.findall(s):
            s = reg.sub("", s)
        while reg.findall(t):
            t = reg.sub("", t)
        return s == t
        # @lc code=end


sol = Solution()
print(sol.backspaceCompare("ab#c", "ad#c"))
print(sol.backspaceCompare("ab##", "c#d#"))
print(sol.backspaceCompare("a#c", "b"))
print(sol.backspaceCompare("y#fo##f", "y#f#o##f"))
```

## 2022.6.19

```python
#
# @lc app=leetcode.cn id=485 lang=python3
#
# [485] 最大连续 1 的个数
#

from collections import Counter
from typing import List

# @lc code=start
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        return max(len(i) for i in "".join(str(i) for i in nums).split("0"))
# @lc code=end

sol = Solution()
print(sol.findMaxConsecutiveOnes([1,1,0,1,1,1]))
print(sol.findMaxConsecutiveOnes([1,0,1,1,0,1]))
print(sol.findMaxConsecutiveOnes([1,1,1]))
print(sol.findMaxConsecutiveOnes([0,0,0]))
```

## 2022.6.18

```python
#
# @lc app=leetcode.cn id=1518 lang=python3
#
# [1518] 换酒问题
#

# @lc code=start
class Solution:
    def numWaterBottles(self, numBottles: int, numExchange: int) -> int:
        ret = numBottles
        while numBottles >= numExchange:
            ret += numBottles // numExchange
            numBottles = numBottles % numExchange + numBottles // numExchange
        return ret


# @lc code=end
sol=Solution()
print(sol.numWaterBottles(15,4))
print(sol.numWaterBottles(5,5))
print(sol.numWaterBottles(2,3))
```

## 2022.6.17

```python
#
# @lc app=leetcode.cn id=1331 lang=python3
#
# [1331] 数组序号转换
#

from typing import List

# @lc code=start
class Solution:
    def arrayRankTransform(self, arr: List[int]) -> List[int]:
        return (lambda d: [d[i]+1 for i in arr])({v: i for i, v in enumerate(sorted(set(arr)))})

# @lc code=end

sol = Solution()
print(sol.arrayRankTransform([40,10,20,30]))
print(sol.arrayRankTransform([100,100,100]))
print(sol.arrayRankTransform([37,12,28,9,100,56,80,5,12]))
print(sol.arrayRankTransform([1,1,1]))
```

## 2022.6.16

```python
#
# @lc app=leetcode.cn id=268 lang=python3
#
# [268] 丢失的数字
#

from typing import List

# @lc code=start
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        return list(set(range(len(nums)+1))-set(nums))[0]
# @lc code=end

sol = Solution()
print(sol.missingNumber([3,0,1]))
print(sol.missingNumber([9,6,4,2,3,5,7,0,1]))
print(sol.missingNumber([0]))
```

## 2022.6.15

```python
#
# @lc app=leetcode.cn id=20 lang=python3
#
# [20] 有效的括号
#

# @lc code=start
class Solution:
    def isValid(self, s: str) -> bool:
        d = {")": "(", "]": "[", "}": "{"}
        stack = []
        for i in s:
            if i in d.values():
                stack.append(i)
            else:
                if not stack or stack[-1] != d[i]:
                    return False
                else:
                    stack.pop()
        if stack:
            return False
        return True

# @lc code=end

sol = Solution()
print(sol.isValid("()"))
print(sol.isValid("()[]{}"))
print(sol.isValid("(]"))
print(sol.isValid("([)]"))
print(sol.isValid("["))
```

## 2022.6.14

```python
#
# @lc app=leetcode.cn id=14 lang=python3
#
# [14] 最长公共前缀
#

from typing import List

# @lc code=start
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        a = min(strs)
        b = max(strs)
        for i in range(len(a)):
            if a[i] != b[i]:
                return a[:i]
        return a
# @lc code=end

sol = Solution()
print(sol.longestCommonPrefix(["flower","flow","flight"]))
print(sol.longestCommonPrefix(["dog","racecar","car"]))
print(sol.longestCommonPrefix(["a","ab", "ac", "ad"]))
```

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
