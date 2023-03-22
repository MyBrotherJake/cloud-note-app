# cloud-note-app

## 開発環境構築

### firebase.jsファイルの配置
受け取ったfirebase.jsをfrontend/srcフォルダ直下に配置してください

### Docker
```
>docker-compose up -d
```
開発環境では2つのコンテナが起動します

1. frontend / React.js
2. api / Nest.js

frontend/apiともにDockerfile内でサーバーが起動する設定になっています。
Dokcer for Macのダッシュボードやdocker attachでコンソールに接続することができます。

### Database
#### prisma

prisma studioを利用することでデータの閲覧・編集が可能です。以下のコマンドを実行します。
```
$npx prisma studio
```

ブラウザが起動し、データを確認することができます。コンテナのビルド・起動時にユーザーが1人だけ作成されているはずです。

<img width="610" alt="スクリーンショット 2023-01-16 12 14 30" src="https://user-images.githubusercontent.com/1013392/212590999-6f499af4-84cf-4b0b-9aa5-db0a93b7e27c.png">

参考）　https://www.prisma.io/docs

## API

Dockerコンテナを起動するとAPIサーバーにアクセスできるようになります。

### ノートの一覧を取得
GET http://localhost:4000/notes

### ノートの詳細を取得
GET http://localhost:4000/notes/:noteId

### ノートを作成
POST http://localhost:4000/notes/

### ノートを更新
PATCH http://localhost:4000/notes/:noteId
```
// payload
{
  title: ''
  content: ''
}
```

### ノートを削除
DELETE http://localhost:4000/notes/:noteId

### フォルダを作成
POST http://localhost:4000/folders
```
// payload
{
  name: ''
}
```

### フォルダを更新
PATCH http://localhost:4000/folders/:folderId
```
// payload
{
  name: ''
}
```

### フォルダを削除
DELETE http://localhost:4000/folders/:folderId

- コンテナ間通信の場合はホスト名`localhost`ではなくコンテナ名`api`を使用してください
