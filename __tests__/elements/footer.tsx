import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ThemeProvider } from '@mui/material/styles'
import theme from '@/styles/theme'
import { Footer } from '@/components/elements/Footer'

describe('Footer Component', () => {
  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    )

  it('renders the footer component', () => {
    renderComponent()
    expect(screen.getByAltText('logo')).toBeInTheDocument()
    expect(screen.getByText('Connect with us here!')).toBeInTheDocument()
  })

  it('displays social media icons', () => {
    renderComponent()
    const instagramIcon = screen.getByTestId('i-ph-instagram-logo-bold')

    expect(instagramIcon).toBeInTheDocument()
  })
})
