# ABC086Cのユースケース

https://atcoder.jp/contests/abs/tasks/arc089_a

## 正常系
1. AtCoderは入力値をシステムに渡す
1. システムは入力値を読み込む
1. システムは入力値をパースして、旅行プランを作成する
1. システムは旅行プランを使って、その旅行プランが実行可能か判定する
1. システムは旅行プランが実行可能な場合Yes、実行不可能な場合Noを出力する

### 旅行プラン
* 訪問地点のリストを持つ
* 旅行プランが実現可能か判定することができる

### 訪問地点
* t, x, y を持つ
* 別の訪問地点を渡して、自身の訪問地点からその訪問地点まで移動できるか判定する機能を持つ

## 代替コース : 入力値のフォーマットが不正
1. システムは例外を投げて異常終了する
    * 不正の条件
        * 1行目が数字ではない、整数ではない、1より小さい、100000より大きい
        * 行数が1行目の数字+1未満
        * 2行目以降の各文字列を半角スペースで区切る
            * 要素数が3未満
            * 各要素数字ではない、整数ではない、1より小さい、100000より大きい
            * 先頭の要素の数字が、次の要素の数字以下


describe('旅行プラン', () => {
  describe('旅行プランが実現可能か判定する', () => {
    test.each([
      [new TravelPlan([new VisitPoint(1, 1, 0)]), true],
      [new TravelPlan([
        new VisitPoint(3, 1, 2),
        new VisitPoint(6, 1, 1)
      ]), true],
      [new TravelPlan([
        new VisitPoint(10, 10, 0),
        new VisitPoint(20, 10, 10),
        new VisitPoint(40, 20, 20)
      ]), true]
    ])('%oが実現可能かどうかの判定結果は%o', (travelPlan: TravelPlan, expected: boolean) => {
      const actual = travelPlan.canDo()
      expect(actual).toBe(expected)
    })
  })
})