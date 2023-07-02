describe("Test Login kasirAja", () => {
    it("Login with valid cred", () => {
        cy.visit('/')
        cy.location('pathname').should('eq', '/login')
        cy.get('#email').type("testingrifqi@yopmail.com")
        cy.get('#password').type("testing123")
        cy.get('button[type="submit"]').click()

        //assert url path dashboard
        cy.location('pathname').should('eq', '/dashboard')
        //assert text kasirAja on dashboard page
        cy.get('h3').invoke('text').should('contain', 'kasirAja');
        //assert text greeting "hai" on dashboard page
        cy.get('dd').invoke('text').should('contain', 'hai');
    })

    it("Login with invalid cred (Negative Case)", () => {
        cy.visit('/')
        cy.location('pathname').should('eq', '/login')
        cy.get('#email').type("emailpalsu@yopmail.com")
        cy.get('#password').type("passwordPalsu")
        cy.get('button[type="submit"]').click()

        //assert alert tooltips info
        cy.get('div[role="alert"]').should('have.text','Kredensial yang Anda berikan salah');
    })

    it("Login without inputting email (Negative Case)", () => {
        cy.visit('/')
        cy.location('pathname').should('eq', '/login')
        cy.get('#password').type("testing123")
        cy.get('button[type="submit"]').click()

        //assert alert tooltips info
        cy.get('div[role="alert"]').should('have.text','"email" is not allowed to be empty');
    })

    it("Login without inputting password (Negative Case)", () => {
        cy.visit('/')
        cy.location('pathname').should('eq', '/login')
        cy.get('#email').type("emailpalsu@yopmail.com")
        cy.get('button[type="submit"]').click()

        //assert alert tooltips info
        cy.get('div[role="alert"]').should('have.text','"password" is not allowed to be empty');
    })
})