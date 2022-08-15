# cloud-note-app

## 開発環境構築

### Docker

```
>docker-compose up -d
```
開発環境では5つのコンテナが起動します

1. frontend / React.js
2. api / Nest.js
3. postgres / Postgresql
4. pgadmin / データベース管理

frontend/apiともにDockerfile内でサーバーが起動する設定になっています。
Dokcer for Macのダッシュボードやdocker attachでコンソールに接続することができます。

### Database

#### pgadminの設定

1. コンテナを起動したら、pgadminにログインします。
```
URL: http://localhost:81
user: admin@example.com
password: password
```

2. ダッシュボード中央の「Add New Server」をクリックします。
3. 以下の通り入力し、「Save」をクリックします。
```
Generalタブ
  Name: cloud-note-app
Connectionタブ
  Hostname: postgres
  Port: 5432
  Maintenance database: postgres
  Username: postgres
  Password: postgres  
```

4. データベースに接続できるとサイドバーに表示されます。

#### マイグレーションの実行

1. apiコンテナに接続します。
```
>docker-compose exec api sh
```

2. 以下のコマンドを実行します。
```
>yarn typeorm migration:run
```

3. pgadminのサイドバーからDatabases->postgres->Schemas->public->Tablesと開いていき、テーブルが作成されていることを確認します。

## API

Dockerコンテナを起動するとAPIサーバーにアクセスできるようになります。

### ユーザーを作成
http://localhost:4000/users

```
request
{
  name: '',
  email: ''
}

response
{
  userId: ''
}
```

### ノートの一覧を取得
GET http://localhost:4000/notes

### ノートの詳細を取得
GET http://localhost:4000/notes/:noteId

### ノートを作成
POST http://localhost:4000/notes/

```
// request
{
  userId: ''
}

// response
{
  noteId: ''
}
```

### ノートを更新
PATCH http://localhost:4000/notes/:noteId

```
{
  noteId: ''
  title: ''
  content: ''
}
```

- コンテナ間通信の場合はホスト名`localhost`ではなくコンテナ名`api`を使用してください
