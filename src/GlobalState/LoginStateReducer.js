import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    isLogged: false,
    metaIsLogged: false,
    address: '',
    Balance: null,
    token: 'null',
}

export const LoginState = createSlice({
    name: 'logState',
    initialState,
    reducers: {
        SetPlayerDataLogging: (state, action) => {
            state.name = action.payload
        },
        setIsLoggedin: state => {
            state.isLogged = true
        },
        setIsLoggedOut: state => {
            state.name = ''
            state.isLogged = false
            state.token = null
        },
        setToken: (state, action) => {
            state.token = 'Bearer ' + action.payload;
        },
        SetMetaDataLogging: (state, action) => {
            state.address = action.payload.address
            state.Balance = action.payload.Balance
        },
        setMetaIsLoggedin: state => {
            state.metaIsLogged = true
        },
        setMetaIsLoggedOut: state => {
            state.address = ''
            state.Balance = null
            state.metaIsLogged = false
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    SetPlayerDataLogging,
    setIsLoggedin,
    setIsLoggedOut,
    SetMetaDataLogging,
    setMetaIsLoggedin,
    setMetaIsLoggedOut,
    setToken
} = LoginState.actions

export default LoginState.reducer
