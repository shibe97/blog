---
templateKey: blog-post
title: FirebaseのRealtime DatabaseでorderByChildが効かない
date: '2019-01-10T19:39:50+09:00'
description: JavaScriptのオブジェクトの話。
image: /img/products-grid2.jpg
permalink: firebase-realtime-database-orderbychild
tags:
  - Firebase
---
FirebaseのRealtime DatabaseでorderByChildを使用しても順番に変化がなく、結構ハマったのでメモ。

```
firebase.database().ref(path).orderByChild('updateDate').once('value').then((snapshot) => {
  console.log(snapshot.val());
});
```

そもそも、オブジェクトは順序を保証しないから、`snapshot.val()`の対象がオブジェクトの場合、その時点で`orderByChild()`が意味をなさないというのが結論。

これを解決するには、配列にするしかない。

```
firebase.database().ref(path).orderByChild('updateDate').once('value').then((snapshot) => {
  let array = [];
  snapshot.forEach(child => {
    array = [...array, child.val()];
  });
  console.log(array);
});
```
配列であれば順序が保証されるため、問題ない。
