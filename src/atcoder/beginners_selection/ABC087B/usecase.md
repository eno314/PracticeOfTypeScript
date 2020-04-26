# ABC081Bのユースケース

https://atcoder.jp/contests/abs/tasks/abc087_b

## 正常系
1. AtCoderは入力値をシステムに渡す
1. システムは入力値を読み込む
1. システムは入力値をパースして、A,B,C,Xを取得する
1. 答えを算出方法する
    * 500円玉をA枚、100円玉をB枚、50円玉をC枚持っているとして、これらの硬貨の中から何枚かを選び、合計金額をちょうどX円にする方法が何通りかを求める
1. 答えを出力する

### 答えの算出方法
1. answerを0にする
1. iが0からAになるまでループする
    1. `i * 500` がXより大きくなったらループ終了
    1. jが0からBになるまでループする
        1. `A * 500 + B * 100` がXより大きくなったらループ終了
        1. kが0からCになるまでループする
            1. `A * 500 + B * 100 + C * 50` がXより大きくなったらループ終了
            1. `A * 500 + B * 100 + C * 50` がXと等しければanswerをインクリメントしてループ終了
            1. kをインクリメント
        1. jをインクリメント
    1. iをインクリメント
1. answerを返す


## 代替コース : 入力値のフォーマットが不正
1. システムは例外を投げて異常終了する
    * 不正の条件
        * 入力値の行数が4件未満
        * 各行の値が数字ではない

## 代替コース : 入力値が制約に合致しない
1. システムは例外を投げて異常終了する
    * 制約に合致しない条件
        * A, B, C, X が整数ではない
        * A, B, C, X が0より小さい
        * A, B, C　が50より大きい
        * X が 20000より大きい