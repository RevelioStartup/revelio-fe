import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import TaskDetailPage from '@/app/event/[eventId]/(eventId)/task/[taskId]/page'
import { useGetEventQuery } from '@/redux/api/eventApi'
import {
  useDeleteTaskMutation,
  useGetTaskDetailQuery,
} from '@/redux/api/taskApi'
import {
  useDeleteAllTaskStepsMutation,
  useDeleteTaskStepMutation,
  useUpdateTaskStepMutation,
} from '@/redux/api/taskStepApi'
import '@testing-library/jest-dom'
import dayjs from '@/configs/dayjs.config'
import { Step } from '@/types/taskDetails'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

jest.mock('@/redux/api/eventApi', () => ({
  useGetEventQuery: jest.fn(),
}))

jest.mock('@/redux/api/taskApi', () => ({
  useGetTaskDetailQuery: jest.fn(),
  useDeleteTaskMutation: jest.fn(),
}))

jest.mock('@/redux/api/taskStepApi', () => ({
  useUpdateTaskStepMutation: jest.fn(),
  useDeleteTaskStepMutation: jest.fn(),
  useDeleteAllTaskStepsMutation: jest.fn(),
  useCreateTimelineMutation: jest.fn(),
}))

describe('TaskDetailPage with step', () => {
  const mockEventData = {
    id: '1',
    name: 'event name',
    budget: 'asd',
    date: '2023-20-05',
    objective: 'adfsf',
    attendees: 'number',
    theme: 'string',
    services: 'string',
  }

  const mockStepData: Step = {
    id: '1',
    name: 'step name',
    description: 'step description',
    status: 'NOT_STARTED',
    step_order: 1,
    task: '1',
    start_datetime: '2024-04-19T12:40:19.827000Z',
    end_datetime: '2024-04-19T12:40:19.827000Z',
  }

  const mockStepData2: Step = {
    id: '2',
    name: 'step name 2',
    description: 'step description 2',
    status: 'NOT_STARTED',
    step_order: 2,
    task: '1',
    start_datetime: null,
    end_datetime: null,
  }

  const mockUpdatedStepData1: Step = {
    id: '1',
    name: 'step name',
    description: 'step description',
    status: 'DONE',
    step_order: 1,
    task: '1',
    start_datetime: null,
    end_datetime: null,
  }

  const mockUpdatedStepData12: Step = {
    id: '1',
    name: 'updated step name',
    description: 'updated step description',
    status: 'NOT_STARTED',
    step_order: 1,
    task: '1',
    start_datetime: null,
    end_datetime: null,
  }

  const mockTaskData = {
    id: '1',
    task_steps: [mockStepData, mockStepData2],
    title: 'task title',
    description: 'task description',
    status: 'task status',
    event: '1',
  }

  const mockTask = {
    id: '1',
    task_steps: [
      {
        id: 'step1',
        name: 'Step 1',
        description: 'Description 1',
        status: 'NOT_STARTED',
        step_order: 1,
        task: '1', // Assuming 'task' property is a string representing the task ID
      },
      {
        id: 'step2',
        name: 'Step 2',
        description: 'Description 2',
        status: 'NOT_STARTED',
        step_order: 2,
        task: '1', // Assuming 'task' property is a string representing the task ID
      },
    ],
    title: 'Task Title',
    description: 'Task Description',
    status: 'IN_PROGRESS',
    event: '1',
  }

  const mockGetEventQuery = useGetEventQuery as jest.Mock

  mockGetEventQuery.mockReturnValue({
    data: mockEventData,
    isLoading: false,
  })

  const mockGetTaskDetailQuery = useGetTaskDetailQuery as jest.Mock

  mockGetTaskDetailQuery.mockReturnValue({
    data: mockTaskData,
    isLoading: false,
  })

  const mockDeleteTaskMutation = useDeleteTaskMutation as jest.Mock
  mockDeleteTaskMutation.mockReturnValue([jest.fn(), { isLoading: false }])

  const createDeleteResponse = (message: string) => ({ data: { message } })

  beforeEach(() => {
    ;(useDeleteTaskStepMutation as jest.Mock).mockReturnValue([
      jest
        .fn()
        .mockImplementation(({ id }) =>
          Promise.resolve(
            createDeleteResponse(`Task step ${id} successfully deleted.`)
          )
        ),
      { isLoading: false },
    ])
    ;(useDeleteAllTaskStepsMutation as jest.Mock).mockReturnValue([
      jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve(
            createDeleteResponse(
              `Successfully deleted ${mockTask.task_steps.length} task step(s).`
            )
          )
        ),
      { isLoading: false },
    ])
  })

  test('renders task details when not loading and data is available', () => {
    const mockUseUpdateTaskStepMutation = jest
      .fn()
      .mockResolvedValue({ data: mockUpdatedStepData1 })
    ;(useUpdateTaskStepMutation as jest.Mock).mockReturnValue([
      mockUseUpdateTaskStepMutation,
    ])

    render(
      <Provider store={store}>
        <TaskDetailPage params={{ eventId: '1', taskId: '1' }} />
      </Provider>
    )

    expect(screen.getByText('event name')).toBeInTheDocument()
    expect(screen.getByText('task status')).toBeInTheDocument()
    expect(screen.getByText('task description')).toBeInTheDocument()
    expect(screen.getByText('task title')).toBeInTheDocument()
    expect(screen.getByText('step name')).toBeInTheDocument()
    expect(screen.getByText('step name 2')).toBeInTheDocument()

    const buttonContinue = screen.getByText('Continue')
    fireEvent.click(buttonContinue)
    expect(screen.getByText('step name 2')).toBeInTheDocument()

    const buttonFinish = screen.getByText('Finish')
    fireEvent.click(buttonFinish)
    expect(
      screen.getByText('All steps completed - you have finished this task')
    ).toBeInTheDocument()
  })

  test('update step correctly', async () => {
    const mockUseUpdateTaskStepMutation = jest
      .fn()
      .mockResolvedValue({ data: mockUpdatedStepData12 })
    ;(useUpdateTaskStepMutation as jest.Mock).mockReturnValue([
      mockUseUpdateTaskStepMutation,
    ])

    render(
      <Provider store={store}>
        <TaskDetailPage params={{ eventId: '1', taskId: '1' }} />
      </Provider>
    )

    act(() => {
      const buttonEdit = screen.getByTestId('button-edit-form')
      fireEvent.click(buttonEdit)
    })
    const buttonClose = screen.getByTestId('close-form')
    fireEvent.click(buttonClose)
    act(() => {
      const buttonEdit = screen.getByTestId('button-edit-form')
      fireEvent.click(buttonEdit)
    })
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'updated step name' },
    })
    fireEvent.change(screen.getByTestId('description-input'), {
      target: { value: 'updated step description' },
    })
    const buttonSubmit = screen.getByTestId('button-submit')
    fireEvent.click(buttonSubmit)
    await waitFor(() =>
      expect(mockUseUpdateTaskStepMutation).toHaveBeenCalledTimes(1)
    )
  })

  test('back button functions correctly', () => {
    const mockUseUpdateTaskStepMutation = jest
      .fn()
      .mockResolvedValue({ data: mockUpdatedStepData1 })
    ;(useUpdateTaskStepMutation as jest.Mock).mockReturnValue([
      mockUseUpdateTaskStepMutation,
    ])

    render(
      <Provider store={store}>
        <TaskDetailPage params={{ eventId: '1', taskId: '1' }} />
      </Provider>
    )

    expect(screen.getByText('step name')).toBeInTheDocument()
    expect(screen.getByText('step name 2')).toBeInTheDocument()

    const buttonContinue = screen.getByText('Continue')
    fireEvent.click(buttonContinue)
    expect(screen.getByText('step name 2')).toBeInTheDocument()

    const buttonBack = screen.getByTestId('2-back')
    fireEvent.click(buttonBack)
    expect(screen.getByTestId('1-back')).toBeInTheDocument()
  })

  test('delete task correctly', async () => {
    render(
      <Provider store={store}>
        <TaskDetailPage params={{ eventId: '1', taskId: '1' }} />
      </Provider>
    )

    const buttonDelete = screen.getByTestId('delete-task')
    fireEvent.click(buttonDelete)
    await waitFor(() => expect(mockDeleteTaskMutation).toHaveBeenCalledTimes(1))
  })

  test('delete task error', async () => {
    const mockDeleteTaskMutation = useDeleteTaskMutation as jest.Mock
    mockDeleteTaskMutation.mockReturnValue([
      jest.fn().mockRejectedValue(new Error()),
      { isLoading: false },
    ])

    render(
      <Provider store={store}>
        <TaskDetailPage params={{ eventId: '1', taskId: '1' }} />
      </Provider>
    )

    const buttonDelete = screen.getByTestId('delete-task')
    fireEvent.click(buttonDelete)
    await waitFor(() => expect(mockDeleteTaskMutation).toHaveBeenCalledTimes(1))
  })

  test('renders task details with correct date format', () => {
    const mockGetEventQuery = useGetEventQuery as jest.Mock
    mockGetEventQuery.mockReturnValue({
      data: mockEventData,
      isLoading: false,
    })

    const mockGetTaskDetailQuery = useGetTaskDetailQuery as jest.Mock
    mockGetTaskDetailQuery.mockReturnValue({
      data: mockTaskData,
      isLoading: false,
    })

    render(
      <Provider store={store}>
        <TaskDetailPage params={{ eventId: '1', taskId: '1' }} />
      </Provider>
    )

    expect(
      screen.getByText(
        dayjs(mockStepData.start_datetime).format('ddd, D MMM YY HH:mm')
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(dayjs(mockStepData.end_datetime).format('HH:mm'))
    ).toBeInTheDocument()
  })
})
