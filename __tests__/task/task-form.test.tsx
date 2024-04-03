import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import CreateTaskForm from '@/app/task/CreateTaskForm'
import '@testing-library/jest-dom'

jest.mock('@/redux/api/taskApi', () => ({
  useCreateTaskMutation: jest.fn(() => [
    jest.fn().mockResolvedValue({ data: {} }),
  ]),
}))

describe('CreateTaskForm', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CreateTaskForm eventId="testEventId" />
      </Provider>
    )

    expect(getByTestId('title-input')).toBeInTheDocument()
    expect(getByTestId('description-input')).toBeInTheDocument()
  })

  it('calls the onSubmit function when the form is submitted', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CreateTaskForm eventId="testEventId" />
      </Provider>
    )

    fireEvent.change(getByTestId('title-input'), {
      target: { value: 'Test Title' },
    })
    fireEvent.change(getByTestId('description-input'), {
      target: { value: 'Test Description' },
    })

    fireEvent.click(getByTestId('save-button'))

    await waitFor(() => {
      expect((getByTestId('title-input') as HTMLInputElement).value).toBe('')
      expect((getByTestId('description-input') as HTMLInputElement).value).toBe(
        ''
      )
    })
  })
})
