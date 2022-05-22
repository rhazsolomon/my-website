class Transaction {

    name = 'peter'
    amount = undefined


    static create(data) {
        return new Transaction('peter')
    }
}

t = Transaction.create(null)

console.log(t)