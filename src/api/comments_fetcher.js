const axios = require('axios');

async function fetchComments(videoUrl) {
  const videoId = extractVideoId(videoUrl); // Implement a function to extract videoId from URL
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.YOUTUBE_API_KEY}`);
  const comments = response.data.items.map(item => item.snippet.topLevelComment.snippet.textDisplay);
  return comments;
}

function extractVideoId(videoUrl) {
  const urlParams = new URLSearchParams(new URL(videoUrl).search);
  return urlParams.get('v');
}

module.exports = { fetchComments };
