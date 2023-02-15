import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"
import {toHex} from 'ethereum-cryptography/utils';
function Wallet({ address, setAddress, balance, setBalance, addresses}) {
  
  async function onChange(evt) {
   
    const address = evt.target.value;

    // const address = toHex(secp.getPublicKey(privateKey))
    setAddress(address)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Address
        <input placeholder="Type in a public key" value={address} onChange={onChange}></input>
      </label>
      <div className="balance">Balance: {balance}</div>
      
      
    </div>
  );
}

export default Wallet;
