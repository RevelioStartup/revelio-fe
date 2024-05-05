import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import '@testing-library/jest-dom'
import RundownTable from '@/app/event/[eventId]/(eventId)/rundown/RundownTable'
import {
  useDeleteAllRundownMutation,
  useDeleteRundownMutation,
} from '@/redux/api/rundownApi'

jest.mock('@/redux/api/rundownApi', () => ({
  useDeleteRundownMutation: jest.fn(),
  useDeleteAllRundownMutation: jest.fn(),
  useGetEventRundownQuery: jest.fn().mockReturnValue({
    data: [],
  }),
}))

describe('RundownTable', () => {
  beforeEach(() => {
    ;(useDeleteRundownMutation as jest.Mock).mockReturnValue([
      jest
        .fn()
        .mockImplementation(({ id }) =>
          Promise.resolve({ data: `Rundown successfully deleted.` })
        ),
      { isLoading: false },
    ])
    ;(useDeleteAllRundownMutation as jest.Mock).mockReturnValue([
      jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ data: `Successfully deleted 3 task step(s).` })
        ),
      { isLoading: false },
    ])
  })
  test('renders RundownTable component', () => {
    render(
      <Provider store={store}>
        <RundownTable eventId="testEventId" />
      </Provider>
    )

    expect(screen.getByTestId('no-rundown-text')).toBeInTheDocument()
  })
})
