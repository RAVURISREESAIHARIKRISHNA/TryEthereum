import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hello World", () => {
    it('should print Hello world', async () => {
        
        // Set up the Contract and deploy
        const HW = await ethers.getContractFactory('HelloWorld');
        
        // Deploy the contract
        const hello = await HW.deploy();

        // Wait for it to be deployed
        await hello.deployed();

        // test
        expect(await hello.hello()).to.equal('Hello World');
    });
});