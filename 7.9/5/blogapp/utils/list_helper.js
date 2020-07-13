// Load the full build.
var _ = require('lodash')
// Load the core build.
var _ = require('lodash/core')
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp')
 
// Load method categories.
var array = require('lodash/array')
var object = require('lodash/fp/object')

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
//var at = require('lodash/at')
//var curryN = require('lodash/fp/curryN')


const dummy = (blogs) => {
  // ...


  return 1
}







const countlikes = (blogs) => {
  // ...


  return blogs.map((it) => it.likes).reduce((a, b) => a + b)
}



const favoriteBlog = (blogs) => {
  // ...


  return blogs.reduce((a, b) => a.likes>b.likes? a : b)
}





const mostBlogs = (blogs) => {
  // ...


  let tally = _.reduce(blogs, (total, next) => {

    total[next.author] = (total[next.author] || 0) + 1 

    return total
  }, {})

  let author=Object.keys(tally).reduce((first1,second1) => { return tally[first1]>tally[second1]?first1:second1 })

return { author:author,blogs:tally[author] }//{[author]:tally[author]}
}



const mostLikes= (blogs) => {

  let tally = _.reduce(blogs, (result, blog) => {

    result[blog.author] || (result[blog.author] = 0)

    result[blog.author]+=blog.likes
    return result
  }, {})


  let author=Object.keys(tally).reduce((first1,second1) => { return tally[first1]>tally[second1]?first1:second1 })

return { author:author,likes:tally[author] }



}



module.exports = {
  dummy,countlikes,favoriteBlog,mostBlogs,mostLikes
}