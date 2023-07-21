import { React, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from './Bank.module.css';
import bankAppABI from './Contracts/bank_app_abi.json';

const BankDapp = () => {
  // deploy simple token contract and paste deployed contract address here. This value is local ganache chain
  let contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  //const [transferHash, setTransferHash] = useState(null);
  const [checkAcc, setCheckAcc] = useState("false");
  const [accStatus, setAccStatus] = useState("");
  const [accBalance, setAccBalance] = useState("");

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, bankAppABI, tempSigner);
    setContract(tempContract);
  };

  const createAccount = async () => {
    try {
      await contract.createAccount();
      setAccStatus('Your account is created');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const checkAccountExists = async () => {
    try {
      let exists = await contract.accountExists();
      setCheckAcc(exists.toString());
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const AccountBalance = async () => {
    try {
      let balance = await contract.accountBalance();
      setAccBalance(balance.toString());
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const depositBalance = async (e) => {
    e.preventDefault();
    let depositAmount = e.target.depositAmount.value;
    try {
      await contract.deposit({ value: depositAmount });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const WithdrawBalance = async(e)=>{
    e.preventDefault();
    let withdrawAmount = e.target.withdrawAmount.value;
    let txt= await contract.withdraw(withdrawAmount);
    console.log(txt);
}

//   const transferHandler = async (e) => {
//     e.preventDefault();
//     let transferAmount = e.target.sendAmount.value;
//     let receiverAddress = e.target.receiverAddress.value;
//     try {
//       let tx = await contract.transferEther(receiverAddress, transferAmount);
//       setTransferHash(`Transfer confirmation hash: ${tx.hash}`);
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };

  const grantLoan = async (e) => {
    e.preventDefault();
    let borrowerAddress = e.target.borrowerAddress.value;
    let loanAmount = e.target.loanAmount.value;
    try {
      await contract.grantLoan(borrowerAddress, loanAmount);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const repayLoan = async (e) => {
    e.preventDefault();
    try {
      await contract.repayLoan({ value: ethers.constants.MaxUint256 });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Bank Dapp - Create Account, Check Account, Check Balance, Deposit, Grant and Repay Loans</h2>
      <button className={styles.button6} onClick={connectWalletHandler}>
        {connButtonText}
      </button>

      <div className={styles.walletCard}>
        <div>
          <h3>Address: {defaultAccount}</h3>
        </div>

        <div>
          <button onClick={AccountBalance}>Account Balance</button>
          <h3>Balance in the Bank: {accBalance}</h3>
        </div>

        {errorMessage}
      </div>
      <div className={styles.interactionsCard}>
        <div>
          <h4>Click here to Create your account. Make sure you are connected to Wallet</h4>
          <button onClick={createAccount}>Create Account</button>
          <h4>Click here to check if your account exists or not</h4>
          <button onClick={checkAccountExists}>Check Account Exists</button>
          <h4>Your Account Status</h4>
          <h5>{checkAcc}</h5>
        </div>
        {/* <form onSubmit={transferHandler}>
          <h3>Transfer Money</h3>
          <p>Receiver Address</p>
          <input type="text" id="receiverAddress" className={styles.addressInput} />

          <p>Transfer Amount</p>
          <input type="number" id="sendAmount" min="0" step="1" />

          <button type="submit" className={styles.button6}>
            Transfer
          </button>
          <div>{transferHash}</div>
        </form> */}
        <form onSubmit={depositBalance}>
          <h3>Deposit Money</h3>
          <p>Deposit Amount</p>
          <input type="number" id="depositAmount" min="0" step="1" />
          <button type="submit" className={styles.button6}>
            Deposit
          </button>
        </form>
        <form onSubmit={repayLoan}>
          <h3>Repay Loan</h3>
          <button type="submit" className={styles.button6}>
            Repay Loan
          </button>
        </form>
        <form onSubmit={grantLoan}>
          <h3>Grant Loan</h3>
          <p>Borrower Address</p>
          <input type="text" id="borrowerAddress" className={styles.addressInput} />

          <p>Loan Amount</p>
          <input type="number" id="loanAmount" min="0" step="1" />

          <button type="submit" className={styles.button6}>
            Grant Loan
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankDapp;
