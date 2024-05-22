import React, { useState, useEffect } from 'react';
import { UserService } from '../UserService';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const NFTListing = () => {
  const loginState = useSelector(store => store.logState);
  const UserState = useSelector(store => store.user);
  let authKey = loginState.token;
  const [listNFT, setlistNFT] = useState(null);

  const mintNFT = async (key) => {
      var raw = JSON.stringify({
          nftId: listNFT.nfts[key].id,
          nftReceiver: UserState.name
      });

      var requestOptions = {
          method: 'POST',
          headers: {
              Authorization: authKey,
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: raw,
          redirect: 'follow'
      };

      // if the button is disabled, they're spam-clicking
      if (document.getElementById('btnMint').classList.contains('disabled')) {
        return;
      }

      try {
        // disable the mint button
        if (!document.getElementById('btnMint').classList.contains('disabled')) {
          document.getElementById('btnMint').classList.add('disabled');
        }

        let result = await fetch('https://exodous.herokuapp.com/api/transaction/mintNft', requestOptions);
        console.log(result);

        if (result.ok) {
          toast.success('Successfully minted!');
        } else {
          toast.error('Error: ' + await result.text());
        }
      } catch(ex) {
        console.log('error', ex.message);
        toast.error('There was a problem minting: ' + ex.message);
      } finally {
        // enable the mint button
        if (document.getElementById('btnMint').classList.contains('disabled')) {
          document.getElementById('btnMint').classList.remove('disabled');
        }
      }
  }

  let mappingNFT;

  const verifyTransactionFunc = async () => {
    var requestOptions = {
        method: 'GET',
        headers: {
          Authorization: authKey
        }
    };

    try {
      let result = await fetch('https://exodous.herokuapp.com/api/transaction/listNft', requestOptions);

      if (result.ok) {
        let data = await result.json();
        setlistNFT(data);
      } else {
        console.log('There was an error: ' + await result.text());
      }
    } catch(ex) {
      console.log('There was an error: ' + ex);
    }
  };

  useEffect(() => {
      if (listNFT === null) {
          verifyTransactionFunc();
      }
      const interval = setInterval(() => {
          verifyTransactionFunc();
      }, 10000)
      return () => clearInterval(interval)
  }, []);

  if (typeof listNFT !== 'undefined' && listNFT !== null) {
    if (typeof listNFT.nfts !== 'undefined' && listNFT.nfts !== null) {
      mappingNFT = listNFT.nfts.map((object, key) => {
          console.log('Showing NFTs');
          let nftName = '';
          if (typeof object.nftDetails !== 'undefined' && object.nftDetails !== null) {
            if (typeof object.nftDetails.nftObject !== 'undefined' && object.nftDetails.nftObject !== null ) {
              if (typeof object.nftDetails.nftObject.nft !== 'undefined' && object.nftDetails.nftObject.nft !== null ) {
                if (typeof object.nftDetails.nftObject.nft.nft_name !== 'undefined' && object.nftDetails.nftObject.nft.nft_name !== null ) {
                  nftName = object.nftDetails.nftObject.nft.nft_name;
                }
              }
            }
          }

          return (
              <tr key={key} style={{ textAlign: 'center' }}>
                  <td>{nftName}</td>
                  <td>{object.transactionHash}</td>
                  <td>{object.paymentToken}</td>
                  <td>{object.paidInToken}</td>
                  <td>{object.isPaymentVerifiedByMiners ? (<DoneIcon />) : (<CloseIcon />)}</td>
                  <td>{object.isMinted ? <DoneIcon /> : <CloseIcon />}</td>
                  <td>{!object.isMinted && object.isPaymentVerifiedByMiners ? (
                    <button id='btnMint' onClick={() => mintNFT(key)} className='draw-outline draw-outline--tandem'>Mint</button>) : (
                    <button className='draw-outline buttonDisabled' onClick={() => {
                        if (!object.isPaymentVerifiedByMiners) {
                            alert('Payment is not verified yet. Wait! till the Payment is verified');
                            return;
                        }

                        if (object.isMinted) {
                            alert("NFT already Minted");
                            return;
                        }

                        mintNFT(object.nftKey);
                    }}>Mint</button>)}
                  </td>
              </tr>
          )
      });
    }
  }

  return (
      <div>
        <div>
          <p style={{ paddingLeft: '2em', paddingRight: '2em' }}>You must have WAX wallet account connected in order to mint the purchased NFT.</p>
        </div>
        <div className='tableDiv'>
          <table style={{ width: '80%' }}>
              <thead>
                  <tr style={{ fontSize: '24px', textAlign: 'center' }}>
                      <td>NFT Name</td>
                      <td>Transaction Hash</td>
                      <td>Token</td>
                      <td>Amount</td>
                      <td>Payment Verified</td>
                      <td>NFT Minted</td>
                      <td>Mint NFT</td>
                  </tr>
              </thead>
              <tbody>{mappingNFT}</tbody>
          </table>
        </div>
      </div>
  )
}

export default NFTListing
