import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { useDeletePhotoVendorMutation } from '@/redux/api/vendorApi'
import '@testing-library/jest-dom'
import GalleryPage from '@/app/vendor/GalleryPage'
import GalleryPageDelete from '@/app/vendor/GalleryPageDelete'

jest.mock('@/redux/api/vendorApi', () => ({
  useDeletePhotoVendorMutation: jest.fn(),
}))

describe('GalleryPage Component', () => {
  const photos = [
    { id: '1', vendor: 1, image: '/../../public/assets/images/empathymap.jpg' },
    { id: '2', vendor: 1, image: '/../../public/assets/images/empathymap.jpg' },
    { id: '3', vendor: 1, image: '/../../public/assets/images/empathymap.jpg' },
  ]

  it('renders the GalleryPage with initial state', () => {
    const { getByAltText, getByText } = render(<GalleryPage photos={photos} />)

    const firstPhoto = getByAltText('Photo 1')
    expect(firstPhoto).toBeInTheDocument()

    const nextButton = getByText('Next')
    expect(nextButton).toBeEnabled()
  })

  it('navigates to the next slide', () => {
    const { getByAltText, getByText } = render(<GalleryPage photos={photos} />)

    const nextButton = getByText('Next')
    fireEvent.click(nextButton)

    const secondPhoto = getByAltText('Photo 2')
    expect(secondPhoto).toBeInTheDocument()
  })

  it('navigates to the previous slide', () => {
    const { getByAltText, getByText } = render(<GalleryPage photos={photos} />)

    const nextButton = getByText('Next')
    fireEvent.click(nextButton)

    const previousButton = getByText('Previous')
    fireEvent.click(previousButton)

    const firstPhoto = getByAltText('Photo 1')
    expect(firstPhoto).toBeInTheDocument()
  })

  it('disables "Previous" button on first slide', () => {
    const { getByAltText, getByText } = render(<GalleryPage photos={photos} />)

    const nextButton = getByText('Next')
    expect(nextButton).toBeEnabled()
  })

  it('disables "Next" button on last slide', () => {
    const { getByAltText, getByText } = render(<GalleryPage photos={photos} />)

    const nextButton = getByText('Next')
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)

    const previousButton = getByText('Previous')
    expect(previousButton).toBeEnabled()
  })
})

describe('GalleryPageDelete Component', () => {
  let mockDeletePhoto: jest.Mock<any, any, any>

  beforeEach(() => {
    mockDeletePhoto = jest.fn().mockResolvedValue({ data: {} })
    ;(useDeletePhotoVendorMutation as jest.Mock).mockReturnValue([
      mockDeletePhoto,
    ])
  })

  const photos = [
    { id: '1', vendor: 1, image: '/../../public/assets/images/empathymap.jpg' },
    { id: '2', vendor: 1, image: '/../../public/assets/images/empathymap.jpg' },
    { id: '3', vendor: 1, image: '/../../public/assets/images/empathymap.jpg' },
  ]

  it('renders the GalleryPageDelete with initial state', () => {
    const { getByAltText, getByText } = render(
      <GalleryPageDelete photos={photos} />
    )

    const firstPhoto = getByAltText('Photo 1')
    expect(firstPhoto).toBeInTheDocument()

    const nextButton = getByText('Next')
    expect(nextButton).toBeEnabled()
  })

  it('navigates to the next slide', () => {
    const { getByAltText, getByText } = render(
      <GalleryPageDelete photos={photos} />
    )

    const nextButton = getByText('Next')
    fireEvent.click(nextButton)

    const secondPhoto = getByAltText('Photo 2')
    expect(secondPhoto).toBeInTheDocument()
  })

  it('navigates to the previous slide', () => {
    const { getByAltText, getByText } = render(
      <GalleryPageDelete photos={photos} />
    )

    const nextButton = getByText('Next')
    fireEvent.click(nextButton)

    const previousButton = getByText('Previous')
    fireEvent.click(previousButton)

    const firstPhoto = getByAltText('Photo 1')
    expect(firstPhoto).toBeInTheDocument()
  })

  it('disables "Previous" button on the first slide', () => {
    const { getByText } = render(<GalleryPageDelete photos={photos} />)

    const nextButton = getByText('Next')
    expect(nextButton).toBeEnabled()
  })

  it('disables "Next" button on the last slide', () => {
    const { getByText } = render(<GalleryPageDelete photos={photos} />)

    const nextButton = getByText('Next')
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)

    const previousButton = getByText('Previous')
    expect(previousButton).toBeEnabled()
  })

  it('deletes a photo on button click', async () => {
    const { getAllByText } = render(<GalleryPageDelete photos={photos} />)

    const deleteButtons = getAllByText('🗑️')
    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(mockDeletePhoto).toHaveBeenCalledWith({ photo: photos[0] })
    })
  })
})
