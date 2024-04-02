import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TaskDetailPage from '@/app/event/[eventId]/(eventId)/task/[taskId]/page'
import { useGetEventQuery } from '@/redux/api/eventApi'
import {
  useDeleteTaskMutation,
  useGetTaskDetailQuery,
} from '@/redux/api/taskApi'
import { useUpdateTaskStepMutation } from '@/redux/api/taskStepApi'
import { useCreateTaskStepWithAIMutation } from '@/redux/api/taskStepApi'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

jest.mock('@/redux/api/eventApi', () => ({
  useGetEventQuery: jest.fn(),
}))

jest.mock('@/redux/api/taskStepApi', () => ({
  useCreateTaskStepWithAIMutation: jest.fn(),
  useUpdateTaskStepMutation: jest.fn(),
}))
jest.mock('@/redux/api/taskApi', () => ({
  useGetTaskDetailQuery: jest.fn(),
  useDeleteTaskMutation: jest.fn(),
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
  beforeEach(() => {
    ;(useGetEventQuery as jest.Mock).mockReturnValue({
      data: mockEventData3,
      isLoading: false,
    })
    ;(useGetTaskDetailQuery as jest.Mock).mockReturnValue({
      data: mockTaskData3,
      isLoading: false,
    })

    const mockGenerateStepsWithAI = jest.fn().mockResolvedValue({
      data: { task_id: 3, steps: ['Step 1', 'Step 2'] },
      isSuccess: true,
    })

    ;(useCreateTaskStepWithAIMutation as jest.Mock).mockReturnValue([
      mockGenerateStepsWithAI,
      { isLoading: false },
    ])
    ;(useUpdateTaskStepMutation as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({ data: {} }),
    ])
  })

  const mockDeleteTaskMutation = useDeleteTaskMutation as jest.Mock
  mockDeleteTaskMutation.mockReturnValue([jest.fn(), { isLoading: false }])

  test('renders task details when not loading and data is available but no step', () => {
    const mockUseUpdateTaskStepMutation = jest
      .fn()
      .mockResolvedValue({ data: {} })
    ;(useUpdateTaskStepMutation as jest.Mock).mockReturnValue([
      mockUseUpdateTaskStepMutation,
    ])

    render(
      <Provider store={store}>
        <TaskDetailPage params={{ eventId: '3', taskId: '3' }} />
      </Provider>
    )

    expect(screen.getByText('event name')).toBeInTheDocument()
    expect(screen.getByText('task status')).toBeInTheDocument()
    expect(screen.getByText('task description')).toBeInTheDocument()
    expect(screen.getByText('task title')).toBeInTheDocument()
    expect(screen.getByText('No steps created yet')).toBeInTheDocument()
    expect(screen.getByText('Add Step Manually')).toBeInTheDocument()
  })

  test('renders AddTaskStepsButton when there are no steps', () => {
    render(
      <Provider store={store}>
        <TaskDetailPage params={{ eventId: '3', taskId: '3' }} />
      </Provider>
    )

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
