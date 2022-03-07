---
title: "LeetCode"
draft: false
---

**力扣每日一水**。

## 2022.3.7

-1 % 7 居然 -6

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=504 lang=python3
#
# [504] 七进制数
#

import fire
from prompt_toolkit import ANSI

# @lc code=start


class Solution:
    def convertToBase7(self, num: int) -> str:
        s = '-' if num < 0 else '0' if num == 0 else ''
        num = abs(num)
        ans, r = '', num % 7
        while(num):
            ans = str(r) + ans
            num //= 7
            r = num % 7
        return s+ans

# @lc code=end


fire.Fire(Solution)
```

## 2022.3.6

这题居然做了两三个小时，我太菜了 🍅

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=32 lang=python3
#
# [32] 最长有效括号
#

from typing import Tuple
from rich.console import Console
import fire
console = Console()


def stress(s: str, f: int, t: int, c: str) -> None:
    console.log(f'{s[:f]}[{c}]{s[f:t]}[/{c}]{s[t:]}')

# @lc code=start


class Solution:
    def findLeftPair(self, s: str, f: int, t: int) -> Tuple[int, int, int]:
        b = 0
        for i in range(t-1, f-1, -1):
            if s[i] == ')':
                b += 1
            elif s[i] == '(':
                b -= 1
            if b == 0:
                return f, i, i, t
        return -1, -1, -1, -1

    def findRightPair(self, s: str, f: int, t: int) -> Tuple[int, int, int]:
        b = 0
        for i in range(f, t):
            if s[i] == '(':
                b += 1
            elif s[i] == ')':
                b -= 1
            if b == 0:
                return i+1, t, f, i+1
        return -1, -1, -1, -1

    def strip(self, s: str, f: int, t: int) -> Tuple[int, int]:
        for i in s[f:t]:
            if i == '(':
                break
            f += 1
        for i in reversed(s[f:t]):
            if i == ')':
                break
            t -= 1
        return f, t

    def longestValidParentheses(self, s: str) -> int:
        res, m = 0, 0
        ff, tt = self.strip(s, 0, len(s))
        ll, rr = -1, -1
        self.findPair = self.findLeftPair
        while(ff < tt):

            # stress(f'{s} {self.findPair.__name__} ff={ff} tt={tt}',
            #        ff, tt, 'yellow')

            f, t, l, r = self.findPair(s, ff, tt)

            if f == -1:
                if self.findPair == self.findLeftPair:
                    self.findPair = self.findRightPair
                else:
                    self.findPair = self.findLeftPair
                m = 0
                continue

            if ll != -1:
                if l != rr and r != ll:
                    # stress(f'{s} zero ll={ll} rr={rr}', ll, rr, 'steel_blue')
                    # stress(f'{s} pair l={l} r={r}', l, r, 'blue')
                    m = 0

            m += r - l
            res = max(res, m)

            ll, rr = l, r
            ff, tt = self.strip(s, f, t)

        return res
# @lc code=end


if __name__ == '__main__':
    fire.Fire(Solution)
```

## 2022.3.5

- [ ] 看题解

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

## 2022.3.4

- [ ] 看题解

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
