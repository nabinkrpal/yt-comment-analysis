const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const user = req.user;
  
  try {
    const youtubeResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    });
    const channelData = youtubeResponse.data.items[0];
    res.json({
      channelName: channelData.snippet.title,
      subscriberCount: channelData.statistics.subscriberCount,
      videoCount: channelData.statistics.videoCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching YouTube data');
  }
});

module.exports = router;
