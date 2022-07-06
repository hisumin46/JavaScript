const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	const dataObject = {name : req.query.name};
	console.log(`===> 현재 SSOID : ${dataObject.name} `);
	return res.render("main", {name : dataObject.name});
});

module.exports = router;