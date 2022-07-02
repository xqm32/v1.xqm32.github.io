---
title: "July"
draft: false
---

## 2022.7.3

```python
#
# @lc app=leetcode.cn id=507 lang=python3
#
# [507] 完美数
#

# @lc code=start
from math import ceil, sqrt


class Solution:
    def checkPerfectNumber(self, num: int) -> bool:
        return (
            sum(i + num / i for i in range(2, ceil(sqrt(num))) if num % i == 0) + 1
            == num
        ) if num != 1 else False


# @lc code=end

sol = Solution()
print(sol.checkPerfectNumber(28))
print(sol.checkPerfectNumber(7))
print(sol.checkPerfectNumber(1))
print(sol.checkPerfectNumber(99999994))

```

## 2022.7.2

```python
#
# @lc app=leetcode.cn id=1342 lang=python3
#
# [1342] 将数字变成 0 的操作次数
#

# @lc code=start
class Solution:
    def numberOfSteps(self, num: int) -> int:
        return num.bit_count()+num.bit_length()-1 if num else 0
# @lc code=end
```

## 2022.7.1

```python
#
# @lc app=leetcode.cn id=1539 lang=python3
#
# [1539] 第 k 个缺失的正整数
#

from itertools import count
from typing import List

# @lc code=start
class Solution:
    def findKthPositive(self, arr: List[int], k: int) -> int:
        p = 0
        for i in count(1):
            if p >= len(arr) or arr[p] != i:
                k -= 1
            else:
                p += 1
            if k == 0:
                return i


# @lc code=end

sol = Solution()
print(sol.findKthPositive(arr=[2, 3, 4, 7, 11], k=5))
print(sol.findKthPositive(arr=[1, 2, 3, 4], k=2))
```
