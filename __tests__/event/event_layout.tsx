import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Layout from '@/app/event/(event)/layout'
import EvemtDetailLayout from '@/app/event/[eventId]/(eventId)/layout'

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

  it('renders the layout with children and header', () => {
    const childText = 'Child Content'
    render(
      <EvemtDetailLayout>
        <div>{childText}</div>
      </EvemtDetailLayout>
    )

    expect(screen.getByText(childText)).toBeInTheDocument()
  })
})
