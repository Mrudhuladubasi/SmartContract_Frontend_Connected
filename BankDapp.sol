// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.18;

contract BankDapp {
    mapping(address => uint256) private userAccount;
    mapping(address => bool) private userExists;
    mapping(address => uint256) private userLoan;
    
    event AccountCreated(address indexed accountHolder);
    event DepositMade(address indexed accountHolder, uint256 amount);
    event WithdrawalMade(address indexed accountHolder, uint256 amount);
    event LoanGranted(address indexed accountHolder, uint256 loanAmount);
    event LoanRepaid(address indexed accountHolder, uint256 repaymentAmount);
    
    uint256 private interestRate = 5; // 5% interest rate for loans
    
    function createAccount() public returns (bool) {
        require(!userExists[msg.sender], "User already exists");
        userExists[msg.sender] = true;
        return true;
    }

    function accountExists() public view returns (bool) {
        return userExists[msg.sender];
    }

    function deposit() public payable {
        require(msg.value > 0, "Amount to be deposited should be greater than 0");
        userAccount[msg.sender] += msg.value;
        emit DepositMade(msg.sender, msg.value);
    }

    function withdraw(uint256 withdrawAmount) public {
        require(withdrawAmount <= userAccount[msg.sender], "Insufficient balance");

        userAccount[msg.sender] -= withdrawAmount;
        payable(msg.sender).transfer(withdrawAmount);
        emit WithdrawalMade(msg.sender, withdrawAmount);
    }

    function accountBalance() public view returns (uint256) {
        return userAccount[msg.sender];
    }

    function grantLoan(address borrower, uint256 loanAmount) public {
        require(userExists[borrower], "Borrower does not exist");
        require(userLoan[borrower] == 0, "Borrower already has an outstanding loan");

        uint256 interest = (loanAmount * interestRate) / 100;
        uint256 totalLoanAmount = loanAmount + interest;
        require(totalLoanAmount <= userAccount[msg.sender], "Insufficient balance to grant loan");

        userAccount[msg.sender] -= totalLoanAmount;
        userAccount[borrower] += loanAmount;
        userLoan[borrower] = totalLoanAmount;
        emit LoanGranted(borrower, totalLoanAmount);
    }

    function repayLoan() public payable {
        require(userLoan[msg.sender] > 0, "No outstanding loan to repay");

        uint256 loanAmount = userLoan[msg.sender];
        require(msg.value >= loanAmount, "Amount should be equal to or greater than the outstanding loan");

        userAccount[msg.sender] += loanAmount;
        userLoan[msg.sender] = 0;
        emit LoanRepaid(msg.sender, loanAmount);

        if (msg.value > loanAmount) {
            uint256 remainingAmount = msg.value - loanAmount;
            payable(msg.sender).transfer(remainingAmount);
        }
    }
}
