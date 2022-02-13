import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const factory = await ethers.getContractFactory("SwapperyRouter");
  const SwapperyRouter = await factory.deploy(
    "0x37F0319f36cF6899752F04Ce441e48D806F4a98d",
    "0xae13d989dac2f0debff460ac112a837c89baa7cd"
  );

  await SwapperyRouter.deployed();

  console.log("SwapperyRouter deployed to:", SwapperyRouter.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
