const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const BankApp = await ethers.getContractFactory("BankDapp");
  const bankApp = await BankApp.deploy();
  await bankApp.deployed();

  console.log("Contract deployed to:", bankApp.address);

  // Save the contract's address to a file
  fs.writeFileSync("contractAddress.txt", bankApp.address);

  // Save the contract's ABI to a file
  const bankAppJSON = bankApp.interface.format("json");
  fs.writeFileSync("contractABI.json", bankAppJSON);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
