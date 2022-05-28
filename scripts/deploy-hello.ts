import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";

let deploy = async () => {
    const HelloWorld = await ethers.getContractFactory('HelloWorld');
    const hello = await HelloWorld.deploy();
    await hello.deployed();

    return hello;
};

// @ts-ignore
let sayHello = async (hello) => console.log('Say Hello:', await hello.hello());

deploy().then(sayHello);

// $npx hardhat run scripts/deploy-hello.ts --network localhost