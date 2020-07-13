
var express = require('express')
var router = express.Router()
const Comment = require('../models/comments')
router.get('/', async (request, response) => {

  let comments=await Comment
    .find({})

  response.json(comments)

})



module.exports = router