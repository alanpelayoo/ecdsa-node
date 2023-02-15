const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    // hash the message using keccak256
    const hash = keccak256(bytes); 
    return toHex(hash)
}


const message = "Send 10 to 0492039ab3c276a69017463ef1e02fa0de08fcf3a7fb3e3776b93bbd4de38da382b1b863d813e218691a3d4ea6adc18ea88e30301a817e1e0c6aa202ea103cf8ab"
console.log(hashMessage(message))