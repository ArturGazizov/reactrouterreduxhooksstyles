
Cypress.config('failOnStatusCode', false)

describe('Login form', function() {


    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }


beforeEach(function() {

    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')

    


//cy.request({"options":{"log"	:true}})
cy.request('GET', 'http://localhost:3000/api/users/').
then(response => 
{
	let existing=(response.body.find((it)=>it.name==user.name&&it.username==user.username))

if (existing)
	{
		cy.log(existing.id)
cy.request("DELETE",'http://localhost:3000/api/users/'+existing.id)

	}


cy.request('POST', 'http://localhost:3001/api/users/',user)/**/
//cy.log(Object.keys(response.body).toString())
//cy.log((response.body.find((it)=>it.name==user.name&&it.password==user.password)).toString())
})
/*
    cy.request('POST', 'http://localhost:3001/api/users/',user).then(response => {
    if (response.status==400)
cy.log("user with that name already exists, cannot create")

    })
*/


  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
cy.get('form:first')    
cy.get('.theform')  
  })



describe('Login',function() {
    it('succeeds with correct credentials', function() {
cy.get('input:first').type(user.username)
  cy.get('input:last').type(user.password)
 cy.get('button:last').click()
  cy.get('.success')
    .should('contain', 'Successfully logged on server')
  cy.get('html')
    .should('contain', 'Matti Luukkainen logged in')
 /*   .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')
*/
  cy.get('html').should('not.contain', 'rong credentials')
//cy.request('POST', 'http://localhost:3001/login',{'username':user.username,'password':'wrong password'})
    })
    it('fails with wrong credentials', function() {
cy.get('input:first').type(user.username)
  cy.get('input:last').type("user.password")
 cy.get('button:last').click()
 
  cy.get('.error')
    .should('contain', 'rong credentials')
 /*   .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')
*/
  cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
//cy.request('POST', 'http://localhost:3001/login',user)
    })
  })




describe.only('When logged in', function() {
    beforeEach(function() {

    //cy.request('POST', 'http://localhost:3001/login',user)
    cy.get('input:first').type(user.username)
  cy.get('input:last').type(user.password)
 cy.get('button:last').click()

      // log in user here
    })

    it('A blog can be created and liked', function() {

cy.get('.newblog').click()

cy.get('.authorContent').type(user.username)
cy.get('.titleContent').type(user.name)
cy.get('.urlContent').type("user.password")

		cy.request('GET', 'http://localhost:3000/api/blogs/').
		then(response => 
		{
			let existing=(response.body.filter(it=>(it.author==user.username&&it.title==user.name&&it.url=="user.password"))).length
			cy.get('.submit').click()
//cy.log("exactly that blog added??")
			cy.wait(2000)

				cy.request('GET', 'http://localhost:3000/api/blogs/').
				then(response2 => 
				{
					let existing2=(response2.body.filter(it=>(it.author==user.username&&it.title==user.name&&it.url=="user.password"))).length
					expect(existing2-existing).to.eql(1)
					if ((existing2-existing)===1)
						cy.log("exactly that blog added")
					cy.get('.showblog').click()
					cy.get('.alike').click()
					cy.request('GET', 'http://localhost:3000/api/blogs/').
					then(response3 => 
					    {
					    	let existing=(response3.body.find(it=>(it.author==user.username&&it.title==user.name&&it.url=="user.password")))
							expect(existing.likes).to.eql(1)
					    })
					
				})

			

			
		})

		

cy.get('.logout').click()

      // ...
    })


it('A blog can be liked', function() {


cy.get('.newblog').click()

cy.get('.authorContent').type(user.username)
cy.get('.titleContent').type(user.name)
cy.get('.urlContent').type("user.password")
cy.get('.submit').click()
cy.get('.logout').click()
cy.wait(1000)
    cy.get('input:first').type(user.username)
  cy.get('input:last').type(user.password)
 cy.get('button:last').click()
cy.wait(1000)


cy.request('GET', 'http://localhost:3000/api/blogs/').
		then(response => 
		{
		cy.get('.showblog').first().click()
		cy.get('.alike').click()
cy.wait(1000)
		cy.request('GET', 'http://localhost:3000/api/blogs/').
			then(response2 => 
			    {
			    	let they=response.body
			    	let they2=response2.body

			    	let difference=0
			    	they.map((it)=>they2.find((it2)=>{if (it.id==it2.id) difference+=it2.likes-it.likes; return (it.id==it2.id)}))
			    	expect(difference).to.eql(1)
			    })

		})
cy.get('.logout').click()
})





 it('Blogs are ordered correctly', function() {

cy.get('.newblog').click()

cy.get('.authorContent').type(user.name)
cy.get('.titleContent').type("xsxsdddxsxs")
cy.get('.urlContent').type("xsxsxsxddsxs.x")
cy.get('.submit').click()

cy.get('.authorContent').type(user.username)
cy.get('.titleContent').type("xsxssssssssxsxs")
cy.get('.urlContent').type("xsxsxsssssssxsxs.x")
cy.get('.submit').click()

cy.get('.authorContent').type(user.name)
cy.get('.titleContent').type("xsxdddddddsxsxs")
cy.get('.urlContent').type("xsxsdddddddddxsxsxs.x")
cy.get('.submit').click()

cy.get('.authorContent').type(user.username)
cy.get('.titleContent').type("xsxsoooooooooooxsxs")
cy.get('.urlContent').type("xsxsxooooooooosxsxs.x")
cy.get('.submit').click()

cy.get('.authorContent').type(user.name)
cy.get('.titleContent').type("xsxiiiiiiiiiisxsxs")
cy.get('.urlContent').type("xsxsxiiiiiiiiiiisxsxs.x")
cy.get('.submit').click()
cy.wait(1500)

cy.get('.showblog').click({ multiple: true })
cy.wait(1900)
let times=[5,1,2,8,4]



cy.get('.alike').each(($el, index, $list) => 
{
for (let i = 0; i < times[index]; i++) {
  $el.click()
}

})

cy.visit('http://localhost:3000')
cy.wait(1500)

cy.get('.showblog').click({ multiple: true })
cy.wait(1000)


times.sort()
times.reverse()

cy.get('.amountoflikes')
.each(($el, index, $list) => {expect(parseInt($el.text())).to.eql(times[index])
})




 })




















  })












describe.only('When different users exist', function() {
    

	const user = {
	      name: 'Matti Luukkainen',
	      username: 'mluukkai',
	      password: 'salainen'
	    }
	const user2 = {
	      name: 'Matti Luukkainen2',
	      username: 'mluukkai2',
	      password: 'salainen2'
	    }



    beforeEach(function() {

		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.visit('http://localhost:3000')


		cy.request('POST', 'http://localhost:3001/api/users/',user)
		cy.request('POST', 'http://localhost:3001/api/users/',user2)


		cy.get('input:first').type(user.username)
		  cy.get('input:last').type(user.password)
		 cy.get('button:last').click()
		 cy.wait(2000)
		 cy.get('.newblog').click()

		cy.get('.authorContent').type(user.username)
		cy.get('.titleContent').type(user.name)
		cy.get('.urlContent').type("user.password")
		cy.get('.submit').click()
		cy.get('.logout').click()



		cy.get('input:first').type(user2.username)
		  cy.get('input:last').type(user2.password)
		 cy.get('button:last').click()
		 cy.wait(2000)
		 cy.get('.newblog').click()
		cy.get('.authorContent').type(user2.username)
		cy.get('.titleContent').type(user2.name)
		cy.get('.urlContent').type("user.password")
		cy.get('.submit').click()
		cy.get('.logout').click()
	})

it('A blog can deleted only by author', function() {

		cy.get('input:first').type(user.username)
		  cy.get('input:last').type(user.password)
		 cy.get('button:last').click()
cy.wait(2000)

cy.get('.showblog').click({ multiple: true })

cy.get('.delete').first().click()
cy.get('html').should('not.contain', 'not yours to delete')
cy.wait(1000)
cy.get('.delete').first().click()
cy.get('html').should('contain', 'not yours to delete')
	})

})








//












})



