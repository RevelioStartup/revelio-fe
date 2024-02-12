import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Home', () => {
  it('renders h3 text', () => {
    render(<Home />)

    const test = screen.getByRole('heading', {
      name: /ease. enhance. commemorate./i,
    })

    expect(test).toBeInTheDocument()
  })
})
