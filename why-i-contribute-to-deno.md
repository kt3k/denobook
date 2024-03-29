# 私が Deno にコントリビュートする理由

2018 年 6 月の JSConf EU で Deno が初めて発表されてから 1 年が経ちました.

日本では 2018 年 12 月ごろから Deno の周辺で作業をする人が増え, 2019 年 1 月頃から定期的に Deno もくもく会 `#deno_ja` が開催されるようになりました.

`#deno_ja` では毎回, 冒頭で簡単な自己紹介をするのですが, よくよく聞いていると早く Deno を始めた人でも 12 月ぐらいの人が多いことに気づきました. 自分だけが Deno 公開直後の 5 月から[コントリビュート](https://github.com/denoland/deno/commits?author=kt3k)しています. そして, なぜその時期から Deno にコントリビュートしているのか, `#deno_ja` の中でも自分からあまり説明できていないことに気がつきました.

この記事は, なぜ自分がそこまで Deno にコントリビュートするのかの理由を出来る限り言語化してみる試みです.

# Deno の発見

自分が Deno に気づいたきっかけは GitHub のタイムラインです. 自分はライアン・ダールをフォローしていたので, @ry が deno というレポジトリをオープンソースにしたというメッセージがストリームに流れてきました. その頃自分はストリームは基本的に全て目を通していて, 面白そうなレポジトリが star されていないか, 面白そうなプロジェクトを始めた人がいないかを常に監視していました.

@ry がネット上から消えているというのは, reddit や quora で「ライアンてどこいっちゃったの?」という[スレッド](https://www.reddit.com/r/node/comments/2wpxyv/what_is_ryan_dahl_doing_these_days/)が定期的に立つほど有名な話で, 「TJ Holowaychuk て実在するの?」と同じぐらい JS 界隈でのミステリアスな話題の一つでした. そんな @ry が `deno` という短い名前の repository をオープンソースにしたというメッセージは自分にとってはそれだけで何か面白い現象に見えました. 中身を見てみると, `A JavaScript runtime using V8 6.8 and Go.` という文から始まる deno の機能リストが書かれていました. 説明の中で typo を見つけたので [PR で修正](https://github.com/denoland/deno/pull/2) を投げてみるとすぐにマージされました. @ry が GitHub 上で活動するつもりがあるらしい? その 3 日後 JSConf EU で Deno が[発表](https://www.youtube.com/watch?v=M3BM9TB-8yA)されました. そういうことか, と思いました.

# ライアン・ダール (@ry) について

自分がライアン・ダールを知ったのは Node.js について色々と調べていた時でした. Node.js は今は有名だけれど, そのソフトウェアはライアン・ダールという人物によって作られたらしい. 作者を知ると自分は必ずその作者が最近アクティブなプロジェクトをチェックします. 今もそのプロジェクトでアクティブなのか, それとも別なプロジェクトに興味が移っているのか, などを調べます. 自分がライアン・ダールを知った時にはすでに @ry は GitHub には何もコントリビュートしていませんでした. Node.js のような世界へのインパクトが大きいソフトウェアを作った人間が何も OSS 活動しなくなるのはなんとなく奇妙だなと思いました.

その後 自分はフロントエンドエンジニアという職業柄 Node.js を毎日使うようになっていきます. npm にも 90 個近いモジュールをパブリッシュしました. 自分の Node.js への依存度が上がっていくに従って, 今はどこかに行ってしまった作者の @ry の存在がますます謎に思えるようになっていきました.

そんなある時, あるポッドキャストに @ry が[出演](https://mappingthejourney.com/single-post/2017/08/31/episode-8-interview-with-ryan-dahl-creator-of-nodejs/)していました. その中で @ry は Node.js を批判し, Go 言語を最高の言語と賞賛していました. 今や Node.js は非常に大きなプロジェクトです. npm には他のどの言語より多くのパッケージが登録されています. Node.js が有効なソフトウェアであることは誰もが認める世の中になった状況で, 作者が突然現れてそのソフトウェアを批判し, 否定するという行動に衝撃を受けました.

ポッドキャストから約 1 年後にライアン・ダールは Deno を発表しました. 発表内容はよく知られるように, Node.js は間違いだらけのソフトウェアであり, もはや修正不可能なので Deno を作ってそれを解決するという内容です. Node.js のような成功の象徴のようなソフトウェアを否定して, 全くゼロから Node.js に競合するソフトウェアを作っていくという姿勢にかなりの異常性を感じました.

この人間は一体なんなんだろう, この人間は一体どういう考え方をしているんだろう, という興味が湧きました. それから自分は Deno リポジトリをウォッチし始めるようになりました.

# Node.js について

2016 年ごろに @yosuke_furukawa がリクルートに転職してきてから, Node 学園の存在を知りました. Node 学園に通ううちに Node.js の最新情報や舞台裏でコラボレータがどういう作業をしているのかがなんとなく見えるようになってきました. Node.js コラボレータである会長や @hiroppy さんの Node.js 知識がすごいなと思う一方で, そこまで Node.js にのめり込めないでいる自分を感じていました. 今や Node.js は大きすぎて, 全貌を把握するにはあまりにも膨大すぎるし, 歴史が長すぎるため, 今からそれを追いかけようという気にはなれませんでした.

そんな気持ちでなんとなく Node.js を斜めうしろから眺めている時に, Deno はある意味で歴史を過去に戻して 1 から出直す Node.js のように見えました. Deno を作る過程に参加することで Node.js が作られた過程を少し理解できるのではないか. Node.js に競合するソフトウェアの開発に参加することで Node.js をより理解できるのではないか, という考えが Deno にコントリビュートするモチベーションの1つになっています.

<!--
# Gitster さん

Deno にコントリビュートを始めた時に少し頭をよぎったインタビュー記事があります. git のメンテナーの濱野さんの[記事](https://gihyo.jp/dev/serial/01/alpha-geek/0040)です. 記事の中で濱野さんが git が本当に始まった直後から, linus と会話しながら開発に参加していった経緯が書かれています. ほとんどの人にとって git というソフトウェアは, ある日突然完成した姿で目の前に現れたソフトウェアだと思います. その git が出来る瞬間からの経緯をずっと見てきている濱野さんのような立場に一種の憧れのようなものを上の記事を読んだ時から感じていました. しかし, git は今から見れば社会のインフラになった基本的で重要なソフトウェアですが, 濱野さんがコントリビュートし始めた当時は何だから分からない, 出来るかどうかも分からないソフトウェアだったはずです. 上の記事で濱野さんが git merge の実装をしたが linus がもっと良い実装を作ったので reject されたというエピソードが出てきます. merge も出来ない頃の git というのはほとんど何も出来ないソフトウェアだったはずです. 自分が Deno にコントリビュートし始めた頃はまだ Deno はビルドができませんでした. @ry が, こういう風にディレクトリを整理したら GN のビルドが通る気がする, という issue を立てていて, 誰も着手する気配がなかったため, 自分がそのステップに従ってビルドを組み立てて行き最終的に何とか GN のビルドが通るようになりました. その作業をした時に, 何のためにやっているのか自分でも分からない部分がありましたが, 濱野さんが git merge を実装した時も似たような心境だったのではないかなと想像しています.
-->

# import

ここまで環境的な理由を述べましたが, Deno のソフトウェアとしての特徴にも, コントリビュートを続ける理由はあります. 大きなものの一つが import の仕様です. 自分は Node.js の import はあまり好きではありません. Node.js の世界で import が広く使われだしたのは babel 5 の存在が大きかったと思います. その後 webpack が babel に依存しない import の解釈を実装し, rollup が import に最適化された bundler として登場し, 最近では Node.js 自体にも import が入ろうとしています. それぞれのツールはそれぞれ細かい点で微妙に違った import を実装していますが, 共通しているのはそれらは全て, npm と繋がった import ということです. つまり Node.js の世界の import は例えば `import * as fs from "fs"` で Node.js の fs モジュールが取得でき, `import * as React from "react"` で npm にアップロードされた "react" モジュールが取得できるという挙動が共通的に前提とされています. CommonJS の require の使われ方からの連想で, こういう共通認識が生まれてしまったと思われますが, よくよく考えればこれはかなり不自然な仕様で, import にこのような挙動を期待すること自体が間違っていると個人的には思います. Node.js ではこのかなり不自然な前提をなんとかきちんと定式化しようとして, .mjs を発明したり, package.json にメタ情報を追加したりと様々な策を打ち出していますが, 正直状況はどんどん複雑化するばかりで出口が見えていないように見えます.

Deno の import はブラウザの import と同じです. import 出来るものは URL だけです. すごく自然かつシンプルで, 本当の import を実装しているという感じがします. Node.js の import の仕様がきちんと定式化されればそれはそれですごいことだとは思いますが, おそらく恐ろしく複雑なものになるでしょう. 自分はそんな恐ろしく複雑な Node.js の import に非常に興味は持っていますが, あまり万人向けではないという予感がしています. それよりは Deno のシンプルな import の世界が広まった方が, みんなが幸せになれるのではないかと予想しています.

# Security

Deno に特有な仕様で最も興味深いものが, 独自のセキュリティレイヤーです. Deno は起動時に Deno が何をして良いかをコマンドラインオプションで指定します.

```sh
deno --allow-read script.ts
```

このコマンドで script.ts はファイルの読み込みだけが出来ます. ファイルの書き込みや, ネットワークへのアクセスなどは出来ません. (しようとする場合は, プロンプトでその書き込み/アクセスをして良いかを聞いてきます.) つまり上のコマンドを実行する時点で, script.ts がどんな内容であっても, 上のコマンドでファイルが書き換えられたり, 外部サーバーに機密情報が送信されたりすることがないことが保証されます.

また, 次のようにさらに細かい粒度での許可もできます.

```sh
deno --allow-read=/home/app script.ts
```

上のコマンドで, `/home/app` 以下のファイルしか read 出来ない権限でスクリプトが実行されます. ネットワークについても細かい粒度のパーミッションを与えることが出来ます.

```sh
deno --allow-net=example.com script.ts
```

このコマンドでは, スクリプトは example.com へのネットワークアクセスのみが許可されます.

自分が知る限り, こういう特徴を持った言語はかなり珍しいように思います. かつ, サーバー用途の言語にとってはかなり有効な機能のように思われます. Node.js の世界では最近では, 定期的に npm package が攻撃者によって乗っ取られ, 機密情報を外部サーバーに送信されるというような事件が発生しています. Deno であればこのような問題は上のセキュリティの仕組みによってブロックできます. もし Deno と Node でほとんど同じことが実現できるぐらいに Deno が成長した場合, 殆どの人はこのセキュリティ機構のメリットを理由に Deno を使うのではないかと個人的には予想しています.

# Deno コミュニティ

はじめはあくまで個人的な理由から Deno にコントリビュートを続けていましたが, コントリビュートを続けるうちに他のコントリビュータからいろいろなメッセージをもらうようになりました. また, 日本では `#deno_ja` が緩く立ち上がって Deno に関する各種のコミュニケーションが日本語でもできるようになってきました. 今では Deno にまつわる各種コミュニケーションが純粋に楽しいと感じていて, それもコントリビュートを続けるモチベーションの 1 つになっています.
