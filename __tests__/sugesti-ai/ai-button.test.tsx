import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AIButton } from '@/app/plans/AISuggestion/AIButton'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/redux/store'

describe('AIButton Component', () => {
  it('opens the AIAside when the button is clicked', () => {
    render(
      <ReduxProvider store={store}>
        <AIButton />
      </ReduxProvider>
    )

    let asideElement = screen.queryByTestId('ai-aside')

    fireEvent.click(screen.getByTestId('ai-button'))

    expect(asideElement).toBeInTheDocument()

    expect(asideElement).not.toHaveClass('translate-x-full')
  })
})
