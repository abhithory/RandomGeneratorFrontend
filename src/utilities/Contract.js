import { ethers } from "ethers";
import RandomGeneratorData from '../constants/RandomGeneratorData.json'

export const getContract = (provider) => {
    return new ethers.Contract(RandomGeneratorData.address,RandomGeneratorData.abi,provider);
}