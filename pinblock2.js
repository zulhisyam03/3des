const crypto = require('crypto');

class PinblockTool {
    static format0Encode(pin, pan) {
        try {
            const pinLenHead = pin.length.toString().padStart(2, '0') + pin;
            const pinData = pinLenHead.padEnd(16, 'F');
            const bPin = Buffer.from(pinData, 'hex');

            const panPart = PinblockTool.extractPanAccountNumberPart(pan);
            const panData = panPart.padStart(16, '0');
            const bPan = Buffer.from(panData, 'hex');

            const pinblock = Buffer.alloc(8);
            for (let i = 0; i < 8; i++)
                pinblock[i] = bPin[i] ^ bPan[i];

            return pinblock.toString('hex').toUpperCase();
        } catch (error) {
            throw new Error("Hex decoding failed!");
        }
    }

    static extractPanAccountNumberPart(accountNumber) {
        let accountNumberPart = null;
        if (accountNumber.length > 12)
            accountNumberPart = accountNumber.substring(accountNumber.length - 13, accountNumber.length - 1);
        else
            accountNumberPart = accountNumber;
        return accountNumberPart;
    }

    static format0decode(pinblock, pan) {
        try {
            const panPart = PinblockTool.extractPanAccountNumberPart(pan);
            const panData = panPart.padStart(16, '0');
            const bPan = Buffer.from(panData, 'hex');

            const bPinBlock = Buffer.from(pinblock, 'hex');

            const bPin = Buffer.alloc(8);
            for (let i = 0; i < 8; i++)
                bPin[i] = bPinBlock[i] ^ bPan[i];

            const pinData = bPin.toString('hex');
            const pinLen = parseInt(pinData.substring(0, 2), 16);
            return pinData.substring(2, 2 + pinLen);
        } catch (error) {
            throw new Error("Invalid pinblock format!");
        }
    }
}

// Example usage:
const encodedPinblock = PinblockTool.format0Encode("123456", "5063516945005047");
console.log("Encoded Pinblock:", encodedPinblock);

const decodedPin = PinblockTool.format0decode(encodedPinblock, "5063516945005047");
console.log("Decoded Pin:", decodedPin);
