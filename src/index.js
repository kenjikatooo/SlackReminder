
const axios = require('axios')

exports.handler = async (event, context) => {
    try {
        const url = `https://slack.com/api/chat.postMessage`;
        const params = {
            "channel": process.env.CHANNEL_ID,
            "text": "Slack Reminder Message", // Set any messages as you like
            "icon_emoji": ":slack:", // Set any icon_emoji as you like
            "username": "Slack Reminder Name" // Set any names as you like
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
