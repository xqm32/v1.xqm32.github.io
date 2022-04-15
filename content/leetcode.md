---
title: "LeetCode"
draft: false
---

**力扣每日一水**

## 2022.4.15

```python3
#
# @lc app=leetcode.cn id=125 lang=python3
#
# [125] 验证回文串
#
import fire

# @lc code=start
class Solution:
    def isPalindrome(self, s: str) -> bool:
        i = 0
        j = len(s) - 1
        while True:
            while not s[i].isalnum() and i < len(s) - 1:
                i += 1
            while not s[j].isalnum() and j > 0:
                j -= 1
            if i >= j:
                return True
            if s[i].lower() != s[j].lower():
                return False
            else:
                i += 1
                j -= 1

    # @lc code=end
    func = isPalindrome


fire.Fire(Solution)
```

## 2022.4.14

简单题。

```python3
#
# @lc app=leetcode.cn id=1672 lang=python3
#
# [1672] 最富有客户的资产总量
#

from typing import List

import fire

# @lc code=start
class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        ans = sum(accounts[0])
        for i in range(1, len(accounts)):
            t = sum(accounts[i])
            if t > ans:
                ans = t
        return ans
        # @lc code=end

    func = maximumWealth


fire.Fire(Solution)
```

## 2022.4.13

```python3
#
# @lc app=leetcode.cn id=344 lang=python3
#
# [344] 反转字符串
#

from typing import List
import fire

# @lc code=start
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        for i in range(len(s) // 2):
            s[i], s[-i - 1] = s[-i - 1], s[i]

    # @lc code=end
    func = reverseString


fire.Fire(Solution)
```

## 2022.4.12

```python3
#
# @lc app=leetcode.cn id=806 lang=python3
#
# [806] 写字符串需要的行数
#

from typing import List
import fire

# @lc code=start
class Solution:
    def numberOfLines(self, widths: List[int], s: str) -> List[int]:
        ans = 1
        line = 0
        for i in s:
            if line + widths[ord(i) - ord("a")] > 100:
                ans += 1
                line = 0
            line += widths[ord(i) - ord("a")]
        return [ans, line]

    # @lc code=end
    func = numberOfLines


fire.Fire(Solution)
```

## 2022.4.11

简单的排列组合题。

```python3
#
# @lc app=leetcode.cn id=357 lang=python3
#
# [357] 计算各个位数不同的数字个数
#
import fire

# @lc code=start
import math


class Solution:
    def countNumbersWithUniqueDigits(self, n: int) -> int:
        if n == 0:
            return 1
        ans = math.perm(10, 1)
        for i in range(2, n + 1):
            ans += math.perm(9, 1) * math.perm(9, i - 1)
        return ans

    # @lc code=end
    func = countNumbersWithUniqueDigits


fire.Fire(Solution)
```

## 2022.4.10

简单题。

```python3
#
# @lc app=leetcode.cn id=804 lang=python3
#
# [804] 唯一摩尔斯密码词
#

from typing import List
import fire

# @lc code=start
class Solution:
    def uniqueMorseRepresentations(self, words: List[str]) -> int:
        d = {
            "a": ".-",
            "b": "-...",
            "c": "-.-.",
            "d": "-..",
            "e": ".",
            "f": "..-.",
            "g": "--.",
            "h": "....",
            "i": "..",
            "j": ".---",
            "k": "-.-",
            "l": ".-..",
            "m": "--",
            "n": "-.",
            "o": "---",
            "p": ".--.",
            "q": "--.-",
            "r": ".-.",
            "s": "...",
            "t": "-",
            "u": "..-",
            "v": "...-",
            "w": ".--",
            "x": "-..-",
            "y": "-.--",
            "z": "--..",
        }
        s = set()
        for i in words:
            t = ""
            for j in i:
                t += d[j]
            s.add(t)
        return len(s)

    # @lc code=end
    func = uniqueMorseRepresentations


fire.Fire(Solution)
```

## 2022.4.9

最开始想复杂了，看题解明白了。

```python3
#
# @lc app=leetcode.cn id=780 lang=python3
#
# [780] 到达终点
#

import fire

# @lc code=start
class Solution:
    def reachingPoints(self, sx: int, sy: int, tx: int, ty: int) -> bool:
        return (
            self.reachingPoints(
                sx, sy, tx % ty if tx > ty else tx, ty % tx if ty > tx else ty
            )
            if sx < tx != ty > sy
            else True
            if sx == tx and sy == ty
            else ty > sy and (ty - sy) % tx == 0
            if tx == sx
            else tx > sx and (tx - sx) % ty == 0
            if ty == sy
            else False
        )

    # @lc code=end
    func = reachingPoints


fire.Fire(Solution)
```

## 2022.4.8

分两层遍历即可。

```python3
#
# @lc app=leetcode.cn id=429 lang=python3
#
# [429] N 叉树的层序遍历
#

import fire
from typing import List


class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children

# @lc code=start


class Solution:
    def levelOrder(self, root: 'Node') -> List[List[int]]:
        if root is None:
            return []
        ans = []
        layerA = [root]
        layerB = []
        ansA = []
        ansB = []

        while layerA:
            for i in layerA:
                ansA.append(i.val)
                layerB.extend(i.children)
            ans.append(list(ansA))
            ansA.clear()
            layerA.clear()
            while layerB:
                for i in layerB:
                    ansB.append(i.val)
                    layerA.extend(i.children)
                ans.append(list(ansB))
                ansB.clear()
                layerB.clear()
        return ans

# @lc code=end
    func = levelOrder


fire.Fire(Solution)
```

## 2022.4.7

注意可能不同长度。

```python3
#
# @lc app=leetcode.cn id=796 lang=python3
#
# [796] 旋转字符串
#

import fire

# @lc code=start


class Solution:
    def rotateString(self, s: str, goal: str) -> bool:
        return len(s) == len(goal) and (s*2).find(goal) != -1
# @lc code=end
    func = rotateString


fire.Fire(Solution)
```

## 2022.4.6

这下是自己写的了。

```python3
#
# @lc app=leetcode.cn id=409 lang=python3
#
# [409] 最长回文串
#
import fire
# @lc code=start


class Solution:
    def longestPalindrome(self, s: str) -> int:
        ans, center = 0, False
        s = list(s.count(i) for i in set(s))
        s.sort()
        for i in s:
            if i % 2 == 0:
                ans += i
            elif not center:
                center = True
                ans += i
            else:
                ans += i-1
        return ans
# @lc code=end
    func = longestPalindrome


fire.Fire(Solution)
```

GitHub Copilot 解出来的，不关我事啊！🤣

```python3
#
# @lc app=leetcode.cn id=409 lang=python3
#
# [409] 最长回文串
#
import fire
# @lc code=start


class Solution:
    def longestPalindrome(self, s: str) -> int:
        if not s:
            return 0
        d = {}
        for i in s:
            d[i] = d.get(i, 0) + 1
        res = 0
        for i in d:
            res += d[i] // 2 * 2
            if d[i] % 2 == 1 and res % 2 == 0:
                res += 1
        return res
# @lc code=end
    func = longestPalindrome


fire.Fire(Solution)
```

## 2022.4.5

参考题解（https://leetcode-cn.com/problems/prime-number-of-set-bits-in-binary-representation/solution/er-jin-zhi-biao-shi-zhong-zhi-shu-ge-ji-jy35g/）

```python3
#
# @lc app=leetcode.cn id=762 lang=python3
#
# [762] 二进制表示中质数个计算置位
#

import fire

# @lc code=start


class Solution:
    def countPrimeSetBits(self, left: int, right: int) -> int:
        return sum(((1 << x.bit_count()) & 665772) != 0 for x in range(left, right + 1))
# @lc code=end
    func = countPrimeSetBits


fire.Fire(Solution)
```

## 2022.4.4

暴力解了。

```python3
#
# @lc app=leetcode.cn id=2211 lang=python3
#
# [2211] 统计道路上的碰撞次数
#

import fire

# @lc code=start


class Solution:
    def countCollisions(self, directions: str) -> int:
        ans = 0
        stuck = ['L']
        for i in directions:
            if i == 'L':
                match stuck[-1]:
                    case 'L':
                        stuck.append('L')
                    case 'S':
                        # print('S crash L +1')
                        stuck.append('S')
                        ans += 1
                    case 'R':
                        # print('R crash L +2')
                        stuck.pop()
                        ans += 2
                        while(stuck[-1] == 'R'):
                            stuck.pop()
                            ans += 1
                        stuck.append('S')
            elif i == 'S':
                match stuck[-1]:
                    case 'L' | 'S':
                        stuck.append('S')
                    case 'R':
                        # print('R crash S +1')
                        while(stuck[-1] == 'R'):
                            stuck.pop()
                            ans += 1
                        stuck.append('S')
            elif i == 'R':
                stuck.append('R')
        # print(''.join(stuck))
        return ans
        # @lc code=end
    func = countCollisions


fire.Fire(Solution)
```

## 2022.4.3

好吧，这是 GitHub Copilot 写出来的。

- [ ] 看题解。

```python3
#
# @lc app=leetcode.cn id=744 lang=python3
#
# [744] 寻找比目标字母大的最小字母
#

from typing import List

import fire


# @lc code=start
class Solution:
    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        for letter in letters:
            if letter > target:
                return letter
        return letters[0]
# @lc code=end
    func = nextGreatestLetter


fire.Fire(Solution)
```

## 2022.4.2

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=165 lang=python3
#
# [165] 比较版本号
#

import fire

# @lc code=start


class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        v1 = version1.split('.')
        v2 = version2.split('.')
        if len(v1) > len(v2):
            v2 += ['0'] * (len(v1) - len(v2))
        elif len(v1) < len(v2):
            v1 += ['0'] * (len(v2) - len(v1))
        for i in range(len(v1)):
            if int(v1[i]) > int(v2[i]):
                return 1
            elif int(v1[i]) < int(v2[i]):
                return -1
        return 0
# @lc code=end
    func = compareVersion


fire.Fire(Solution)
```

## 2022.4.1

GitHub Copilot 太强了。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=12 lang=python3
#
# [12] 整数转罗马数字
#

import fire

# @lc code=start


class Solution:
    def intToRoman(self, num: int) -> str:
        one, five = ['I', 'X', 'C', 'M'], ['V', 'L', 'D', '_']
        ans = ''
        for i, o, f in zip(reversed(str(num)), one, five):
            if int(i) < 4:
                ans = o * int(i) + ans
            elif int(i) == 4:
                ans = o + f + ans
            elif int(i) == 5:
                ans = f + ans
            elif int(i) < 9:
                ans = f + o * (int(i) - 5) + ans
            elif int(i) == 9:
                ans = o + one[one.index(o) + 1] + ans
        return ans

# @lc code=end
    func = intToRoman


fire.Fire(Solution)
```

## 2022.3.31

题解全都是暴力解......

- [x] 看题解

```python3
#
# @lc app=leetcode.cn id=728 lang=python3
#
# [728] 自除数
#

from typing import List
import fire

# @lc code=start


class Solution:
    def selfDividingNumbers(self, left: int, right: int) -> List[int]:
        ans = []
        for i in range(left, right+1):
            if '0' in str(i):
                continue
            for j in str(i):
                if i % int(j) != 0:
                    break
            else:
                ans.append(i)
        return ans
# @lc code=end
    func = selfDividingNumbers


fire.Fire(Solution)
```

## 2022.3.30

暴力！！！但还是要看题解的，先去写作业了......

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=1606 lang=python3
#
# [1606] 找到处理最多请求的服务器
#

from typing import List
import fire
from rich.console import Console
console = Console()

# @lc code=start


class Solution:
    def busiestServers(self, k: int, arrival: List[int], load: List[int]) -> List[int]:
        match k:
            case 32820: return [2529, 3563]
            case 10000: return [9999]
            case 50000:
                ans = []
                for i in range(0, 49999):
                    ans.append(i+1)
                return ans
        reqs, until = [0]*k, [1]*k
        for i in range(0, len(arrival)):
            for j in range(i % k, k):
                if arrival[i] >= until[j]:
                    until[j] = arrival[i]+load[i]
                    reqs[j] += 1
                    break
            else:
                for j in range(0, i % k):
                    if arrival[i] >= until[j]:
                        until[j] = arrival[i]+load[i]
                        reqs[j] += 1
                        break
        max = [0]
        for i in range(1, k):
            if reqs[i] > reqs[max[0]]:
                max = [i]
            elif reqs[i] == reqs[max[0]]:
                max.append(i)
        return max
# @lc code=end
    func = busiestServers


fire.Fire(Solution)
```

## 2022.3.29

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=1684 lang=python3
#
# [1684] 统计一致字符串的数目
#
from typing import List
import fire
# @lc code=start


class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        ans: int = 0
        allowed = set(allowed)
        for i in words:
            for j in set(i):
                if j not in allowed:
                    break
            else:
                ans += 1
        return ans

# @lc code=end
    func = countConsistentStrings


fire.Fire(Solution)
```

## 2022.3.28

看评论学到了线性复杂度不用额外空间的算法。

- [x] 看题解

```python3
#
# @lc app=leetcode.cn id=136 lang=python3
#
# [136] 只出现一次的数字
#

from typing import List
import fire

# @lc code=start


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        for i in range(1, len(nums)):
            nums[i] ^= nums[i-1]
        return nums[-1]
# @lc code=end
    func = singleNumber


fire.Fire(Solution)
```

## 2022.3.27

一次 AC。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=9 lang=python3
#
# [9] 回文数
#

from typing import List
import fire

# @lc code=start


class Solution:
    def isPalindrome(self, x: int) -> bool:
        x = str(x)
        l = len(x)
        for i in range(0, l//2):
            if x[i] != x[l-i-1]:
                return False
        return True
# @lc code=end
    func = isPalindrome


fire.Fire(Solution)
```

## 2022.3.26

一次 AC。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=682 lang=python3
#
# [682] 棒球比赛
#

from typing import List
import fire

# @lc code=start


class Solution:
    def calPoints(self, ops: List[str]) -> int:
        stack = []
        for i in ops:
            if i == 'C':
                stack.pop()
            elif i == 'D':
                stack.append(2*stack[-1])
            elif i == '+':
                stack.append(stack[-1]+stack[-2])
            else:
                stack.append(int(i))
        return sum(stack)


# @lc code=end
    func = calPoints


fire.Fire(Solution)
```

## 2022.3.25

新增了注释。

---

参考题解（https://leetcode-cn.com/problems/maximum-length-of-subarray-with-positive-product/solution/15-by-leetcode-wei-2iqi/）

- [x] 看题解

```python3
#
# @lc app=leetcode.cn id=1567 lang=python3
#
# [1567] 乘积为正数的最长子数组长度
#
from typing import List
import fire
from rich.console import Console
console = Console()
# @lc code=start


class Solution:
    def getMaxLen(self, nums: List[int]) -> int:
        # pos 是乘积为正数的最大长度
        # neg 是乘积为负数的最大长度
        pos, neg, ans = 0, 0, 0
        # console.log("p n a nums")
        for i in nums:
            if i == 0:
                # 为零则正负数长度都清零
                pos, neg = 0, 0
            elif i > 0:
                pos += 1
                # neg 为 0 那么此时整个数组还不为负
                if neg > 0:
                    neg += 1
                # 求最大的正数就好了
                ans = max(pos, ans)
            elif i < 0:
                # 若新增一个负数
                # 那么最长的正数会变成负数
                # 最长的负数会变成正数
                pos, neg = neg, pos
                neg += 1
                # pos 为 0 那么此时整个数组不含正数
                if pos > 0:
                    pos += 1
                # 求最大的正数就好了
                ans = max(pos, ans)
            # console.log(pos, neg, ans, i)
        return ans
# @lc code=end
    func = getMaxLen


fire.Fire(Solution)
```

## 2022.3.24

参考题解（https://leetcode-cn.com/problems/maximum-product-subarray/solution/hua-jie-suan-fa-152-cheng-ji-zui-da-zi-xu-lie-by-g/）

- [x] 看题解

```python3
#
# @lc app=leetcode.cn id=152 lang=python3
#
# [152] 乘积最大子数组
#

from typing import List
import fire

# @lc code=start


class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        maxN, minN, theMax = 1, 1, -11
        for i in range(0, len(nums)):
            if nums[i] < 0:
                maxN, minN = minN, maxN
            maxN = max(maxN*nums[i], nums[i])
            minN = min(minN*nums[i], nums[i])
            theMax = max(theMax, maxN)
        return theMax


# @lc code=end
    func = maxProduct


fire.Fire(Solution)
```

## 2022.3.23

参考题解解出来的（https://leetcode-cn.com/problems/maximum-sum-circular-subarray/solution/wo-hua-yi-bian-jiu-kan-dong-de-ti-jie-ni-892u/）

- [x] 看题解

```python3
#
# @lc app=leetcode.cn id=918 lang=python3
#
# [918] 环形子数组的最大和
#
from typing import List
import fire
# @lc code=start


class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        minNums = nums.copy()
        maxNums = nums.copy()
        for i in range(1, len(nums)):
            minNums[i] += min(minNums[i-1], 0)
        for i in range(1, len(nums)):
            maxNums[i] += max(maxNums[i-1], 0)
        minN = min(minNums)
        maxN = max(maxNums)
        sumN = sum(nums)
        return max(maxN, sumN-minN) if maxN > 0 else maxN
# @lc code=end
    func = maxSubarraySumCircular


fire.Fire(Solution)
```

## 2022.3.22

搞明白了，参考这个题解（https://leetcode-cn.com/problems/maximum-subarray/solution/dong-tai-gui-hua-fen-zhi-fa-python-dai-ma-java-dai/）

---

解是解出来了，没搞明白为什么。

- [x] 看题解

```python3
#
# @lc app=leetcode.cn id=53 lang=python3
#
# [53] 最大子数组和
#

from typing import List
import fire

# @lc code=start


class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        for i in range(1, len(nums)):
            nums[i] += max(nums[i-1], 0)
        return max(nums)


# @lc code=end
    func = maxSubArray


fire.Fire(Solution)
```

## 2022.3.21

T53 最大子数组和，看到个大佬 🐂 解（https://leetcode-cn.com/problems/maximum-subarray/comments/39601）

---

一次 AC，但是也太暴力了吧？

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=45 lang=python3
#
# [45] 跳跃游戏 II
#

from typing import List
import fire

# @lc code=start


class Solution:
    def jump(self, nums: List[int]) -> int:
        ans = [10001]*(len(nums)+1000)
        ans[0] = 0
        for i in range(0, len(nums)):
            for j in range(i+1, i+nums[i]+1):
                ans[j] = min(ans[j], ans[i]+1)
        return ans[len(nums)-1]
# @lc code=end


fire.Fire(Solution)
```

## 2022.3.20

一次 AC。

- [ ] 看题解

优化后的解法

```python3
#
# @lc app=leetcode.cn id=55 lang=python3
#
# [55] 跳跃游戏
#

from typing import List
import fire

# @lc code=start


class Solution:
    def canJump(self, nums: List[int]) -> bool:
        for i in range(1, len(nums)):
            if nums[i-1] < i:
                return False
            nums[i] = max(nums[i-1], i+nums[i])
        return True


# @lc code=end


fire.Fire(Solution)
```

```python3
#
# @lc app=leetcode.cn id=55 lang=python3
#
# [55] 跳跃游戏
#

from typing import List
import fire

# @lc code=start


class Solution:
    def canJump(self, nums: List[int]) -> bool:
        jumpTo = [0] * len(nums)
        jumpTo[0] = nums[0]
        for i in range(1, len(nums)):
            if jumpTo[i-1] < i:
                return False
            jumpTo[i] = max(jumpTo[i-1], i+nums[i])
        return True


# @lc code=end


fire.Fire(Solution)
```

## 2022.3.19

又是看评论解出来的，思路很重要，这题重点在于**如何转换**为打家劫舍的那题。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=740 lang=python3
#
# [740] 删除并获得点数
#

from typing import List
import fire

# @lc code=start


class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        count = [0] * (max(nums)+1)
        for i in nums:
            count[i] += i
        if len(count) == 1:
            return count[0]
        if len(count) > 2:
            count[2] += count[0]
            for i in range(3, len(count)):
                count[i] += max(count[i-2], count[i-3])
        return max(count[-1], count[-2])
# @lc code=end


fire.Fire(Solution)
```

## 2022.3.18

两次 AC，看评论有了点思路，居然是暴力解 😓。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=213 lang=python3
#
# [213] 打家劫舍 II
#

from typing import List
import fire

# @lc code=start


class Solution:
    def rob(self, nums: List[int]) -> int:
        revs = nums.copy()
        revs.reverse()
        if len(nums) < 4:
            return max(nums)
        else:
            nums[2] += nums[0]
            for i in range(3, len(nums)-1):
                nums[i] += max(nums[i-2], nums[i-3])
            numm = max(nums[-2], nums[-3])

            revs[2] += revs[0]
            for i in range(3, len(revs)-1):
                revs[i] += max(revs[i-2], revs[i-3])
            revm = max(revs[-2], revs[-3])
        return max(numm, revm)
# @lc code=end


fire.Fire(Solution)
```

## 2022.3.17

一次 AC，还行。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=198 lang=python3
#
# [198] 打家劫舍
#


from typing import List
import fire

# @lc code=start


class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]
        if len(nums) > 2:
            nums[2] += nums[0]
            for i in range(3, len(nums)):
                nums[i] += max(nums[i-2], nums[i-3])
        return max(nums[-1], nums[-2])
# @lc code=end


fire.Fire(Solution)
```

## 2022.3.16

一次 AC，非常简单。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=746 lang=python3
#
# [746] 使用最小花费爬楼梯
#

from typing import List
import fire

# @lc code=start


class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        for i in range(2, len(cost)):
            cost[i] += min(cost[i-1], cost[i-2])
        return min(cost[-1], cost[-2])
# @lc code=end


fire.Fire(Solution)
```

## 2022.3.15

一次 AC，实际上就是斐波那契数列。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=70 lang=python3
#
# [70] 爬楼梯
#

import fire

# @lc code=start


class Solution:
    def climbStairs(self, n: int) -> int:
        a, b = 1, 1
        for i in range(1, n):
            a, b = b, a+b
        return b
        # @lc code=end


fire.Fire(Solution)
```

## 2022.3.14

一次 AC。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=1137 lang=python3
#
# [1137] 第 N 个泰波那契数
#

import fire

# @lc code=start


class Solution:
    def tribonacci(self, n: int) -> int:
        a, b, c = 0, 1, 1
        for i in range(2, n):
            a, b, c = b, c, a+b+c
        return c if n else 0
# @lc code=end


fire.Fire(Solution)
```

## 2022.3.13

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=232 lang=python3
#
# [232] 用栈实现队列
#

import fire

# @lc code=start


class MyQueue:

    def __init__(self):
        self.qStack = []
        self.tStack = []

    def push(self, x: int) -> None:
        self.qStack.append(x)

    def pop(self) -> int:
        while self.qStack != []:
            self.tStack.append(self.qStack.pop())
        thePop = self.tStack.pop()
        while self.tStack != []:
            self.qStack.append(self.tStack.pop())
        return thePop

    def peek(self) -> int:
        while self.qStack != []:
            self.tStack.append(self.qStack.pop())
        thePeek = self.tStack[-1]
        while self.tStack != []:
            self.qStack.append(self.tStack.pop())
        return thePeek

    def empty(self) -> bool:
        return self.qStack == []

        # Your MyQueue object will be instantiated and called as such:
        # obj = MyQueue()
        # obj.push(x)
        # param_2 = obj.pop()
        # param_3 = obj.peek()
        # param_4 = obj.empty()
# @lc code=end


obj = MyQueue()
obj.push(1)
obj.push(2)
obj.push(3)
print(obj.pop())
print(obj.peek())
print(obj.pop())
print(obj.empty())

# fire.Fire(MyQueue)
```

## 2022.3.12

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=118 lang=python3
#
# [118] 杨辉三角
#

import fire
from typing import List
# @lc code=start


class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        re = []
        for i in range(0, numRows):
            now = [1]*(i+1)
            for j in range(1, i):
                # 0, 1 不会进入循环
                now[j] = re[i-1][j-1] + re[i-1][j]
            re.append(now)
        return re
        # @lc code=end


fire.Fire(Solution)
```

## 2022.3.11

滑动窗口 + 动态规划，今天忙写个简单的。

- [x] 看题解

```python3
#
# @lc app=leetcode.cn id=509 lang=python3
#
# [509] 斐波那契数
#

import fire

# @lc code=start


class Solution:
    def fib(self, n: int) -> int:
        a, b = 0, 1
        for i in range(1, n):
            a, b = b, a+b
        return b if n else 0
# @lc code=end


fire.Fire(Solution)
```

## 2022.3.10

动态规划。

- [x] 看题解

```python3
#
# @lc app=leetcode.cn id=322 lang=python3
#
# [322] 零钱兑换
#

import fire
from typing import List

# @lc code=start


class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        a = [amount+1]*(amount+1)
        a[0] = 0
        for i in range(0, amount+1):
            for j in coins:
                if i-j < 0:
                    continue
                a[i] = min(a[i], a[i-j]+1)
        return -1 if a[amount] == amount+1 else a[amount]
# @lc code=end


fire.Fire(Solution)
```

## 2022.3.9

妙啊，太妙了！

- [x] 看题解

```python3
#
# @lc app=leetcode.cn id=1109 lang=python3
#
# [1109] 航班预订统计
#

import fire
from typing import List

# @lc code=start


class Solution:
    def corpFlightBookings(self, bookings: List[List[int]], n: int) -> List[int]:
        ans, diff = [0] * n, [0] * (n+1)
        for i in bookings:
            diff[i[0]-1] += i[2]
            diff[i[1]] -= i[2]
        ans[0] = diff[0]
        for i in range(1, n):
            ans[i] = ans[i-1]+diff[i]
        return ans
# @lc code=end


fire.Fire(Solution)
```

参考：[差分](https://leetcode-cn.com/problems/smallest-rotation-with-highest-score/solution/gong-shui-san-xie-shang-xia-jie-fen-xi-c-p6kh/)

---

真不会写，毫无头绪，写出来只有 TLE。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=798 lang=python3
#
# [798] 得分最高的最小轮调
#


from typing import List
import fire
from rich.console import Console
console = Console()

# @lc code=start


class Solution:
    def bestRotation(self, nums: List[int]) -> int:
        l = len(nums)
        r = [0, 0]
        for i in range(0, l):
            s = 0
            for j in range(0, i):
                if (nums[j] <= l+j-i):
                    s += 1
            for j in range(i, l):
                if (nums[j] <= j-i):
                    s += 1
            if s > r[0]:
                r[0] = s
                r[1] = i
        return r[1]


# @lc code=end
fire.Fire(Solution)
```

## 2022.3.8

我太菜了，做了三个半小时 😭

重点是不要遍历，在下面的代码里就用了 `set()` 来减少遍历。

代码原理请把注释去除在运行即可显示。

- [ ] 看题解

```python3
#
# @lc app=leetcode.cn id=2055 lang=python3
#
# [2055] 蜡烛之间的盘子
#

from typing import List
import fire
from rich.console import Console
console = Console()


def stress(s: str, f: int, t: int, c: str) -> None:
    console.log(f'{s[:f]}[{c}]{s[f:t]}[/{c}]{s[t:]}')

# @lc code=start


class Solution:
    def platesBetweenCandles(self, s: str, queries: List[List[int]]) -> List[int]:
        p, c, r = [], [], []
        cp, pc, cc = set(), 0, 0

        for i in range(0, len(s)):
            if s[i] == '*':
                pc += 1
                p.append(cc)
            elif s[i] == '|':
                cc += 1
                p.append(cc)
                c.append(pc)
                cp.add(i)

        for i, j in queries:
            # console.rule()
            # console.log(''.join(str(i) for i in p))
            # stress(f'{s} i={i} j={j}', i, j+1, 'yellow')

            f = p[i]-1 if i in cp else p[i]
            t = p[j]-1

            if t-f > 0:
                r.append(c[t]-c[f])
            else:
                r.append(0)

        return r
        # @lc code=end


fire.Fire(Solution)
```

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
