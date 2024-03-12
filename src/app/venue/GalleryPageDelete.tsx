import { useDeletePhotoMutation } from '@/redux/api/venueApi'
import { VenuePhoto } from '@/types/venue'
import React from 'react'
import Image from 'next/image'

interface GalleryPageDeleteProps {
  photos: VenuePhoto[]
}

export const GalleryPageDelete = ({ photos }: GalleryPageDeleteProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % photos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + photos.length) % photos.length)
  }

  const [deletePhoto] = useDeletePhotoMutation()

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}
      >
        {photos.map((photo, index) => (
          <div key={photo.id} className="relative group flex-shrink-0 w-1/3 p-2">
            <Image
              src={photo.image}
              alt={`Photo ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg"
              width={300}
              height={300}
            />
            <div className="m-2 rounded-lg absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
              <button
                type="button"
                className="text-red-500 cursor-pointer"
                onClick={() => {
                  deletePhoto({ photo })
                }}
              >
                🗑️
              </button>
            </div>
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

export default GalleryPageDelete
