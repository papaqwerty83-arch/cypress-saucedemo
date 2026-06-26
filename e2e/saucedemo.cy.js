describe('SauceDemo — E2E тесты', () => {
  
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  it('TC-01 | Авторизация с верными данными', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('TC-02 | Авторизация с неверными данными', () => {
    cy.get('[data-test="username"]').type('wrong_user')
    cy.get('[data-test="password"]').type('wrong_pass')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible')
  })

  it('TC-03 | Сортировка товаров A→Z', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="product-sort-container"]').select('az')
    cy.get('[data-test="inventory-item-name"]').first()
      .should('have.text', 'Sauce Labs Backpack')
  })

  it('TC-04 | Добавление товара в корзину', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
  })

  it('TC-05 | E2E оформление заказа', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')
  })

})