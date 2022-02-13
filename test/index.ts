import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import {
  IPancakeFactory,
  PancakeRouter,
  ERC20,
  IPancakePair,
} from "../typechain";

// Defaults to e18 using amount * 10^18
function getBigNumber(amount: number, decimals = 18) {
  return ethers.BigNumber.from(amount).mul(
    ethers.BigNumber.from(10).pow(decimals)
  );
}

describe("Router", function () {
  let token1: ERC20;
  let router: PancakeRouter;

  let admin: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let weth: Address;
  let pair: IPancakePair;
  let factory: IPancakeFactory;
  before(async () => {
    [admin, ...addrs] = await ethers.getSigners();
    console.log("admin: ", admin.address);
    addrs.map((item: SignerWithAddress, index) =>
      console.log("addrs" + index + ":", item.address)
    );
    let Token1 = await ethers.getContractFactory("ERC20");
    let Router = await ethers.getContractFactory("PancakeRouter");

    token1 = await Token1.deploy(getBigNumber(100));
    router = await Router.deploy(
      "0xC3f8189E069a09BE6863Bc9008cA00630a01DbC1", // factory
      "0xae13d989dac2f0debff460ac112a837c89baa7cd" // weth
    );
    weth = await router.WETH();
    factory = await ethers.getContractAt(
      "IPancakeFactory",
      "0xC3f8189E069a09BE6863Bc9008cA00630a01DbC1" // factory
    );
    console.log("router address: ", router.address);
  });
  it("add Liquidity", async () => {
    await token1.approve(router.address, getBigNumber(100));
    let tx = await router.addLiquidityETH(
      token1.address,
      getBigNumber(100),
      0,
      0,
      admin.address,
      Math.floor(Date.now() / 1000) + 60 * 10,
      {
        value: getBigNumber(10),
      }
    );
    let result = await tx.wait();

    pair = await ethers.getContractAt(
      "IPancakePair",
      await factory.getPair(token1.address, weth)
    );
    console.log("pair address: ", pair.address);
    console.log("token1 address: ", token1.address);
    console.log("AMM ", await pair.AMM());
    console.log("ALT ", await pair.ALT());
    console.log("admin: ", admin.address);
  });
  it("set Lock Days", async () => {
    await router.setLockDays(token1.address, weth, 0);
  });
  it("remove Liquidity", async () => {
    pair.approve(router.address, ethers.constants.MaxUint256);
    let tx = await router.removeLiquidityETH(
      token1.address,
      10000,
      0,
      0,
      admin.address,
      Math.floor(Date.now() / 1000) + 60 * 10
    );
    console.log("AMM for to ", await pair.AMMM());
    // console.log(await tx.wait());
    console.log("admin: ", admin.address);
  });
});
