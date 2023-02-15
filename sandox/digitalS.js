const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

//Data to work
// Privat key 7c89532a9bc7adeecd1f57a0056affc2858c488472ef6d88a37a914246d1321e
// Public key 04abd53d498941bafbb8b35ba8bc20c92fca762a7b4eb12d4bf7a86c2c4c3188a77ee0e3f620e60263b8e000e7a94e12b7c2bc67c9e2713408d701f42e541d91db

//message to be signed, uint8arr
function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    // hash the message using keccak256
    const hash = keccak256(bytes); 
    return hash
}

async function signMessage(msg) {
    const messageHash = hashMessage(msg);
    const signature = await secp.sign(messageHash)
    return signature
} // returns signature in to parts, signature and recovery bit


async function recoverKey(message, signature, recoveryBit) {
    const messageHash = hashMessage(message);
    return secp.recoverPublicKey(messageHash, signature, recoveryBit);
}

function getAddress(publicKey) {
    // the first byte indicates whether this is in compressed form or not
    return keccak256(publicKey.slice(1)).slice(-20);
}

// Get public key from signature
const getPublicKey = async () => {
    const signature = await signMessage(message)
    console.log("Signature", toHex(signature[0]))
    const publicKeyRaw = await recoverKey(message, signature[0], signature[1])
    const publicKey = getAddress(publicKeyRaw)
    console.log("Public Key", toHex(publicKey))
}


// example of verify message
const exampleVerify = async () => {
    // You pass either a hex string, or Uint8Array
    const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
    const publicKey = "04385c3a6ec0b9d57a4330dbd6284989be5bd00e41c535f9ca39b6ae7c521b81cd2443fef29e7f34aa8c8002eceaff422cd1f622bb4830714110e736044d8f084f"
    const signature = "3045022100d8d1cd84cd39e2236bedeaf2c74bb0fd2f1f2642e37a63a7d3c50d98e27cea55022015409e5b46f5e75ee239e0fb5a50474a28df305bb02af6047d59f6a58ee64092";
    const isSigned = secp.verify(signature, messageHash, publicKey);
    console.log(isSigned)
}

const main = async () => {
    const privateKey = "7c89532a9bc7adeecd1f57a0056affc2858c488472ef6d88a37a914246d1321e"
    const publicKey = "04abd53d498941bafbb8b35ba8bc20c92fca762a7b4eb12d4bf7a86c2c4c3188a77ee0e3f620e60263b8e000e7a94e12b7c2bc67c9e2713408d701f42e541d91db"
    const message = "I authorize"
    const hmessage = '65a547b265c9a789b3e116bcf65af22810c56e251bcb7a67ed8e7d7c951a41ae'
    const signature = '3044022000d197f62d601dbcbf87f74ff2f5b8aaeaa7947e62eeddb52a14caab133a729d02206a0369a031caa03ab99edb6090a605c37b7412acd2d73228487672490022f1ce'
    const isSigned = secp.verify(signature, hmessage, publicKey);
    console.log(isSigned)
}


main()

