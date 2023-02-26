context('CEP', () => {
    before(() =>{
        cy.visit('http://localhost:3000/form-cep')
    })

    it('deve retornart o cep', () =>{
        addressRequest()
        cy.get('#cep').type('01508010')
        cy.wait('@resAddress')
        cy.get('#bairro').should('have.value', 'Jardim das rosas')
        cy.get('#logradouro').type('have.value', 'Rua Julieta')
    })
})

const addressRequest = () => {
    cy.intercept(
        'GET', 'https://viacep.com.br/ws/01508010/json', { fixture: 'address.json' })
    .as('resAddress')
}