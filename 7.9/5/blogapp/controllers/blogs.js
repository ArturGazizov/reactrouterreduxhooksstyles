var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')


const Blog = require('../models/blogs')
const Comment = require('../models/comments')
const User = require('../models/users')
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/




router.get('/', async (request, response) => {
  /*Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
*/

  let blogs=await Blog
    .find({}).populate('comments').populate('user')

  response.json(blogs)
  /**/

})



router.put('/:id', async (request, response) => {

  const newversion = request.body
  const id=request.params.id

  let respon=await Blog.updateOne({ _id: id }, newversion)
  //console.log(respon)
  response.json((respon))
  response.status(204).end()


}
)

router.delete('/:id', async (request, response) => {




  const token=request.body.token

  let decodedToken=false
  try{ decodedToken = jwt.verify(token, process.env.SECRET) } catch(error) {
    //console.log(error)

    return response.status(401).json(
      { error: 'token missing or invalid' })
  }



  if (!token || !decodedToken)
  {

    return response.status(401).json(
      { error: 'token missing or invalid' })  
}
  const user = await User.findById(decodedToken.id)



  let blog=await Blog
    .findById(request.params.id).populate('user')


  if((!blog.user)||(blog.user._id.toString()!==user._id.toString()))
    return response.status(401).json(
      { error: 'not yours to delete' })

  await Blog.deleteMany({ _id:request.params.id })
  /**/
  response.status(204).end()}
  )



router.delete('/', async (request, response) => {

  await Blog.deleteMany({})
  response.status(204).end()
})






/*
const getTokenFrom = request => {  const authorization = request.get('authorization')
if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
  return authorization.substring(7)  }
  return null}
*/






router.post('/:id/comments', async (request, response) => {

  let newcomment = request.body
  const id=request.params.id


  newcomment.blog=id

const comment = new Comment(newcomment)
  
  /*let result= await comment
    .save()*/




let respon=await Blog.find({ _id: id }).populate('comments')

respon[0].comments.push(comment)



  respon=await Blog.updateOne({ _id: id }, respon[0])

  response.json((respon[0]))

  response.status(204).end()






}
)





router.post('/', async (request, response) => {


  //const token = getTokenFrom(request)
  const token=request.body.token
  //const token = getTokenFrom(request)  


  let decodedToken=false
  try{ decodedToken = jwt.verify(token, process.env.SECRET) } catch(error) {
    console.log(error)

    return response.status(401).json(
      { error: 'token missing or invalid' })
  }



  if (!token || !decodedToken)
  {

    return response.status(401).json(
      { error: 'token missing or invalid' })
  }
  let user = await User.findById(decodedToken.id)
  if (user===null)
  {return response.status(401).json(
    { error: 'user is null' }) }


  let objecttopost=request.body

  if (!(objecttopost.likes))
    objecttopost.likes=0



  if(!(objecttopost.url))
    response.status(400).end()

  if(!(objecttopost.title))
    response.status(400).end()





  /*
let someuser=await User.find({})
if (someuser.length>0)
{someuser=someuser[0]
objecttopost.user=someuser.id}
*/

  objecttopost.user=user.id

  const blog = new Blog(objecttopost)
  /*
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
*/

  let result= await blog
    .save()


user.blogs.push(blog)



await User.updateOne({ _id: user.id }, user)



  response.status(201).json(result)
  /**/



})









module.exports = router