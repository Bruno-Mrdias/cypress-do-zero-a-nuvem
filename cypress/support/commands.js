
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => { 
    cy.get('#firstName').type(data.randomName)

    cy.get('#lastName').type(data.randomLastName)

    cy.get('#email').type(data.randomEmail)

    cy.get('#open-text-area').type('Mensagem de teste e obrigado por tudo asdhuasdhuahusdahusdhuashudahusdhuashudashudashudahusdokasdokasdkoaskodkoasdokashdashudahuisdhuiashuidahusidhuiashduashuidahusdhuiashudashuidhuasdhuiashuidahusidhuasdhuashudashudhuasdhuashudahudahusdhuashudashu!', {delay:0})

    // cy.contains('button', 'Enviar').click()
 })

Cypress.Commands.add('submitBtn', data => {
    cy.contains('button', 'Enviar').click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })