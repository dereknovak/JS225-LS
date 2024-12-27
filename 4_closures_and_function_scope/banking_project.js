function makeBank() {
  let accountNumber = 101;
  const accounts = [];

  return {
    openAccount() {
      const newAccount = makeAccount(accountNumber++)
      accounts.push(newAccount);

      return newAccount;
    },

    transfer(source, destination, amount) {
      return destination.deposit(source.withdraw(amount));
    },
  };
}

function makeAccount(number) {
  let balance = 0;
  let transactions = [];

  return {
    number() {
      return number;
    },

    balance() {
      return balance;
    },

    transactions() {
      return transactions;
    },
  
    deposit(amount) {
      balance += amount;
      
      transactions.push({ type: 'deposit', amount, });
  
      return amount;
    },
  
    withdraw(amount) {
      balance -= amount;
  
      if (balance < 0) {
        amount = amount + balance;
        balance = 0;
      }
  
      transactions.push({ type: 'withdraw', amount, });
  
      return amount;
    },
  };
}
