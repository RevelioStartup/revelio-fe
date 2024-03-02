import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AIAside } from '../../src/app/plans/AISuggestion/AIAside'
import '@testing-library/jest-dom'
import { useState } from 'react'

// Mock the close button with a test id

describe('Sugesti AI Component', () => {
  it('renders the aside element', () => {
    const setIsOpen = jest.fn()
    render(<AIAside isOpen={false} setIsOpen={setIsOpen} />)
    const asideElement = screen.getByTestId('ai-aside')
    expect(asideElement).toBeInTheDocument()
  })

  it('renders an input that allows users to write their prompt', () => {
    const setIsOpen = jest.fn()
    render(<AIAside isOpen={false} setIsOpen={setIsOpen} />)
    const aiInput = screen.getByTestId('ai-input')
    expect(aiInput).toBeInTheDocument()
    expect(aiInput).toHaveAttribute(
      'placeholder',
      'Ask AI to help planning your event'
    )
  })

  it('renders a button for user confirming their prompt', () => {
    const setIsOpen = jest.fn()
    render(<AIAside isOpen={false} setIsOpen={setIsOpen} />)
    const aiButton = screen.getByTestId('ai-aside-button')
    expect(aiButton).toBeInTheDocument()
  })

  it('renders examples for prompt to give user ideas', () => {
    const setIsOpen = jest.fn()
    render(<AIAside isOpen={false} setIsOpen={setIsOpen} />)
    const promptExampleVenue = screen.getByTestId('prompt-example-venue')
    const promptExampleVendor = screen.getByTestId('prompt-example-vendor')
    expect(promptExampleVenue).toBeInTheDocument()
    expect(promptExampleVendor).toBeInTheDocument()
  })

  it('sets the prompt value when the prompt example button is clicked', () => {
    const setIsOpen = jest.fn()
    render(<AIAside isOpen={false} setIsOpen={setIsOpen} />)
    const promptExampleButton = screen.getByTestId('prompt-example-venue')
    fireEvent.click(promptExampleButton)
    const aiInput = screen.getByTestId('ai-input') as HTMLTextAreaElement
    expect(aiInput.value).toBe('Best venue for')
  })

  it('submits the form with the correct prompt data', async () => {
    const consoleSpy = jest.spyOn(console, 'log')

    const setIsOpen = jest.fn()
    render(<AIAside isOpen={false} setIsOpen={setIsOpen} />)

    const aiInput = screen.getByTestId('ai-input')
    const aiButton = screen.getByTestId('ai-aside-button')

    fireEvent.change(aiInput, {
      target: { value: 'Best venue for a tech conference' },
    })

    fireEvent.click(aiButton)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        event_id: 0,
        prompt: 'Best venue for a tech conference',
      })
    })

    consoleSpy.mockRestore()
  })

  it('validates required input fields', async () => {
    const setIsOpen = jest.fn()
    render(<AIAside isOpen={false} setIsOpen={setIsOpen} />)

    const aiButton = screen.getByTestId('ai-aside-button')

    fireEvent.click(aiButton)

    const errorMessage = await screen.findByText(/Please complete this field/i)
    expect(errorMessage).toBeInTheDocument()
  })
})
