import '@testing-library/jest-dom'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import RundownTable from '@/app/event/[eventId]/(eventId)/rundown/RundownTable'
import { useUpdateRundownMutation } from '@/redux/api/rundownApi'
import { RundownsDetail } from '@/types/rundown'
import { toast } from 'react-hot-toast'


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
  useUpdateRundownMutation: jest.fn(),
}))

const mockUpdateRundownData:RundownsDetail = {
  id: '89f5ded5-3267-4c34-ac6b-a5f345621682',
  start_time: '14:05:00',
  end_time: '15:50:00',
  description: 'isi updated data bener',
  rundown_order: 2,
  event: 'bf8d2392-2bf5-4659-8ff4-652e46c21749',
}

describe('RundownTable', () => {
  test('renders RundownTable component', () => {
    const mockUseUpdateRundownMutation = jest
      .fn()
      .mockResolvedValue({ data: mockUpdateRundownData })
    ;(useUpdateRundownMutation as jest.Mock).mockReturnValue([
      mockUseUpdateRundownMutation,
    ])

    render(
      <Provider store={store}>
        <RundownTable eventId="testEventId" />
      </Provider>
    )

    expect(screen.getByTestId('rundown-table')).toBeInTheDocument()
  })
})

describe('Rundown Edit', () => {
  test('renders rundown edit dialog component', () => {
    const mockUseUpdateRundownMutation = jest
      .fn()
      .mockResolvedValue({ data: mockUpdateRundownData })
    ;(useUpdateRundownMutation as jest.Mock).mockReturnValue([
      mockUseUpdateRundownMutation,
    ])

    render(
      <Provider store={store}>
        <RundownTable eventId="testEventId" />
      </Provider>
    )

    act(() => {
      const buttonEdit = screen.getByTestId('rundown-2-edit')
      fireEvent.click(buttonEdit)
    })
    expect(screen.getByTestId('edit-rundown-dialog')).toBeInTheDocument()

    const buttonClose = screen.getByTestId('close-form')
    fireEvent.click(buttonClose)
  })

  test('update rundown correctly', async () => {
    const mockUseUpdateRundownMutation = jest
      .fn()
      .mockResolvedValue({ data: mockUpdateRundownData })
    ;(useUpdateRundownMutation as jest.Mock).mockReturnValue([
      mockUseUpdateRundownMutation,
    ])

    render(
      <Provider store={store}>
        <RundownTable eventId="testEventId" />
      </Provider>
    )

    act(() => {
      const buttonEdit = screen.getByTestId('rundown-2-edit')
      fireEvent.click(buttonEdit)
    })
    fireEvent.change(screen.getByTestId('description-input'), {
      target: { value: 'isi updated data bener' },
    })
    fireEvent.change(screen.getByTestId('start-time-input'), {
      target: { value: '14:05:00' },
    })
    fireEvent.change(screen.getByTestId('end-time-input'), {
      target: { value: '15:50:00' },
    })
    const buttonSubmit = screen.getByTestId('button-submit')
    fireEvent.click(buttonSubmit)
    await waitFor(() =>
      expect(mockUseUpdateRundownMutation).toHaveBeenCalledTimes(1)
    )
  })

  test('display update rundown error correctly', async () => {
    jest.spyOn(toast, 'error').mockImplementation(jest.fn())

    const mockUseUpdateRundownMutation = jest
      .fn()
      .mockResolvedValue({ error: {data: {"message":"Invalid rundown data"}} })
    ;(useUpdateRundownMutation as jest.Mock).mockReturnValue([
      mockUseUpdateRundownMutation,
    ])

    render(
      <Provider store={store}>
        <RundownTable eventId="testEventId" />
      </Provider>
    )

    act(() => {
      const buttonEdit = screen.getByTestId('rundown-2-edit')
      fireEvent.click(buttonEdit)
    })
    const buttonSubmit = screen.getByTestId('button-submit')
    fireEvent.click(buttonSubmit)
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid rundown data')
    })
  })

  test('display unknown error correctly', async () => {
    jest.spyOn(toast, 'error').mockImplementation(jest.fn())

    const mockUseUpdateRundownMutation = jest
      .fn()
      .mockResolvedValue({ error: {} })
    ;(useUpdateRundownMutation as jest.Mock).mockReturnValue([
      mockUseUpdateRundownMutation,
    ])

    render(
      <Provider store={store}>
        <RundownTable eventId="testEventId" />
      </Provider>
    )

    act(() => {
      const buttonEdit = screen.getByTestId('rundown-2-edit')
      fireEvent.click(buttonEdit)
    })
    const buttonSubmit = screen.getByTestId('button-submit')
    fireEvent.click(buttonSubmit)
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Unknown error!')
    })
  })
})
