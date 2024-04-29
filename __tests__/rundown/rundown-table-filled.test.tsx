import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import '@testing-library/jest-dom'
import RundownTable from '@/app/event/[eventId]/(eventId)/rundown/RundownTable'

jest.mock('@/redux/api/rundownApi', () => ({
  useGetEventRundownQuery: jest.fn().mockReturnValue({
    data: [
      {
        id: 'efa74992-001f-4e09-9cb9-7cee4d59746e',
        start_time: '12:00:00',
        end_time: '13:50:00',
        description: 'pembukaan',
        rundown_order: 1,
        event: 'bf8d2392-2bf5-4659-8ff4-652e46c21749',
      },
      {
        id: '89f5ded5-3267-4c34-ac6b-a5f345621682',
        start_time: '14:00:00',
        end_time: '16:00:00',
        description: 'isi',
        rundown_order: 2,
        event: 'bf8d2392-2bf5-4659-8ff4-652e46c21749',
      },
      {
        id: '6d52053d-ba3d-486e-beca-378e1977db36',
        start_time: '16:00:00',
        end_time: '18:00:00',
        description: 'penutupan',
        rundown_order: 3,
        event: 'bf8d2392-2bf5-4659-8ff4-652e46c21749',
      },
    ],
  }),
}))

describe('RundownTable', () => {
  test('renders RundownTable component', () => {
    render(
      <Provider store={store}>
        <RundownTable eventId="testEventId" />
      </Provider>
    )

    expect(screen.getByTestId('rundown-table')).toBeInTheDocument()
  })
})