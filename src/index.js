
const axios = require('axios')

exports.handler = async (event, context) => {
    try {
        const url = `https://slack.com/api/chat.postMessage`;
        const params = {
            "channel": process.env.CHANNEL_ID,
            "text": "わたし！起きて！今日のタスクやで〜〜！ \n \n https://www.notion.so/kitajimannn/b217b1b4b60d471baf1d1a7fbd7e90b8",
            "icon_emoji": ":4yearsago:", // Set any icon_emoji as you like
            "username": "4年前のわたし" // Set any names as you like
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
