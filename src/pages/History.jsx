import { ethers } from 'ethers';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { getContract } from '../utilities/Contract';
import { WalletContext } from './../utilities/WalletContext';

export default function History() {


  const { connected, address, provider, connectWithMetamask, automaticConnectMetamask,getProviderWithRPC } = useContext(WalletContext);


  const [contract, setContract] = useState(null);
  const [nextBlockToScan, setNextBlockToScan] = useState(null);

  const loadHistory = async () => {
    const _contract = getContract(provider);
    setContract(_contract);
    // let eventFilter = contract.filters.RandomNumberGenerated(address);

    
    var loadMoreEvents = true
    var _allEvents = [];
    var _nextBlockToScan = await provider.getBlockNumber();
    while (loadMoreEvents) {
      var _e = await getEventFromTo(_nextBlockToScan-1000,_nextBlockToScan);
      _allEvents.push(_e)

      console.log(_nextBlockToScan);
      _nextBlockToScan -= 1;
      if (_allEvents.length >= 100 || _nextBlockToScan < 1 ) {
        loadMoreEvents = false
        setNextBlockToScan(_nextBlockToScan)
      }
    }

  }

  const getEventFromTo = async (from,to,_contract) =>{
    var events;
    if (_contract) {
      events = await _contract.queryFilter("RandomNumberGenerated",from,to)
    } else {
      events = await contract.queryFilter("RandomNumberGenerated",from,to)
    }
    return events;
  }

  useEffect(() => {
    automaticConnectMetamask()
  }, [])

  useEffect(() => {
    if (connected) {
      loadHistory()
    } 
  }, [connected])
  
  
  return (
    <div>History</div>
  )
}
