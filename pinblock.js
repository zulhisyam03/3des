const crypto = require('crypto');
const cryptoJs = require('crypto-js');

function format_0(pan, pin) {
    const pan_padded = pan.padStart(16, '0');
    const pin_padded = pin.padStart(6, '0');

    const combined = pan_padded + pin_padded;

    return combined;
}

function generate_pinblock(pan, pin) {
    const formatted = format_0(pan, pin);

    let num = parseInt(formatted, 10);

    if (num < 10 ** 16) {
        num = num * 10 + 8;
    }

    if (num % 2 !== 0) {
        num += 1;
    }

    return num.toString();
}

const pan = '5063516945005047';
const pin = '123456';

const pinblock = generate_pinblock(pan, pin);