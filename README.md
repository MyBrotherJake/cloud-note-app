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








