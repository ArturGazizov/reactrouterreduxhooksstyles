import blogService from '../services/blogs'
import usersService from '../services/users'

export const notificationReducer=(state = {className:'',text:""}, action)=>
{
switch (action.type) {
    case 'arbitrary_notification':
      return (action.data)
    default:
      return state
}
}


export const unvisablog=(id)=>
{return async dispatch =>{
dispatch({type: 'unvis',data: { id },})
} }
export const visablog=(id)=>
{return async dispatch =>{
  dispatch({type: 'vis',data: { id },})
} }


  function comparelikes(a, b) {
    if (a.likes > b.likes ) {
      return -1
    }
    if (a.likes < b.likes) {
      return 1
    }
  // a must be equal to b
    return 0;
  }



export const LoginVisibleReducer=(state = null, action)=>
{
  switch (action.type) {
    case 'ltrue':
      return true
    case 'lfalse':
      return false
    default:
      return state
  }
}



export const BlogformVisibleReducer=(state = null, action)=>
{
  switch (action.type) {
    case 'bftrue':
      return true
    case 'bffalse':
      return false
    default:
      return state
  }
}




export const addacomment=(id,comment)=>
{

return async dispatch =>{
blogService.updatecomments(id,comment).then(
dispatch({type: 'addcomment',data: { id,comment },})
)
}
}



export const addauser=(user)=>
{return async dispatch =>{dispatch({type: 'set',data: user,})}}


export const userReducer=(state = null, action)=>
{
  switch (action.type) {
    case 'set':
      return action.data
    default:
      return state
  }
}





export const usersReducer=(state = [], action)=>
{
  switch (action.type) {
    case 'set2':
      return action.data
    default:
      return state
  }
}






export const blogsReducer=(state = [], action)=>
{
  switch (action.type) {
    case 'vote':
      return [{...state.find((it)=>it.id==action.data.id),likes:state.find((it)=>it.id==action.data.id).likes+1},...state.filter(x=>x.id!=action.data.id)].sort(comparelikes)
    case 'vis':
      return [{...state.find((it)=>it.id==action.data.id),blogVisible:true},...state.filter(x=>x.id!=action.data.id)].sort(comparelikes)
    case 'unvis':
      return [{...state.find((it)=>it.id==action.data.id),blogVisible:false},...state.filter(x=>x.id!=action.data.id)].sort(comparelikes)
    case 'add':
      return [...state,action.data.ablog].sort(comparelikes)
    case 'addcomment':
      return [{...state.find((it)=>it.id==action.data.id),comments:(state.find((it)=>it.id==action.data.id).comments.concat(action.data.comment))},...state.filter(x=>x.id!=action.data.id)].sort(comparelikes)
    case 'delete':
      return [...state.filter(x=>x.id!=action.data.id)]
    case 'INIT_ans':
      return action.data.sort(comparelikes)
    default:
      return state
  }
}







export const addablog = event => {
  return async dispatch => {
 const ablog = {'author':event.target.author.value,
'url':event.target.url.value,
'title':event.target.title.value,
'likes':0, 'blogVisible':false}
  blogService
      .create(ablog).then(() => {
dispatch({type: 'add',data: { ablog },})
dispatch(setNotification((`'${ablog.title}' was added`),5000))
})
  }
}



export const initializeBlogs = () => {
  return async dispatch => {
    const notes = await blogService.getAll()
    dispatch({
      type: 'INIT_ans',
      data: notes,
    })
  }
}



export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'set2',
      data: users,
    })
  }
}









export const setNotification = (data,miliseconds) => {
  return async dispatch => {

dispatch({
      type: 'arbitrary_notification',
      data: data,
    })
const timer=setTimeout(function(){dispatch({
      type: 'arbitrary_notification',
      data: {className:'',text:''},
    })},miliseconds)

dispatch({
      type: 'restart',
      data: timer,
    })

  }
}



export const restartReducer=(state = null, action)=>
{
switch (action.type) {
    case 'restart':
      if (state==null)
          return action.data
      else
        clearTimeout(state)
      return action.data
    default:
      return state
}
}


export const likeablog = (id) => {

return async dispatch => {
const notes = await blogService.getAll()


let anobject=notes.find((it)=>it.id==id)
anobject.likes+=1
delete anobject.user
await blogService.update(id,anobject)
dispatch(setNotification(({className:'success',text:`'${anobject.title}' was liked`}),5000))
dispatch({
      type: 'vote',
      data: { id }
    })
}
}



export const removeablog = (id) => {

return async dispatch => {
const notes = await blogService.getAll()


let anobject=notes.find((it)=>it.id==id)

delete anobject.user
blogService.remove(anobject).then(response=> {dispatch(setNotification(({className:'success',text:`'${anobject.title}' was deleted`}),5000))
dispatch({
      type: 'delete',
      data: { id }
    })
}).
catch(error=>{console.log('2222222');dispatch(setNotification({text:error.message+" the blog is not yours",className:'error'},5000))})

}
}