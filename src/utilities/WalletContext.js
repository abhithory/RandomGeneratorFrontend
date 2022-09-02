import React, { createContext, useMemo, useState } from "react";
import { ethers } from "ethers";


export const WalletContext = createContext();

const NETWORK_CHAINID = 80001;
const RPC_URL = "https://rpc-mumbai.matic.today";

const WalletContextWrapper = (props) => {
    const [provider, setProvider] = useState(null);
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [onRinghNetwork, setOnRinghNetwork] = useState(null);


    const _eventLisners = (provider) => {

    }

    const getProviderWithRPC = async () => {
            const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
            return provider;
    }

    const  connectWithMetamask = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const Network = await provider.getNetwork()
            _eventLisners(provider)
            setProvider(provider)
            setConnected(true)
            setAddress(await signer.getAddress())
            setChainId(Network.chainId);
            if (Number(Network.chainId) === Number(NETWORK_CHAINID)) {
                setOnRinghNetwork(true);
            } else {
                setOnRinghNetwork(false);
            }

        } else {
            alert("You don't have metamask. Please install it first");
            return
        }
    }

    const automaticConnectMetamask = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const addresses = await provider.listAccounts()
        if (addresses.length) {
            connectWithMetamask()
            return true
        } else {
            return false
        }
    }

    const checkRightNetwork = async () => {
        if (Number(NETWORK_CHAINID) === Number(chainId)) {
            setOnRinghNetwork(true);
            return true
        } else {
            setOnRinghNetwork(false);
            return false
        }
    }
    const switchToCorrectNetwork = async () => {
        alert("change to polygon network");
        setOnRinghNetwork(true);
    }




    // const AllDataToProvider = useMemo(()=>{
    //     {connected,address,connectWithMetamask}
    // },[connected,address,connectWithMetamask]);
    return (<WalletContext.Provider value={{ connected, address, provider, chainId, onRinghNetwork,getProviderWithRPC, connectWithMetamask,automaticConnectMetamask, checkRightNetwork, switchToCorrectNetwork }}>{props.children}</WalletContext.Provider>);
}

export default WalletContextWrapper;