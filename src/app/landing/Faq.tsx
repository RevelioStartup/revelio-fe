import { Box } from '@mui/material'
import { Card }  from '../../components/elements/Card/index'

export const FAQ = () => {
  return (
    <Box
      data-testid="faq"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'2em'}
      padding={{ xs: '4em 2em', lg: '4em 12em' }}
    >
        <Card />
    </Box>
  )
}
