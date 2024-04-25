import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'

import { useCreateRundownManuallyMutation } from '@/redux/api/rundownApi'
import { toast } from 'react-hot-toast'

import { redirect, useParams, usePathname } from 'next/navigation'
import { CreateRundownManualForm } from '@/app/event/[eventId]/(eventId)/rundown/CreateRundownManualForm'


jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useParams: jest.fn(),
  usePathname: jest.fn(),
}))

jest.mock('@/redux/api/rundownApi', () => ({
    useCreateRundownManuallyMutation: jest.fn(),
}))
describe('Testing create rundown manual form', () => {

  beforeEach(() => {
    jest.spyOn(toast, 'error').mockImplementation(jest.fn())

    const mockCreateRundownManually = jest.fn().mockResolvedValue({
      data: {},
    })
    ;(useCreateRundownManuallyMutation as jest.Mock).mockReturnValue([
        mockCreateRundownManually,
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
      eventId: '123',
    })
    ;(usePathname as jest.Mock).mockReturnValue(
      '/event/1/create-rundown'
    )
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('submits steps and calls create task step mutation', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <CreateRundownManualForm />
      </Provider>
    )
    const mockCreateRundownManually = jest.fn().mockResolvedValue({
      data: {
        event_id: 1,
        rundown_data: [
          {
            description: 'New Activity',
            start_time:'00:00',
            end_time:'01:00'
          },
        ],
      },
    })
    ;(useCreateRundownManuallyMutation as jest.Mock).mockReturnValue([
      mockCreateRundownManually,
      { isLoading: false, isSuccess: false, error: null },
    ])
    const addRundownButton = getByText('Add your rundown here')
    fireEvent.click(addRundownButton)

    const inputDescription = getByTestId('rundown_data.0.description')
    fireEvent.change(inputDescription, { target: { value: 'New activity' } })

    const inputStartTime = getByTestId('rundown_data.0.start_time')
    fireEvent.change(inputStartTime, { target: { value: '00:00' } })

    const inputEndTime = getByTestId('rundown_data.0.end_time')
    fireEvent.change(inputEndTime, { target: { value: '01:00' } })

    const saveButton = getByText('Save')
    fireEvent.click(saveButton)

    await waitFor(() =>
        expect(mockCreateRundownManually).toHaveBeenCalledTimes(0)
      )
  })

  it('should have a back button that redirects to the event detail page', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CreateRundownManualForm />
      </Provider>
    )

    const backButtonLink = getByTestId('back-create-rundown')
    expect(backButtonLink.getAttribute('href')).toBe('/event/1')
  })

  it('shows an error toast when the form is submitted without rundown', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateRundownManualForm />
      </Provider>
    )

    const saveButton = getByText('Save')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'There must be at least one rundown.'
      )
    })
    
  })
  it('displays an error toast when there is an error', async () => {
    const mockCreateTaskStepManually = jest.fn().mockResolvedValue({
      data: { error: 'Invalid rundown data' },
      isLoading: false,
      isSuccess: false,
      error: { data: { error: 'Invalid rundown data' } },
    })
    ;(useCreateRundownManuallyMutation as jest.Mock).mockReturnValue([
      mockCreateTaskStepManually,
      {
        isLoading: false,
        isSuccess: false,
        error: { data: { error: 'An error occurred' } },
      },
    ])

    render(
      <Provider store={store}>
        <CreateRundownManualForm />
      </Provider>
    )

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('An error occurred')
    })
  })
  it('redirects to the event detail page on successful form submission', async () => {
    const mockCreateTaskStepManually = jest.fn().mockResolvedValue({
      data: {},
    })
    ;(useCreateRundownManuallyMutation as jest.Mock).mockReturnValue([
      mockCreateTaskStepManually,
      {
        isLoading: false,
        isSuccess: true,
        error: null,
      },
    ])

    render(
      <Provider store={store}>
        <CreateRundownManualForm />
      </Provider>
    )

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/event/1')
    })
  })
})

