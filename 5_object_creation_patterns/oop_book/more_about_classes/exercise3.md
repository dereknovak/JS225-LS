Create a `BankAccount` class with a private field `balance`. Add a private method, `#checkBalance`, that logs the current balance. Provide a public method, `deposit`, to add money to the account and `withdraw` to take money out. Raise a `RangeError` if there are insufficient funds for the withdrawal.

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
    this.#checkBalance();
  }

  #checkBalance() {
    console.log(`Current balance: $${this.#balance}`);
  }

  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      this.#checkBalance();
      
      return amount;
    } else {
      throw new RangeError('Insufficient funds');
    }
  }
}

let account = new BankAccount();
account.deposit(100);
account.withdraw(50);
account.withdraw(100); // RangeError: Insufficient funds
```