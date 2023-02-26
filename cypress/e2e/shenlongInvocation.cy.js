/// <reference types="cypress" />

context('Teste de invoação do Shenlong', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dragon-ball-manager')
  })
  it('Não invocar Shenlong se não tiver todas as dragon balls', () => {
    cy.get('[data-testid="card-shenlong"]').should('exist')
    cy.get('[data-testid="invoke-button"]').click()
    cy.get('[data-testid="modaltext"]').should('contain.text', 'Você não tem todas as esferas para invocar o shenlong')
    cy.wait(1000)
    cy.get('[data-testid="back"]').click()
    cy.get('[data-testid="invoke-button"]').contains("Invocar")
  })
  
  it('Exibir dragon balls já encontradas', () => {
    cy.wait(1000)
    cy.get('[data-testid="filter"]').should('exist')
    cy.get('[data-testid="filter"]').select('me')
    cy.get('[value="me"]').should('exist')
    cy.get('.badge.badge-success').should('contain.text', 'Encontrada')
  })

  it('Exibir dragon balls não encontradas', () => {
    cy.get('[data-testid="filter"]').should('exist')
    cy.get('[data-testid="filter"]').select('notme')
    cy.get('[value="notme"]').should('exist')
    cy.get('.badge.badge-danger').should('contain.text', 'Não encontrada')
    cy.get('.btn-warning').should('exist').should('have.text', "Invocarencontreiencontreiencontrei")
  })

  it('Informar que dragon ball 2 foi encontrada foi encontrada pelo filtro', () => {
    cy.get('[data-testid="filter"]').should('exist')
    cy.get('[data-testid="filter"]').select('notme')
    cy.get('[value="notme"]').should('exist')
    cy.get('.badge.badge-danger').should('contain.text', 'Não encontrada')
    cy.get(':nth-child(1) > .sc-AxjAm > .card-body > .btn').click()
    cy.get('.modal.fade.show').should('exist')
    cy.get('#code').should('exist').type('1234')
    cy.get('.btn-success').should('contain.text', 'Validar').click()
  })

  it('Invocar Shenlong se tiver todas as dragon balls', () => {
    cy.get(':nth-child(2) > .sc-AxjAm > .card-body > .btn').click()
    cy.get('.modal.fade.show').should('exist')
    cy.get('#code').should('exist').type('1234')
    cy.get('.btn-success').should('contain.text', 'Validar').click()

    cy.get(':nth-child(3) > .sc-AxjAm > .card-body > .btn').click()
    cy.get('.modal.fade.show').should('exist')
    cy.get('#code').should('exist').type('1234')
    cy.get('.btn-success').should('contain.text', 'Validar').click()

    cy.get(':nth-child(4) > .sc-AxjAm > .card-body > .btn').click()
    cy.get('.modal.fade.show').should('exist')
    cy.get('#code').should('exist').type('1234')
    cy.get('.btn-success').should('contain.text', 'Validar').click()
    cy.get('[data-testid="invoke-button"]').click()
    cy.get('[data-testid="shenlong"]').should('be.visible')

    })



})