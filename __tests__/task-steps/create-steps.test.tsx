import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { CreateStepManualForm } from '@/app/event/[eventId]/task/step/CreateStepManualForm'
import { useCreateTaskStepManuallyMutation } from '@/redux/api/taskStepApi'
import { toast } from 'react-hot-toast'

import { redirect, useParams, usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useParams: jest.fn(),
  usePathname: jest.fn(),
}))

jest.mock('@/redux/api/taskStepApi', () => ({
  useCreateTaskStepManuallyMutation: jest.fn(),
}))
describe('CreateStepManualForm', () => {
  beforeEach(() => {
    jest.spyOn(toast, 'error').mockImplementation(jest.fn())

    const mockCreateTaskStepManually = jest.fn().mockResolvedValue({
      data: {},
    })
    ;(useCreateTaskStepManuallyMutation as jest.Mock).mockReturnValue([
      mockCreateTaskStepManually,
      {
        isLoading: false,
        isSuccess: false,
        error: null,
      },
    ])
    ;(redirect as unknown as jest.Mock).mockImplementation((url: string) => {
      console.log(`Mock redirect to ${url}`)
    })
    ;(useParams as jest.Mock).mockReturnValue({
      taskId: '123',
    })
    ;(usePathname as jest.Mock).mockReturnValue(
      '/event/123-abc/task/1/create-step'
    )
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('submits steps and calls create task step mutation', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <CreateStepManualForm />
      </Provider>
    )
    const mockCreateTaskStepManually = jest.fn().mockResolvedValue({
      data: {
        task_id: 1,
        steps: [
          {
            name: 'New Step',
            description: 'New Description',
          },
        ],
      },
    })
    ;(useCreateTaskStepManuallyMutation as jest.Mock).mockReturnValue([
      mockCreateTaskStepManually,
      { isLoading: false, isSuccess: false, error: null },
    ])
    const addStepButton = getByText('Add your step here')
    fireEvent.click(addStepButton)

    const stepNameInput = getByTestId('steps.0.name')
    fireEvent.change(stepNameInput, { target: { value: 'New Step' } })

    const stepDescInput = getByTestId('steps.0.description')
    fireEvent.change(stepDescInput, { target: { value: 'New Desc' } })

    const saveButton = getByText('Save')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockCreateTaskStepManually).toHaveBeenCalledWith({
        task_id: expect.any(Number),
        steps: expect.arrayContaining([
          expect.objectContaining({
            name: 'New Step',
            description: 'New Desc',
          }),
        ]),
      })
    })
  })

  it('should have a back button that redirects to the task detail page', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CreateStepManualForm />
      </Provider>
    )

    const backButtonLink = getByTestId('back-create-step-link')
    expect(backButtonLink.getAttribute('href')).toBe('/event/123-abc/task/1')
  })

  it('shows an error toast when the form is submitted without steps', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateStepManualForm />
      </Provider>
    )

    const saveButton = getByText('Save')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'There must be at least one step.'
      )
    })
  })
  it('displays an error toast when there is an error', async () => {
    const mockCreateTaskStepManually = jest.fn().mockResolvedValue({
      data: { error: 'An error occurred' },
      isLoading: false,
      isSuccess: false,
      error: { data: { error: 'An error occurred' } },
    })
    ;(useCreateTaskStepManuallyMutation as jest.Mock).mockReturnValue([
      mockCreateTaskStepManually,
      {
        isLoading: false,
        isSuccess: false,
        error: { data: { error: 'An error occurred' } },
      },
    ])

    render(
      <Provider store={store}>
        <CreateStepManualForm />
      </Provider>
    )

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('An error occurred')
    })
  })
  it('redirects to the task detail page on successful submission', async () => {
    const mockCreateTaskStepManually = jest.fn().mockResolvedValue({
      data: {},
    })
    ;(useCreateTaskStepManuallyMutation as jest.Mock).mockReturnValue([
      mockCreateTaskStepManually,
      {
        isLoading: false,
        isSuccess: true,
        error: null,
      },
    ])

    render(
      <Provider store={store}>
        <CreateStepManualForm />
      </Provider>
    )

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/event/123-abc/task/1')
    })
  })
})
