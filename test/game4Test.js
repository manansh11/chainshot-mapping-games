const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    const signerFirst = ethers.provider.getSigner(0);
    const addressFirst = await signerFirst.getAddress();

    const signerSecond = ethers.provider.getSigner(1);
    const addressSecond = await signerSecond.getAddress();

    // nested mappings are rough :}
    await game.connect(signerFirst).write(addressSecond);
    await game.connect(signerSecond).win(addressFirst);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
