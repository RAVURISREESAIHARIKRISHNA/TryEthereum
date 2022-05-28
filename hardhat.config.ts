import "@nomiclabs/hardhat-waffle";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",

  // metamask and hardhat chain ids are different. so configuring
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
