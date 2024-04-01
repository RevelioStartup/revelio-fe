import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  useDeleteTaskStepMutation,
  useDeleteAllTaskStepsMutation,
  useUpdateTaskStepMutation,
} from '@/redux/api/taskStepApi'
import StepStepper from '@/app/event/[eventId]/(eventId)/task/[taskId]/StepStepper'

jest.mock('@/redux/api/taskStepApi', () => ({
  useDeleteTaskStepMutation: jest.fn(),
  useDeleteAllTaskStepsMutation: jest.fn(),
  useUpdateTaskStepMutation: jest.fn(),
}))

const mockTask = {
  id: '1',
  task_steps: [
    {
      id: 'step1',
      name: 'Step 1',
      description: 'Description 1',
      status: 'NOT_STARTED',
      step_order: 1,
      task: '1',
    },
    {
      id: 'step2',
      name: 'Step 2',
      description: 'Description 2',
      status: 'NOT_STARTED',
      step_order: 2,
      task: '1',
    },
  ],
  title: 'Task Title',
  description: 'Task Description',
  status: 'IN_PROGRESS',
  event: '1',
}

const createDeleteResponse = (message: string) => ({ data: { message } })

describe('StepStepper', () => {
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
    ;(useUpdateTaskStepMutation as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({
        data: {
          /* mock response data */
        },
      }), // Mocking the mutate function
      { isLoading: false, isError: false }, // Mocking the state object
    ])
  })

  test('deletes a single task step correctly', async () => {
    render(<StepStepper taskId={mockTask.id} task={mockTask} />)

    fireEvent.click(screen.getAllByText('Delete')[0])
  })

  test('deletes all task steps correctly', async () => {
    render(<StepStepper taskId={mockTask.id} task={mockTask} />)

    fireEvent.click(screen.getByText('Delete All'))
  })
})
