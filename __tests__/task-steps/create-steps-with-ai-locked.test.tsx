import TaskDetailPage from '@/app/event/[eventId]/(eventId)/task/[taskId]/page'
import { useCreateTaskStepWithAIMutation } from '@/redux/api/taskStepApi'
import { redirect, useParams, usePathname } from 'next/navigation'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import {
  useDeleteTaskMutation,
  useGetTaskDetailQuery,
} from '@/redux/api/taskApi'
import { TaskContextProvider } from '@/components/contexts/TaskContext'

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
  useDeleteTaskMutation: jest.fn(),
}))
jest.mock('@/redux/api/subscriptionApi', () => ({
  useGetLatestSubscriptionQuery: jest.fn((id) => ({
    data: {
      is_active: false,
    },
  })),
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
    ;(useDeleteTaskMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ])
    jest.clearAllMocks()
  })

  test('does not redirect and handles error when generateStepsWithAI fails', async () => {
    render(
      <Provider store={store}>
        <TaskContextProvider>
          <TaskDetailPage params={{ eventId: '3', taskId: '3' }} />
        </TaskContextProvider>
      </Provider>
    )

    expect(screen.getByTestId('free-task-ai-button')).toBeInTheDocument()
  })
})
