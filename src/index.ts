import { ethers } from 'ethers';

// Import the compiled json from artifacts/ instead of typing out the interface
import CounterInterface from '../artifacts/contracts/CounterContract.sol/Counter.json';

const MMASK_ETH_REQ_ACCOUNTS = 'eth_requestAccounts';

const HELLO_CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const COUNTER_CONTRACT_ADDRESS = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';

let getEth = () => {
    // @ts-ignore
    const eth = window.ethereum;
    // The window.ethereum will not be undefined if the browser is running metamask
    return eth;
};

let areThereEthAccounts = async () => {
    let ethereum = getEth();

    // Now see if there are any ethereum accounts
    // request() returns a Promise which when resolved gives an array of ethereum addresses
    let accounts = await ethereum.request({ method: MMASK_ETH_REQ_ACCOUNTS }) as string[];

    return Boolean(accounts && accounts.length);
};

let runContracts = async () => {
    if (await areThereEthAccounts()) {
        await runHelloContract();
        await displayCounter();
    } else {
        console.log('Get metamask');
    }
};

let runHelloContract = async () => {
    const hello = new ethers.Contract(
        HELLO_CONTRACT_ADDRESS, // Contract address
        ['function hello() public pure returns (string memory)'],
        new ethers.providers.Web3Provider(getEth())
    );

    document.getElementById('hello').innerHTML = await hello.hello();
};

let displayCounter = async () => {
    const counterContract = new ethers.Contract(
        COUNTER_CONTRACT_ADDRESS, //Contract address
        CounterInterface.abi,
        new ethers.providers.Web3Provider(getEth())
    );

    updateCounterOnPage(await counterContract.getCounter());
    // document.getElementById('counter').innerHTML = await counterContract.getCounter();

    // Set up listneres in case the counter gets incremented
    counterContract.on(counterContract.filters.CounterUpdated(), updateCounterOnPage);
}


let updateCounterOnPage = (counterVal) => {
    document.getElementById('counter').innerHTML = counterVal;
};

let incrementCounter = async () => {
    const counterContract = new ethers.Contract(
        COUNTER_CONTRACT_ADDRESS, //Contract address
        CounterInterface.abi,
        new ethers.providers.Web3Provider(getEth()).getSigner()
    );

    // Increment counter
    counterContract.incrementCouner().then(() => {
        console.log('Tx Resolved');
    }, () => {
        console.log('Failed :(')
    });

}

// add the event listener
document.getElementById('counterIncrement').addEventListener('click', incrementCounter);

runContracts();