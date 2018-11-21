const express = require('express')

const router = express.Router();

router.get('/test',(req, res) => {
  console.log('I am here  ')
  res.send('~');
})

module.exports = router;
