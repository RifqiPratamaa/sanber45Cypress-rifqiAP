beforeEach(() => {
    cy.login('testingrifqi@yopmail.com', 'testing123')
})

describe("CREATE Kategori kasirAja", () => {
    it("Create kategori with valid input", () => {
        cy.visit('/')
        
        //assert already login & on dashboard menu
        cy.location('pathname').should('eq', '/dashboard')
        cy.get('a[href="/categories"]').click()

        //assert already on category menu
        cy.location('pathname').should('eq', '/categories')
        cy.get('a[href="/categories/create"]').click()
        cy.get('#nama').type("Makanan Ringan 1")
        cy.get('#deskripsi').type("Ini adalah deskripsi kategori makanan ringan 1")
        cy.contains('button', 'simpan').click()

        cy.wait(1000)

        // assert message "success"
        cy.contains("success")

        // assert message "item ditambahkan"
        cy.contains("item ditambahkan");
    })

    it("Create kategori without input Category Name (Negative Case)", () => {
        cy.visit('/')
        
        //assert already login & on dashboard menu
        cy.location('pathname').should('eq', '/dashboard')
        cy.get('a[href="/categories"]').click()

        //assert already on category menu
        cy.location('pathname').should('eq', '/categories')
        cy.get('a[href="/categories/create"]').click()
        cy.get('#deskripsi').type("Ini adalah deskripsi kategori makanan ringan 1")
        cy.contains('button', 'simpan').click()

        // assert message error handling
        cy.get('div[role="alert"]').should('have.text','"name" is not allowed to be empty');
    })
})

describe("READ / search Kategori kasirAja", () => {
    it("Search category based on Nama Kategori", () => {
        cy.visit('/')
        
        //assert already login & on dashboard menu
        cy.location('pathname').should('eq', '/dashboard')
        cy.get('a[href="/categories"]').click()

        //assert already on category menu
        cy.location('pathname').should('eq', '/categories')

        cy.get('input[placeholder="cari"]').clear().type('Makanan Ringan{enter}')

        // assert search result
        cy.location('pathname').should('eq', '/categories')
        //cy.get('tbody.css-0 > :nth-child(1) > :nth-child(1)').should('have.text','Makanan Ringan 1');
        cy.contains('Makanan Ringan 1').parent('tr');
    })
})

describe("UPDATE / Edit Kategori kasirAja", () => {
    it("Edit kategori with valid input", () => {
        cy.visit('/')
        
        //assert already login & on dashboard menu
        cy.location('pathname').should('eq', '/dashboard')
        cy.get('a[href="/categories"]').click()

        //assert already on category menu
        cy.location('pathname').should('eq', '/categories')

        cy.contains('Makanan Ringan 1').parent('tr').within(() => {
            cy.get('td').eq(2).click() 
            cy.contains('a', 'ubah').click() 
        })

        cy.get('#nama').clear().type("Updated Makanan Ringan")   
        cy.get('#deskripsi').clear().type("(UPDATED) Ini adalah deskripsi kategori makanan ringan 1") 
        cy.contains('button', 'simpan').click()

        cy.wait(750)

        // assert message "success"
        cy.contains("success")

        // assert message "item ditambahkan"
        cy.contains("item diubah");

    })

    it("Edit kategori without input Category Name (Negative Case)", () => {
        cy.visit('/')
        
        //assert already login & on dashboard menu
        cy.location('pathname').should('eq', '/dashboard')
        cy.get('a[href="/categories"]').click()

        //assert already on category menu
        cy.location('pathname').should('eq', '/categories')

        cy.contains('Updated Makanan Ringan').parent('tr').within(() => {
            cy.get('td').eq(2).click() 
            cy.contains('a', 'ubah').click() 
        })

        cy.get('#nama').clear() 
        cy.get('#deskripsi').clear().type("(UPDATED) Ini adalah deskripsi kategori makanan ringan 1") 
        cy.contains('button', 'simpan').click()

        // assert message error handling
        cy.get('div[role="alert"]').should('have.text','"name" is not allowed to be empty');

    })
})

describe("DELETE Kategori kasirAja", () => {
    it("Delete Kategori", () => {
        cy.visit('/')
        
        //assert already login & on dashboard menu
        cy.location('pathname').should('eq', '/dashboard')
        cy.get('a[href="/categories"]').click()

        //assert already on category menu
        cy.location('pathname').should('eq', '/categories')

        cy.contains('Updated Makanan Ringan').parent('tr').within(() => {
            cy.get('td').eq(2).click() 
            cy.contains('button', 'hapus').click() 
        })

        cy.contains('button', 'Delete').click()

        cy.wait(750)

        // assert message "success"
        cy.contains("success")

        // assert message "item dihapus"
        cy.contains("item dihapus");

    })
})
