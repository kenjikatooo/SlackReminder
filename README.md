# はじめに 

CloudWatch Event + AWS Lambda Function + Slack Api を使って、Slack にリマインドを送信するための SAM テンプレートです。

# 前提条件  

* リマインドを登録する Slack のワークスペースへの特定のチャンネルへの投稿が認可された Slack API トークンが発行されていること  
* AWS のアカウントに SAM のアーティファクトを格納するための任意の S3 バケットを作成済みであること  
* aws-cli(>= 1.16.50) がインストールされていること  
* node(>= 10.13.0)がインストールされていること  

# 反映手順  

> $npm --prefix ./src install ./src  
> 
> $aws cloudformation package --template-file template.yaml --s3-bucket ${target-bucket} --output-template-file packaged.yaml  
>  
> $aws cloudformation deploy --template-file packaged.yaml --stack-name ${stack-name} --capabilities CAPABILITY_IAM --parameter-overrides SlackToken=${slack-token} ChannelId=${target-channelid}

* ${target-bucket} には予め作成した S3 バケットを指定する
* ${stack-name} は好きなスタック名を記述
* ${slack-token} は予め発行した Slack API トークンを指定  
* ${target-channelid} にはリマインドを投稿する対象のチャンネルの ID を指定