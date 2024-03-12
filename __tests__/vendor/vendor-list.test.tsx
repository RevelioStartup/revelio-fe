import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { useGetVendorListQuery } from '@/redux/api/vendorApi'
import VendorList from '@/app/vendor/VendorList'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

jest.mock('@/redux/api/vendorApi', () => ({
  useGetVendorListQuery: jest.fn(),
}))

jest.mock('@/app/vendor/VendorCard', () => ({
  VendorCard: jest.fn(({ vendor }) => (
    <div>
      <div>{vendor.name}</div>
      <div>{vendor.price}</div>
      <div>{vendor.address}</div>
      <div>{vendor.photos.join(',')}</div>
      <div>{vendor.status}</div>
      <div>{vendor.contact_name}</div>
      <div>{vendor.contact_phone_number}</div>
    </div>
  )),
}))

describe('Test for VendorList', () => {
  beforeEach(() => {
    ;(useGetVendorListQuery as jest.Mock).mockReturnValue({
      data: [
        {
          id: '1',
          name: 'Vendor 1',
          price: 100,
          address: 'Address 1',
          photos: ['photo1.jpg', 'photo2.jpg'],
          status: 'Active',
          contact_name: 'John Doe',
          contact_phone_number: '1234567890',
        },
        {
          id: '2',
          name: 'Vendor 2',
          price: 200,
          address: 'Address 2',
          photos: ['photo3.jpg', 'photo4.jpg'],
          status: 'Inactive',
          contact_name: 'Jane Doe',
          contact_phone_number: '9876543210',
        },
      ],
    })
  })

  it('renders VendorList component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <VendorList eventId="abhd" />
      </Provider>
    )

    expect(getByText('Vendor 1')).toBeInTheDocument()
    expect(getByText('100')).toBeInTheDocument()
    expect(getByText('Address 1')).toBeInTheDocument()
    expect(getByText('photo1.jpg,photo2.jpg')).toBeInTheDocument()
    expect(getByText('Active')).toBeInTheDocument()
    expect(getByText('John Doe')).toBeInTheDocument()
    expect(getByText('1234567890')).toBeInTheDocument()

    expect(getByText('Vendor 2')).toBeInTheDocument()
    expect(getByText('200')).toBeInTheDocument()
    expect(getByText('Address 2')).toBeInTheDocument()
    expect(getByText('photo3.jpg,photo4.jpg')).toBeInTheDocument()
    expect(getByText('Inactive')).toBeInTheDocument()
    expect(getByText('Jane Doe')).toBeInTheDocument()
    expect(getByText('9876543210')).toBeInTheDocument()
  })

  it('renders VendorList component with no vendors', () => {
    ;(useGetVendorListQuery as jest.Mock).mockReturnValue({
      data: [],
    })

    const { getByTestId } = render(
      <Provider store={store}>
        <VendorList eventId="eventId" />
      </Provider>
    )

    const boxElement = getByTestId('vendor-list-box')
    expect(boxElement.children.length).toBe(0)
  })
})
