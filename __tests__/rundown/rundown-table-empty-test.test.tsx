import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import '@testing-library/jest-dom'
import RundownTable from '@/app/event/[eventId]/(eventId)/rundown/RundownTable'
import {
  useCreateRundownWithAIMutation,
  useDeleteAllRundownMutation,
  useDeleteRundownMutation,
} from '@/redux/api/rundownApi'
import { RundownContextProvider } from '@/components/contexts/RundownContext'
import { redirect, useParams, usePathname } from 'next/navigation'

jest.mock('@/redux/api/rundownApi', () => ({
  useDeleteRundownMutation: jest.fn(),
  useDeleteAllRundownMutation: jest.fn(),
  useGetEventRundownQuery: jest.fn().mockReturnValue({
    data: [],
  }),
  useCreateRundownWithAIMutation: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useParams: jest.fn(),
  redirect: jest.fn(),
}))

describe('RundownTable', () => {
  const mockGenerateRundownWithAI = jest.fn().mockResolvedValue({
    data: { event_id: 3, rundown_data: [] },
    isSuccess: true,
  })
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
    ;(usePathname as jest.Mock).mockReturnValue('/event/3/create-rundown')
    ;(useParams as jest.Mock).mockReturnValue({ eventId: 'testEventId' })
    ;(useCreateRundownWithAIMutation as jest.Mock).mockReturnValue([
      mockGenerateRundownWithAI,
      { data: { event_id: 3, rundown_data: [] }, isSuccess: true },
    ])
  })
  test('renders RundownTable component', () => {
    render(
      <Provider store={store}>
        <RundownContextProvider>
          <RundownTable eventId="testEventId" />
        </RundownContextProvider>
      </Provider>
    )

    expect(screen.getByTestId('no-rundown-text')).toBeInTheDocument()
  })
})
