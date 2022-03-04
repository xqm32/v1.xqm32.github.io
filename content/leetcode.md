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
