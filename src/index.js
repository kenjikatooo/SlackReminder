
const axios = require('axios')

exports.handler = async (event, context) => {
    try {
        const url = `https://slack.com/api/chat.postMessage`;
        const params = {
            "channel": process.env.CHANNEL_ID,
            "text": "
                本日はプロダクトミーティングです :docker_christmas:  1週間お疲れ様でした:tada:  \n
                定例アジェンダの公開とメンバーアジェンダの公募をします！\n mtgでやりたいことや言いたいことがある人はこのスレッドに所要時間と概要を書いてください:woman-gesturing-ok: \n
                 1. タスク整理＆BUMP👊 20minutes \n 2. 来週やること決定📝 20minutes \n 3. 持ち込みアジェンダ🏃‍♂️ 15minutes", // Set any messages as you like
            "icon_emoji": ":yatteki:", // Set any icon_emoji as you like
            "username": "Mutta Namba" // Set any names as you like
        }

        const config = {
            headers:{
                'Authorization': process.env.AUTH_TOKEN,
                'Content-type': 'application/json' 
            }
        }

        await axios.post(url, params, config);
    } catch (err) {
        console.log(err);
    }
};
