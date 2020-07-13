var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/users')

router.post('/', async (request, response) => {





  let objecttopost=request.body
  const saltRounds = 10

  if(objecttopost.password.length<3)//will always fail
  {
    const faileduser = new User(objecttopost)
    await faileduser
      .save().catch(error => {console.log((error.message));response.status(400).json(error).end() })
  }

 const passwordHash = await bcrypt.hash(objecttopost.password, saltRounds)

  objecttopost.password=passwordHash

  const user = new User(objecttopost)

  let result= await user
    .save().catch(error => {console.log((error.message));response.status(400).json(error).end() })
  response.status(201).json(result)
  /**/



})

router.delete('/', async (request, response) => {
  await User.deleteMany({})
  response.status(204).end()

})




router.delete('/:id', async (request, response) => {
  await User.deleteMany({_id:request.params.id})
  response.status(204).end()

})



router.get('/', async (request, response) => {
  let blogs=await User
    .find({}).populate('blogs')

  response.json(blogs)
})

router.get('/:id', async (request, response) => {
  await User.find({_id:request.params.id})
  response.status(200).end()

})










module.exports = router