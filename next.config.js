/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['encrypted-tbn0.gstatic.com'],
    output: 'standalone',
  },
}

module.exports = {
  output: 'standalone',
  images: {
    domains: ['storage.googleapis.com'],
  },
}
