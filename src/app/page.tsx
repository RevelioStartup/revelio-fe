import { Box } from '@mui/material'
import { Hero } from './landing/Hero'
import { WhyRevelio } from './landing/WhyRevelio'
import { WithoutRevelio } from './landing/WithoutRevelio'

export default function Home() {
  return (
    <Box>
      <Hero />
      <WhyRevelio />
      <WithoutRevelio />
    </Box>
  )
}
