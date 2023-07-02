Cypress.Commands.add('login', (email, password) => {
    cy.session([email, password], () => {
        cy.visit('https://kasirdemo.belajarqa.com')
        cy.location('pathname').should('eq', '/login')
        cy.get('#email').clear().type(email)
        cy.get('#password').clear().type(password)
        cy.get('button[type="submit"]').click()
        cy.location('pathname').should('eq', '/dashboard')
    },
        {
            cacheAcrossSpecs: true
        })
})