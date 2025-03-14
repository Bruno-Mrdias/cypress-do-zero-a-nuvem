const { faker } = require('@faker-js/faker');

const data = {
  randomName: faker.person.firstName(),
  randomLastName: faker.person.lastName(),
  randomEmail: faker.internet.email()
}

describe('Central de atendimento ao cliente TAT', () => {
  

  beforeEach(() => {

    cy.visit('./src/index.html')


  })
  it('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {

    cy.clock()

    cy.get('#firstName').type('Fulano')

    cy.get('#lastName').type('de Tal')

    cy.get('#email').type('fulanodetal@gmail.com')

    cy.get('#open-text-area').type('Mensagem de teste e obrigado por tudo asdhuasdhuahusdahusdhuashudahusdhuashudashudashudahusdokasdokasdkoaskodkoasdokashdashudahuisdhuiashuidahusidhuiashduashuidahusdhuiashudashuidhuasdhuiashuidahusidhuasdhuashudashudhuasdhuashudahudahusdhuashudashu!', {delay:0})

    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.clock()

    cy.get('#firstName').type('Fulano')

    cy.get('#lastName').type('de Tal')

    cy.get('#phone').type('991321234', {delay:0})

    cy.get('#open-text-area').type('Mensagem de teste', {delay:0})

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('#phone').should('have.value', '991321234')
    
  })

  it(' validar que, se um valor não-numérico for digitado, seu valor continuará vazio.', () => {

    cy.get('#firstName').type('Fulano')

    cy.get('#lastName').type('de Tal')

    cy.get('#phone').type('abcasd').should('have.value', '')
    
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.clock()

    cy.get('#firstName').type('Fulano')

    cy.get('#lastName').type('de Tal')

    cy.get('#phone-checkbox').click() // torna o campo de telefone obrigatório

    cy.get('#open-text-area').type('Mensagem de teste', {delay:0})

    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.clock

    cy.get('#firstName').type('Fulano')

    cy.get('#firstName').should('have.value', 'Fulano')

    cy.get('#firstName').clear()

    cy.get('#firstName').should('have.value', '')

    cy.get('#lastName').type('de Tal')

    cy.get('#lastName').should('have.value', 'de Tal')

    cy.get('#lastName').clear()

    cy.get('#lastName').should('have.value', '')

    cy.get('#email').type('fulanodetal@gmail.com').should('have.value', 'fulanodetal@gmail.com').clear().should('have.value', '')

    cy.get('#phone').type('991232232').should('have.value', '991232232').clear().should('have.value', '')


    cy.get('#open-text-area').type('Mensagem de teste', {delay:0})
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.clock()

    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.submitBtn()

    cy.get('.success').should('be.visible')

    cy.tick(3000)
    
  })

   it('preenche os campos obrigatórios e envia o formulário', () => {

    cy.clock()
     
    cy.get('#firstName').type('Fulano')

    cy.get('#lastName').type('de Tal')

    cy.get('#email').type('fulanodetal@gmail.com')

    cy.get('#open-text-area').type('Mensagem de teste e obrigado por tudo asdhuasdhuahusdahusdhuashudahusdhuashudashudashudahusdokasdokasdkoaskodkoasdokashdashudahuisdhuiashuidahusidhuiashduashuidahusdhuiashudashuidhuasdhuiashuidahusidhuasdhuashudashudhuasdhuashudahudahusdhuashudashu!', {delay:0})

    cy.submitBtn()
    
    cy.get('.success').should('be.visible')
    
    cy.tick(3000)
  })

  it('envia o formuário com sucesso seleciona um produto (YouTube) por seu texto', () => {

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    
      cy.submitBtn()

    cy.get('.success').should('be.visible')
    
    cy.tick(3000)
  })

  it('envia o formuário com sucesso seleciona um produto (Mentoria) por seu valor (value)', () => {

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    
      cy.submitBtn()

    cy.get('.success').should('be.visible')

    cy.tick(3000)
    
  })

  it('envia o formuário com sucesso seleciona um produto (Blog) por seu índice', () => {

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    
    cy.submitBtn()

    cy.get('.success').should('be.visible')

    cy.tick(3000)
    
  })

  it('envia o formuário com sucesso seleciona um produto aleatorio', () => {

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('select option')
      .as('options')
      .its('length', { log: false }).then(n => {
      cy.get('@options', { log: false }).then($options => {
        const randomOptionIndex = Cypress._.random(1, n - 1)
        const randomOptionText = $options[randomOptionIndex].innerText
        cy.get('select').select(randomOptionText)
      })
    })
    
      cy.submitBtn()

    cy.get('.success').should('be.visible')

    cy.tick(3000)
    
  })

  it('envia o formuário com sucesso e marca o tipo de atendimento "Feedback"', () => {

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('select option').then($options => {
      const randomOptionIndex = Cypress._.random(1, $options.length - 1);
      cy.get('select').select($options[randomOptionIndex].innerText);
    });

      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')

      cy.submitBtn()

    cy.get('.success').should('be.visible')

    cy.tick(3000)
    
  })


  it('envia o formuário com sucesso e marca cada tipo de atendimento', () => {

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('select option').then($options => {
      const randomOptionIndex = Cypress._.random(1, $options.length - 1);
      cy.get('select').select($options[randomOptionIndex].innerText);
    });

      cy.get('input[type="radio"]')
        .each(typeOfService => {
          cy.wrap(typeOfService)
            .check()
            .should('be.checked')
        })
        
      cy.submitBtn()

    cy.get('.success').should('be.visible')

    cy.tick(3000)
    
  })

  it('envia o formulário com sucesso onde marca ambos os checkbox e desmarca o último', () => {

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('select option').then($options => {
      const randomOptionIndex = Cypress._.random(1, $options.length - 1);
      cy.get('select').select($options[randomOptionIndex].innerText);
    });

      cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    
        
      cy.submitBtn()

    cy.get('.success').should('be.visible')
    
    cy.tick(3000)

  })

  it('envia o formulário com sucesso e exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('select option').then($options => {
      const randomOptionIndex = Cypress._.random(1, $options.length - 1);
      cy.get('select').select($options[randomOptionIndex].innerText);
    });

      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        
      cy.submitBtn()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('#phone').type('991321234', {delay:0})
    
    cy.submitBtn()

  })

  it('envia o formulário com sucesso colocando um arquivo .File', () => {

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('select option').then($options => {
      const randomOptionIndex = Cypress._.random(1, $options.length - 1);
      cy.get('select').select($options[randomOptionIndex].innerText);
    });

      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        
      cy.submitBtn()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('#phone').type('991321234', {delay:0})

    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/madeInAbyss.jpeg')
      .should(input => {
        expect(input[0].files[0].name).to.equal('madeInAbyss.jpeg')

      })
      
    cy.submitBtn()

  })


  it('envia o formulário com sucesso colocando um arquivo .File com drag-and-drop', () => {

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('select option').then($options => {
      const randomOptionIndex = Cypress._.random(1, $options.length - 1);
      cy.get('select').select($options[randomOptionIndex].innerText);
    });

      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        
      cy.submitBtn()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('#phone').type('991321234', {delay:0})

    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/madeInAbyss.jpeg', { action: 'drag-drop' } )
      .should(input => {
        expect(input[0].files[0].name).to.equal('madeInAbyss.jpeg')

      })
    

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('select option').then($options => {
      const randomOptionIndex = Cypress._.random(1, $options.length - 1);
      cy.get('select').select($options[randomOptionIndex].innerText);
    });

      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        
      cy.submitBtn()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('#phone').type('991321234', {delay:0})

    cy.fixture('madeInAbyss.jpeg')
      .as('imgName')
    cy.get('#file-upload')
      .selectFile('@imgName')
      .should(input => {
        expect(input[0].files[0].name).to.equal('madeInAbyss.jpeg')

      })
    

  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {

    cy.contains('a','Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')    

  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {

    cy.contains('a','Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

      cy.get('#title').should('have.text', 'CAC TAT - Política de Privacidade')
   
  })

  Cypress._.times(3, () => {
  it('envia o formuário com sucesso usando clock() e tick()', () => {

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('select option').then($options => {
      const randomOptionIndex = Cypress._.random(1, $options.length - 1);
      cy.get('select').select($options[randomOptionIndex].innerText);
    });

      cy.get('input[type="radio"]')
        .each(typeOfService => {
          cy.wrap(typeOfService)
            .check()
            .should('be.checked')
        })

      cy.submitBtn()

      cy.get('.success').should('be.visible')

      cy.tick(3000)
    
      cy.get('.success').should('not.be.visible')
        
  })

})

it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {

  cy.get('.success')
  .should('not.be.visible')
  .invoke('show')
  .should('be.visible')
  .and('contain','Mensagem enviada com sucesso.')
  .invoke('hide')
  .should('not.be.visible')

      

  cy.get('.error')
  .should('not.be.visible')
  .invoke('show')
  .should('be.visible')
  .and('contain','Valide os campos obrigatórios!')
  .invoke('hide')
  .should('not.be.visible')
    
  cy.submitBtn()

})

it('preenche o campo da área de texto usando o comando invoke', () => {

  cy.get('#open-text-area')
  .invoke('val', 'Mensagem de teste')
  .should('have.value', 'Mensagem de teste')
    
  cy.submitBtn()

})

it('faz uma requisição HTTP', () => {

  cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
    .as('getRequest')
    .its('status')
    .should('be.equal', 200)

    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')

      cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')

})

it('Fazer aparecer o gato escondido na aplicação ', () => {

  cy.get('#cat')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')

})
})