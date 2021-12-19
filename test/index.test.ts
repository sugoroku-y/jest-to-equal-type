import '../src';

describe('toEqualType', () => {
  test('match', () => {
    expect(undefined).toEqualType<undefined>();
    expect(null).toEqualType<null>();
    expect(true).toEqualType<boolean>();
    expect(false).toEqualType<boolean>();
    expect(0).toEqualType<number>();
    expect(-0).toEqualType<number>();
    expect(NaN).toEqualType<number>();
    expect(1).toEqualType<number>();
    expect(1e-5).toEqualType<number>();
    expect('').toEqualType<string>();
    expect('abc').toEqualType<string>();
    // 空配列は型アサーションを付けないとnever[]になる
    expect([]).toEqualType<never[]>();
    expect([undefined]).toEqualType<undefined[]>();
    expect([null]).toEqualType<null[]>();
    expect([true]).toEqualType<boolean[]>();
    expect([false]).toEqualType<boolean[]>();
    expect([0]).toEqualType<number[]>();
    expect([-0]).toEqualType<number[]>();
    expect([NaN]).toEqualType<number[]>();
    expect([1]).toEqualType<number[]>();
    expect([1e-5]).toEqualType<number[]>();
    expect(['']).toEqualType<string[]>();
    expect(['abc']).toEqualType<string[]>();
    // 空オブジェクト`{}`をそのまま使うとeslintの警告が出るのでRecord<never, unknown>を使う
    expect({}).toEqualType<Record<never, never>>();
    expect({ aaa: true }).toEqualType<{ aaa: boolean }>();
    expect(true as const).toEqualType<true>();
    expect(false as const).toEqualType<false>();
    expect(0 as const).toEqualType<0>();
    expect(-0 as const).toEqualType<-0>();
    expect(1 as const).toEqualType<1>();
    expect(1e-5 as const).toEqualType<1e-5>();
    expect('' as const).toEqualType<''>();
    expect('abc' as const).toEqualType<'abc'>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([] as const).toEqualType<[]>();
    expect([] as const).toEqualType<readonly []>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([undefined] as const).toEqualType<[undefined]>();
    expect([undefined] as const).toEqualType<readonly [undefined]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([null] as const).toEqualType<[null]>();
    expect([null] as const).toEqualType<readonly [null]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([true] as const).toEqualType<[true]>();
    expect([true] as const).toEqualType<readonly [true]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([false] as const).toEqualType<[false]>();
    expect([false] as const).toEqualType<readonly [false]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([0] as const).toEqualType<[0]>();
    expect([0] as const).toEqualType<readonly [0]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([-0] as const).toEqualType<[-0]>();
    expect([-0] as const).toEqualType<readonly [-0]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([NaN] as const).toEqualType<[number]>();
    expect([NaN] as const).toEqualType<readonly [number]>(); // NaNはリテラル型にならない
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([1] as const).toEqualType<[1]>();
    expect([1] as const).toEqualType<readonly [1]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([1e-5] as const).toEqualType<[1e-5]>();
    expect([1e-5] as const).toEqualType<readonly [1e-5]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([''] as const).toEqualType<['']>();
    expect([''] as const).toEqualType<readonly ['']>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect(['abc'] as const).toEqualType<['abc']>();
    expect(['abc'] as const).toEqualType<readonly ['abc']>();
    // プロパティがないのでreadonlyが有ってなくても同じ
    expect({} as const).toEqualType<Record<never, never>>();
    expect({} as const).toEqualType<Readonly<Record<never, never>>>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect({ aaa: true } as const).toEqualType<{ aaa: true }>();
    expect({ aaa: true } as const).toEqualType<Readonly<{ aaa: true }>>();
  });

  test('ts-expect-error ', () => {
    // @ts-expect-error などで無理矢理コンパイルが通るようにするとテストは成功してしまう。
    expect(null).toEqualType<undefined>();
  });

  test('.not unsupported', () => {
    expect(() => {
      expect(null).not.toEqualType<null>();
    }).toThrow('.not.toEqualType is unsupported');
  });
});
