describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('the h3 contains the correct text', () => {
    cy.get('h3').contains('Ease. Enhance. Commemorate.')
  })

  it('the h6 contains the correct text', () => {
    cy.get('h6').contains(
      'Simplify and enhance the entire event planning experience'
    )
  })
})
