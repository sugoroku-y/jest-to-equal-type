# jest-to-equal-type

TypeScriptでの型チェックを行う為だけのマッチャーです。

使用するにはソースファイルの先頭でimportしてください。

```ts
import 'jest-to-equal-type';
```

するとexpectのマッチャーとしてtoEqualTypeが使えるようになります。

```ts
test('typecheck', () => {
  expect(func()).toEqualType<{aaa: boolean; bbb: number}>();
})
```

コンパイラーでのチェックを行うためだけのものなので`@ts-expect-error`などでむりやり通してしまうと、本来エラーであってもエラーにならなくなるので注意してください。

```ts
// @ts-expect-error エラーでもむりやり通したら、実際にはテストしていないので失敗にはならない
expect(o).toEqualType<{ a: 2; c: 3 }>();
```

その性格上、`.not`は使えません。

```ts
// .not はサポートしていないので例外を投げる -> 失敗
expect(o).not.toEqualType<Readonly<{ a: 2; c: 3 }>>();
```
