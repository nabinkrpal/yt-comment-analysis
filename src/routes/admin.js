const express = require('express');
const commentsFetcher = require('../api/comments_fetcher');
const modelAnalysis = require('../api/model_analysis');
const router = express.Router();

router.post('/train', async (req, res) => {
  const { videoUrl } = req.body;
  try {
    const comments = await commentsFetcher.fetchComments(videoUrl);
    await modelAnalysis.trainModel(comments);
    res.send('Model trained successfully');
  } catch (error) {
    res.status(500).send('Error training model');
  }
});

router.post('/analyze', async (req, res) => {
  const { videoUrl } = req.body;
  try {
    const comments = await commentsFetcher.fetchComments(videoUrl);
    const analysis = await modelAnalysis.analyzeComments(comments);
    res.json(analysis);
  } catch (error) {
    res.status(500).send('Error analyzing comments');
  }
});

module.exports = router;
