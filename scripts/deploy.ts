import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const factory = await ethers.getContractFactory("PancakeRouter");
  const pancakeRouter = await factory.deploy("0x514Aa4F0D941b82c90b1261677d66c8432D6Df1D", "0xae13d989dac2f0debff460ac112a837c89baa7cd");

  await pancakeRouter.deployed();

  console.log("PancakeRouter deployed to:", pancakeRouter.address);
}
main().then(
  ()=> process.exit(0)).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
