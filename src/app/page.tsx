import { Box } from '@mui/material'
import { Hero } from './landing/Hero'
import { WhyRevelio } from './landing/WhyRevelio'
import { WithoutRevelio } from './landing/WithoutRevelio'
import { Pricing } from './landing/Pricing'
import { FAQ } from './landing/Faq'

export default function Home() {
  return (
    <Box>
      <Hero />
      <WithoutRevelio />
      <WhyRevelio />
      <Pricing />
      <FAQ />
    </Box>
  )
}
