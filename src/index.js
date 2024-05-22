import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import Store from './GlobalState/Store';
import reportWebVitals from './reportWebVitals';
import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import { UserService } from './UserService';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './GlobalState/Store';

UserService.init()
getChainOptions().then(chainOptions => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={Store}>
                <PersistGate loading={null} persistor={persistor}>
                    <WalletProvider {...chainOptions}>
                        <App />
                    </WalletProvider>
                </PersistGate>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
