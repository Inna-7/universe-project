import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    SetPlayerDataLogging,
    setIsLoggedin,
    setToken
} from '../GlobalState/LoginStateReducer';
import { useDispatch } from 'react-redux';
import ErrorMessage from './ErrorMessage';

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
})

export default function SignIn () {
    const dispatch = useDispatch();
    const [Open, setOpen] = React.useState(false);
    const [error, setError] = React.useState();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleSubmit = async event => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        let username = data.get('username')
        let password = data.get('password')

        if (username === '' || password === '') {
            setError('Email/Username or Password cannot be Empty! Try again')
        } else {
            let dataItem = { username, password }

            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(dataItem)
            }

            let result = await fetch(
                'https://exodous.herokuapp.com/api/user/login',
                options
            );

            if (result.ok) {
              let response = await result.json();

              dispatch(SetPlayerDataLogging(username));
              dispatch(setIsLoggedin());
              dispatch(setToken(response.token));
              handleClick();
            } else {
              setError('Email/Username or Password is invalid! Try again');
            }

              /*
                .then(result => result.json())
                .then(result => {
                    if (result.success === true) {
                        dispatch(SetPlayerDataLogging(username))
                        dispatch(setIsLoggedin())
                        dispatch(setToken(result.token))
                        handleClick()
                    } else {
                        setError(
                            'Email/Username or Password is invalid! Try again'
                        )
                    }
                })
                .catch(error => console.log(error))
              */
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                fullScreen={fullScreen}
                open={Open}
                aria-labelledby='responsive-dialog-title'
            >
                <DialogTitle id='responsive-dialog-title'>
                    {'Login Success'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You must also connect a supported wallet to purchase.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button href='/' onClick={handleClose} autoFocus>
                        Dismiss
                    </Button>
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
                        Log In
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='username'
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value='remember' color='primary' />
                            }
                            label='Remember me'
                        />
                        <ErrorMessage message={error} />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            className='draw-outline draw-outline--tandem'
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to='/' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to='/signup' variant='body2'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
