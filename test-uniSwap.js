const { ethers } = require("ethers");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const ethereum_url =
  "https://mainnet.infura.io/v3/7f2659baca8241b1bd7e66897392af6f";
const provider = new ethers.providers.JsonRpcProvider(ethereum_url);

const json_api = "https://tokens.pancakeswap.finance/cmc.json";

async function getJSON() {
  const response = await fetch(json_api);
  const data = await response.json();
  const { tokens } = data;

  const adressRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

  const tokenAdresses = [];

  for (i = 0; i < tokens.length; i = i + 1) {
    tokenAdresses.push(tokens[i].address);
  }
  const getUniswapContract = new ethers.Contract(
    adressRouter,
    [
      "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
      "function symbol() external view returns (string memory)",
    ],
    provider
  );

  const getEthUsdPrice = async () => {
    getUniswapContract.getAmountsOut(ethers.utils.parseUnits("1.0", "ether"), ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0xdAC17F958D2ee523a2206206994597C13D831ec7"]);
  };

  async function main() {
    console.log(await getEthUsdPrice());
  }
  main();
}
getJSON();
