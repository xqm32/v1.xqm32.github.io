---
title: "May"
draft: false
---

## 2022.5.23

```python3
#
# @lc app=leetcode.cn id=709 lang=python3
#
# [709] 转换成小写字母
#

# @lc code=start
class Solution:
    def toLowerCase(self, s: str) -> str:
        return s.lower()


# @lc code=end

sol = Solution()
ret = sol.toLowerCase("Hello")
print(ret)
ret = sol.toLowerCase("here")
print(ret)
ret = sol.toLowerCase("LOVELY")
print(ret)
```

## 2022.5.22

```python3
#
# @lc app=leetcode.cn id=258 lang=python3
#
# [258] 各位相加
#

# @lc code=start
class Solution:
    def addDigits(self, num: int) -> int:
        return num if num // 10 == 0 else self.addDigits(sum(int(i) for i in str(num)))
# @lc code=end

sol = Solution()
ret = sol.addDigits(38)
print(ret)
ret = sol.addDigits(0)
print(ret)
ret = sol.addDigits(100)
print(ret)
```

## 2022.5.21

```python3
#
# @lc app=leetcode.cn id=961 lang=python3
#
# [961] 在长度 2N 的数组中找出重复 N 次的元素
#

from collections import Counter
from typing import List

# @lc code=start
class Solution:
    def repeatedNTimes(self, nums: List[int]) -> int:
        return Counter(nums).most_common(1)[0][0]
# @lc code=end

sol = Solution()
ret = sol.repeatedNTimes([1,2,3,3])
print(ret)
ret = sol.repeatedNTimes([2,1,2,5,3,2])
print(ret)
ret = sol.repeatedNTimes([5,1,5,2,5,3,5,4])
print(ret)
```
## 2022.5.20

```python3
#
# @lc app=leetcode.cn id=436 lang=python3
#
# [436] 寻找右区间
#

from typing import List
import fire

# @lc code=start
class Solution:
    def findRightInterval(self, intervals: List[List[int]]) -> List[int]:
        intervals = [i+[j] for j, i in enumerate(intervals)]
        intervals.sort(key=lambda x: x[0])
        res = [-1]*len(intervals)
        for i in range(len(intervals)):
            for j in range(i, len(intervals)):
                if intervals[j][0] >= intervals[i][1]:
                    res[intervals[i][2]] = intervals[j][2]
                    break
        return res
        
# @lc code=end
    func = findRightInterval

sol = Solution()
res = sol.func([[1,1],[3,4]])
print(res)
res = sol.func([[3,4],[2,3],[1,2]])
print(res)
res = sol.func([[1,4],[2,3],[3,4]])
print(res)
res = sol.func([[1,4],[20,31],[3,4]])
print(res)
```

## 2022.5.19

```python3
#
# @lc app=leetcode.cn id=228 lang=python3
#
# [228] 汇总区间
#

from typing import List
import fire

# @lc code=start
class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        if len(nums) == 0:
            return []
        r, a, b = [], 0, 0
        for b in range(1, len(nums)):
            if b - a != nums[b] - nums[a]:
                if nums[b - 1] == nums[a]:
                    r.append(f"{nums[a]}")
                else:
                    r.append(f"{nums[a]}->{nums[b-1]}")
                a = b
        if nums[b] == nums[a]:
            r.append(f"{nums[a]}")
        else:
            r.append(f"{nums[a]}->{nums[b]}")
        return r

    # @lc code=end
    func = summaryRanges


fire.Fire(Solution)
```

## 2022.5.18

```python3
#
# @lc app=leetcode.cn id=1827 lang=python3
#
# [1827] 最少操作使数组递增
#

from functools import reduce
from typing import List
import fire

# @lc code=start
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        a = 0
        for i in range(1, len(nums)):
            a += max(0, nums[i-1]+1-nums[i])
            nums[i] = max(nums[i], nums[i-1] + 1)
        return a

    # @lc code=end
    func = minOperations


fire.Fire(Solution)
```

## 2022.5.17

```python3
#
# @lc app=leetcode.cn id=953 lang=python3
#
# [953] 验证外星语词典
#

from functools import partial
from typing import List

# @lc code=start
class Solution:
    def isAlienSorted(self, words: List[str], order: str) -> bool:
        return all(
            partial(
                lambda o: partial(
                    lambda a, b: list(map(lambda i: o[i], a))
                    <= list(map(lambda i: o[i], b))
                ),
                {c: i for i, c in enumerate(order)},
            )()(i, j)
            for i, j in zip(words, words[1:])
        )

    # @lc code=end
    func = isAlienSorted


"""
o = {c: i for i, c in enumerate(order)}
m = partial(map, lambda i: o[i])
l = lambda w: list(m(w))
for i, j in zip(words, words[1:]):
    if l(j) < l(i):
        return False
return True
"""

s = Solution()
_ = s.isAlienSorted(words=["hello", "leetcode"], order="hlabcdefgijkmnopqrstuvwxyz")
print(_)

_ = s.isAlienSorted(words=["worod", "world", "row"], order="worldabcefghijkmnpqstuvxyz")
print(_)

_ = s.isAlienSorted(words=["apple", "app"], order="abcdefghijklmnopqrstuvwxyz")
print(_)
```

## 2022.5.16

```python3
#
# @lc app=leetcode.cn id=1207 lang=python3
#
# [1207] 独一无二的出现次数
#

from collections import Counter
from functools import partial
from typing import List
import fire

# @lc code=start
class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        return partial(lambda a: len(set(a)) == len(a), Counter(arr).values())()

    # @lc code=end
    func = uniqueOccurrences


fire.Fire(Solution)
```

## 2022.5.15

```python3
#
# @lc app=leetcode.cn id=645 lang=python3
#
# [645] 错误的集合
#

from collections import Counter
from typing import List
import fire

# @lc code=start
class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        return [
            Counter(nums).most_common(1)[0][0],
            list(set(range(1, len(nums) + 1)) - set(nums))[0],
        ]

    # @lc code=end
    func = findErrorNums


fire.Fire(Solution)
```

## 2022.5.14

```python3
#
# @lc app=leetcode.cn id=1556 lang=python3
#
# [1556] 千位分隔数
#
import fire

# @lc code=start
class Solution:
    def thousandSeparator(self, n: int) -> str:
        return f"{n:,}".replace(",", ".")

    # @lc code=end
    func = thousandSeparator


fire.Fire(Solution)
```

## 2022.5.13

今日咕咕咕。

## 2022.5.12

```python3
#
# @lc app=leetcode.cn id=944 lang=python3
#
# [944] 删列造序
#
from functools import reduce
from typing import List
import fire
# @lc code=start
class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        return reduce(
            lambda x, y: "".join(y[i] if x[i] <= y[i] else "{" for i in range(len(x))),
            strs,
        ).count("{")
    # @lc code=end
    func = minDeletionSize
fire.Fire(Solution)
```

## 2022.5.11

```python3
#
# @lc app=leetcode.cn id=1431 lang=python3
#
# [1431] 拥有最多糖果的孩子
#
from functools import partial
from typing import List
import fire
# @lc code=start
class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        return partial(lambda m: [c + extraCandies >= m for c in candies], max(candies))()
    # @lc code=end
    func = kidsWithCandies
fire.Fire(Solution)
```

## 2022.5.10

```python3
#
# @lc app=leetcode.cn id=937 lang=python3
#
# [937] 重新排列日志文件
#
from typing import List
# @lc code=start
class Solution:
    def reorderLogFiles(self, logs: List[str]) -> List[str]:
        return sorted(
            [i for i in logs if i[-1].isalpha()],
            key=lambda i: list(reversed(i.partition(" "))),
        ) + [i for i in logs if i[-1].isdigit()]
    # @lc code=end
    func = reorderLogFiles
print(
    Solution().func(
        [
            "dig1 8 1 5 1",
            "let1 art zero can",
            "dig2 3 6",
            "let2 own kit dig",
            "let3 art zero",
        ]
    )
)
```

## 2022.5.9

Python `or` 运算的妙用！

参见 [布尔运算](https://docs.python.org/zh-cn/3/library/stdtypes.html#boolean-operations-and-or-not)！

```python3
#
# @lc app=leetcode.cn id=387 lang=python3
#
# [387] 字符串中的第一个唯一字符
#
from collections import Counter
from functools import reduce
import fire
# @lc code=start
class Solution:
    def firstUniqChar(self, s: str) -> int:
        return reduce(
            min, [s.index(i) for i, j in Counter(s).items() if j == 1] or [-1]
        )
    # @lc code=end
    func = firstUniqChar
fire.Fire(Solution)
```

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
