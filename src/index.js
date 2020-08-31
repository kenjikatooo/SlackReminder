
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
            "text": "<!channel> おはよう！ 今日取り組むプロジェクトはこちらから確認してね！今日もがんばろう〜！ \n \n今のあなたのイシュー：\n ```https://www.notion.so/almainc/48036bbc8aab4245a957450cb5e5a75e?v=10b69f01a4d447bc8e2758466577c5d2``` \n \n データはこちら:point_down:： \n ```https://redash.cocoda-design.com/dashboards?page=1&order=-created_at```",
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
