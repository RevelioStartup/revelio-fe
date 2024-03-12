import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Layout from '@/app/event/(event)/layout'

describe('MainLayout Component', () => {
  it('renders the layout with children', () => {
    const childText = 'Child Content'
    render(
      <Layout>
        <div>{childText}</div>
      </Layout>
    )

    expect(screen.getByText(childText)).toBeInTheDocument()
  })
})
