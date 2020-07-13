import React from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { addablog} from '../reducers/anecdoteReducer'

import {  Form, Button } from 'react-bootstrap'

const BlogForm = () => {

const dispatch = useDispatch()
    


    return (



      <div>


        <Form onSubmit={(event)=>{event.preventDefault();dispatch(addablog(event))}}>
<Form.Group>
          <Form.Label>author:</Form.Label>
          {/*<input className="authorContent" type="text" name="author" placeholder="author"
            />*/}
            <Form.Control
            type="text"
            name="author"
          />
          <br/>
          <Form.Label>url:</Form.Label>
          {/*<input className="urlContent" type="text" name="url" placeholder="url"
            />*/}
            <Form.Control
            type="text"
            name="url"
          />
          <br/>
          <Form.Label>title:</Form.Label>
          {/*<input className="titleContent" type="text" name="title" placeholder="title"
            />*/}
            <Form.Control
            type="text"
            name="title"
          />
          <Button variant="primary" type="submit" className="submit"> submit</Button>
</Form.Group>
        </Form>

      </div>


    )}


    export default BlogForm
