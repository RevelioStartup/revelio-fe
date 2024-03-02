import React from 'react';

const images = [
    "/assets/images/Landingpage-Image.svg",
    "/assets/images/Landingpage-Image.svg",
    "/assets/images/Landingpage-Image.svg",
    "/assets/images/Landingpage-Image.svg",
    "/assets/images/Landingpage-Image.svg",
    "/assets/images/Landingpage-Image.svg",
    "/assets/images/Landingpage-Image.svg",
    "/assets/images/Landingpage-Image.svg",
    "/assets/images/Landingpage-Image.svg",
    "/assets/images/Landingpage-Image.svg",
];

export const GalleryPage = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-white via-teal-100 to-teal-400">
        <h1 className='text-2xl font-bold mb-4'>Gallery</h1>
        <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
            <div key={index} className="border border-gray-300 rounded overflow-hidden shadow-md transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-lg">
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full object-cover" />
            </div>
            ))}
        </div>
        </div>
    );
};
  
export default GalleryPage;
