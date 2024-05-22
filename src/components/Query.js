import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider'
import React, { useEffect, useState } from 'react'

export default function Query () {
    const lcd = useLCDClient() // LCD stands for Light Client Daemon
    const connectedWallet = useConnectedWallet()
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        if (connectedWallet) {
            lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
                setBalance(coins.toString())
            })
        } else {
            setBalance(0)
        }
    }, [connectedWallet, lcd]) // useEffect is called when these variables change

    return (
        <div>
            {balance || connectedWallet.walletAddress ? (
                <>
                    <p>
                        <strong>Address: </strong>
                        {connectedWallet.walletAddress}
                    </p>
                    <p>
                        <strong>Balance: </strong>
                        {balance}
                    </p>
                </>
            ) : (
                <></>
            )}
            {!connectedWallet && <p>Wallet not connected!</p>}
        </div>
    )
}
