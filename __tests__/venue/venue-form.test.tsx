import '@testing-library/jest-dom'

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { VenueCreateForm } from '@/app/venue/VenueCreateForm'
import {
  useCreateVenueMutation,
  useAddPhotoMutation,
} from '@/redux/api/venueApi'

jest.mock('@/redux/api/venueApi', () => ({
  useCreateVenueMutation: jest.fn(),
  useAddPhotoMutation: jest.fn(),
}))

describe('Test for VenueCreateForm', () => {
  beforeEach(() => {
    const mockCreateVenue = jest
      .fn()
      .mockResolvedValue({ data: {}, unwrap: jest.fn() })
    ;(useCreateVenueMutation as jest.Mock).mockReturnValue([mockCreateVenue])
    const mockAddPhoto = jest.fn().mockResolvedValue({ data: {} })
    ;(useAddPhotoMutation as jest.Mock).mockReturnValue([mockAddPhoto])
  })

  it('renders VenueCreateForm', () => {
    const createVenue = jest.fn().mockResolvedValue({ data: {} })
    ;(useCreateVenueMutation as jest.Mock).mockReturnValue([createVenue])

    const { getByTestId } = render(
      <VenueCreateForm eventId={'cfa26386-c1ed-465e-a035-36478db57d4b'} />
    )
    expect(getByTestId('venue-create-form')).toBeInTheDocument()
  })

  it('submits form and adds venue with photos', async () => {
    const mockCreateVenue = jest.fn().mockResolvedValue({
      data: {
        id: 1,
      },
    })
    ;(useCreateVenueMutation as jest.Mock).mockReturnValue([
      mockCreateVenue,
      {},
    ])

    const mockAddPhoto = jest.fn().mockResolvedValue({ data: {} })
    ;(useAddPhotoMutation as jest.Mock).mockReturnValue([mockAddPhoto])
    const { getByTestId } = render(
      <VenueCreateForm eventId={'cfa26386-c1ed-465e-a035-36478db57d4b'} />
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
      expect(mockCreateVenue).toHaveBeenCalledWith({
        name: 'Test Venue',
        address: 'Test Address',
        price: '100',
        contact_name: 'Test Name',
        contact_phone_number: '1234567890',
        event: 'cfa26386-c1ed-465e-a035-36478db57d4b',
        photos: [],
        status: 'PENDING',
      })
      expect(mockCreateVenue).toHaveBeenCalled()
      expect(mockAddPhoto).toHaveBeenCalled()
    })
  })

  it('shows a warning when a field is empty', async () => {
    const mockCreateVenue = jest.fn().mockResolvedValue({
      data: {
        id: 1,
      },
    })
    ;(useCreateVenueMutation as jest.Mock).mockReturnValue([
      mockCreateVenue,
      {},
    ])

    const { getByTestId, findByText } = render(
      <VenueCreateForm eventId={'cfa26386-c1ed-465e-a035-36478db57d4b'} />
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
