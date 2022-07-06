// index.js
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	return res.render('main');
});

module.exports = router;