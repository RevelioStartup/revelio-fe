import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import UpdateTaskForm from '@/app/task/UpdateTaskForm'
import '@testing-library/jest-dom'

const mockMutation = jest.fn().mockResolvedValue({ data: {} })

jest.mock('@/redux/api/taskApi', () => ({
  useUpdateTaskMutation: () => [mockMutation],
}))

test('UpdateTaskForm submits the correct data', async () => {
  const mockSetIsEditing = jest.fn()

  const { getByTestId } = render(
    <Provider store={store}>
      <UpdateTaskForm
        id={1}
        title="Test Title"
        description="Test Description"
        event="Test Event"
        setIsEditing={mockSetIsEditing}
      />
    </Provider>
  )

  fireEvent.change(getByTestId('input-update-title'), { target: { value: 'New Title' } })
  fireEvent.change(getByTestId('input-update-description'), { target: { value: 'New Description' } })
  fireEvent.submit(getByTestId('task-update-form'))

  await waitFor(() => {
    expect(mockMutation).toHaveBeenCalled()
    expect(mockSetIsEditing).toHaveBeenCalled()
  })
})
