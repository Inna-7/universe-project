import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
})

export default function SignUp () {
    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <SearchIcon />
                    </Avatar>
                    <Typography
                        component='h1'
                        variant='h5'
                        style={{ fontFamily: 'Marcellus SC', fontSize: '42px' }}
                    >
                        Search
                    </Typography>
                    <TextField
                        fullWidth
                        autoFocus
                        margin='dense'
                        id='text'
                        label='Search'
                        type='search'
                        variant='standard'
                        sx={{
                            marginTop: 12,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    />
                </Box>
            </Container>
        </ThemeProvider>
    )
}
