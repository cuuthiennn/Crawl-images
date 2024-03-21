const express = require('express');
const router = express.Router();
const crawl =  require("../service/Crarwl.js");
const  crawlWithApi = require("../service/CrawlWithApi.js");

router.route('/crawl/:downloadFolder/:option').get(crawl);

router.route('/crawlWithApi/:downloadFolder/:option').get(crawlWithApi);

module.exports =  router;