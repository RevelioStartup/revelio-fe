import { VenuePhoto } from '@/types/venue'
import Image from 'next/image'
import React from 'react'

interface GalleryPageProps {
  photos: VenuePhoto[]
}

export const GalleryPage = ({ photos }: GalleryPageProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % photos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + photos.length) % photos.length)
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}
      >
        {photos.map((photo, index) => (
          <div key={photo.id} className="flex-shrink-0 w-1/3 p-2">
            <Image
              src={photo.image}
              alt={`Photo ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg"
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-300"
        onClick={prevSlide}
      >
        Previous
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-300"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  )
}

export default GalleryPage
