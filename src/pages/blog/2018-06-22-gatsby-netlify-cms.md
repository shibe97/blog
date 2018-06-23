---
templateKey: blog-post
title: Gatsby + Netlify CMSでブログを作る
date: '2018-06-22T23:53:22+09:00'
description: ふと触ってみたNetlify CMSに感動しすぎてブログを書きました。
image: /img/gastby-netlify.png
permalink: gatsby-netlify-cms
tags:
  - Gatsby
  - Netlify
---
かれこれ、WordPress→Tumblr→はてなブログという感じで色んなブログサービスを転々としてきましたが、最近になってGatsby + Netlifyという単語をよく聞くようになったので試してみました。

# Gatsby

<https://www.gatsbyjs.org/>

React製の静的サイトジェネレータです。

Gatsbyで生成されたサイトはSPA（Single Page Application）でかつPWA（Progressive Web Apps）なのでだいぶ高速です。

Markdownのファイルでブログを書けるのも便利。

通常、生成されたサイトはGitHub PagesやAmazon S3等に置くと思うのですが、そこに新しく登場したのがNetlifyです。

# Netlify

<https://www.netlify.com/>

フロントエンドのビルド・デプロイ・ホスティングをまるっとやってくれるサービスです。

GitHub Pagesを使えばええやんって最初は思いましたが、SPAのビルド後のファイルは大きいのでGitHub上に置きたくないですよね。

何らかのCIツールと組み合わせてAmazon S3あたりにデプロイするのはアリです。

Netlifyではそのあたりの処理を全部やってくれて、かつ以下のような特徴があります。

* 無料でHTTPS対応
* カスタムドメインOK
* キャッシュ無効化
* 制限なしのスナップショット、ロールバック
* Proxyやリダイレクトのルール設定
* AWS Lambdaを簡単に使える（試してない）

なるほど、良さそうだなと。

けどなんだかんだ言って、ローカルでMarkdownでブログ書くのって意外と画像入れたりするの面倒くさかったりして、結局続かなそうだな〜。

そのあたりのGUIがあれば便利なんだけどな〜と思って念のため探してみたらありました！

# Netlify CMS

<https://www.netlifycms.org/>

文字通り、NetlifyのCMSです。

これは正直言って感動しました。

仕組みとしては、Web上でMarkdownファイルを編集すると自動的にGitHubにPushされ、Netlify側でビルド＆デプロイされる感じです。

改めて俯瞰してみると、「それってただの一般的なブログサービスじゃん」とも言えるのですが、ブログのフロントエンド部分が最大限までカスタマイズ可能になっている点がポイントなのかなと思います。

もし自分が一からSPAでブログサービスを作るとしたらそれなりに大変ですが、その大変な部分を全て引き受けてくれて、あとはちょいちょいReactとMarkdown書くだけで良い状態まで持っていってくれるのがNetlify CMSです。（ReactはGatsbyを用いている場合の話）

# 実践！Gatsby + Netlify CMS

starterkitを使うと恐ろしいほど簡単にサイトを作成できます。

## ステップ１

[ここ](https://app.netlify.com/start/deploy?repository=https://github.com/AustinGreen/gatsby-starter-netlify-cms&stack=cms)にアクセスする。

## ステップ２

GitHubと連携する。ボタンをポチッ。

![null](/img/netlifycms_step1.png)

## ステップ3

サイト用のリポジトリ名を入力する。

![null](/img/netlifycms_step2.png)

なんと、これで終わりです。2ポチで完成です。

こんな感じのKALDIコーヒーのサイトがサンプルで出来上がります。

<https://friendly-fermat-3994f5.netlify.com/>

もちろんサブドメインは自由に変更できます。

また、`/admin`にアクセスすることで、ログイン後に管理画面に入ることができます。

# ソースコードの構成

出来上がったばかりのサイトは以下の4ページで構成されています。

* Blog
* About
* Products
* Tags

そしてソースコードは以下のような構成になっています。（重要なポイントのみ抜粋）

## src/pages

ブログやページのデータソースとなるMarkdownファイルが置かれています。\
そしてなぜかブログ一覧ページと404ページのComponentもここにあります。（修正されるかも）

## src/templates

主にMarkdownファイルを流し込む先のテンプレートが置かれています。\
各ページのカスタマイズをしたい場合はだいたいココをいじることが多いです。

## src/layouts

スタイル用のall.sassと大元のテンプレートとなるindex.jsがあります。

最初、CSSは一体どこに書かれているのだろうと探しましたが、all.sass内で読み込んでいるBulmaというCSSテンプレートを使っているようです。

新たにスタイルを書きたい場合はall.sassに付け加えても良いですしStyled-Components等を使うのもアリです。

## src/components

ここには`Navbar`や`Content`などのコンポーネントが置かれています。

汎用性を意識したコンポーネントはココに置くのが良さそうです。

## src/cms/preview-templates

管理画面におけるサイトやブログのプレビュー画面用のテンプレートです。

`BlogPostPreview.js`では`src/templates/blog-post.js`のコンポーネントを利用しているので、基本的には本番と同じ見え方になるはずです。

## static/admin/config.yml

ここだけ`src`外ですが、重要なので載せておきます。

管理画面の入力フォームの設定ファイルです。

ここで用意したフォームへの入力を`src/templates`以下でごにょごにょする感じです。

さて、だいたいの構成が分かったのでちょいちょいカスタマイズしてみます。

# OGP画像を選択できるようにする

このご時世、OGP対応は必須です。

試しに管理画面の入力フォームにOGP画像選択フォームを追加してみます。

## ステップ１

まずは`static/admin/config.yml`を変更します。

Blogのfieldsに次の一文を追加します。

```
- {label: "Image", name: "image", widget: "image"}
```

ここを変更すると、既にブログの記事が存在している場合、それらにImageが設定されていないとビルド時にエラーが出てしまいます。

記事がある場合はsrc/pages/blog以下のMarkdownファイルの先頭部分にImageの設定が必要です。（指定するファイルはとりあえず適当で良いと思います）

こんな感じです。

```
image: /img/ogp.png
```

`/img`は`public/img`を指します。

## ステップ２

`src/templates/blog-post.js`を変更します。

ステップ１で修正を行ったことで、`post.frontmatter.image`で入力した画像パスを取得することができます。

これをHTMLのHead内の`og:image`として設定してあげれば良いです。

Gatsbyでは内部的には`react-helmet`を用いているので、コンポーネント単位でHTMLヘッダーの上書きを行うことができます。

今回は次のようなHelmetコンポーネントのラッパーを作成し、BlogPostTemplateの`helmet`propsに渡すようにしました。

```javascript
const Meta = ({ post }) => {
  const origin = 'https://shibe97.com';

  return (
    <Helmet
      title={`${post.frontmatter.title} | Blog`}
      meta={[
        { name: 'description', content: post.frontmatter.description },
        { property: 'og:title', content: post.frontmatter.title },
        { property: 'og:description', content: post.frontmatter.description },
        { property: 'og:image', content: `${origin}${post.frontmatter.image}` },
      ]}
    />
  );
};
```

## ステップ3

ここまででOGP画像は表示できるようになったはずです。

ついでにブログ記事の先頭にもその画像を表示できるようにします。

`BlogPostTemplate`コンポーネント内の好きな位置にImgタグで`post.frontmatter.images`を表示させればOKです。
