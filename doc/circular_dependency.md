# 循环引用

[circular-dependency-plugin](https://github.com/aackerman/circular-dependency-plugin)

检查是否有循环引用

循环引用可能会引入一些奇怪的问题

尽量不要出现这种问题

```ts
A.ts
import B form 'B.ts'

B.ts
import A form 'A.ts'
```
