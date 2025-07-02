const express = require("express");
const {nanoid} = require("nanoid");
const Url = require('../models/Url');
const router = express.Router();

router.get('/', (req, res) => {
    res.render(index, {shortUrl: null});
});

router.post('/shorten', async (req, res) => {
    const {originalUrl} = req.body;
    const shortID = nanoid(6);

    const exists = await Url.findOne({originalUrl});
    if (exists) return res.render('index', {shortUrl: process.env.BASE_URL + '/' + exists.shortID});

    const newUrl = new Url({originalUrl, shortID});
    await newUrl.save();

    res.render('index', {shortUrl: process.env.BASE_URL + '/' + shortID});
});

router.get('/:shortID', async (req,res) => {
    const {shortID} = req.params;
    const url = await Url.findOne({shortID});
    if (!url) return res.status(404).send("URL not found");

    url.clicks++;
    await url.save();
    res.redirect(url.originalURL);
});

module.exports = router;