import Money from "../src/Money";
describe('money',()=>{
    it('Should set amount and currency',()=>{
        const money = new Money(10,"USD");
        expect(money.getAmount()).toBe(10);
    });

    it.each([[10,"USD"],[25,"EUR"],[20,"GBP"]])('should set amount and currency in constructor',(amount,currency)=>{
        const money = new Money(amount,currency);
        expect(money.getAmount()).toBe(amount);
    })
});