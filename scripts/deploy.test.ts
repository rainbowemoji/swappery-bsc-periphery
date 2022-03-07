import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const factory = await ethers.getContractFactory("SwapperyRouter");
  const SwapperyRouter = await factory.deploy(
    "0x5b0153b45B0984638F3D49c28b1484138C758fCC", // _factory address
    "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"  // _wbnb address
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
