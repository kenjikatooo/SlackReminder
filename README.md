## はじめに 

CloudWatch Event + AWS Lambda Function + Slack Api を使って、Slack にリマインドを送信するための SAM テンプレートです。

## 前提条件  

* リマインドを登録する Slack のワークスペースへの特定のチャンネルへの投稿が認可された Slack API トークンが発行されていること  
* AWS のアカウントに SAM のアーティファクトを格納するための任意の S3 バケットを作成済みであること  
* aws-cli(>= 1.16.50) がインストールされていること  
* node(>= 10.13.0)がインストールされていること  

## 反映手順  

> $npm --prefix ./src install ./src  # やると初期化されるのでやらなくてもいいかも
> # packaged.yamlのファイルの作成 (S3上にも作成されるぽい？が、やらなくても良いかも)
> # --profile kenjikatooo は任意のAWSアカウントに変更して使う
> $aws cloudformation package --template-file template.yaml --s3-bucket ${target-bucket} --output-template-file packaged.yaml --profile kenjikatooo
> 
> $aws cloudformation deploy --template-file packaged.yaml --stack-name ${stack-name} --capabilities CAPABILITY_IAM --parameter-overrides SlackToken=${slack-token} ChannelId=${target-channelid} --profile kenjikatooo
> # これ以降はやらなくても大丈夫
> $aws events list-rules
> $aws events put-rule --name <取得したNameを入れる>  --state ENABLED --description "関数の説明をここにする" --schedule-expression "cron(0 1 ? * MON-FRI *)"

## トラブルシューティング
* ${target-bucket} には予め作成した S3 バケットを指定する
* ${stack-name} は好きなスタック名を記述
* ${slack-token} は予め発行した Slack API トークンを指定 (""で囲うとうまくいく)
* ${target-channelid} にはリマインドを投稿する対象のチャンネルの ID を指定 (""で囲うとうまくいく)
* 元のバージョンのcron式では、 `Parameter ScheduleExpression is not valid.` と出るので、日にちか曜日のフィールドに `?` を入れることで会費する
  * 参考は [こちら](https://www.kabegiwablog.com/entry/2018/05/23/100000)
* awsコマンド実行時にエラーになる時に考えられる原因
  *  `aws-cli` が入っていない
     *  →インストールする
  *  aws cloudformation ができない
     *  →権限がない場合 (400 errorで not authourized とか出る)
        *  IAMで権限を付与する
  *  `node` のバージョンが古い
     *  `nvm` をインストールする
  *  デプロイできない
     *  基本的に指示されたログを見て `create_failed` 的なところをチェックしてエラーメッセージをググる
     *  関数名が被っている
        *  lambdaに同じ関数名がないかチェック
     *  cron式の記入の仕方が間違っている
        *  上記の参考記事を見る
  *  cron式がGUIから修正できない
     *  バグだそう
     *  [この記事](https://github.com/concurrencylabs/aws-pricing-tools/issues/8)を見つつ、ターミナルからawsコマンドで変更すればいける
  *  時間通りにリマインドが送られない
     *  GMT時間でリマインドが送信されるようになっているので表記がずれている可能性がある
        *  GMT 10:00am の場合、日本時間19:00(+9時間)
        *  なので日本時間10:00にリマインドしたい場合は、 1:00 に設定する 
  *  Cloud Formationの名前が長くなってしまう
     *  [この記事](https://github.com/concurrencylabs/aws-pricing-tools/issues/8)を見つつ、ターミナルからawsコマンドで新たにCloud Watch Event を短い名前で作成して長いものは消す
*  cron式の書き方は[こちら](https://qiita.com/da-sugi/items/ef3bb45a8a99a4acacb1)

## もろもろのトークンなど
* S3
  * S3にある "slack-reminder" を利用する
* Slack Token
  * ~~[レガシートークン](https://api.slack.com/legacy/custom-integrations/legacy-tokens)を持ってくる~~
  * レガシートークンは非推奨のため、slackアプリを作成して、そのアプリのBot User OAuth Tokenを持ってくる (xoxb~~のやつ)
    * 「あなたの味方」アプリのOAuth Tokenをとってくる
* ChannelId
  * slackからコピーしてくる
