/**
 * AとBが型として一致するかどうかを判定する。
 */
type Equal<A, B> = (<T>(a: A) => T extends A ? 1 : 2) extends <T>(
  a: B,
) => T extends B ? 1 : 2
  ? true
  : false;

expect.extend({
  toBeType: function (this: jest.MatcherContext): jest.CustomMatcherResult {
    if (this.isNot) {
      // このマッチャーの性格上、`.not`は使用不可
      throw new Error('.not.toBeType is unsupported');
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
       * expectで指定したインスタンスの型とSで指定した型が一致するか、確認するためのマッチャー。
       *
       * 実際のテストは実行しないので、`.not`は使用不可。
       */
      toBeType<S>(
        ...args: Equal<S, T> extends true
          ? []
          : // SとTが一致しなければエラーになるように実際には引数として指定できない、配列と文字列の交差型にする
            [] & '型が一致していません'
      ): R;
    }
  }
}

export {};
