
const listHelper = require('../utils/list_helper')


describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})


describe('total amount of likes', () => {
  test('count likes', () => {

    const blogs = [{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 5 }]

    const result = listHelper.countlikes(blogs)
    expect(result).toBe(7)
  })
})




describe('most likes', () => {
  test('most likes', () => {

    const blogs = [{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 5 }]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({  title: 'String',
      author: 'String',
      url: 'String',
      likes: 5 })
  })
})












describe('next', () => {
  test('most blogs', () => {

    const blogs = [{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'String',
      url: 'StWring',
      likes: 5 },


    {  title: 'String',
      author: 'Strin1g',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'Strin2g',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'Strin1g',
      url: 'String',
      likes: 5 }

    ]
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author:'String',blogs: 3 })
  })})





describe('most liked author', () => {
  test('most likes', () => {





    const blogs = [{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'String',
      url: 'String',
      likes: 1 },


    {  title: 'String',
      author: 'Strin1g',
      url: 'String',
      likes: 1 },{  title: 'String',
      author: 'Strin2g',
      url: 'String',
      likes: 8 },{  title: 'String',
      author: 'Strin1g',
      url: 'String',
      likes: 2 }
    ]








    const result = listHelper.mostLikes(blogs)


    //expect(result).toEqual({ author:'Strin2g',likes: 8 })


  })})