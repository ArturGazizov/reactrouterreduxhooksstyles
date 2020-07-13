import React from 'react'
import { useSelector,useDispatch } from 'react-redux'

import {Alert} from 'react-bootstrap'
/*
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }


  if (message.endsWith('ed'))
    return (
      <div className="success">
        {message+' on server'}
      </div>
    )

  if (message.length)
    return (
      <div className="error">
        {message}
      </div>
    )

  return null

}
*/


const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state=>state.notification)
console.log(notification)
  return (
    <div >
        <Alert variant={notification.className}>      {notification.text}    </Alert>
    </div>
  )
}

export default Notification