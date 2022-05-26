const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    const signerFirst = ethers.provider.getSigner(0);
    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;


    // good luck

    let wallet = new ethers.Wallet(ethers.Wallet.createRandom(), ethers.provider);
    while(wallet.address >= threshold){
      wallet = new ethers.Wallet(ethers.Wallet.createRandom(), ethers.provider);
    }


    await signerFirst.sendTransaction({to: wallet.address, value: ethers.utils.parseEther("1")});
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
