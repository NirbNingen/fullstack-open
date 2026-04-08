describe('Blog app', function () {
  beforeEach('when visiting localhost', function () {
    cy.visit('http://localhost:5173/')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    const user2 = {
      name: 'Martine Zwart',
      username: 'mzwart',
      password: 'jajoh',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
  })
  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('log in')
  })

  describe('when Matti is logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:5173/')
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen has logged in')

      cy.contains('new blog').click()
      cy.get('#title').type('Likeable blog from cypress')
      cy.get('#author').type('Cypress Family')
      cy.get('#url').type('https://important-website.com')
      cy.get('#create-blog').click()
    })
    it('user can create blog', function () {
      cy.contains('Likeable blog from cypress')
    })
    it('User can like a blog', function () {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })
    it('The user who created the blog can delete it ', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Deletable blog from cypress')
      cy.get('#author').type('Cypress Family')
      cy.get('#url').type('https://important-website.com')
      cy.get('#create-blog').click()
      cy.contains('Deletable blog from cypress')
        .parent()
        .find('button')
        .contains('view')
        .click()
        .then(() => {
          cy.contains('Deletable blog from cypress')
            .parent()
            .find('button')
            .contains('remove')
            .click()
          cy.on('window:confirm', (text) => {
            expect(text).to.include('Do you want to delete')
            return true
          })
        })
      // cy.get('html').should(
      //   'not.contain',
      //   'Likeable blog from cypress by Cypress Family',
      // )
    })
  })
})

describe('Login', function () {
  beforeEach('While a second user logged in', function () {
    cy.visit('http://localhost:5173/')
    cy.contains('log in').click()
    cy.get('#username').type('mzwart')
    cy.get('#password').type('jajoh')
    cy.get('#login-button').click()
    cy.contains('Martine Zwart has logged in')
  })
  it("User can't delete other users' blogs", function () {
    cy.contains('Likeable blog from cypress')
    cy.contains('view').click()
    cy.get('remove-button').should('not.exist')
  })

  it('Blogs are ordered by likes', function () {
    cy.contains('new blog').click()
    cy.get('#title').type('Blog with 0 likes')
    cy.get('#author').type('Cypress Family')
    cy.get('#url').type('https://important-website.com')
    cy.get('#create-blog').click()

    cy.contains('new blog').click()
    cy.get('#title').type('Blog with 1 like')
    cy.get('#author').type('Cypress Family')
    cy.get('#url').type('https://important-website.com')
    cy.get('#create-blog').click()
    cy.contains('Blog with 1 like')
      .parent()
      .find('button')
      .contains('view')
      .click()
    cy.contains('Blog with 1 like')
      .parent()
      .find('button')
      .contains('like')
      .click()

    cy.wait(500)

    cy.get('.blog').eq(0).should('contain', 'Blog with 1 like')
    cy.get('.blog').eq(1).should('contain', 'Likeable blog from cypress')
  })
})
