const { assert } = require("chai");

describe("Game3", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();
    await game.deployed();

    // three addresses, three balances
    // you'll need to update the mapping to win this stage

    // hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);
    const address = await signer.getAddress();
    // to call a contract as a signer you can use contract.connect
    await game.connect(signer).buy({ value: "2" });

    const nextSigner = ethers.provider.getSigner(1);
    const nextSignerAddr = await nextSigner.getAddress();
    await game.connect(nextSigner).buy({ value: "3"});

    const finalSigner = ethers.provider.getSigner(2);
    const finalSignerAddr = await finalSigner.getAddress();
    await game.connect(finalSigner).buy({ value: "1"});



    // TODO: win expects three arguments
    await game.win(address, nextSignerAddr, finalSignerAddr);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
