import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { GalleryPage } from '@/app/venue/GalleryPage'
import { VenueCard } from '@/app/venue/VenueCard'
import { VenueCreateForm } from '@/app/venue/VenueCreateForm'

import '@testing-library/jest-dom'

describe('VenueCard Component', () => {
  beforeEach(() => {
    render(<VenueCard />)
  })

  it('renders the venue card', () => {
    const venueCardElement = screen.getByTestId('venue-card')
    expect(venueCardElement).toBeInTheDocument()
  })

  it('renders the title', () => {
    const titleElement = screen.getByText('Title')
    expect(titleElement).toBeInTheDocument()
  })

  it('renders the address', () => {
    const addressElement = screen.getByText('Address')
    expect(addressElement).toBeInTheDocument()
  })

  it('renders the price', () => {
    const priceElement = screen.getByText('Price')
    expect(priceElement).toBeInTheDocument()
  })

  it('renders the status', () => {
    const statusElement = screen.getByText('Status')
    expect(statusElement).toBeInTheDocument()
  })

  it('renders the inquiry', () => {
    const inquiryElement = screen.getByText('Inquiry')
    expect(inquiryElement).toBeInTheDocument()
  })

  it('renders the contact name', () => {
    const contactNameElement = screen.getByText('Contact Name')
    expect(contactNameElement).toBeInTheDocument()
  })

  it('renders the contact phone number', () => {
    const contactPhoneNumberElement = screen.getByText('Contact Phone Number')
    expect(contactPhoneNumberElement).toBeInTheDocument()
  })
})

describe('VenueCreateForm', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<VenueCreateForm />)
    expect(getByTestId('venue-create-form')).toBeInTheDocument()
  })

  it('updates input values on change', () => {
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

    expect((getByTestId('input-venue-name') as HTMLInputElement).value).toBe(
      'Test Venue'
    )
    expect((getByTestId('input-address') as HTMLInputElement).value).toBe(
      'Test Address'
    )
    expect((getByTestId('input-price') as HTMLInputElement).value).toBe('100')
    expect((getByTestId('input-contact-name') as HTMLInputElement).value).toBe(
      'Test Name'
    )
    expect(
      (getByTestId('input-contact-phone-number') as HTMLInputElement).value
    ).toBe('1234567890')
  })
})

describe('GalleryPage', () => {
  it('renders the gallery and its images', () => {
    const { getByText, getAllByRole } = render(<GalleryPage />)

    expect(getByText('Gallery')).toBeInTheDocument()
    const images = getAllByRole('img')
    expect(images).toHaveLength(10)
  })

  it('renders images with correct src', () => {
    const { getAllByRole } = render(<GalleryPage />)
    const images = getAllByRole('img')

    images.forEach((image, index) => {
      expect(image).toHaveAttribute(
        'src',
        `/assets/images/Landingpage-Image.svg`
      )
    })
  })
})
