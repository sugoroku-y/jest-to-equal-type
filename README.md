# jest-to-equal-type

TypeScriptでの型チェックを行う為だけのマッチャーです。

```ts
test('typecheck', () => {
  expect(func()).toEqualType<{aaa: boolean; bbb: number}>();
})
```

その性格上、`.not`は使えません。(使うと例外を投げます)
