# SmartContract_Frontend_Connected
Bank Dapp is a decentralized application (Dapp) built on the Ethereum blockchain that allows users to create bank accounts, deposit funds, withdraw funds, check account balances, transfer money to other accounts, and grant loans to other users.

##Getting Started:
To run the Bank Dapp locally, follow these steps:
* Clone the repository to your local machine.
  ```
  git clone https://github.com/your-username/bank-dapp.git
  ```
* Install the required dependencies.
  ```
  cd bank-dapp
  npm install
  ```
* Deploy the smart contract to the local blockchain (Ganache).
  ```
  npx hardhat run scripts/deploy.js --network localhost
  ```
* Start the development server.
  ```
   npm start
  ```
The application will be accessible at http://localhost:3000/ in your web browser.

## Features

* Create Account: Create a new bank account by connecting their Ethereum wallet (e.g., MetaMask) to the Dapp.

* Deposit Funds: Deposit Ether into their bank accounts.

* Withdraw Funds: Withdraw Ether from their bank accounts, provided they have sufficient balance.

* Check Account Balance: Check their bank account balance.

* Transfer Money: Transfer Ether from their accounts to other accounts.

* Grant Loan: Grant loans to other users, including an interest rate of 5%.

* Repay Loan: Repay their outstanding loans with interest.


## Software Used:

* Solidity: Ethereum smart contract programming language.
* Hardhat: Development environment for Ethereum smart contracts.
* React: Frontend JavaScript library.
* ethers.js: Library for interacting with Ethereum smart contracts and wallets.
* MetaMask: Ethereum wallet for connecting to the Dapp.

## License
This project is licensed under the MIT License.

## Author
Mrudhula Dubasi

mrudhuladubasi@gmail.com












