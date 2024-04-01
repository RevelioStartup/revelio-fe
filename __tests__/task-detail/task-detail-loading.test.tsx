import { render, screen, fireEvent } from '@testing-library/react'
import TaskDetailPage from '@/app/event/[eventId]/(eventId)/task/[taskId]/page'
import { useGetEventQuery } from '@/redux/api/eventApi'
import { useGetTaskDetailQuery } from '@/redux/api/taskApi'
import { useUpdateTaskStepMutation } from '@/redux/api/taskStepApi'
import '@testing-library/jest-dom'

jest.mock('@/redux/api/eventApi', () => ({
  useGetEventQuery: jest.fn(),
}))

jest.mock('@/redux/api/taskApi', () => ({
  useGetTaskDetailQuery: jest.fn(),
}))

jest.mock('@/redux/api/taskStepApi', () => ({
  useUpdateTaskStepMutation: jest.fn(),
}))

describe('TaskDetailPage loading', () => {
  const mockEventData3 = {
    id: '3',
    name: 'event name',
    budget: 'asd',
    date: '2023-20-05',
    objective: 'adfsf',
    attendees: 'number',
    theme: 'string',
    services: 'string',
  }

  const mockTaskData3 = {
    id: '3',
    task_steps: [],
    title: 'task title',
    description: 'task description',
    status: 'task status',
    event: '3',
  }

  const mockGetEventQuery = useGetEventQuery as jest.Mock

  mockGetEventQuery.mockReturnValue({
    data: mockEventData3,
    isLoading: true,
  })

  const mockGetTaskDetailQuery = useGetTaskDetailQuery as jest.Mock

  mockGetTaskDetailQuery.mockReturnValue({
    data: mockTaskData3,
    isLoading: true,
  })


  test('renders loading spinner when loading', () => {
    const mockUseUpdateTaskStepMutation = jest.fn().mockResolvedValue({ data: {} })
    ;(useUpdateTaskStepMutation as jest.Mock).mockReturnValue([mockUseUpdateTaskStepMutation])

    render(<TaskDetailPage params={{ eventId: '3', taskId: '3' }} />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
})
