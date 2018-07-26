---
templateKey: blog-post
title: react-uportでブロックチェーンによるログイン機能を実装する
date: '2018-07-26T10:43:16+09:00'
description: uPortというブロックチェーンを用いたログイン機構があることを知り、触ってみました。
image: /img/react-uport-img_00.png
permalink: react-uport
tags:
  - ブロックチェーン
  - uPort
  - ログイン
---
react-uportでブロックチェーンによるログイン機能を実装する

ブロックチェーンがばっちりハマる事例って何だろうとちょいちょい考えているのですが、なかなか難しいですね。
dAppsを簡単に作れる仕組みを提供！みたいなのはよく見るのですが、肝心のdAppsでこれはすごい！というものをまだ知りません。。（どなたか教えてください・・・）

そんな中、uPortというブロックチェーンを用いたログイン機構があることを知り、触ってみました。

# uPortとは

<https://uport.me>

非中央集権のID管理システムです。
ざっくり触ってみた感じだと、アプリケーション側でuPortを設置するとQRコードが発行され、uPortの専用スマホアプリから読み取ることでログイン認証をする形式のようです。
ユーザー視点からするとGoogleやTwitterログインと比べるとスマホを取り出さないといけない分、面倒ではあります。

# react-uportを使ってみる

今回はreact-uportというパッケージを使います。
このパッケージを利用するには、truffleというパッケージマネージャーが必要です。

まずはtruffleをインストールしましょう。
npm経由で取ってくることができます。

```
$ npm i -g truffle
```

`truffle unbox`をすると`git clone`的な感じでreact-uportのソースコードを取り込むことができます。
（unbox時には空のディレクトリにいる必要があります）

```
$ mkdir sample
$ cd sample
$ truffle unbox react-uport
```

次にreact-uportをコンパイルして、仮想チェーン上にコントラクトをデプロイします。

```
$ truffle develop

truffle(develop)> compile

Compiling ./contracts/Migrations.sol...
Compiling ./contracts/SimpleStorage.sol...
Writing artifacts to ./build/contracts


truffle(develop)> migrate

Using network 'develop'.

Running migration: 1_initial_migration.js
// 略
Running migration: 2_deploy_contracts.js
// 略
Saving artifacts...
```

これで準備が整いました。
アプリケーション側はと言うと、react-uport内にすでにReactアプリケーションが出来上がっています。
さっそく起動してみましょう。

```
$ npm start
```

`http://localhost:3000`にアクセスすると次のような画面を見ることができます。

<br>

![null](/img/react-uport-img_01.png)

右上のリンクを押下すると、次のようなモーダルが出てきます。

<br>

![null](/img/react-uport-img_02.png)

\
ここにあるように、ログインするにはuPortのアプリをダウンロードする必要があります。\
iOSまたはAndroidのアプリをストアからダウンロードしましょう。\
アプリを起動して個人情報を登録するとQRコードの読み込み画面を表示できますが、この段階ではまだログインが成功しません。

Webアプリケーション側のuPort設定をする必要があります。

## AppManagerに登録する

Webアプリケーション側でuPortを扱うために、uPortのAppManagerにそのWebアプリケーションを登録しておく必要があります。
<https://appmanager.uport.me>

uPortアプリからQRコードを読み込み、認証をします。\
その上でアプリケーションを登録します。\
アプリケーション情報画面の下部に「Click Here for your App Code」という文があるので、そこをクリックするとアプリケーションに埋め込むためのコードが表示されます。\
これをアプリケーション側に記述します。

まずは`src/util/connectors.js`にuPortとconnectするコードがあるので、それを先ほどの埋め込みコードに差し替えます。

```
export const uport = new Connect('shibe97\'s sample app', {
  clientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  network: 'rinkeby',
  signer: SimpleSigner(‘xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx’)
}) 
```

次にログイン時にどんな情報を取得するかを指定します。
`src/user/ui/loginbutton/LoginButtonActions.js`の`uport.requestCredentials`に引数を与えます。

```
uport.requestCredentials({requested: ['name', 'phone', 'country', 'email']}).then((credentials) => { 
```

こうすることで、ログイン後にAuth情報として`name`, `phone`, `country`, `email`が取得できます。

実際にログインしてみると、QRコードによる認証の際、次のような情報を渡しますという画面が出て来ます。

<br>

![null](/img/react-uport-img_03.png)

<br>

承諾すると、アプリケーション側の認証が完了し、ダッシュボードにリダイレクトされます。
`src/layouts/dashboard/Dashboard.js`で以下のようにauthDataの中を見てみます。

```
constructor(props, { authData }) {
    super(props)
    authData = this.props
    console.log(authData);
} 
```

すると、先ほどの指定した情報が取得できています。

# まとめ

ひとまずuPortを用いてログインをすることができました。\
uPortは、非中央集権のIDシステムとして地位を確立し、すべてのアプリケーションをそのIDに紐づけられる世界を目指しているようです。\
今でいうと、Googleアカウントがほぼそれに近い状態にあると思いますが、非中央集権として管理される一意のIDは目指すべき方向性として間違っていない気がします。\
現状はまだまだ多くの問題を抱えていると思いますが（例えばスマホを紛失してしまったらアプリを使われてしまう等）、これからどんどん進化していくことを期待します。
