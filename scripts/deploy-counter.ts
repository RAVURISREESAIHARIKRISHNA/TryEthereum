import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";

let deploy = async () => {
    const CounerContract = await ethers.getContractFactory('Counter');
    const counter = await CounerContract.deploy();
    await counter.deployed();

    return counter;
};


// @ts-ignore
let displayAndIncrementCounter = async (counterContract) => {
    console.log('My Counter is :', await counterContract.getCounter());
    console.log('Incrementing Counter');
    await counterContract.incrementCouner();
    console.log('My Counter is :', await counterContract.getCounter());
}

deploy().then(displayAndIncrementCounter);

// $npx hardhat run scripts/deploy-counter.ts --network localhost