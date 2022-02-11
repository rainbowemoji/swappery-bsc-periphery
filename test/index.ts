import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import { IPancakeFactory, Token1} from "../typechain";

// Defaults to e18 using amount * 10^18
function getBigNumber(amount: number, decimals = 18) {
    return ethers.BigNumber.from(amount).mul(ethers.BigNumber.from(10).pow(decimals))
  }

describe("StakingRouter", function () {

    let token1:Token1;
    let router: IPancakeRouter;
    
    let admin: SignerWithAddress;
    let addrs: SignerWithAddress[];
    let weth: Address;
    before(async ()=> {
        [admin, ...addrs] = await ethers.getSigners();
        
        let Token1 = await ethers.getContractFactory("Token1");
        let Router = await ethers.getContractFactory("PancakeRouter");

        token1 = await Token1.deploy();
        router = await Router.deploy();
        weth = await router.WETH();
    });
    it("Adjust environment", async ()=>{
        await token1.approve(router.address, getBigNumber(100));
        await router.addLiquidityETH(token1.address, getBigNumber(100),0,0,admin.address,Math.floor(Date.now() / 1000) + 60 * 10,
        {
          value: 2000000,
        });
    });
});
