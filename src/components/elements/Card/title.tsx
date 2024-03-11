import { Box, Typography } from '@mui/material'

export const Title = () => {
    return (
        <Box mb={6}>
            <Typography variant={'h4'} fontWeight={'bold'} textAlign="center" mb={1}>
                Frequently Asked Questions
            </Typography>
            <Typography variant={'h6'} fontWeight={'normal'} textAlign="center" mb={3}>
                Get to know Revelio better
            </Typography>
        </Box>
    );
}