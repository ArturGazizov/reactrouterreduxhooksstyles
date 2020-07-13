import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import Blog from './Blog'
import BlogForm from './BlogForm'

import { render, fireEvent } from '@testing-library/react'

test('renders content', () => {
  const blog = {
    title: 'Component testing mesting',
    url: "ggg.c"
  }



  const component = render(
    <Blog blog={blog} functions={()=>{}} functions2={()=>{}}/>
  )

  expect(component.container).toHaveTextContent(
    'onent testing mes'
  )

  expect(component.container).toHaveTextContent(
    'ggg.c'
  )
})


test('renders likes', () => {


  const blog = {
    title: 'Component testing mesting',
    url: "ggg.c"
  }



  const component = render(
    <Blog blog={blog} functions={()=>{}} functions2={()=>{}}/>
  )




const button = component.getByText('Show')
fireEvent.click(button)
/**/
expect(component.getByText('likes:')).toBeVisible()
expect(component.getByText('url:')).toBeVisible()

  expect(component.container).toHaveTextContent(
    'url:'
  )

})








test('likes 2 times', () => {





const blog = {
    title: 'Component testing mesting',
    url: "ggg.c"
  }


const liking=jest.fn()

  const component = render(
    <Blog blog={blog} functions={liking} functions2={()=>{}}/>)
  
const button = component.getByText('Show')
fireEvent.click(button)

const button2 = component.getByText('Like')
fireEvent.click(button2)
fireEvent.click(button2)

expect(liking).toHaveBeenCalledTimes(2)


})




test('form send correct data', () => {





const gettingdata=jest.fn( theobject=>{} )




  const component = render(<BlogForm addingfunction={gettingdata}/>)

const authorfield = component.container.querySelector('.authorContent')
const titlefield = component.container.querySelector('.titleContent')
const urlfield = component.container.querySelector('.urlContent')

 fireEvent.change(authorfield, { 
    target: { value: 'testing' } 
  })

fireEvent.change(urlfield, { 
    target: { value: 'is' } 
  })

fireEvent.change(titlefield, { 
    target: { value: 'goddish' } 
  })

  const button = component.getByText('submit')
fireEvent.click(button)

expect(gettingdata.mock.calls[3][0]).toEqual({ url: 'is', author: 'testing', title: 'goddish' })

})












