import '@testing-library/jest-dom'

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  useCreateVendorMutation,
  useAddPhotoVendorMutation,
} from '@/redux/api/vendorApi'
import VendorCreateForm from '@/app/vendor/VendorCreateForm'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

jest.mock('@/redux/api/vendorApi', () => ({
  useCreateVendorMutation: jest.fn(),
  useAddPhotoVendorMutation: jest.fn(),
}))

describe('Test for VendorCreateForm', () => {
  beforeEach(() => {
    const mockCreateVendor = jest
      .fn()
      .mockResolvedValue({ data: {}, unwrap: jest.fn() })
    ;(useCreateVendorMutation as jest.Mock).mockReturnValue([mockCreateVendor])
    const mockAddPhoto = jest.fn().mockResolvedValue({ data: {} })
    ;(useAddPhotoVendorMutation as jest.Mock).mockReturnValue([mockAddPhoto])
  })

  it('renders VendorCreateForm', () => {
    const createVendor = jest.fn().mockResolvedValue({ data: {} })
    ;(useCreateVendorMutation as jest.Mock).mockReturnValue([createVendor])

    const { getByTestId } = render(
      <Provider store={store}>
        <VendorCreateForm eventId={'cfa26386-c1ed-465e-a035-36478db57d4b'} />
      </Provider>
    )
    expect(getByTestId('venue-create-form')).toBeInTheDocument()
  })

  it('submits form and adds venue with photos', async () => {
    const mockCreateVendor = jest.fn().mockResolvedValue({
      data: {
        id: 1,
      },
    })
    ;(useCreateVendorMutation as jest.Mock).mockReturnValue([
      mockCreateVendor,
      {},
    ])

    const mockAddPhoto = jest.fn().mockResolvedValue({ data: {} })
    ;(useAddPhotoVendorMutation as jest.Mock).mockReturnValue([mockAddPhoto])
    const { getByTestId } = render(
      <Provider store={store}>
        <VendorCreateForm eventId={'cfa26386-c1ed-465e-a035-36478db57d4b'} />
      </Provider>
    )

    fireEvent.change(getByTestId('input-venue-name'), {
      target: { value: 'Test Venue' },
    })
    fireEvent.change(getByTestId('input-address'), {
      target: { value: 'Test Address' },
    })
    fireEvent.change(getByTestId('input-price'), { target: { value: 100 } })
    fireEvent.change(getByTestId('input-status'), {
      target: { value: 'PENDING' },
    })
    fireEvent.change(getByTestId('input-contact-name'), {
      target: { value: 'Test Name' },
    })
    fireEvent.change(getByTestId('input-contact-phone-number'), {
      target: { value: '1234567890' },
    })

    const imageFile = new File(
      ['image'],
      '/../../public/assets/images/empathymap.jpg',
      { type: 'image/jpeg' }
    )

    const imageInput = getByTestId('input-images')

    fireEvent.change(imageInput, {
      target: {
        files: [imageFile],
      },
    })

    fireEvent.submit(getByTestId('venue-create-form'))

    await waitFor(() => {
      expect(mockCreateVendor).toHaveBeenCalledWith({
        name: 'Test Venue',
        address: 'Test Address',
        price: '100',
        contact_name: 'Test Name',
        contact_phone_number: '1234567890',
        event: 'cfa26386-c1ed-465e-a035-36478db57d4b',
        photos: [],
        status: 'PENDING',
      })
      expect(mockCreateVendor).toHaveBeenCalled()
      expect(mockAddPhoto).toHaveBeenCalled()
    })
  })

  it('shows a warning when a field is empty', async () => {
    const mockCreateVendor = jest.fn().mockResolvedValue({
      data: {
        id: 1,
      },
    })
    ;(useCreateVendorMutation as jest.Mock).mockReturnValue([
      mockCreateVendor,
      {},
    ])

    const { getByTestId, findByText } = render(
      <Provider store={store}>
        <VendorCreateForm eventId={'cfa26386-c1ed-465e-a035-36478db57d4b'} />
      </Provider>
    )

    // Leave 'input-venue-name' empty
    fireEvent.change(getByTestId('input-address'), {
      target: { value: 'Test Address' },
    })
    fireEvent.change(getByTestId('input-price'), { target: { value: 100 } })
    fireEvent.change(getByTestId('input-status'), {
      target: { value: 'PENDING' },
    })
    fireEvent.change(getByTestId('input-contact-name'), {
      target: { value: 'Test Name' },
    })
    fireEvent.change(getByTestId('input-contact-phone-number'), {
      target: { value: '1234567890' },
    })

    fireEvent.submit(getByTestId('venue-create-form'))

    // Check if the warning message appears
    const warningMessage = await findByText('Please complete this field')
    expect(warningMessage).toBeInTheDocument()
  })
})
