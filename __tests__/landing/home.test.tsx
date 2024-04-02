import Home from '@/app/page'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.useFakeTimers()

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

it('clicking on a question toggles visibility of its text', () => {
  render(<Home />)

  const questionButton = screen.getByText(
    /What is Revelio, and how will it help me\?/i
  )
  fireEvent.click(questionButton)

  const text = screen.getByText(
    /Revelio is a one-stop event planning app that will ease your whole event planning activity/i
  )
  expect(text).toBeVisible()
})
