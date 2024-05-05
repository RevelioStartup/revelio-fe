import { Box } from '@mui/material'
import { Hero } from './landing/Hero'
import { WhyRevelio } from './landing/WhyRevelio'
import { WithoutRevelio } from './landing/WithoutRevelio'
import { Pricing } from './landing/Pricing'
import { Faq } from './landing/Faq'
import React from 'react'

export default function Home() {
  return (
    <Box>
      <Hero />
      <WhyRevelio />
      <WithoutRevelio />
      <Pricing />
      <Faq />
    </Box>
  )
}
