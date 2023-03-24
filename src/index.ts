/**
 * AとBが型として一致するかどうかを判定する。
 */
type Equal<A, B> = (<T>(a: A) => T extends A ? 1 : 2) extends <T>(
  a: B,
) => T extends B ? 1 : 2
  ? true
  : false;

expect.extend({
  toEqualType: function (this: jest.MatcherContext): jest.CustomMatcherResult {
    if (this.isNot) {
      // このマッチャーの性格上、`.not`は使用不可
      throw new Error('.not.toEqualType is unsupported');
    }
    // 目的はTypeScriptでの型チェックなので実際のテストは行わない
    return { pass: true, message: () => '' };
  },
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R, T> {
      /**
       * expectで指定したインスタンスの型、もしくは関数の返値の型とSで指定した型が一致するか、確認するためのマッチャー。
       *
       * コンパイルが通るかどうかで確認するのが目的のため、実際のテスト実行時には何もしない。
       *
       * ただし、expectに渡されるインスタンスの生成には関知しない(関与できない)ため、生成までは実行されるので注意。
       *
       * 特定の関数の返値の型をテストしたい場合には関数を渡すことで、実際には実行されない関数の返値の型を確認できる。
       *
       * `.not.toEqualType`は使用不可。
       * @template S
       */
      toEqualType<S>(
        ...args: Equal<S, T extends () => infer RT ? RT : T> extends true
          ? []
          : // SとT、もしくはTの返値の型が一致しなければエラーになるように実際には引数として指定できない、配列とオブジェクトの交差型にする
            [] & {
              message: '型が一致していません';
              // 型を比較できるように並べる
              expected: S;
              received: T extends () => infer RT ? RT : T;
            }
      ): R;
    }
  }
}

export {};
