const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {  MONGODB_URI = process.env.TEST_MONGODB_URI}
module.exports = {
  MONGODB_URI,
  PORT
}


beforeAll(done => {
  done()
})
mongoose.connect(MONGODB_URI,{ poolSize: 30, bufferMaxEntries: 0, useNewUrlParser: true })



describe('api', () => {
  test('notes are returned as json', async () => {




    // execution gets here only after the HTTP request is complete
    // the result of HTTP request is saved in variable res

    await api.delete('/api/blogs')



    await api.post('/api/blogs').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjExMTEiLCJpZCI6IjVlZWFjMThkZmM3MDUzNzAwMGRkMjc4NCIsImlhdCI6MTU5MjQ0Mzk4NH0.D4TJ502z-eudWntUaPKneg3kaoS6iSfc2CVZdl7OcRs').send({ title: 'g',author: 'b',url: 'f',likes: 0 }).expect(201)

    const res = await api.get('/api/blogs')

    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await expect(res.body).toHaveLength(1)




  })
})






describe('api2', () => {
  test('notes are defined by id', async () => {

    await api.delete('/api/blogs')
    await api.post('/api/blogs').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjExMTEiLCJpZCI6IjVlZWFjMThkZmM3MDUzNzAwMGRkMjc4NCIsImlhdCI6MTU5MjQ0Mzk4NH0.D4TJ502z-eudWntUaPKneg3kaoS6iSfc2CVZdl7OcRs').send({ title: 'a',author: 's',url: 'x',likes: 0 })



    let blogs=await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })
})





describe('posting', () => {
  test('posting works', async () => {


    await api.delete('/api/blogs')


    let uniquetitle=(Math.random()*3).toString()

    let ablog=	{
      title: uniquetitle,
      author: 'uniqueString',
      url: 'superurl',
      likes: 1
    }

    const blogs=await api.get('/api/blogs')
    const initiallength=(blogs.body).length

    await api.post('/api/blogs').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjExMTEiLCJpZCI6IjVlZWFjMThkZmM3MDUzNzAwMGRkMjc4NCIsImlhdCI6MTU5MjQ0Mzk4NH0.D4TJ502z-eudWntUaPKneg3kaoS6iSfc2CVZdl7OcRs').send(ablog)//.expect(201)

    const blogs2=await api.get('/api/blogs')
    const initiallength2=(blogs2.body).length

    const difference=initiallength2-initiallength

    expect(difference).toBe(1)


    let found=blogs2.body.find((t) => t.title===uniquetitle)


    expect({ url:found.url,author:found.author,likes:found.likes,title:found.title }).toEqual({
      title: uniquetitle,
      author: 'uniqueString',
      url: 'superurl',
      likes: 1
    })



  })



  test('posting without like works', async () => {
    let uniquetitle=(Math.random()*3).toString()
    let ablog=	{
      title: uniquetitle,
      author: 'uniqueString',
      url: 'superurl',
    }
    await api.post('/api/blogs').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjExMTEiLCJpZCI6IjVlZWFjMThkZmM3MDUzNzAwMGRkMjc4NCIsImlhdCI6MTU5MjQ0Mzk4NH0.D4TJ502z-eudWntUaPKneg3kaoS6iSfc2CVZdl7OcRs').send(ablog)//.expect(201)
    const blogs=await api.get('/api/blogs')
    let found=blogs.body.find((t) => t.title===uniquetitle)
    expect(found.likes).toBe(0)
  })




  test('posting without title and url fails', async () => {
    let ablog=	{
      author: 'uniqueString',
    }
    await api.post('/api/blogs').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjExMTEiLCJpZCI6IjVlZWFjMThkZmM3MDUzNzAwMGRkMjc4NCIsImlhdCI6MTU5MjQ0Mzk4NH0.D4TJ502z-eudWntUaPKneg3kaoS6iSfc2CVZdl7OcRs').send(ablog).expect(400)
  })





})




afterAll(done => {
  mongoose.connection.close()
  done()
})
/**/