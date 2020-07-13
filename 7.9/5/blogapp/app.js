var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')


const bodyParser = require('body-parser')

//var indexRouter = require('./routes/index');
var blogsRouter = require('./controllers/blogs')
var usersRouter = require('./controllers/users')
var loginRouter = require('./controllers/login')
var commentsRouter = require('./controllers/comments')
const cors = require('cors')
const mongoose = require('mongoose')

var app = express()

app.use(cors())


require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI


if (process.env.NODE_ENV === 'test') {  MONGODB_URI = process.env.TEST_MONGODB_URI}
module.exports = {
  MONGODB_URI,
  PORT
}

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))





const tokenExtractor = (request, response, next) => {
  // console.log('extractingextractingextractingextractingextractingextractingextractingextractingextractingextractingextractingextractingextractingextracting')
  //console.log(request.headers.authorization)
  request.body.token=request.headers.authorization

  if (request.body.token && request.body.token.toLowerCase().startsWith('bearer ')){
  request.body.token= request.body.token.substring(7)  } 


  next()
}


app.use(tokenExtractor)


app.use('/api/comments', commentsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/login', loginRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

app.use(bodyParser.json())



// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.use(express.static('build'))

module.exports = app
