import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AIButton } from '@/app/plans/AISuggestion/AIButton'

describe('AIButton Component', () => {
  it('opens the AIAside when the button is clicked', () => {
    render(<AIButton />)

    let asideElement = screen.queryByTestId('ai-aside')

    fireEvent.click(screen.getByTestId('ai-button'))

    expect(asideElement).toBeInTheDocument()

    expect(asideElement).not.toHaveClass('translate-x-full')
  })
})
