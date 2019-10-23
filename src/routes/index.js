const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ msg: 'hello world!' }));
router.get('/test', (req, res) => res.json({ msg: 'test works!' }));

module.exports = router;
