import { render, screen, fireEvent } from '@testing-library/react'
import TaskDetailPage from '@/app/event/[eventId]/(eventId)/task/[taskId]/page'
import { useGetEventQuery } from '@/redux/api/eventApi'
import { useGetTaskDetailQuery } from '@/redux/api/taskApi'
import '@testing-library/jest-dom'

jest.mock('@/redux/api/eventApi', () => ({
  useGetEventQuery: jest.fn(),
}))

jest.mock('@/redux/api/taskApi', () => ({
  useGetTaskDetailQuery: jest.fn(),
}))

describe('TaskDetailPage with no step', () => {
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
    isLoading: false,
  })

  const mockGetTaskDetailQuery = useGetTaskDetailQuery as jest.Mock

  mockGetTaskDetailQuery.mockReturnValue({
    data: mockTaskData3,
    isLoading: false,
  })

  test('renders task details when not loading and data is available but no step', () => {
    render(<TaskDetailPage params={{ eventId: '3', taskId: '3' }} />)

    expect(screen.getByText('event name')).toBeInTheDocument()
    expect(screen.getByText('task status')).toBeInTheDocument()
    expect(screen.getByText('task description')).toBeInTheDocument()
    expect(screen.getByText('task title')).toBeInTheDocument()
    expect(screen.getByText('No steps created yet')).toBeInTheDocument()
    expect(screen.getByText('Add Step Manually')).toBeInTheDocument()
  })

  test('renders AddTaskStepsButton when there are no steps', () => {
    render(<TaskDetailPage params={{ eventId: '3', taskId: '3' }} />)

    expect(screen.getByText('No steps created yet')).toBeInTheDocument()
    expect(screen.getByText('Add Step Manually')).toBeInTheDocument()
    expect(screen.getByText('or')).toBeInTheDocument()
    expect(screen.getByText('Generate with AI')).toBeInTheDocument()

    const manualAddLink = screen.getByText('Add Step Manually').closest('a')
    expect(manualAddLink).toHaveAttribute(
      'href',
      expect.stringContaining('/create-step')
    )
  })
})
