 export default class Money {
     
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }

    getAmount() {
        return this.amount;
    }

    getCurrency() {
        return this.currency;
    }
}