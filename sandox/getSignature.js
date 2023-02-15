const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");


const privateKey = "e3b257a50d2c95d99a503a7f622c4648226405be8386da468e9847a3569de2c2"
const hashMessage = "304fcc7a2191cfdbbd8064d0c96eef0d1335f73e260c998712295d50d0971590"
// returns signature 30450221008890dedc5dcdd05a53ad914814cbc17b615b91615707564209a46746bfde7c3f02207b0ed2c214105a8b21d22762e3609bf54673c911bac92f495aba06281b677303

const generateSignature = async (messageHash, privateKey) =>{
    const signature = await secp.sign(messageHash, privateKey);
    console.log(toHex(signature))
}

generateSignature(hashMessage, privateKey)


