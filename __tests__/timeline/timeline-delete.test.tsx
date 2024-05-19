import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import TimelineDetailsModal from '@/components/elements/Timeline/TimelineDetailsModal'

jest.mock('@/redux/api/timelineApi', () => ({
  useDeleteTimelineMutation: jest.fn(() => [
    jest.fn().mockResolvedValue({}),
    { isLoading: false, isSuccess: false },
  ]),
}))

describe('TimelineDetailsModal', () => {
  const mockOnClose = jest.fn()

  it('deletes the timeline and closes the modal on successful delete', async () => {
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

    global.confirm = jest.fn().mockReturnValue(true)

    fireEvent.click(getByText('Delete Timeline'))

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  it('does not delete the timeline if user cancels', async () => {
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

    global.confirm = jest.fn().mockReturnValue(false)

    fireEvent.click(getByText('Delete Timeline'))
    await waitFor(() => {
      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })
})
