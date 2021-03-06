# ABC083Bのユースケース

https://atcoder.jp/contests/abs/tasks/abc083_b

## 正常系
1. AtCoderは入力値をシステムに渡す
1. システムは入力値を読み込む
1. システムは入力値をパースして、N, A, B を生成する
1. システムは1以上N以下の整数のうち、10進法で各桁の和がA以上B以下である整数のリストを作成する
1. システムは整数リストの総和を求め、答えとする
1. 答えを出力する

## 代替コース : 入力値のフォーマットが不正
1. システムは例外を投げて異常終了する
    * 不正の条件
        * 入力値を半角スペースで分割して長さが3未満
        * 入力値を半角スペースで分割した各要素が数字ではない

## 代替コース : 入力値が制約に合致しない
1. システムは例外を投げて異常終了する
    * 制約に合致しない条件
        * N, A, B が整数ではない
        * Nが1未満、または10000より大きい
        * Aが1未満、または36より大きい
        * Bが1未満、または36より大きい
