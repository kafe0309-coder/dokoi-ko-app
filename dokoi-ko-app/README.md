# どこいこ - Vercelへのデプロイ手順

## 🚀 超簡単！Vercelへのデプロイ方法

### 方法1: GitHubを使う方法（おすすめ）

#### ステップ1: GitHubにコードをアップロード

1. **GitHubにログイン**
   - https://github.com にアクセス
   - 右上の「+」→「New repository」をクリック

2. **新しいリポジトリを作成**
   - Repository name: `dokoi-ko-app`
   - Public を選択
   - 「Create repository」をクリック

3. **コードをアップロード**
   - 「uploading an existing file」をクリック
   - このフォルダの全ファイルをドラッグ&ドロップ
   - 「Commit changes」をクリック

#### ステップ2: Vercelにデプロイ

1. **Vercelにログイン**
   - https://vercel.com にアクセス
   - 「Add New」→「Project」をクリック

2. **GitHubと連携**
   - 「Import Git Repository」を選択
   - GitHubを選択して認証
   - `dokoi-ko-app` リポジトリを選択

3. **デプロイ設定**
   - Framework Preset: `Next.js` を選択
   - 他の設定はそのままでOK
   - 「Deploy」ボタンをクリック

4. **完了！**
   - 2-3分待つと完了
   - 表示されるURLをクリックすると、あなたのアプリが公開されています！

---

### 方法2: Vercel CLIを使う方法（上級者向け）

```bash
# 1. Vercel CLIをインストール
npm install -g vercel

# 2. プロジェクトフォルダに移動
cd dokoi-ko-app

# 3. デプロイコマンドを実行
vercel

# 4. 質問に答える
# - Set up and deploy? → Yes
# - Which scope? → あなたのアカウント名
# - Link to existing project? → No
# - What's your project's name? → dokoi-ko-app
# - In which directory? → ./
# - Override settings? → No

# 5. 完了！URLが表示されます
```

---

## 📱 デプロイ後にできること

### 独自ドメインの設定
1. Vercelのダッシュボードで「Settings」→「Domains」
2. 購入したドメイン（例: dokoi-ko.com）を入力
3. DNS設定をコピーして、ドメインサービス側に設定

### アプリの更新
- GitHubのコードを更新すると、自動的にVercelにも反映されます！
- コードを変更 → GitHubにプッシュ → 自動デプロイ

---

## ❓ よくある質問

**Q: デプロイにお金はかかりますか？**
A: 無料です！個人利用なら完全無料で使えます。

**Q: エラーが出た場合は？**
A: Vercelのダッシュボードで「Deployments」から、エラーログを確認できます。

**Q: スマホでも見れますか？**
A: はい！レスポンシブデザインなので、スマホでもタブレットでも快適に使えます。

**Q: アプリを削除したい場合は？**
A: Vercelのダッシュボード → プロジェクト → Settings → Delete Project

---

## 📞 サポート

わからないことがあれば、気軽に聞いてください！
一緒に解決しましょう。

---

## 次のステップ

✅ デプロイ完了！
→ Google Maps APIの統合
→ 収益化の設定
