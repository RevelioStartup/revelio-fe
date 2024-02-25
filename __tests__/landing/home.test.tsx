import Home from '@/app/page'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Home Page', () => {
  it('renders the hero section', () => {
    render(<Home />)
    const heroElement = screen.getByTestId('hero-landing')
    expect(heroElement).toBeInTheDocument()
  })

  it('renders the "Why Revelio" section', () => {
    render(<Home />)
    const whyRevelioElement = screen.getByTestId('why-revelio')
    expect(whyRevelioElement).toBeInTheDocument()
  })

  it('renders the "Without Revelio" section', () => {
    render(<Home />)
    const withoutRevelioElement = screen.getByTestId('without-revelio')
    expect(withoutRevelioElement).toBeInTheDocument()
  })
})
