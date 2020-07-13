const mongoose = require('mongoose')
require('mongoose-unique-validator')
// Replace with the URL of your own database. Do not store the password on GitLab!
require('dotenv').config()



require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {  MONGODB_URI = process.env.TEST_MONGODB_URI}
module.exports = {
  MONGODB_URI,
  PORT
}


mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(MONGODB_URI,{ poolSize: 30, bufferMaxEntries: 0, useNewUrlParser: true })


const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [    
  {      type: mongoose.Schema.Types.ObjectId,      ref: 'Comment'    }  
  ]
})



blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog
