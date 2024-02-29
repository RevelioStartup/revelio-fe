import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AIAside } from '../../src/app/plans/AISuggestion/AIAside'
import '@testing-library/jest-dom'

describe('Sugesti AI Component', () => {
  it('renders the aside element', () => {
    render(<AIAside />)
    const asideElement = screen.getByTestId('ai-aside')
    expect(asideElement).toBeInTheDocument()
  })

  it('renders an input that allows users to write their prompt', () => {
    render(<AIAside />)
    const aiInput = screen.getByTestId('ai-input')
    expect(aiInput).toBeInTheDocument()
    expect(aiInput).toHaveAttribute(
      'placeholder',
      'Ask AI to help planning your event'
    )
  })

  it('renders a button for user confirming their prompt', () => {
    render(<AIAside />)
    const aiButton = screen.getByTestId('ai-button')
    expect(aiButton).toBeInTheDocument()
  })

  it('renders examples for prompt to give user ideas', () => {
    render(<AIAside />)
    const promptExample = screen.getByTestId('prompt-example')
    expect(promptExample).toBeInTheDocument()
  })

  it('sets the prompt value when the prompt example button is clicked', () => {
    render(<AIAside />)
    const promptExampleButton = screen.getByTestId('prompt-example')
    fireEvent.click(promptExampleButton)
    const aiInput = screen.getByTestId('ai-input') as HTMLInputElement
    expect(aiInput.value).toBe('Best venue for a cocktail party')
  })

  it('submits the form with the correct prompt data', async () => {
    const consoleSpy = jest.spyOn(console, 'log')

    render(<AIAside />)

    const aiInput = screen.getByTestId('ai-input')
    const aiButton = screen.getByTestId('ai-button')

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
    render(<AIAside />)

    const aiButton = screen.getByTestId('ai-button')

    fireEvent.click(aiButton)

    const errorMessage = await screen.findByText(/Please complete this field/i)
    expect(errorMessage).toBeInTheDocument()
  })
})
