import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { VenueCard } from '@/app/venue/VenueCard'
import {
  useDeleteVenueMutation,
  useUpdateVenueMutation,
  useAddPhotoMutation,
} from '@/redux/api/venueApi';

const mockVenue = {
    id: 1,
    name: 'Test Venue',
    address: 'Test Address',
    price: 1000000,
    contact_name: 'Test Name',
    contact_phone_number: '1234567890',
    event: 'cfa26386-c1ed-465e-a035-36478db57d4b',
    photos: [],
    status: 'PENDING',
};

jest.mock('@/redux/api/venueApi', () => ({
  useDeleteVenueMutation: jest.fn(),
  useUpdateVenueMutation: jest.fn(),
  useAddPhotoMutation: jest.fn(),
}));

describe('VenueCard Component', () => {
  beforeEach(() => {
    const mockDeleteVenue = jest.fn().mockResolvedValue({ data: {} });
    (useDeleteVenueMutation as jest.Mock).mockReturnValue([mockDeleteVenue])
    
    const mockUpdateVenue = jest.fn().mockResolvedValue({ data: {} });
    (useUpdateVenueMutation as jest.Mock).mockReturnValue([mockUpdateVenue])

    const mockAddPhoto = jest.fn().mockResolvedValue({ data: {} });
    (useAddPhotoMutation as jest.Mock).mockReturnValue([mockAddPhoto])
  });

  it('renders venue details', () => {
    const { getByText } = render(<VenueCard venue={mockVenue} />);

    expect(getByText('Test Venue')).toBeInTheDocument();
    expect(getByText('Test Address')).toBeInTheDocument();
    expect(getByText('Test Name')).toBeInTheDocument();
    expect(getByText('1234567890')).toBeInTheDocument();
  });

  it('toggles edit mode when edit button is clicked', () => {
    const { getByText, getByTestId } = render(<VenueCard venue={mockVenue} />);

    fireEvent.click(getByTestId('edit-button'));

    expect(getByTestId('input-address')).toBeInTheDocument();
    expect(getByTestId('input-price')).toBeInTheDocument();
    expect(getByTestId('input-contact-name')).toBeInTheDocument();
    expect(getByTestId('input-contact-phone-number')).toBeInTheDocument();
  });

  it('calls deleteVenue when delete button is clicked', () => {
    const { getByText, getByTestId } = render(<VenueCard venue={mockVenue} />);

    fireEvent.click(getByTestId('delete-button'));

    expect(useDeleteVenueMutation).toHaveBeenCalledWith();
  });

  it('calls updateVenue and addPhoto when form is submitted', async () => {
    const { getByText, getByTestId } = render(<VenueCard venue={mockVenue} />);

    fireEvent.click(getByTestId('edit-button'));

    fireEvent.change(getByTestId('input-address'), { target: { value: 'Updated Address' } });
    fireEvent.change(getByTestId('input-price'), { target: { value: '150' } });

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

    fireEvent.submit(getByTestId('venue-card-form'));
    
    await waitFor(() => {
        expect(useUpdateVenueMutation).toHaveBeenCalled();
        expect(useAddPhotoMutation).toHaveBeenCalled();
    });
  });

  it('shows a warning when a field is empty', async () => {
  
    const { getByTestId, findByText } = render(<VenueCard venue={mockVenue} />);

    fireEvent.click(getByTestId('edit-button'));
  
    fireEvent.change(getByTestId('input-address'), {
      target: { value: '' },
    });
  
    fireEvent.submit(getByTestId('venue-card-form'));
  
    const warningMessage = await findByText('Please complete this field');
    expect(warningMessage).toBeInTheDocument();
  });
});
