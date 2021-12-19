import '../src';

describe('toBeType', () => {
  test('match', () => {
    expect(undefined).toBeType<undefined>();
    expect(null).toBeType<null>();
    expect(true).toBeType<boolean>();
    expect(false).toBeType<boolean>();
    expect(0).toBeType<number>();
    expect(-0).toBeType<number>();
    expect(NaN).toBeType<number>();
    expect(1).toBeType<number>();
    expect(1e-5).toBeType<number>();
    expect('').toBeType<string>();
    expect('abc').toBeType<string>();
    // 空配列は型アサーションを付けないとnever[]になる
    expect([]).toBeType<never[]>();
    expect([undefined]).toBeType<undefined[]>();
    expect([null]).toBeType<null[]>();
    expect([true]).toBeType<boolean[]>();
    expect([false]).toBeType<boolean[]>();
    expect([0]).toBeType<number[]>();
    expect([-0]).toBeType<number[]>();
    expect([NaN]).toBeType<number[]>();
    expect([1]).toBeType<number[]>();
    expect([1e-5]).toBeType<number[]>();
    expect(['']).toBeType<string[]>();
    expect(['abc']).toBeType<string[]>();
    // 空オブジェクト`{}`をそのまま使うとeslintの警告が出るのでRecord<never, unknown>を使う
    expect({}).toBeType<Record<never, never>>();
    expect({ aaa: true }).toBeType<{ aaa: boolean }>();
    expect(true as const).toBeType<true>();
    expect(false as const).toBeType<false>();
    expect(0 as const).toBeType<0>();
    expect(-0 as const).toBeType<-0>();
    expect(1 as const).toBeType<1>();
    expect(1e-5 as const).toBeType<1e-5>();
    expect('' as const).toBeType<''>();
    expect('abc' as const).toBeType<'abc'>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([] as const).toBeType<[]>();
    expect([] as const).toBeType<readonly []>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([undefined] as const).toBeType<[undefined]>();
    expect([undefined] as const).toBeType<readonly [undefined]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([null] as const).toBeType<[null]>();
    expect([null] as const).toBeType<readonly [null]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([true] as const).toBeType<[true]>();
    expect([true] as const).toBeType<readonly [true]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([false] as const).toBeType<[false]>();
    expect([false] as const).toBeType<readonly [false]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([0] as const).toBeType<[0]>();
    expect([0] as const).toBeType<readonly [0]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([-0] as const).toBeType<[-0]>();
    expect([-0] as const).toBeType<readonly [-0]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([NaN] as const).toBeType<[number]>();
    expect([NaN] as const).toBeType<readonly [number]>(); // NaNはリテラル型にならない
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([1] as const).toBeType<[1]>();
    expect([1] as const).toBeType<readonly [1]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([1e-5] as const).toBeType<[1e-5]>();
    expect([1e-5] as const).toBeType<readonly [1e-5]>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect([''] as const).toBeType<['']>();
    expect([''] as const).toBeType<readonly ['']>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect(['abc'] as const).toBeType<['abc']>();
    expect(['abc'] as const).toBeType<readonly ['abc']>();
    // プロパティがないのでreadonlyが有ってなくても同じ
    expect({} as const).toBeType<Record<never, never>>();
    expect({} as const).toBeType<Readonly<Record<never, never>>>();
    // @ts-expect-error as constを付けているのでreadonlyがないとエラー
    expect({ aaa: true } as const).toBeType<{ aaa: true }>();
    expect({ aaa: true } as const).toBeType<Readonly<{ aaa: true }>>();
  });

  test('ts-expect-error ', () => {
    // @ts-expect-error などで無理矢理コンパイルが通るようにするとテストは成功してしまう。
    expect(null).toBeType<undefined>();
  });

  test('.not unsupported', () => {
    expect(() => {
      expect(null).not.toBeType<null>();
    }).toThrow('.not.toBeType is unsupported');
  });
});
