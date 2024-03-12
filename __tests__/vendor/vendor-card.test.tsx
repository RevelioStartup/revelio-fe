import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  useDeleteVendorMutation,
  useUpdateVendorMutation,
  useAddPhotoVendorMutation,
} from '@/redux/api/vendorApi'
import { VendorCard } from '@/app/vendor/VendorCard'

const mockVendor = {
  id: 1,
  name: 'Test Vendor',
  address: 'Test Address',
  price: 1000000,
  contact_name: 'Test Name',
  contact_phone_number: '1234567890',
  event: 'cfa26386-c1ed-465e-a035-36478db57d4b',
  photos: [],
  status: 'PENDING',
}

jest.mock('@/redux/api/vendorApi', () => ({
  useDeleteVendorMutation: jest.fn(),
  useUpdateVendorMutation: jest.fn(),
  useAddPhotoVendorMutation: jest.fn(),
}))

describe('VendorCard Component', () => {
  beforeEach(() => {
    const mockDeleteVendor = jest.fn().mockResolvedValue({ data: {} })
    ;(useDeleteVendorMutation as jest.Mock).mockReturnValue([mockDeleteVendor])

    const mockUpdateVendor = jest.fn().mockResolvedValue({ data: {} })
    ;(useUpdateVendorMutation as jest.Mock).mockReturnValue([mockUpdateVendor])

    const mockAddPhoto = jest.fn().mockResolvedValue({ data: {} })
    ;(useAddPhotoVendorMutation as jest.Mock).mockReturnValue([mockAddPhoto])
  })

  it('renders vendor details', () => {
    const { getByText } = render(<VendorCard vendor={mockVendor} />)

    expect(getByText('Test Vendor')).toBeInTheDocument()
    expect(getByText('Test Address')).toBeInTheDocument()
    expect(getByText('Test Name')).toBeInTheDocument()
    expect(getByText('1234567890')).toBeInTheDocument()
  })

  it('toggles edit mode when edit button is clicked', () => {
    const { getByTestId } = render(<VendorCard vendor={mockVendor} />)

    fireEvent.click(getByTestId('edit-button'))

    expect(getByTestId('input-address')).toBeInTheDocument()
    expect(getByTestId('input-price')).toBeInTheDocument()
    expect(getByTestId('input-contact-name')).toBeInTheDocument()
    expect(getByTestId('input-contact-phone-number')).toBeInTheDocument()
  })

  it('calls deleteVendor when delete button is clicked', () => {
    const { getByTestId } = render(<VendorCard vendor={mockVendor} />)

    fireEvent.click(getByTestId('delete-button'))

    expect(useDeleteVendorMutation).toHaveBeenCalledWith()
  })

  it('calls updateVendor and addPhoto when form is submitted', async () => {
    const { getByTestId } = render(<VendorCard vendor={mockVendor} />)

    fireEvent.click(getByTestId('edit-button'))

    fireEvent.change(getByTestId('input-address'), {
      target: { value: 'Updated Address' },
    })
    fireEvent.change(getByTestId('input-price'), { target: { value: '150' } })

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

    fireEvent.submit(getByTestId('vendor-card-form'))

    await waitFor(() => {
      expect(useUpdateVendorMutation).toHaveBeenCalled()
      expect(useAddPhotoVendorMutation).toHaveBeenCalled()
    })
  })

  it('shows a warning when a field is empty', async () => {
    const { getByTestId, findByText } = render(
      <VendorCard vendor={mockVendor} />
    )

    fireEvent.click(getByTestId('edit-button'))

    fireEvent.change(getByTestId('input-address'), {
      target: { value: '' },
    })

    fireEvent.submit(getByTestId('vendor-card-form'))

    const warningMessage = await findByText('Please complete this field')
    expect(warningMessage).toBeInTheDocument()
  })
})
