function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateCardNumber() {
    let cardNumber = ""
    for (let i = 0; i < 10; i++) {
        cardNumber += random(1, 9) + "";
    }
    return cardNumber;
}
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})
module.exports = {
    random,
    generateCardNumber,
    formatter
}