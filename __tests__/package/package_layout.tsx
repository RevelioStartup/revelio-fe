import React from 'react'
import { render, screen } from '@testing-library/react'
import PackageLayout from '../../src/app/package/layout'
import '@testing-library/jest-dom'

describe('Package Layout Component', () => {
  it('renders the layout with Navbar, Footer, and children', () => {
    const childText = 'Child Content'
    render(
      <PackageLayout>
        <div>{childText}</div>
      </PackageLayout>
    )

    expect(screen.getByText(childText)).toBeInTheDocument()
  })
})
