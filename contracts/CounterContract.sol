// SPDX-License-Identified: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Counter {
    uint counter;
    
    event CounterUpdated(uint counter);

    function incrementCouner() public {
        counter++;

        // emit new counter value
        emit CounterUpdated(counter);
    }

    function getCounter() public view returns (uint) {
        return counter;
    }
}