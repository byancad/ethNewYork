export const Framework = require("@superfluid-finance/sdk-core");
export const ethers = require("ethers");

// Ethers.js provider initialization
export const customHttpProvider = new ethers.providers.JsonRpcProvider(
  "https://eth-goerli.alchemyapi.io/v2/vquOZIRyqOKfUpCpVFwPbp4KTgU0jYJR"
);
