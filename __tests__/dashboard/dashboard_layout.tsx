import React from 'react'
import { render, screen } from '@testing-library/react'
import DashboardLayout from '../../src/app/dashboard/layout'
import '@testing-library/jest-dom'

describe('Package Layout Component', () => {
  it('renders the layout with Navbar, Footer, and children', () => {
    const childText = 'Child Content'
    render(
      <DashboardLayout>
        <div>{childText}</div>
      </DashboardLayout>
    )

    expect(screen.getByText(childText)).toBeInTheDocument()
  })
})
