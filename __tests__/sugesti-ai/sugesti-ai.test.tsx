import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AIAside } from '../../src/app/plans/AISuggestion/AIAside'
import { Provider as ReduxProvider } from 'react-redux'
import '@testing-library/jest-dom'
import {
  useAskSuggestionMutation,
  useAiSuggestionHistoryListQuery,
} from '@/redux/api/aiSuggestionApi'
import { store } from '@/redux/store'

jest.mock('@/redux/api/aiSuggestionApi', () => ({
  useAskSuggestionMutation: jest.fn(),
  useAiSuggestionHistoryListQuery: jest.fn(),
}))

describe('Sugesti AI Component', () => {
  beforeEach(() => {
    const mockAskAI = jest
      .fn()
      .mockResolvedValue({ data: { msg: 'Mocked AI Response' } })
    const mockIsLoading = false
    ;(useAskSuggestionMutation as jest.Mock).mockReturnValue([
      mockAskAI,
      { isLoading: mockIsLoading },
    ])

    const mockAiHistory = {
      data: [{ id: 1, prompt: 'Mocked Prompt 1', output: 'Mocked Output 1' }],
      isLoading: false,
      isError: false,
    }
    ;(useAiSuggestionHistoryListQuery as jest.Mock).mockReturnValue(
      mockAiHistory
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

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
    const mockAskAI = jest
      .fn()
      .mockResolvedValue({ data: { msg: 'Mocked AI Response' } })
    ;(useAskSuggestionMutation as jest.Mock).mockReturnValue([mockAskAI, {}])

    const { getByTestId } = render(
      <ReduxProvider store={store}>
        <AIAside isOpen={true} setIsOpen={() => {}} />
      </ReduxProvider>
    )

    fireEvent.change(getByTestId('ai-input'), {
      target: { value: 'Test Prompt' },
    })
    fireEvent.click(getByTestId('ai-aside-button'))

    await waitFor(() => {
      expect(mockAskAI).toHaveBeenCalledWith({
        prompt: 'Test Prompt',
        event_id: 0,
      })
    })
  })

  it('validates required input fields', async () => {
    const setIsOpen = jest.fn()
    render(<AIAside isOpen={false} setIsOpen={setIsOpen} />)

    const aiButton = screen.getByTestId('ai-aside-button')

    fireEvent.click(aiButton)

    const errorMessage = await screen.findByText(/Please complete this field/i)
    expect(errorMessage).toBeInTheDocument()
  })

  it('closes the aside when the close icon is clicked', () => {
    const setIsOpen = jest.fn()
    render(<AIAside isOpen={true} setIsOpen={setIsOpen} />)
    const closeButton = screen.getByTestId('close-ai-aside-button')
    fireEvent.click(closeButton)
    expect(setIsOpen).toHaveBeenCalledWith(false)
  })
  it('clears the input on successful submission', async () => {
    render(
      <ReduxProvider store={store}>
        <AIAside isOpen={true} setIsOpen={() => {}} />
      </ReduxProvider>
    )

    fireEvent.change(screen.getByTestId('ai-input'), {
      target: { value: 'Test Prompt' },
    })
    fireEvent.click(screen.getByTestId('ai-aside-button'))

    await waitFor(() => {
      expect(
        (screen.getByTestId('ai-input') as HTMLTextAreaElement).value
      ).toBe('')
    })
  })

  it('shows an error message on failed submission', async () => {
    const mockAskAIFail = jest
      .fn()
      .mockRejectedValue(new Error('Submission Failed'))
    ;(useAskSuggestionMutation as jest.Mock).mockReturnValue([
      mockAskAIFail,
      {},
    ])

    render(
      <ReduxProvider store={store}>
        <AIAside isOpen={true} setIsOpen={() => {}} />
      </ReduxProvider>
    )

    fireEvent.click(screen.getByTestId('ai-aside-button'))

    const errorMessage = await screen.findByText(/Please complete this field/i)
    expect(errorMessage).toBeInTheDocument()
  })
  it('displays a loading message when the AI is generating an answer', () => {
    // Set isLoading to true for this test case
    ;(useAskSuggestionMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: true },
    ])

    render(<AIAside isOpen={true} setIsOpen={() => {}} />)

    const loadingMessage = screen.getByText(/AI is generating answer.../i)
    expect(loadingMessage).toBeInTheDocument()
  })
})
