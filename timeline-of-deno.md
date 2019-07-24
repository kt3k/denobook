# Deno のタイムライン

本章では Deno に関する主な出来事を時系列順に紹介していきます.

## 2018/6

- JSConf EU 2018 でライアン・ダール が Deno を発表する.
  - 発表のタイトルは「Node.js に関して後悔している 10 の事」という挑戦的なものでした.
  - なおこの時, トークと同時に発表された Deno プロトタイプは Go 言語で実装されていました.
  - なお発表の10日ほど前までは発表の内容は Propel という機械学習フレームワークについてでした.
    - 発表直前に, tensorflow.js が発表され, Propel の "JavaScript の機械学習フレームワーク" という立ち位置が意味のないものとなったため, 急遽上のタイトルに差し替えられました.

### 2018/6 Rust rewrite

- 6/10 Go のプロトタイプと並行して Rust のプロトタイプの開発が始まる.
  - 最初このプロジェクトは deno2 と呼ばれていました.
- 6/X Go プロトタイプは廃止が決まり, Rust 版が正式版となる.

### 2018/7 Http server

- 初めて HTTP Server が動くようになる.

### 2018/8 0.1

## 付録: Deno 前史

この節では, Deno 発表に至るまでの, Deno に影響を与えたと思われる事象を, 筆者の視点でピックアップして紹介します.

### 1995

- Netscape 社の ブレンダン・アイク JavaScript を開発・発表する.

### 1996

- Netscape 社 サーバーサイド JavaScript 実装を含んだ Netscape Enterprise Server 発表

### 2008 Sep 2 V8 リリース

- ラース・バク率いる Google のチームが V8 をリリース. 同時に Google Chrome もリリースされる.

### 2009 Nov 8 Node.js 発表

- 2009 年 11 月 8 日 ドイツ ベルリンで第1回 JSConf EU 開催
- ライアン・ダール Node.js を発表

<!--
  - JSConf EU 2009 Node.js https://www.youtube.com/watch?v=ztspvPYybIY
  - JSConf EU 2009 スピーカー紹介 https://www.jsconf.eu/2009/speaker/speakers_selected.html
-->

### 2015 v8worker

- ES6 が策定される. class, module, etc など, それまで JavaScript に欠けていた, 非常に豊富な機能が言語に導入される.
- ライアン・ダール Go 言語から V8 を使う仕組みの v8worker を発表.

- スライド by ライアン https://docs.google.com/presentation/d/1RgGVgLuP93mPZ0lqHhm7TOpxZBI3TEdAJQZzFqeleAE/edit#slide=id.gb06c94eca_1_74
- Quora https://www.quora.com/Whats-the-purpose-of-Ryan-Dahls-v8worker-Is-it-to-make-the-most-of-the-JavaScript-library-from-golang

### 2017

- ライアン・ダール Mapping the Journey Episode 8 に登場
  - Go を激賞し Node.js を批判する
