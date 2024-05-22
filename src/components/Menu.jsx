import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import EnterIcon from '../images/enter.png'
import ExitIcon from '../images/exit.png'
import { useHistory } from 'react-router-dom'
import { UserService } from '../UserService'
import { useDispatch } from 'react-redux'
import { ethers } from 'ethers'
import { setPlayerLogout } from '../GlobalState/UserReducer'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import SideBar from './sidebar'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider'
import Query from './Query'
import {
    setIsLoggedOut,
    SetMetaDataLogging,
    setMetaIsLoggedin,
    setMetaIsLoggedOut
} from '../GlobalState/LoginStateReducer'
import SideBarRight from './sidebarRight'
import { useState } from 'react'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition (props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
});

export const SSUMenu = props => {
    const dispatch = useDispatch();
    const locationHistory = useHistory();
    const UserState = useSelector(store => store.user);
    const loginState = useSelector(store => store.logState);
    const [LeftSidebarStatus, setLeftSidebarStatus] = useState(false);
    const [RightSidebarStatus, setRightSidebarStatus] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [openLog, setOpenLog] = React.useState(false);
    const [logState, setLogState] = useState('/signin');
    const [SearchState, setSearchState] = useState('/Search');

    // ********************** Dialog Box **********************

    const {
        status,
        availableConnectTypes,
        connect,
        disconnect
    } = useWallet();

    const [openTerraDialog, setOpenTerraDialog] = React.useState(false);

    const handleClickOpenTerraDialog = () => {
        setOpenTerraDialog(true);
    }

    const handleCloseTerraDialog = () => {
        setOpenTerraDialog(false);
    }
    // ********************** Dialog Box **********************

    const btnhandler = () => {
        // Asking if metamask is already present or not
        if (window.ethereum) {
            // res[0] for fetching a first wallet
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(res => accountChangeHandler(res[0]));
        } else {
            alert('install metamask extension!!');
        }
    }

    const logoutMetamask = () => {
        dispatch(
            SetMetaDataLogging({
                address: '',
                Balance: null
            })
        )
        dispatch(setMetaIsLoggedOut())
    }

    // getbalance function for getting a balance in
    // a right format with help of ethers
    const getbalance = address => {
        // Requesting balance method
        window.ethereum
            .request({
                method: 'eth_getBalance',
                params: [address, 'latest']
            })
            .then(balance => {
                // Setting balance
                dispatch(
                    SetMetaDataLogging({
                        address: address,
                        Balance: ethers.utils.formatEther(balance)
                    })
                )
                dispatch(setMetaIsLoggedin())
            })
    }

    // Function for getting handling all events
    const accountChangeHandler = account => {
        // Setting an address data

        dispatch(
            SetMetaDataLogging({
                address: account
            })
        )

        // Setting a balance
        getbalance(account)
    }

    // ***************** Metamask integration *****************

    // Dialog Box

    const [dOpen, setDOpen] = React.useState(false);
    const [logoutOpen, setlogoutOpen] = React.useState(false);
    const theme = createTheme({
        palette: {
            mode: 'dark'
        }
    });

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickDOpen = () => {
        setDOpen(true);
    }

    const handleDClose = () => {
        setDOpen(false);
    }

    const handleClickLogoutOpen = () => {
        setlogoutOpen(true);
    }

    const handleLogoutClose = () => {
        setlogoutOpen(false);
    }

    // Dialog Box

    const handleClickOpenLog = () => {
        let LogId = document.querySelector('#LogId');
        let searchId = document.querySelector('#searchId');
        if (openLog === false) {
            LogId.className = 'nk-sign-toggle no-link-effect active';
            setOpenLog(true);
            setLogState('/');

            searchId.className = 'nk-search-toggle no-link-effect';
            setOpen(false);
            setSearchState('/Search');
        } else {
            LogId.className = 'nk-sign-toggle no-link-effect';
            setOpenLog(false);
            setLogState('/signin');
        }
    }

    const handleClickOpen = () => {
        let LogId = document.querySelector('#LogId')
        let searchId = document.querySelector('#searchId')
        if (open === false) {
            searchId.className = 'nk-search-toggle no-link-effect active'
            setOpen(true)
            setSearchState('/')

            LogId.className = 'nk-sign-toggle no-link-effect'
            setOpenLog(false)
            setLogState('/signin')
        } else {
            searchId.className = 'nk-search-toggle no-link-effect'
            setOpen(false)
            setSearchState('/Search')
        }
    }

    function openLeftDialog () {
        let leftDialog = document.querySelector('#leftDialog')
        if (LeftSidebarStatus === true) {
            leftDialog.className = 'no-link-effect'
            setLeftSidebarStatus(false)
        } else {
            setLeftSidebarStatus(true)
            leftDialog.className = 'no-link-effect active'
        }
    }

    function openRightDialog () {
        let rightDialog = document.querySelector('#rightDialog')
        if (LeftSidebarStatus === true) {
            rightDialog.className = 'no-link-effect'
            setRightSidebarStatus(false)
        } else {
            setRightSidebarStatus(true)
            rightDialog.className = 'no-link-effect active'
        }
    }

    function handleOnCloseLeft () {
        let leftDialog = document.querySelector('#leftDialog')
        leftDialog.className = 'no-link-effect'
        setLeftSidebarStatus(false)
    }

    function handleOnCloseRight () {
        let rightDialog = document.querySelector('#rightDialog');
        rightDialog.className = 'no-link-effect';
        setRightSidebarStatus(false);
    }

    const handleLogin = () => {
        UserService.login(() => {
            if (UserService.isLogged()) {
                locationHistory.push('/');
            } else {
                dispatch(setPlayerLogout());
            }
        })
    }

    const onHandleLogout = () => {
        UserService.logout();
    }

    return (
        <div>
            <header className='nk-header nk-header-opaque' id='top'>
                <ThemeProvider theme={theme}>
                    <div>
                        <Dialog
                            open={openTerraDialog}
                            onClose={handleCloseTerraDialog}
                            TransitionComponent={Transition}
                        >
                            <AppBar sx={{ position: 'relative' }}>
                                <Toolbar>
                                    <IconButton
                                        edge='start'
                                        color='inherit'
                                        onClick={handleCloseTerraDialog}
                                        aria-label='close'
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography
                                        sx={{ ml: 2, flex: 1 }}
                                        variant='h6'
                                        component='div'
                                    >
                                        {status ===
                                        WalletStatus.WALLET_CONNECTED
                                            ? 'Terra Wallet Information'
                                            : 'Open Terra Wallet Using...'}
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <List>
                                {status ===
                                    WalletStatus.WALLET_NOT_CONNECTED && (
                                    <>
                                        {availableConnectTypes.map(
                                            (connectType, i) => (
                                                <div key={i}>
                                                    <ListItem
                                                        button
                                                        key={
                                                            'connect-' +
                                                            connectType
                                                        }
                                                        onClick={() =>
                                                            connect(connectType)
                                                        }
                                                    >
                                                        Connect {connectType}
                                                    </ListItem>
                                                    <Divider />
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                                {status === WalletStatus.WALLET_CONNECTED && (
                                    <>
                                        <ListItem>
                                            <Query />
                                        </ListItem>
                                        <Divider />
                                        <ListItem
                                            button
                                            onClick={() => disconnect()}
                                            style={{ color: 'red' }}
                                        >
                                            Disconnect
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </Dialog>
                    </div>
                    <Dialog
                        fullScreen={fullScreen}
                        open={dOpen}
                        onClose={handleDClose}
                        aria-labelledby='responsive-dialog-title'
                    >
                        <DialogTitle id='responsive-dialog-title'>
                            {'Metamask Wallet Information'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Address: {loginState.address}
                            </DialogContentText>
                            <DialogContentText>
                                Balance: {loginState.Balance}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    logoutMetamask()
                                    handleDClose()
                                }}
                                autoFocus
                            >
                                Logout MetaMask
                            </Button>
                            <Button onClick={handleDClose} autoFocus>
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>

                {/* Lgout Dialog */}
                <ThemeProvider theme={theme}>
                    <Dialog
                        fullScreen={fullScreen}
                        open={logoutOpen}
                        onClose={handleLogoutClose}
                        aria-labelledby='responsive-dialog-title'
                    >
                        <DialogTitle id='responsive-dialog-title'>
                            {'Confirm Logout'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Do you really want to logout?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    dispatch(setIsLoggedOut())
                                    handleLogoutClose()
                                }}
                                autoFocus
                            >
                                Logout
                            </Button>
                            <Button onClick={handleLogoutClose} autoFocus>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>
                <SideBarRight
                    pageWrapId={'page-wrap'}
                    outerContainerId={'top'}
                    isOpen={RightSidebarStatus}
                    onClose={handleOnCloseRight}
                    right
                />
                <SideBar
                    pageWrapId={'page-wrap'}
                    outerContainerId={'top'}
                    isOpen={LeftSidebarStatus}
                    onClose={handleOnCloseLeft}
                />
                <div className='nk-contacts-top'>
                    <div className='container'>
                        <div className='nk-contacts-left'>
                            <div className='nk-navbar'>
                                <ul className='nk-nav'>
                                    <li className='nk-drop-item'>
                                        <span>USA</span>
                                    </li>
                                    <li>
                                        <span>Privacy</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='nk-contacts-right'>
                            <div className='nk-navbar'>
                                <ul className='nk-nav'>
                                    <li>
                                        <a href='https://twitter.com/ExoOurUniverse' target='_blank' rel="noreferrer">
                                            <span><TwitterIcon fontSize='smallest' /></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://www.instagram.com/exodus_our_universe_official' target='_blank' rel="noreferrer">
                                            <span><InstagramIcon fontSize='smallest' /></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <nav
                    id='menuName'
                    className='nk-navbar nk-navbar-top nk-navbar-sticky nk-navbar-transparent nk-navbar-autohide'
                >
                    <div className='container'>
                        {UserState.isLogged ? <Redirect to='/home' /> : <></>}

                        <div className='nk-nav-table'>
                            <a href='/' className='nk-nav-logo'>
                                <img
                                    src='/images/logo2.png'
                                    alt=''
                                    width='90' />
                            </a>
                            <div className='ms-4 text-white'>
                                {UserState.isLogged
                                    ? `${UserState.name} - Wallet: ${UserState.balance}`
                                    : ''}
                            </div>
                            <ul className='nk-nav nk-nav-right d-none d-lg-block' data-nav-mobile='#nk-nav-mobile'>
                                <li><a href="http://exo-universe.io">Home</a></li>
                                <li><a href="http://exo-universe.io/news.html">News</a></li>
                                <li className='active'><Link to='/' className='li_a'>Store</Link></li>

                                <li><a href="http://exo-universe.io/gallery.html">NFTs</a></li>
                            </ul>
                            <ul className='nk-nav nk-nav-right d-none d-lg-block' data-nav-mobile='#nk-nav-mobile'>
                                <li>
                                    <span
                                        onClick={
                                            loginState.metaIsLogged === false
                                                ? btnhandler
                                                : handleClickDOpen
                                        }
                                        className='hovertext'
                                        data-hover={
                                            loginState.metaIsLogged === false
                                                ? 'Click Button Twice'
                                                : 'Click to Open info'
                                        }>
                                        MetaMask
                                    </span>
                                </li>

                                <li>
                                    <span
                                        onClick={handleClickOpenTerraDialog}
                                        className='hovertext'
                                        data-hover='Connect Terra Wallet'>
                                        Terra Wallet
                                    </span>
                                </li>

                                <li>
                                    {!UserState.isLogged ? (
                                        <span
                                            onClick={handleLogin}
                                            className='hovertext'
                                            data-hover='Connect Wax Wallet'>
                                            <img
                                                src={EnterIcon}
                                                alt='Loggin'
                                                width='20'
                                                style={{ marginRight: '4px' }} />
                                            Connect WAX Wallet
                                        </span>
                                    ) : (
                                        <span
                                            onClick={onHandleLogout}
                                            className='hovertext'
                                            data-hover='Logout Wax Wallet'>
                                            <img
                                                src={ExitIcon}
                                                alt='Exit'
                                                width='20'
                                                style={{ marginRight: '4px' }} />
                                            Disconnect WAX Wallet
                                        </span>
                                    )}
                                </li>
                            </ul>

                            <ul className='nk-nav nk-nav-right nk-nav-icons'>
                                <li className='single-icon d-lg-none'>
                                    <a
                                        href='/#'
                                        className='no-link-effect'
                                        onClick={openLeftDialog}
                                        id='leftDialog'
                                        data-nav-toggle='#nk-nav-mobile'
                                    >
                                        <span className='nk-icon-burger'>
                                            <span className='nk-t-1'></span>
                                            <span className='nk-t-2'></span>
                                            <span className='nk-t-3'></span>
                                        </span>
                                    </a>
                                </li>

                                <li className='single-icon'>
                                    <Link
                                        to={SearchState}
                                        className='nk-search-toggle no-link-effect'
                                        onClick={handleClickOpen}
                                        id='searchId'
                                    >
                                        <span className='nk-icon-search'></span>
                                    </Link>
                                </li>

                                <li className='single-icon'>
                                    {loginState.isLogged === false ? (
                                        <Link
                                            to={logState}
                                            className='nk-sign-toggle no-link-effect'
                                            onClick={handleClickOpenLog}
                                            id='LogId'
                                        >
                                            <span className='nk-icon-toggle'>
                                                <span className='nk-icon-toggle-front'>
                                                    <span className='fa fa-sign-in'></span>
                                                </span>
                                                <span className='nk-icon-toggle-back'>
                                                    <span className='nk-icon-close'></span>
                                                </span>
                                            </span>
                                            <span
                                                style={{
                                                    marginLeft: '2px'
                                                }}
                                            >
                                                Login
                                            </span>
                                        </Link>
                                    ) : (
                                        <Link
                                            to='/'
                                            className='nk-sign-toggle no-link-effect'
                                            onClick={handleClickLogoutOpen}
                                            // id='LogId'
                                        >
                                            <span>
                                                <span className='nk-icon-toggle-front'>
                                                    <span className='fa fa-sign-in'></span>
                                                </span>
                                                <span
                                                    style={{
                                                        marginLeft: '2px'
                                                    }}
                                                >
                                                    Logout
                                                </span>
                                            </span>
                                        </Link>
                                    )}
                                </li>

                                <li className='single-icon'>
                                    <a
                                        href='/#'
                                        className='no-link-effect'
                                        onClick={openRightDialog}
                                        id='rightDialog'
                                        data-nav-toggle='#nk-nav-mobile'
                                    >
                                        <span className='nk-icon-burger'>
                                            <span className='nk-t-1'></span>
                                            <span className='nk-t-2'></span>
                                            <span className='nk-t-3'></span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
