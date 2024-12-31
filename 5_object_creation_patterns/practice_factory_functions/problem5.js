function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,

    total() {
      return services.amount ?? this.phone + this.internet;
    }
  }
}

function createInvoice(services = {}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(payments) {
      for (let payment of payments) {
        this.payments.push(payment);
      }
    },

    amountDue() {
      let paymentTotal = 0;
      for (let payment of this.payments) {
        paymentTotal += payment.total();
      }

      return this.total() - paymentTotal;
    }
  };
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({
  amount: 2000,
});

let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0
