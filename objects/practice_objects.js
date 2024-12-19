let invoices = {
  paid: [],
  unpaid: [],

  add(name, amount) {
    this.unpaid.push({
      name,
      amount,
    });
  },

  totalDue() {
    return this.unpaid.reduce((a, b) => a + b.amount, 0);
  },

  payInvoice(name) {
    for (let i = 0; i < this.unpaid.length; i++) {
      if (this.unpaid[i].name === name) {
        this.paid.push(this.unpaid[i]);
        this.unpaid.splice(i, 1);
        break;
      }
    }
  },

  totalPaid() {
    return this.paid.reduce((a, b) => a + b.amount, 0);
  },
}

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');

console.log(invoices.totalPaid());
console.log(invoices.totalDue());