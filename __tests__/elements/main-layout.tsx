import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MainLayout } from '@/components/elements/Layout'

describe('MainLayout Component', () => {
  it('renders the layout with Navbar, Footer, and children', () => {
    const childText = 'Child Content'
    render(
      <MainLayout>
        <div>{childText}</div>
      </MainLayout>
    )

    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByText(childText)).toBeInTheDocument()
  })
})
