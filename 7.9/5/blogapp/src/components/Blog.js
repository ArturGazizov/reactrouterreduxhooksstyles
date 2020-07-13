import React, { useState, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { likeablog,removeablog,unvisablog,visablog} from '../reducers/anecdoteReducer'

const Blog = ({ blog,functions,functions2 }) => {

  const dispatch = useDispatch()
  //const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blog.blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blog.blogVisible ? '' : 'none' }

  return (
  <div  className='blog' style={{ 'border-style': 'solid','width':200 }}>
<td>
  <div className='blog'>
<a href={'blogs/'+blog.id}>title:{blog.title}</a>

<br/> author:{blog.author}<br/>
</div>
</td>
<td>
      <div style={showWhenVisible}>
        <button className="hide" onClick={() => dispatch(unvisablog(blog.id))}>hide</button><br/>
    <span>likes:</span><span className="amountoflikes">{blog.likes}</span>&nbsp;
        <button className="alike" onClick={() =>dispatch(likeablog(blog.id))}
        >Like</button><br/><span>url:</span>{blog.url}

        <button className="delete" onClick={() =>dispatch(removeablog(blog.id))}> delete</button>

      </div>
      <button className="showblog" style={hideWhenVisible} onClick={() => dispatch(visablog(blog.id))}>Show</button>
      </td>
    </div>
  )}

export default Blog
