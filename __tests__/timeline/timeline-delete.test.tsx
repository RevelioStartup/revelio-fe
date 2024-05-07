import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import TimelineDetailsModal from '@/components/elements/Timeline/TimelineDetailsModal'
import {
  useDeleteTimelineMutation,
  useModifyDetailTimelineMutation,
} from '@/redux/api/timelineApi'

jest.mock('@/redux/api/timelineApi', () => ({
  useDeleteTimelineMutation: jest.fn(),
  useModifyDetailTimelineMutation: jest.fn(),
}))

describe('TimelineDetailsModal', () => {
  const mockOnClose = jest.fn()

  it('deletes the timeline and closes the modal on successful delete', async () => {
    const mockUseDeleteTimelineMutation = useDeleteTimelineMutation as jest.Mock

    mockUseDeleteTimelineMutation.mockReturnValue([
      jest.fn(),
      { isLoading: false, isSuccess: true },
    ])

    const mockModifyDetailTimelineMutation =
      useModifyDetailTimelineMutation as jest.Mock
    mockModifyDetailTimelineMutation.mockReturnValue([
      jest.fn(),
      { isLoading: false, isSuccess: true },
    ])

    const { getByText } = render(
      <Provider store={store}>
        <TimelineDetailsModal
          timelineId="1"
          onClose={mockOnClose}
          showModal={true}
          clickedEvent={{
            title: 'Setup',
            start: new Date('2022-05-01T09:00:00Z'),
            end: new Date('2022-05-01T10:00:00Z'),
          }}
        />
      </Provider>
    )

    fireEvent.click(getByText('Delete Timeline'))
  })

  it('does not delete the timeline if user cancels', async () => {
    const mockUseDeleteTimelineMutation = useDeleteTimelineMutation as jest.Mock

    mockUseDeleteTimelineMutation.mockReturnValue([
      jest.fn(),
      { isLoading: false, isSuccess: true },
    ])

    const mockModifyDetailTimelineMutation =
      useModifyDetailTimelineMutation as jest.Mock
    mockModifyDetailTimelineMutation.mockReturnValue([
      jest.fn(),
      { isLoading: false, isSuccess: true },
    ])

    const { getByText } = render(
      <Provider store={store}>
        <TimelineDetailsModal
          timelineId="1"
          onClose={mockOnClose}
          showModal={true}
          clickedEvent={{
            title: 'Setup',
            start: new Date('2022-05-01T09:00:00Z'),
            end: new Date('2022-05-01T10:00:00Z'),
          }}
        />
      </Provider>
    )

    fireEvent.click(getByText('Delete Timeline'))
  })
})
