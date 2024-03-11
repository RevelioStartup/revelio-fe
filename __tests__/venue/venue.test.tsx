import '@testing-library/jest-dom'

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { VenueCreateForm } from '@/app/venue/VenueCreateForm'
import {
  useCreateVenueMutation,
  useAddPhotoMutation,
} from '@/redux/api/venueApi'
import { useAppDispatch, useAppSelector } from '@/redux/store'

jest.mock('@/redux/api/venueApi', () => ({
  useCreateVenueMutation: jest.fn(),
  useAddPhotoMutation: jest.fn(),
}))

describe('Test for VenueCreateForm', () => {
  beforeEach(() => {
    const mockAddPhoto = jest.fn().mockResolvedValue({ data: {} })
    ;(useAddPhotoMutation as jest.Mock).mockReturnValue([mockAddPhoto])
  })

  it('renders VenueCreateForm', () => {
    const mockCreateVenue = jest.fn().mockResolvedValue({ data: {} })
    ;(useCreateVenueMutation as jest.Mock).mockReturnValue([mockCreateVenue])

    const { getByTestId } = render(<VenueCreateForm />)
    expect(getByTestId('venue-create-form')).toBeInTheDocument()
  })

  it('submits form and adds venue with photos', async () => {
    const mockCreateVenue = jest.fn()
    mockCreateVenue.mockResolvedValue({
      unwrap: jest.fn().mockResolvedValue({
        id: 1,
        photos: [],
        name: 'Event 1',
        address: 'Orchard Road',
        price: 50000,
        status: 'PENDING',
        contact_name: 'John',
        contact_phone_number: '088888888888',
        event: '7b3c2baa-b2ad-442e-9814-82ad3c346701',
      }),
    })

    ;(useCreateVenueMutation as jest.Mock).mockReturnValue([mockCreateVenue])

    const mockCreateVenueMutation = useCreateVenueMutation as jest.Mock

    const mockData = {
      id: 1,
      photos: [],
      name: 'Event 1',
      address: 'Orchard Road',
      price: 50000,
      status: 'PENDING',
      contact_name: 'John',
      contact_phone_number: '088888888888',
      event: '7b3c2baa-b2ad-442e-9814-82ad3c346701',
    }
    const mockIsLoading = false

    const unwrapMock = jest.fn(() => mockData)
    const resolvedValue = { result: 'success', unwrap: unwrapMock }
    mockCreateVenue.mockResolvedValue(Promise.resolve(resolvedValue))

    mockCreateVenueMutation.mockReturnValue([
      mockCreateVenue,
      { isLoading: mockIsLoading, data: mockData },
    ])

    const { getByTestId } = render(<VenueCreateForm />)

    fireEvent.change(getByTestId('input-venue-name'), {
      target: { value: 'Test Venue' },
    })
    fireEvent.change(getByTestId('input-address'), {
      target: { value: 'Test Address' },
    })
    fireEvent.change(getByTestId('input-price'), { target: { value: '100' } })
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
      expect(mockCreateVenue).toHaveBeenCalled()
      // expect(mockAddPhoto).toHaveBeenCalled();
    })
  })
})
