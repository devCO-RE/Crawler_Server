const express = require('express');
const router = express.Router();
const Crawler = require('./crawler');
const axios = require('axios');

router.post('/', async (req, res) => {
  const url = req.body.url;
  const string = await Crawler.crawl(url);

  ////// 
  const result = await axios.post('http://115.85.182.246:8080', {
    string,
  })

  res.status(200)
    .json({
      result: result.data
    })
    .end();
});

module.exports = router;
