# Deno にコントリビュートする

本章では Deno 本体にコントリビュートするための方法を説明します.

目次

- Deno をビルドする
  - 準備
    - rust インストール
    - python インストール
    - node インストール
  - ビルドの全体像
  - ビルドする
  - テストを実行する
- ディレクトリ構造
  - core
  - core/libdeno
  - cli
  - js
  - tools
  - third_party
  - tests
  - website
  - v8 関連
- 課題を見つける
  - マニュアルを読む
  - TODO コメントを探す
  - Issue を探す
  - API の提案
- PR の投げ方
  - テストを実装する
  - コードフォーマットをする
  - リントチェックをする
  - PR を送る
  - CI を見る
- その他のコントリビュートの仕方
  - アイコンを作る
  - 記事を書く
    - コードリーディング
      - mizchi
      - bokuweb
      - leko
    - ベンチマーク
      - alexhultman

# Deno をビルドする

Deno 本体にコントリビュートするためには Deno 自体をビルドすることが入り口になります. 本節では Deno をビルドする方法を解説していきます.

## 準備

Mac, Windows 共通で以下のソフトウェアがインストールされている必要があります.

- rust 1.31.1 以上
- python 2.7.x (3.x ではビルドできません!)
- node.js 10.x 以上

上に加えて Mac の場合

- XCode がインストールされていること

Windows の場合

- VS Community 2017 with "Desktop development with C++" toolkit がインストールされていること

が必要になります.

### Rust のインストール

rustup を使います.

```
curl https://sh.rustup.rs | sh
```

### Python のインストール

Mac の場合はすでにインストールされています.

Windows の場合は...

```

```

### Node.js のインストール

nvm / nodist などのバージョンマネージャからインストールしましょう.

## ビルドの全体像

Deno のビルドは複数のビルドツールの階層構造によって成り立っています.

ビルドの最も外側は cargo コマンドです. cargo が内部的に GN というビルドツールを叩きます. GN は Ninja というさらに内部の底レイヤーのビルドツールを介して, V8 のビルド, JS 関連のビルドなど, rust 以外の全ての部品のビルドを行います. JS 関連のビルドには内部的に TypeScript コンパイラーと rollup が使われています. ほとんどの部品を GN/Ninja が生成した上で最終的に, rust crate の依存解決と rust ソースコードのビルド, さらにはそれら全体のリンクを cargo が行います. 以上のプロセスの結果として単体実行ファイルの `deno` が生成されます. deno の実行には, この `deno` 実行ファイル1個だけが必要であり, その他には何も必要ありません (正確には glibc の shared object などは必要になりますが, 通常の OS 環境では意識する必要はありません. docker などを使って scratch 環境や alpine 環境で deno を実行したい場合には, この辺の依存関係も考慮する必要があります.)

## ビルドする

まずはリポジトリをクローンしましょう.

```
git clone https://github.com/denoland/deno.git
cd deno
```

Deno は git の submodule という仕組みを使っているので, submodule をアップデートしましょう

```
git submodule update --init
```

上のコマンドで `third_party` という Deno をビルドするためのサードパーティ依存全体を含んだレポジトリと `deno_std` という Deno の標準ライブラリが含まれたレポジトリがチェックアウトされます.

サブモジュールのインストールが終わったら, 次のコマンドでビルド用の準備ファイルを生成します (初回実行時のみネットワークアクセスが必要です).

```
./tools/setup.py
```

このコマンドで, 必要なバイナリ依存ファイルがダウンロードされたり, ビルド設定の ninja ファイルなどが `//target/` ディレクトリ以下に生成されます.

セットアップが完了したら, 次のコマンドで Deno をビルドしましょう.

```
./tools/build.py
```

上のコマンドは初回だと, 数分 ~ 数十分程度かかります. 2 回目以降は, 修正箇所にもよりますが, かなり短縮されます(数秒 ~ 数十秒程度).

ビルドコマンドが成功すると `//target/debug/deno` というパスにビルドされた deno コマンドが生成されます. コマンドを叩いて動作を確認してみましょう.

```console
$ ./target/debug/deno -h
deno: 0.3.7
v8: 7.4.238
typescript: 3.4.1
```

上のように出力されれば, ビルドが成功しています.

## テストを実行する

下のコマンドでテストが実行されます.

```console
./tools/test.py
```

テストの実行にはネットワークアクセスが必要になります. (これは一部のテストがネットワークアクセスを必要としているためです.) テストの実行には数分程度の時間がかかります.

## コードをフォーマットする

下のコマンドでコードのフォーマット(整形)が実行されます.

```
./tools/format.py
```

上の 1 コマンドで GN, Python, C++, Rust, TypeScript, JavaScript 6 言語のフォーマットが全て実行されます.

## リントを実行する

下のコマンドでリントが実行されます.

```
./tools/lint.py
```

上のコマンドで Python, C++, TypeScript, JavaScript のリントが実行されます. 上のコマンドには Rust のリントが含まれておらず, Rust のリントが自動化出来ていないことは残課題の 1 つです. Issue #

# ディレクトリ構造

この節では Deno 本体のディレクトリ構造を解説していきます.

## core

## core/libdeno

## cli

## js

## tools

# 課題の探し方

ここまでで, Deno の開発をする準備がかなり整ってきました.

ではここからは, どうやって実際にコントリビュートする課題を見つけるかを考えてみましょう.

```
探し方:
- マニュアルを読む (typo 探し)
- TODO コメントを探す
- issue を漁る (着手不可能なものも多い)
- 機能追加. 足りない API を見つける
- 機能追加. node の定番モジュールで deno_std に入っていないものを見つける
- web 標準準拠作業
- greenkeeping: package.json のアップデート

メタ探し方:
- なんでも良いので deno でコードを書く
- deno でまだ誰もやろうとしていないことをする
```

## マニュアルを読む (typo 探し)

マニュアルを読むことには 2 つの利点があります. 1 つは間違いを見つければそれを修正してコントリビュートすることができます. もう 1 つはさらに先のコントリビュートをするためのアイデアが浮かぶ可能性があります.

Deno の公式マニュアルは `https://deno.land/manual.html` にあります. Deno の目的から, インストール方法, 各種機能の説明から, 内部構造の解説まで含んだかなり力の入ったマニュアルになっています. (大部分は作者のライアンダールが書いています)

他に, 以下のような公式ドキュメントがあります.

- スタイルガイド: https://deno.land/style_guide.html
  - Deno の内部, および標準ライブラリ (deno_std) が従うべきコーディングスタイルを記述したドキュメント.
- ベンチマーク表: https://deno.land/benchmarks.html
  - Deno の各種ドキュメントを表示するページ.
- リリースノート: Releases.md
- API ドキュメント:
- 標準ライブラリのドキュメント: https://github.com/denoland/deno_std 以下の各ディレクトリ内の README

これらをきちんと読んでいけば必ず数回は typo 修正のコントリビュートが出来るでしょう.

## TODO コメントを探す

ドキュメント以外で一番コントリビュートしやすい課題は TODO コメントだと思います. TODO コメントとは以下のような形式で, そのソースコードの場所で, その箇所の作者がやり残したことをコメントで残す記法です.

```
TODO(ry): 例
```

Deno では以上のように, TODO(アカウント名) の様に誰が残した TODO なのかを明示するルールがあります. (TODO(#12345) のように issue 番号を記載しても良いことになっていますが, あまり使われていません. なお, このような TODO(アカウント名) という記法は Google で一般的に使われているルールのようです. V8 のソースコードを見ると同様の記法の TODO コメントが沢山見つかります.)

Deno のソースコードの中にはかなり多くの TODO コメントが残されています. 中にはかなり難しい内容の TODO コメントもありますが, 探せば簡単な TODO コメントもたくさん見つかるはずです.

米: TODO の例を載せる.

## Issue を漁る

Issue はコントリビュート課題を見つけるための最も基本的な方法です. ただし, Deno レポジトリの場合 issue で立っている課題は大部分はかなり難しい課題が多いため, うまくコントリビュートしやすい issue を見つけることが大事です.

## API を提案する

Deno はまだまだ発展途上のソフトウェアです. API や標準モジュールはまだまだ万全というには程遠い状態のため, 新しい API や機能を追加する余地が沢山残されています.

例えば Node.js の API で利用頻度が高いもので Deno にまだ移植されていないものを移植したい, という様な提案は通る可能性はかなり高いです. Node にあって Deno にないものを探しましょう!

ただし, 注意点があります. Node の API のうちで, 後にその機能とオーバーラップする様な Web 標準が出来た機能の場合は Web 標準の方が選択される傾向にあります. (米: 例をかく)

上の様なポリシーがあるため Web 標準の API でまだ Deno にないものを追加したいという様な提案もまたかなり通る可能性が高いです. MDN などで Web 標準を眺めつつ Deno にあるかどうかをチェックしていって, 無ければそれを提案してみましょう! また Web 標準 API が実装されているが, 挙動が違うという様な場合も修正を提案しましょう!

### deno_std への提案

deno_std は Deno の標準ライブラリです. こちらへの API 追加の提案の場合はさらに幅が広がってきます.

Node.js はスモールコアという思想があり, Node.js が API として提供する範囲は限りなく狭く限定的にするというポリシーを持っていました (最近は若干そのポリシーが揺れている様ですが). したがって, Node.js では API として提供される機能はかなり限定的で, それ以外は全て npm に委譲するという方針がとられています. そのため, ほとんどの言語において標準ライブラリの機能として含まれる様な機能でも, Node.js では 3rd party ライブラリとして提供されるという状況がありました.

Deno も `Deno` namespace に持つ API はかなり限定的にするという意味ではスモールコアという思想は継承しているものの, それとは別に標準ライブラリを持つという点で, Node.js とは大きく異なっています.

`deno_std` は Go 言語の標準モジュールと同様の範囲をカバーすることを目標としています. (Deno は言語としてのデザインのかなりの部分で Go 言語の影響を受けています) したがって, `deno_std` では Go 言語の標準モジュールにあって Deno にまだない様なものの提案は受け入れられる可能性がかなり高いです. Go の標準モジュールを眺めて, Deno に無いものを発見したらそれを提案・実装してみましょう!

# PR の投げ方

この節では, 修正が作れた時に, それを PR として投げる時の注意点を説明します.

## テストを実行する

当たり前ですが, テストが通らないと PR が受け入れられることはありません. 必ずテストを実行して, 通ることを確認しましょう.

Deno のテストは以下のコマンドで実行できます.

```sh
python ./tools/test.py
```

Linux / Mac の場合は:

```sh
./tools/test.py
```

でも実行できます.

## コードをフォーマットする

Deno の CI ではコードのフォーマットをしていないと, エラーになる様になっています. なので, 必ずコードのフォーマットをしてから PR を送りましょう.

以下のコマンドでコードのフォーマットを実行することが出来ます.

```sh
python ./tools/format.py
```

## リントチェックをする

Deno の CI ではリントチェック(細かいコーディングスタイルのチェック)も自動で行なっていて, チェックが通らなければビルドエラーになります. リントチェックも通してから PR を送りましょう.

以下のコマンドでリントチェックが行えます.

```sh
python ./tools/lint.py
```

## PR を送る

以上のチェックが全て通ったら PR を送りましょう. Deno ではコミットコメントや, PR の説明文についての形式的なルールは特にありません. 自由に説明を書いて送りましょう.

何を書けば良いかわからない場合は, Deno に限らず一般的な話ですが, 以下の様なフォーマットで説明を考えてみましょう.

その PR で何が変わるか:

```
This PR changes <変わることを書く>
```

そのために何をしたのか:

```
I introduced <導入したもの(あれば)>
```

もしその PR で解決される issue があれば `close #issue番号` と付けると, close ボタンを手で押す手間が省けて便利になります.

```
close #12345
```

## CI を見る

PR を送った後は CI が通るかどうかをチェックしましょう. CI は 10 分 ~ 15 分程度で結果が返ってきます. Deno では, Linux, Mac, Windows 環境で CI を回しているため, 自分の環境でテストが通っていても別の環境で落ちるという様なケースがたまにあります. 別環境でテストが落ちてしまった場合は, CI のログを参考にして追加で修正を入れていきましょう!

### Flaky なテストについて

大きなソフトウェアでは必ず起きることですが, ソフトウェアが正しく修正されていて, テストコードも正しく修正されている場合でも, 一定の確率で CI 環境でテストが失敗してしまうことがあります. この様な状況はフレイキー(flaky, 不安定)と言われます. Deno の CI はそこまで Flaky ではないことが多いですが, タイミングによっては flaky なテストがコードに混ざってしまい, 自分の修正と関係ない理由で CI が落ちるということが, そこそこの確率で起こることがあります. flaky 原因で CI が落ちていると思われる場合は, `git commit --amend` の様なコマンドを使ってコミットハッシュを書き換えてブランチを force push して CI を再度回してみるのも良いでしょう. あまりにも flaky さがひどい場合は, テストの失敗は自分の修正が原因ではないことを PR のコメント欄で主張しましょう. 主張が通れば, メンテナーが flaky なテストを無効化してくれるはずです.