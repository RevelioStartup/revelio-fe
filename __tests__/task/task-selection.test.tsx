import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import AddVenueSelection from '@/app/task/AddVenueSelection'
import AddVendorSelection from '@/app/task/AddVendorSelection'
import '@testing-library/jest-dom'

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: (cb: any) => cb,
    watch: jest.fn(),
    reset: jest.fn(),
    control: jest.fn(),
  }),
}))

jest.mock('@/redux/api/eventApi', () => ({
  useGetEventQuery: jest.fn().mockReturnValue({
    data: { id: '1', recommend_venue: true, recommend_vendor: true },
  }),
  useUpdateEventMutation: jest
    .fn()
    .mockReturnValue([jest.fn().mockResolvedValue({ data: {} })]),
}))
jest.mock('@/redux/api/taskApi', () => ({
  useCreateTaskMutation: jest
    .fn()
    .mockReturnValue([jest.fn().mockResolvedValue({ data: { id: 1 } })]),
}))

describe('AddVenueSelection', () => {
  it('renders correctly', () => {
    const setIsVenueVisible = jest.fn()
    const { getByTestId } = render(
      <Provider store={store}>
        <AddVenueSelection
          eventId="testEventId"
          setIsVenueVisible={setIsVenueVisible}
        />
      </Provider>
    )

    expect(getByTestId('task-title')).toBeInTheDocument()
    expect(getByTestId('task-description')).toBeInTheDocument()
  })

  it('calls the onSubmit function when the venue-yes-button is clicked', async () => {
    const setIsVenueVisible = jest.fn()
    const { getByTestId } = render(
      <Provider store={store}>
        <AddVenueSelection
          eventId="testEventId"
          setIsVenueVisible={setIsVenueVisible}
        />
      </Provider>
    )

    fireEvent.click(getByTestId('venue-yes-button'))

    await waitFor(() => {
      expect(setIsVenueVisible).toHaveBeenCalledWith(false)
    })
  })

  it('calls the handleUpdateVenue function when the venue-no-button is clicked', async () => {
    const setIsVenueVisible = jest.fn()
    const { getByTestId } = render(
      <Provider store={store}>
        <AddVenueSelection
          eventId="testEventId"
          setIsVenueVisible={setIsVenueVisible}
        />
      </Provider>
    )

    fireEvent.click(getByTestId('venue-no-button'))

    await waitFor(() => {
      expect(setIsVenueVisible).toHaveBeenCalledWith(false)
    })
  })
})

describe('AddVendorSelection', () => {
  it('renders correctly', () => {
    const setIsVendorVisible = jest.fn()
    const { getByTestId } = render(
      <Provider store={store}>
        <AddVendorSelection
          eventId="testEventId"
          setIsVendorVisible={setIsVendorVisible}
        />
      </Provider>
    )

    expect(getByTestId('task-title')).toBeInTheDocument()
    expect(getByTestId('task-description')).toBeInTheDocument()
  })

  it('calls the onSubmit function when the vendor-yes-button is clicked', async () => {
    const setIsVendorVisible = jest.fn()
    const { getByTestId } = render(
      <Provider store={store}>
        <AddVendorSelection
          eventId="testEventId"
          setIsVendorVisible={setIsVendorVisible}
        />
      </Provider>
    )

    fireEvent.click(getByTestId('vendor-yes-button'))

    await waitFor(() => {
      expect(setIsVendorVisible).toHaveBeenCalledWith(false)
    })
  })

  it('calls the handleUpdateVendor function when the vendor-no-button is clicked', async () => {
    const setIsVendorVisible = jest.fn()
    const { getByTestId } = render(
      <Provider store={store}>
        <AddVendorSelection
          eventId="testEventId"
          setIsVendorVisible={setIsVendorVisible}
        />
      </Provider>
    )

    fireEvent.click(getByTestId('vendor-no-button'))

    await waitFor(() => {
      expect(setIsVendorVisible).toHaveBeenCalledWith(false)
    })
  })
})
