import React, { useState, useEffect } from 'react';
import { UserService } from '../UserService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import Web3 from 'web3';
import 'react-toastify/dist/ReactToastify.css';
import './Shop.scss';
import './Shop.mobile.scss';
import { useSelector } from 'react-redux';
import { Fee, MsgSend, Coins } from '@terra-money/terra.js';
import { useConnectedWallet, UserDenied, useLCDClient, WalletStatus } from '@terra-money/wallet-provider';
import yocoinAbi from '../abis/yocoin.json';
import bnbAbi from '../abis/bnb.json';
import logoLoader from '../images/LogoLoader.gif';

const CLIENT_ADDRESS = 'terra1euyeayxsvfpqx460gwytnhcg5qwcnw6fh7kg6w';

toast.configure();

export const Shop = () => {
    const [products, setProducts] = useState([]);
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const loginState = useSelector(store => store.logState);
    const UserState = useSelector(store => store.user);
    const [ETHUSDT, setETHUSDT] = useState(0);
    const [LUNAUSDT, setLUNAUSDT] = useState(0);
    const [YOCOUSDT, setYOCOUSDT] = useState(0);
    const [BNBUSDT, setBNBUSDT] = useState(0);
    const [WAXPUSDT, setWAXPUSDT] = useState(0);
    const [LUNCUSDT, setLUNCUSDT] = useState(0);
    const connectedWallet = useConnectedWallet();
    const [txResult, setTxResult] = useState(null);
    const [txError, setTxError] = useState(null);
    const [balance, setBalance] = useState(0);
    const [selectedNetwork, setSelectedNetwork] = useState(null);
    const [selectedChain, setSelectedChain] = useState(null);
    const lcd = useLCDClient({ isClassic: true });
    const networks = {
      0x1: 'Ethereum Mainnet',
      0x3: 'Ethereum Ropsten TestNet',
      56: 'Binance Smart Chain',
      0x97: 'Binance Smart Chain Testnet'
    };

    useEffect(async () => {
      // When the page first loads, we're going to check and see what network
      // MetaMask is connected to
      if (window.ethereum) {
        const web3 = new Web3(Web3.givenProvider);

        let chainId = await web3.eth.net.getId();

        setSelectedChain(chainId);
        setSelectedNetwork(networks[chainId]);
      }

      if (!dataIsLoaded && !dataIsLoading) {
          loadItemsForSale();
          setDataIsLoading(true);
      }

      if (LUNCUSDT === 0) {
          CurrencySet();
      }

      const interval = setInterval(() => {
          CurrencySet();
      }, 60000);

      return () => clearInterval(interval);
    }, [connectedWallet]);

    if (typeof window.ethereum !== 'undefined' && window.ethereum !== null) {
      window.ethereum.on('networkChanged', function(chainId){
        setSelectedChain(chainId);
        setSelectedNetwork(networks[chainId]);
      });
    }

    const showLoader = () => {
      let loader = document.getElementsByClassName('divOverlay');

      if (loader[0].classList.contains('hidden')) {
        loader[0].classList.remove('hidden');
      }
    };

    const hideLoader = () => {
      let loader = document.getElementsByClassName('divOverlay');

      if (!loader[0].classList.contains('hidden')) {
        loader[0].classList.add('hidden');
      }
    };

    const sendPurchaseToApi = async (transactionHash, walletAddress, toAddress, amount, chainSymbol, tokenSymbol, productKey) => {
      console.log('Sending purchase data to bridge.');

      let authKey = loginState.token;
      var myHeaders = new Headers();
      myHeaders.append('Authorization', authKey);
      myHeaders.append('Content-Type', 'application/json');

      var body = JSON.stringify({
          transaction_hash: transactionHash,
          payment_from: walletAddress,
          payment_to: toAddress,
          amount: amount,
          chain_symbol: chainSymbol,
          token_symbol: tokenSymbol,
          nftKey: productKey
      });

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: body,
          redirect: 'follow'
      };

      let result = await fetch('https://exodous.herokuapp.com/api/transaction/verifyTransaction', requestOptions);

      if (result.ok) {
        let responseText = await result.text();
        console.log(responseText);
      } else {
        console.log('There was an error sending transaction to bridge.');
      }
    };

    const purchaseWithLunc = async (luncAmount, product) => {
        if (!connectedWallet) {
            return;
        }

        if (!connectedWallet.network.chainID.startsWith('columbus')) {
            alert(`You are not using Terra Classic, please switch to Terra Classic.`);
            return;
        }

        const gasPrices = await(
          await fetch("https://fcd.terra.dev/v1/txs/gas_prices", {
            redirect: "follow",
          })
        ).json();

        const taxRate = await(
          await fetch("https://lcd.terra.dev/terra/treasury/v1beta1/tax_rate", {
            redirect: "follow",
          })
        ).json();

        const gasPricesCoins = new Coins(gasPrices);
        console.log(connectedWallet);

        try {


          let priceInUluna = parseInt(luncAmount, 10) * 1000000;
          let burnFee = Math.floor((parseInt(priceInUluna, 10) * taxRate['tax_rate']) * 1.1);
          let gasAdjustment = 2.5;
          let msg = new MsgSend(connectedWallet.walletAddress, CLIENT_ADDRESS, { uluna: priceInUluna });

          // get the signer data for the gas estimation
          const account = await lcd.auth.accountInfo(connectedWallet.walletAddress);
          console.log(`Account: ${account}`);

          const signerDataArray = [{
            address: connectedWallet.walletAddress,
            publicKey: account.getPublicKey(),
            sequenceNumber: account.getSequenceNumber()
          }];
          console.log(`Signer Data: ${signerDataArray}`);

          // attempt to get the gas needed for this transaction
          let txFee = await lcd.tx.estimateFee(signerDataArray, { msgs: [msg], gasPrices: gasPricesCoins, gasAdjustment: gasAdjustment, feeDenoms: ['uluna'] });

          let transactionMsg = {
              fee: new Fee(txFee.gas_limit, { uluna: burnFee }),
              msgs: [msg],
              isClassic: true
          };

          console.log(`Transaction: ${transactionMsg}`);

          console.log('Attempting LUNC transfer');
          try {
            showLoader();
            const tx = await connectedWallet.post(transactionMsg);
            hideLoader()
            toast.success('Transaction successful!' + tx.result.txhash);

            sendPurchaseToApi(tx.result.txhash, connectedWallet.walletAddress, tx.msgs[0].to_address, luncAmount, 'ATOM', 'LUNC', product.key);
          } catch(ex) {
            hideLoader();
            toast.error('Error: ' + ex.message);
          }
            // *********************************************************
        } catch (error) {
            if (error instanceof UserDenied) {
                toast.error('Transaction was denied by user.');
            } else {
                toast.error('Error: ' + error.message);
            }
        }
    }

    async function CurrencySet () {
        let response, data;

        response = await fetch('https://data.binance.com/api/v3/ticker/price?symbols=[%22WAXPUSDT%22,%22ETHUSDT%22,%22LUNCUSDT%22,%22BNBUSDT%22]');

        if (response.ok) {
          data = await response.json();

          for (let i=0; i<data.length; i++) {
            switch (data[i].symbol) {
              case 'ETHUSDT':
                setETHUSDT(data[i].price);
                break;
              case 'BNBUSDT':
                setBNBUSDT(data[i].price);
                break;
              case 'WAXPUSDT':
                setWAXPUSDT(data[i].price);
                break;
              case 'LUNCUSDT':
                setLUNCUSDT(data[3].price);
                break;
            }
          }
        }

        response = await fetch('https://api.pancakeswap.info/api/v2/tokens/0xDd17629D05E068A9D118ee35d11101d4140D0586');

        if (response.ok) {
          data = await response.json();
          setYOCOUSDT(data.data.price);
        }
    }

    const getGasAmount = async (fromAddress, toAddress, amount) => {
      try {
        let web3 = new Web3(Web3.givenProvider);

        const gasAmount = await web3.eth.estimateGas({
          to: toAddress,
          from: fromAddress,
          value: web3.utils.toWei(`${amount}`, 'ether'),
        });
        return gasAmount;
      } catch(ex) {
        return '25000';
      }
    };

    const getGasAmountForContractCall = async (fromAddress, toAddress, amount, contractAddress) => {
      try {
        let web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(yocoinAbi, contractAddress);
        let gasAmount = await contract.methods.transfer(toAddress, web3.utils.toHex(amount * 1000000000)).estimateGas({ from: fromAddress });
        return gasAmount;
      } catch(ex) {
        return 150000;
      }
    }

    const purchaseUsingYoCoin = async (price, product) => {
      const { ethereum } = window;
      let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      let tokenAddress = '0xdd17629d05e068a9d118ee35d11101d4140d0586';
      let toAddress = '0x40658073216131baE1ce2fC9301B4D29D925621F';

      let web3 = new Web3(Web3.givenProvider);
      let contractInstance = new web3.eth.Contract(yocoinAbi, tokenAddress);
      let gasAmount = await getGasAmountForContractCall(accounts[0], toAddress, price.toString(), tokenAddress);

      try {
        showLoader();
        const res = await contractInstance.methods.transfer(toAddress, web3.utils.toHex(price * 1000000000)).send({gas: web3.utils.toHex(gasAmount), from: accounts[0]});
        sendPurchaseToApi(res.transactionHash, res.from, toAddress, price, 'BSC', 'YOCO', product.key);
        hideLoader();
        toast.success('Purchase Successful!');
      } catch(ex) {
        console.log("YoCoin Error: ", ex);
        toast.error('Error: ' + ex.message);
        hideLoader();
      }
    };

    // This is a transfer that works for both ETH and BNB
    const purchaseUsingDefaultCoin = async (price, product, networkSymbol, tokenSymbol) => {
      if (!window.ethereum) {
        alert('MetaMask is not installed.  Please install it.');
        return false;
      }

      let merchantAddress = '0x40658073216131baE1ce2fC9301B4D29D925621F';
      let web3 = new Web3(Web3.givenProvider);
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      let strWeiPrice = Web3.utils.toHex(Web3.utils.toWei(String(price), 'ether'));

      let gasAmount = await getGasAmount(String(accounts[0]), merchantAddress, price);
      console.log('Gas required for transaction: ' + gasAmount);

      let transactionParameters = {
        to: merchantAddress,
        from: String(accounts[0]),
        value: strWeiPrice,
        gas: String(gasAmount)
      };

      try {
        showLoader();
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters]
        });
        hideLoader();

        console.log(txHash);
        toast.success('Transaction successful!');
        sendPurchaseToApi(txHash, String(accounts[0]), merchantAddress, price, networkSymbol, tokenSymbol, product.key);
      } catch(ex) {
        hideLoader();
        toast.error('Error: ' + ex.message);
      }
    };

    const BuyUsingWax = product => {
        try {
            UserService.session
                .signTransaction(
                    {
                        actions: [
                            {
                                account: 'eosio.token',
                                name: 'transfer',
                                authorization: [
                                    {
                                        actor: UserService.authName,
                                        permission: 'active'
                                    }
                                ],
                                data: {
                                    from: UserService.authName,
                                    to: 'exodusmetavs',
                                    quantity: `${Math.floor(
                                        product.price / product.waxPrice
                                    ).toFixed(8)} WAX`,
                                    memo: `purchase%${product.key}`
                                }
                            }
                        ]
                    },
                    {
                        blocksBehind: 3,
                        expireSeconds: 30
                    }
                )
                .then(response => {
                    if (response.status === 'executed') {
                        UserService.getBalance();
                        toast.success('Purchase was successful!');
                    } else {
                        toast.error('Something went wrong.');
                    }
                })
        } catch (err) {
            alert('Connect your Wax Wallet First');
        }
    }

    const loadItemsForSale = async () => {
        let url = 'https://wax.cryptolions.io/v1/chain/get_table_rows'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                json: true,
                code: 'delphioracle',
                table: 'datapoints',
                scope: 'waxpusd',
                reverse: false,
                show_payer: false,
                limit: 1
            }),
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain',
                'X-Requested-With': 'JSON'
            }
        })
            .then(response => response.json())
            .then(data => {
                let waxPrice = data.rows[0].median / 10000

                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        json: true,
                        code: 'exodusmetavs',
                        table: 'exodusnfts',
                        scope: 'exodusmetavs',
                        reverse: false,
                        show_payer: false,
                        limit: 100
                    }),
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'text/plain',
                        'X-Requested-With': 'JSON'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        // What do we do with the data?
                        if (data.rows !== 'undefined') {
                            let templateIds = []

                            // get the template info for Atomic Hub
                            for (let i = 0; i < data.rows.length; i++) {
                                templateIds.push(data.rows[i].nft_template)
                            }

                            // query atomic hub
                            let url = 'https://wax.api.atomicassets.io/atomicassets/v1/templates?ids=' + templateIds.join();

                            fetch(url, {
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'text/plain',
                                    'X-Requested-With': 'JSON'
                                }
                            }).then(response => {
                                if (!response.ok) {
                                    toast.error(response.statusText);
                                    throw Error(response.statusText);
                                }
                                return response.json()
                            }).then(atomicdata => {
                                for (let i = 0; i < atomicdata.data.length; i++) {
                                    for (let j = 0; j < data.rows.length; j++) {
                                        if (atomicdata.data[i].template_id === data.rows[j].nft_template.toString()) {
                                          if (typeof atomicdata.data[i].immutable_data.img === 'undefined') {
                                            data.rows[j].image = '';
                                            data.rows[j].video = atomicdata.data[i].immutable_data.video;
                                          } else {
                                            data.rows[j].image = atomicdata.data[i].immutable_data.img;
                                            data.rows[j].video = '';
                                          }

                                            //data.rows[j].image = atomicdata.data[i].immutable_data.img;
                                            data.rows[j].waxPrice = waxPrice;
                                        }
                                    }
                                }

                                setProducts(data.rows);
                                setDataIsLoaded(true);
                                setDataIsLoading(false);
                            }).catch(error => {
                                toast.error(error);
                            });
                        }
                    });
            });
    }

    return (
        <>
          <div className='divOverlay hidden'>
            <div className='divLoadingMessage'>
              <p className="center">
                <img src={logoLoader} alt="Loading" width="125" /><br />
                Please wait for transaction to finish
              </p>
            </div>
          </div>

          <div className='divNetworkAndChainInfo'>
            <div>
              Selected network: {selectedNetwork}
            </div>
            <div className="divYourPurchasedNFTs">
              <Link to='/nftListing' className='btn btn-info m-1'>Your purchased NFTs</Link>
            </div>
          </div>

            <div className='divProductsForSale'>
                {products.map((product, i) => {
                  let productDisplay = '';
                  console.log(product);

                  if (product.image === '') {
                    let videoUrl = `https://ipfs.io/ipfs/${product.video}`;
                    productDisplay = (

                      <>
                        <video src={videoUrl} autoPlay muted loop height="200"></video>
                      </>
                    );
                  } else {
                    let imageUrl = `https://ipfs.io/ipfs/${product.image}`;
                    productDisplay = (
                      <>
                        <img src={imageUrl} height='200' />
                      </>
                    );
                  }



                    return (
                        <div key={i} className='divProduct'>
                            <div className='divProductImage'>
                                {productDisplay}
                            </div>
                            <div className='divProductContent'>
                                {product.nft_name}<br />
                                {product.description}<br />
                                ${Math.floor(product.price)} USD<br />

                                {loginState.isLogged && (UserState.isLogged|| loginState.metaIsLogged || connectedWallet) ? (
                                    <div>
                                        <button className='btn btn-primary m-1' disabled={!UserState.isLogged} onClick={() => {
                                          BuyUsingWax(product);
                                        }}>Buy With {(product.price / WAXPUSDT).toFixed(2)} WAX</button><br />

                                        <button className='btn btn-primary m-1' disabled={!loginState.metaIsLogged} onClick={async () => {
                                          if (parseInt(selectedChain, 10) !== 56) {
                                            try {
                                              await window.ethereum.request({
                                                method: 'wallet_switchEthereumChain',
                                                params: [{ chainId: Web3.utils.toHex(56) }],
                                              });

                                              purchaseUsingDefaultCoin((product.price / BNBUSDT).toFixed(6), product, 'BSC', 'BNB');
                                            } catch (error) {
                                              toast.error('Error: ' + error.message);
                                              console.error(error);
                                            }
                                          } else {
                                            purchaseUsingDefaultCoin((product.price / BNBUSDT).toFixed(6), product, 'BSC', 'BNB');
                                          }
                                        }}>Buy With {(product.price / BNBUSDT).toFixed(6)} BNB</button><br />

                                        <button className='btn btn-primary m-1' disabled={!loginState.metaIsLogged} onClick={async () => {
                                          if (parseInt(selectedChain, 10) !== 1) {
                                            // switch to eth
                                            try {
                                              await window.ethereum.request({
                                                method: 'wallet_switchEthereumChain',
                                                params: [{ chainId: Web3.utils.toHex(1) }],
                                              });

                                              purchaseUsingDefaultCoin((product.price / ETHUSDT).toFixed(8), product, 'ETH', 'ETH');
                                            } catch (error) {
                                              console.error(error);
                                            }
                                          } else {
                                            purchaseUsingDefaultCoin((product.price / ETHUSDT).toFixed(8), product, 'ETH', 'ETH');
                                          }

                                        }}>Buy With {(product.price / ETHUSDT).toFixed(8)} ETH</button><br />

                                        <button className='btn btn-primary m-1' disabled={!loginState.metaIsLogged} onClick={async () => {
                                          if (parseInt(selectedChain, 10) !== 56) {
                                            try {
                                              await window.ethereum.request({
                                                method: 'wallet_switchEthereumChain',
                                                params: [{ chainId: Web3.utils.toHex(56) }],
                                              });

                                              purchaseUsingYoCoin((product.price / YOCOUSDT + (product.price / YOCOUSDT) * 0.04).toFixed(0), product);
                                            } catch (error) {
                                              console.error(error);
                                            }
                                          } else {
                                            purchaseUsingYoCoin((product.price / YOCOUSDT + (product.price / YOCOUSDT) * 0.04).toFixed(0), product);
                                          }
                                        }}>Buy With {(product.price / YOCOUSDT + (product.price / YOCOUSDT) * 0.04).toFixed(0)} YoCoin</button><br />

                                        <button className='btn btn-primary m-1' disabled={!connectedWallet} onClick={() => {
                                          purchaseWithLunc((product.price / LUNCUSDT).toFixed(0), product);
                                        }}>Buy With {(product.price / LUNCUSDT).toFixed(0)} LUNC</button><br />

                                        <div className='mt-40 walletNot'>
                                            {txError && <pre>{txError}</pre>}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='mt-40 walletNot'>
                                        Login User account and connect any
                                        wallet to Buy this NFT
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='nk-gap-2'></div>
            <div className='nk-gap-6'></div>
            <div className='nk-gap-4'></div>
            <div className='nk-gap-2'></div>
            <div className='nk-gap-6'></div>
            <div className='nk-gap-4'></div>
            <footer className='nk-footer nk-footer-parallax nk-footer-parallax-opacity'>
                <img className='nk-footer-top-corner' src='/images/footer-corner.png' alt='' />

                <div className='container'>
                    <div className='nk-gap-2'></div>
                    <div className='nk-footer-logos alignLeft'>
                        <a href='https://yoco.finance/ ' target='_blank' rel="noreferrer">
                            <img className='nk-img' src='/images/yologo.png' alt='Yo Coin' width='76' />
                        </a>
                        <a href='https://twitter.com/HappyCatKripto' target='_blank' rel="noreferrer">
                            <img className='nk-img' src='/images/hcc.jpg' alt='Happy Cat Kripto' width='76' />
                        </a>
                        <a href='/#' target='_blank' rel="noreferrer">
                            <img className='nk-img' src='/images/lunc.png' alt='LUNA Classic' width='76' />
                        </a>
                        <a href='/#'>
                            <img className='nk-img' src='/images/footer-logo-18-restricted.png' alt='Restricted 18+' width='160' />
                        </a>
                    </div>
                    <div className='nk-gap'></div>

                    <p className='alignLeft'>
                        &copy; 2022 Exodus: Our Universe. Developed by and in
                        association with Daviski: Saintz Creation Studio Corp.
                        Numéro de société 1428612-0. Exodus: Our universe and
                        related logos are registered trademarks or trademarks of
                        Daviski: Saintz Creation Studio Corp. in Canada and/or
                        other countries. All other trademarks or trade names are
                        the property of their respective owners. All Rights
                        Reserved.
                    </p>

                    <div className='nk-footer-links alignLeft'>
                        <a href='https://exo-universe.io/tos.html' className='link-effect'>
                            Terms of Service
                        </a>{' '}
                        <span>|</span>{' '}
                        <a href='https://exo-universe.io/privacy.html' className='link-effect'>
                            Privacy Policy
                        </a>
                    </div>

                    <div className='nk-gap-4'></div>
                </div>
            </footer>
        </>
    )
}
