import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
})

export default function SignUp () {
    const [Open, setOpen] = React.useState(false)

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        let username = data.get('username')
        let password = data.get('password')

        let dataItem = { username, password }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataItem)
        }

        let result = await fetch(
            'https://exodous.herokuapp.com/api/user',
            options
        )

        console.log(result)
        if (result.status === 200) {
            handleClick()
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                fullScreen={fullScreen}
                open={Open}
                aria-labelledby='responsive-dialog-title'
            >
                <DialogTitle id='responsive-dialog-title'>
                    {'Signup Success'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Login Now!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to='/signin'>Login</Link>
                </DialogActions>
            </Dialog>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography
                        component='h1'
                        variant='h5'
                        style={{ fontFamily: 'Marcellus SC' }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component='form'
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='given-name'
                                    name='firstName'
                                    required
                                    fullWidth
                                    id='firstName'
                                    label='First Name'
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id='lastName'
                                    label='Last Name'
                                    name='lastName'
                                    autoComplete='family-name'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='username'
                                    autoComplete='email'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value='allowExtraEmails'
                                            color='primary'
                                        />
                                    }
                                    label='I want to receive inspiration, marketing promotions and updates via email.'
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            className='draw-outline draw-outline--tandem'
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link to='/signin' variant='body2'>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
