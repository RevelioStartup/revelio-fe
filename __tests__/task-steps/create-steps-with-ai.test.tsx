import TaskDetailPage from '@/app/event/[eventId]/(eventId)/task/[taskId]/page'
import { useCreateTaskStepWithAIMutation } from '@/redux/api/taskStepApi'
import { redirect, useParams, usePathname } from 'next/navigation'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { useGetTaskDetailQuery } from '@/redux/api/taskApi'
import { TaskContextProvider } from '@/components/contexts/TaskContext'
import toast from 'react-hot-toast'

jest.mock('@/redux/api/taskStepApi', () => ({
  useCreateTaskStepWithAIMutation: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useParams: jest.fn(),
  usePathname: jest.fn(),
}))

jest.mock('@/redux/api/taskApi', () => ({
  useGetTaskDetailQuery: jest.fn(),
}))

describe('AddTaskStepsButton', () => {
  const mockGenerateStepsWithAI = jest.fn().mockResolvedValue({
    data: { task_id: 3, steps: ['Step 1', 'Step 2'] },
    isSuccess: true,
  })
  const mockTaskDataEmpty = {
    id: '3',
    task_steps: [],
    title: 'task title',
    description: 'task description',
    status: 'task status',
    event: '3',
  }

  beforeEach(() => {
    ;(useGetTaskDetailQuery as jest.Mock).mockReturnValue({
      data: mockTaskDataEmpty,
      isLoading: false,
    })
    ;(useCreateTaskStepWithAIMutation as jest.Mock).mockReturnValue([
      mockGenerateStepsWithAI,
      { data: { task_id: 3, steps: ['Step 1', 'Step 2'] }, isSuccess: true },
    ])
    ;(useParams as jest.Mock).mockReturnValue({
      taskId: '3',
    })
    ;(usePathname as jest.Mock).mockReturnValue('/event/3/task/3')

    jest.clearAllMocks()
  })

  test('calls generateStepsWithAI and redirects on success', async () => {
    render(
      <Provider store={store}>
        <TaskContextProvider>
          <TaskDetailPage params={{ eventId: '3', taskId: '3' }} />
        </TaskContextProvider>
      </Provider>
    )

    const generateWithAIButton = screen.getByText('Generate with AI')
    fireEvent.click(generateWithAIButton)

    await waitFor(() => {
      expect(mockGenerateStepsWithAI).toHaveBeenCalledWith({
        task_id: 3,
      })

      expect(redirect).toHaveBeenCalledWith(`3/create-step`)
    })
  })
  test('does not redirect and handles error when generateStepsWithAI fails', async () => {
    // Mock the AI generation to fail
    const mockGenerateStepsWithAIError = jest.fn().mockResolvedValue({
      error: { message: 'Generation failed' },
      isSuccess: false,
    })

    ;(useCreateTaskStepWithAIMutation as jest.Mock).mockReturnValue([
      mockGenerateStepsWithAIError,
      { error: { message: 'Generation failed' }, isSuccess: false },
    ])

    render(
      <Provider store={store}>
        <TaskContextProvider>
          <TaskDetailPage params={{ eventId: '3', taskId: '3' }} />
        </TaskContextProvider>
      </Provider>
    )

    const generateWithAIButton = screen.getByText('Generate with AI')
    fireEvent.click(generateWithAIButton)

    await waitFor(() => {
      expect(redirect).not.toHaveBeenCalled()
    })
  })
})
