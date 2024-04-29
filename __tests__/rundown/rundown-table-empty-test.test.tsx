import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import '@testing-library/jest-dom'
import RundownTable from '@/app/event/[eventId]/(eventId)/rundown/RundownTable'

jest.mock('@/redux/api/rundownApi', () => ({
  useGetEventRundownQuery: jest.fn().mockReturnValue({
    data: [],
  }),
}))

describe('RundownTable', () => {
  test('renders RundownTable component', () => {
    render(
      <Provider store={store}>
        <RundownTable eventId="testEventId" />
      </Provider>
    )

    expect(screen.getByTestId('no-rundown-text')).toBeInTheDocument()
  })
})