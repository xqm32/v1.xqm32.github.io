---
title: "July"
draft: false
---

## 2022.7.24

```python
#
# @lc app=leetcode.cn id=657 lang=python3
#
# [657] 机器人能否返回原点
#

# @lc code=start
class Solution:
    def judgeCircle(self, moves: str) -> bool:
        return moves.count("L") == moves.count("R") and moves.count("U") == moves.count("D")
# @lc code=end
```

## 2022.7.23

```python
#
# @lc app=leetcode.cn id=168 lang=python3
#
# [168] Excel表列名称
#

# @lc code=start
import math


class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        a = []
        d = {i: chr(64 + i) for i in range(1, 27)}
        while columnNumber > 26:
            r = columnNumber % 26
            if r == 0:
                a.append(26)
                columnNumber = columnNumber - 26
                columnNumber = columnNumber // 26
            else:
                a.append(r)
                columnNumber = columnNumber // 26
        a.append(columnNumber)
        return "".join(d[i] for i in reversed(a))


# @lc code=end

sol = Solution()
print(sol.convertToTitle(1))
print(sol.convertToTitle(28))
print(sol.convertToTitle(701))
print(sol.convertToTitle(702))
print(sol.convertToTitle(18278))
print(sol.convertToTitle(2147483647))
```

## 2022.7.22

```python
#
# @lc app=leetcode.cn id=58 lang=python3
#
# [58] 最后一个单词的长度
#

# @lc code=start
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        return len(s.split()[-1].strip())
# @lc code=end

sol = Solution()
print(sol.lengthOfLastWord("Hello world"))
print(sol.lengthOfLastWord("   fly me   to   the moon  "))
print(sol.lengthOfLastWord("luffy is still joyboy"))
```

## 2922.7.21

```python
#
# @lc app=leetcode.cn id=1446 lang=python3
#
# [1446] 连续字符
#

# @lc code=start
class Solution:
    def maxPower(self, s: str) -> int:
        r = [1]
        for i in range(1, len(s)):
            if s[i] == s[i-1]:
                r.append(r[-1]+1)
            else:
                r.append(1)
        return max(r)
# @lc code=end

sol = Solution()
print(sol.maxPower("l"))
print(sol.maxPower("leetcode"))
print(sol.maxPower("abbcccddddeeeeedcba"))
```

## 2022.7.20

```python
#
# @lc app=leetcode.cn id=349 lang=python3
#
# [349] 两个数组的交集
#

# @lc code=start
from typing import List


class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        return list(set(nums1) & set(nums2))


# @lc code=end
```

## 2022.7.19

```python
#
# @lc app=leetcode.cn id=929 lang=python3
#
# [929] 独特的电子邮件地址
#

# @lc code=start
from typing import List


class Solution:
    def numUniqueEmails(self, emails: List[str]) -> int:
        after = set()
        for i in emails:
            local, domain = i.split("@")
            local = local.replace(".", "").split("+")[0]
            after.add(f"{local}@{domain}")
        return len(after)


# @lc code=end
sol = Solution()
print(
    sol.numUniqueEmails(
        [
            "test.email+alex@leetcode.com",
            "test.e.mail+bob.cathy@leetcode.com",
            "testemail+david@lee.tcode.com",
        ]
    )
)
print(sol.numUniqueEmails(["a@leetcode.com", "b@leetcode.com", "c@leetcode.com"]))
```

## 2022.7.18

```python
#
# @lc app=leetcode.cn id=2154 lang=python3
#
# [2154] 将找到的值乘以 2
#

# @lc code=start
from typing import List


class Solution:
    def findFinalValue(self, nums: List[int], original: int) -> int:
        nums.sort()
        for i in nums:
            if i == original:
                original *= 2
        return original


# @lc code=end

sol = Solution()
print(sol.findFinalValue(nums=[5, 3, 6, 1, 12], original=3))
print(sol.findFinalValue(nums=[2, 7, 9], original=4))
```

## 2022.7.17

```python
#
# @lc app=leetcode.cn id=1002 lang=python3
#
# [1002] 查找共用字符
#

# @lc code=start
from collections import Counter
from functools import reduce
from typing import List


class Solution:
    def commonChars(self, words: List[str]) -> List[str]:
        return list(
            "".join(
                i * c
                for i, c in reduce(lambda x, y: Counter(x) & Counter(y), words).items()
            )
        )


# @lc code=end
sol = Solution()
print(sol.commonChars(["bella", "label", "roller"]))
print(sol.commonChars(["cool", "lock", "cook"]))
```

## 2022.7.16

```python
#
# @lc app=leetcode.cn id=67 lang=python3
#
# [67] 二进制求和
#

# @lc code=start
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        return bin(int(a, 2)+int(b, 2))[2:]
# @lc code=end
```

## 2022.7.15

```python
#
# @lc app=leetcode.cn id=434 lang=python3
#
# [434] 字符串中的单词数
#

# @lc code=start
class Solution:
    def countSegments(self, s: str) -> int:
        return len(s.split())
# @lc code=end
```

## 2022.7.14

```python
#
# @lc app=leetcode.cn id=628 lang=python3
#
# [628] 三个数的最大乘积
#

# @lc code=start
from functools import reduce
from typing import List


class Solution:
    def maximumProduct(self, nums: List[int]) -> int:
        mul = lambda n: reduce(lambda a, b: a*b, n)
        nums.sort()
        return max(mul(nums[-3:]), mul(nums[:2]+nums[-1:]))
# @lc code=end

sol = Solution()
print(sol.maximumProduct([1,2,3]))
print(sol.maximumProduct([1,2,3,4]))
print(sol.maximumProduct([-1,-2,-3,-4]))
print(sol.maximumProduct([-100,-98,-1,2,3,4]))
```

## 2022.7.12

```python
#
# @lc app=leetcode.cn id=169 lang=python3
#
# [169] 多数元素
#

# @lc code=start
from collections import Counter
from typing import List


class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        return Counter(nums).most_common(1)[0][0]
# @lc code=end

sol = Solution()
print(sol.majorityElement(nums = [3,2,3]))
print(sol.majorityElement(nums = [2,2,1,1,1,2,2]))
```

## 2022.7.11

```python
#
# @lc app=leetcode.cn id=1550 lang=python3
#
# [1550] 存在连续三个奇数的数组
#

# @lc code=start
from typing import List


class Solution:
    def threeConsecutiveOdds(self, arr: List[int]) -> bool:
        even = [0]
        for i in arr:
            if i % 2 == 0:
                even.append(0)
            else:
                even.append(even[-1] + 1)
        return any(filter(lambda i: i > 2, even))


# @lc code=end
sol = Solution()
print(sol.threeConsecutiveOdds(arr=[2, 6, 4, 1]))
print(sol.threeConsecutiveOdds(arr=[1, 2, 34, 3, 4, 5, 7, 23, 12]))
```

## 2022.7.10

```python
#
# @lc app=leetcode.cn id=412 lang=python3
#
# [412] Fizz Buzz
#

# @lc code=start
from typing import List


class Solution:
    def fizzBuzz(self, n: int) -> List[str]:
        return [
            "FizzBuzz"
            if i % 3 == 0 and i % 5 == 0
            else "Fizz"
            if i % 3 == 0
            else "Buzz"
            if i % 5 == 0
            else str(i)
            for i in range(1, n + 1)
        ]


# @lc code=end
sol = Solution()
print(sol.fizzBuzz(3))
print(sol.fizzBuzz(5))
print(sol.fizzBuzz(15))
```

## 2022.7.9

```python
#
# @lc app=leetcode.cn id=50 lang=python3
#
# [50] Pow(x, n)
#

# @lc code=start
class Solution:
    def myPow(self, x: float, n: int) -> float:
        return pow(x, n)
# @lc code=end
```

## 2022.7.8

```python
#
# @lc app=leetcode.cn id=326 lang=python3
#
# [326] 3 的幂
#

# @lc code=start
class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        return n > 0 and 1162261467 % n == 0


# @lc code=end

sol = Solution()
print(sol.isPowerOfThree(27))
print(sol.isPowerOfThree(0))
print(sol.isPowerOfThree(9))
print(sol.isPowerOfThree(45))
print(sol.isPowerOfThree(243))
```

## 2022.7.7

```python
#
# @lc app=leetcode.cn id=2283 lang=python3
#
# [2283] 判断一个数的数字计数是否等于数位的值
#

# @lc code=start


class Solution:
    def digitCount(self, num: str) -> bool:
        for i in range(min(len(num), 10)):
            if num.count(str(i)) != int(num[i]):
                return False
        return True


# @lc code=end

sol = Solution()
print(sol.digitCount("1210"))
print(sol.digitCount("030"))
```

## 2022.7.6

```python
#
# @lc app=leetcode.cn id=884 lang=python3
#
# [884] 两句话中的不常见单词
#

# @lc code=start
from collections import Counter
from typing import List


class Solution:
    def uncommonFromSentences(self, s1: str, s2: str) -> List[str]:
        no = [i for i, j in Counter(s1.split() + s2.split()).items() if j > 1]
        return list(set(s1.split()).symmetric_difference(set(s2.split())) - set(no))


# @lc code=end

sol = Solution()
print(sol.uncommonFromSentences(s1="this apple is sweet", s2="this apple is sour"))
print(sol.uncommonFromSentences(s1="apple apple", s2="banana"))
print(sol.uncommonFromSentences(s1="s z z z s", s2="s z ejt"))
```

## 2022.7.5

```python
#
# @lc app=leetcode.cn id=1051 lang=python3
#
# [1051] 高度检查器
#
from typing import List

# @lc code=start
class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        return sum(i != j for i, j in zip(heights, sorted(heights)))


# @lc code=end
sol = Solution()
print(sol.heightChecker([1,1,4,2,1,3]))
print(sol.heightChecker([5,1,2,3,4]))
print(sol.heightChecker([1,2,3,4,5]))
```

## 2022.7.4

```python
#
# @lc app=leetcode.cn id=263 lang=python3
#
# [263] 丑数
#

# @lc code=start
class Solution:
    def isUgly(self, n: int) -> bool:
        if n <= 0:
            return False
        while n > 1:
            canDivde = False

            for i in [2, 3, 5]:
                if n % i == 0:
                    n //= i
                    canDivde = True

            if not canDivde:
                return False
        return True


# @lc code=end

sol = Solution()
print(sol.isUgly(6))
print(sol.isUgly(1))
print(sol.isUgly(14))
print(sol.isUgly(-2147483648))

```

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
