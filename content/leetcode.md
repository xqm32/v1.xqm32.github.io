---
title: "LeetCode"
draft: false
---

**力扣每日一水**。

## 2022.3.4

```python3
#
# @lc app=leetcode.cn id=71 lang=python3
#
# [71] 简化路径
#

# @lc code=start
class Solution:
    def simplifyPath(self, path: str) -> str:
        path = path.split('/')
        pwd = []

        for i in path:
            match(i):
                case '' | '.':
                    continue
                case '..':
                    if len(pwd) == 0:
                        continue
                    else:
                        pwd.pop()
                case _:
                    pwd.append(i)

        return '/'+'/'.join(pwd)
# @lc code=end
```

## 2022.3.5

```python3
#
# @lc app=leetcode.cn id=137 lang=python3
#
# [137] 只出现一次的数字 II
#

import fire
from typing import List

# @lc code=start


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        if len(nums) <= 3:
            return nums[0]
        nums.sort()
        if nums[0] != nums[1]:
            return nums[0]
        elif nums[-1] != nums[-2]:
            return nums[-1]
        for i in range(1, len(nums)-1):
            if nums[i] != nums[i-1] and nums[i] != nums[i+1]:
                return nums[i]

        # @lc code=end


if __name__ == '__main__':
    fire.Fire(Solution)
```
