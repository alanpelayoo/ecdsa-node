const secp = require("ethereum-cryptography/secp256k1");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04abd53d498941bafbb8b35ba8bc20c92fca762a7b4eb12d4bf7a86c2c4c3188a77ee0e3f620e60263b8e000e7a94e12b7c2bc67c9e2713408d701f42e541d91db": 100,
  "0492039ab3c276a69017463ef1e02fa0de08fcf3a7fb3e3776b93bbd4de38da382b1b863d813e218691a3d4ea6adc18ea88e30301a817e1e0c6aa202ea103cf8ab": 50,
  "049207b4dbd56cc3b0776c1d1bf3a881052f8990b20de4885248132c878a63c2021257eb04ab8c06ec216c04e8fbcb59f1843059624e9e0ebd5eb15801bdcf0cce": 75,
};

//Get balance of an specific address, (address) => balance
app.get("/balance/:address", (req, res) => {
  
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

// Get all addresss available in server. () => [addresses]
app.get("/addresses", (req, res) => {
  
  addresses = Object.keys(balances)
  res.send({ addresses });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, hash} = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);
  const isSigned = secp.verify(signature, hash, sender);
  if (isSigned){
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }else{
    res.status(400).send({ message: "Signature not valid" });
  }
  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

//handle if address not already in balances object
function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
