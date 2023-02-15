import { useState, useEffect } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"
import {keccak256} from "ethereum-cryptography/keccak"
import {toHex, utf8ToBytes} from 'ethereum-cryptography/utils';

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [hash, setHash] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const obj = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
      signature,
      hash
    }
    console.log(obj)
    try {
      const {
        data:{balance}
      } = await server.post(`send`, obj);
      setBalance(balance)
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }
  
  useEffect(() =>{
    const message = `Send ${sendAmount} to ${recipient}`;
    const bytes = utf8ToBytes(message);
    const hash = toHex(keccak256(bytes)); 
    setHash(hash)
  },[sendAmount, recipient])

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <div>
        Message Hash <span>Make sure to generate your digital signature with this hash as the message.</span>
      </div>
      <div className="hash">
        {hash}
      </div>
      <label>
        Signature
        <input
          placeholder="Type your digital signature for this transaction"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
