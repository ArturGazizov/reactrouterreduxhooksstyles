import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'


import {Card,Accordion,Table,Navbar,Nav,Button} from 'react-bootstrap';

import { useDispatch,useSelector } from 'react-redux'

import {addacomment,removeablog, likeablog,addauser,initializeUsers,initializeBlogs,setNotification } from './reducers/anecdoteReducer'


import PropTypes from 'prop-types'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"

const App = () => {

  const dispatch = useDispatch()


    useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch]) 


const users = useSelector(state => state.users)
useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch]) 


const blogs = useSelector(state => state.blogs)
const user = useSelector(state => state.user)





const loginVisible = useSelector(state => state.LoginVisible)
const blogformVisible = useSelector(state => state.BlogformVisible)



 useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(addauser(user))

      blogService.setToken(user.token)

    } 
},
  [])


 
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
dispatch(addauser(null))
          setNotification({text:'Logged out',className:'success'},5000)

  }

  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {

      const user = await loginService.login({
        username:event.target.username.value, password:event.target.password.value,
      })



      window.localStorage.setItem(        'loggedNoteappUser', JSON.stringify(user))

      dispatch(addauser(user))


dispatch({type: 'bffalse'})

      blogService.setToken(user.token)

      setNotification({text:'Successfully logged',className:'success'},5000)


    } catch (exception) {


      setNotification({text:'Wrong credentials',className:'warning'},5000)
    
    }
  }








  


  const loginForm = () =>




  {


    return(
      <div>



        <h2>Log in to application</h2>

        <div>

          <form className='theform' onSubmit={(event)=>handleLogin(event)}>     
            <div>          username          
              <input            type="text"                      name="username" 
                                   />        </div>        
                                   <div>          
                                   password            
          <input            type="password"          name="password"          
                     />        </div>        <Button size="xxl" type="submit">login</Button> 
                         </form>


        </div>
      </div>)
  }



  const afunction= (anobject) => { return () => {
    anobject.likes+=1
    //delete anobject.id
    delete anobject.user
    /**/
    blogService.update(anobject.id,anobject).then((res) => {

    })
  }
  }


  const afunction2= (anobject) => { return () => {


    blogService.remove(anobject).then((res) => {



      let filteredblogs=blogs.filter((it) => (it.id!==anobject.id))


    }).catch((error) => {console.log(error.response.data);

setNotification({text:error.message+error.response.data.error,className:'warning'},5000)
})
  }
  }


  const SecondPage = (n,handleLogout) =>

  {

    const hideWhenVisible2 = { display: blogformVisible ? 'none' : '' }
    const showWhenVisible2 = { display: blogformVisible ? '' : 'none' }

const match = useRouteMatch('/users/:id')
  const auser = match 
    ? users.find(note => (note.id) === (match.params.id))
    : null

const match2 = useRouteMatch('/blogs/:id')
  const ablog = match2 
    ? blogs.find(note => (note.id) === (match2.params.id))
    : null



/**/




    return (<div>

      {n} logged in <button className='logout' onClick={handleLogout} value="log out">log out</button>
      <br/>
      



<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#" as="span">


<Link to="/" bg="dark">blogs</Link>


</Nav.Link>
      <Nav.Link href="#" as="span">


<Link to="/users">&nbsp;users</Link>

        </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

      <Route exact path="/users">
          <Users/>
        </Route>
        <Route exact path="/users/:id">
          <User user={auser}/>
        </Route>



<Route exact path="/blogs/:id">
          <Blogpage blog={ablog}/>
        </Route>

        <Route exact path="/">
      <h2>blogs</h2>
      <button style={showWhenVisible2} onClick={() => dispatch({type: 'bffalse'})}>cancel</button>
      <div style={hideWhenVisible2}>
        <button className='newblog' onClick={() => dispatch({type: 'bftrue'})}>new blog</button>
      </div>
      <div style={showWhenVisible2}>
        <BlogForm />
      </div>

<Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>

    <Table striped>
    <tbody>
      {blogs.map(blog =>
        <tr key={blog.id}><Blog key={blog.id} blog={blog} functions={afunction(blog)} functions2={afunction2(blog)}/></tr>

      )}
      </tbody>
</Table>
</Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion>



</Route>
    </div>)}




const Blogpage = (props) =>
  {

let ablog={likes:0,url:"",author:"",title:"",comments:[]}
if(props.blog)
  ablog=props.blog

    return (

    <div><h1>{ablog.title}</h1>
    <a href={ablog.url}>{ablog.url}</a>
    <p>{ablog.likes} likes <button onClick={() =>dispatch(likeablog(ablog.id))}>like</button></p>
    
    <button onClick={() =>dispatch(removeablog(ablog.id))}>delete</button>
<p>added by {ablog.author}</p>
<form onSubmit={(event)=>{event.preventDefault();
dispatch(addacomment(ablog.id,{'text':event.target.comment.value}))}}>
<input type='text' name='comment' placeholder='leave a comment'></input>
<button>submit</button>
</form>
<h2>comments</h2>
{ablog.comments.map(comment =>
        <div>{comment.text}</div>
      )}

    </div>
    )

  }






const User = (props) =>
  {

let auser={name:"",blogs:[]}
if(props.user)
  auser=props.user

    return (

    <div><h1>{auser.name}</h1>
    <h2>added blogs</h2>

{auser.blogs.map((it)=>(<div>{it.title}</div>))}
    </div>
    )

  }

  const Users = () =>

  {

    return (<div>

<table><tr><td></td><td>blogs created</td></tr>
{users.map((it)=>(<tr><td><a href={'users/'+it.id}>{it.username}</a></td><td>{it.blogs.length}</td></tr>))}
</table>
    </div>)}

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    functions: PropTypes.func.isRequired,
    functions2: PropTypes.func.isRequired,
  }





  return(<div><Notification/>

{user === null       ? loginForm()
      : (<div>

          {SecondPage(user.name,handleLogout)}

</div>)
              }



  </div>)














}

export default App