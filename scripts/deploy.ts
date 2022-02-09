import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const factory = await ethers.getContractFactory("PancakeRouter");
  const pancakeRouter = await factory.deploy("0xa111362B88a7358392d78Ad24F1E5AF9a9247023", "0xae13d989dac2f0debff460ac112a837c89baa7cd");

  await pancakeRouter.deployed();

  console.log("PancakeRouter deployed to:", pancakeRouter.address);
}
main().then(
  ()=> process.exit(0)).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
