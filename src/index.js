
const axios = require('axios')

exports.handler = async (event, context) => {
    try {
        const url = `https://slack.com/api/chat.postMessage`;
        const icons = [{icon_emoji: "4yearsago", username: "大学受験の時のわたし"}, 
                        {icon_emoji: "5yearsago2", username: "吉川町にいた頃のぼく"},
                        {icon_emoji: "5yearsago", username: "神戸にきたときのぼく"},
                        {icon_emoji: "5yearsago3", username: "社会人前のわたし"},
                        {icon_emoji: "8yearsago", username: "六本木が庭だった頃の僕"},
                        {icon_emoji: "7yearsago", username: "フィリピン時代のぼく"},
                        {icon_emoji: "20yearsago", username: "20年前のわたし"}
                    ]
        const n = Math.floor( Math.random() * (icons.length - 1) );
        const params = {
            "channel": process.env.CHANNEL_ID,
            "text": "<!channel> 本日はプロダクトミーティングです :tada: \n 1週間お疲れ様でした :wa-i: \n mtgでやりたいことや言いたいことがある人はこのスレッドに *所要時間* と *概要* を書いてね〜 :woman-gesturing-ok: \n \n *アジェンダ* \n ```1. 戦略のアプデのシェア (10min) \n2. 違和感出しフライデー (10min) \n3. 持ち込みアジェンダ \n4. 今週のBUMP (15min)```",
            "icon_emoji": icons[n].icon_emoji, // Set any icon_emoji as you like
            "username": icons[n].username // Set any names as you like
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
