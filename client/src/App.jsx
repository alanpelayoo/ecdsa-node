import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Signature from "./Signature";
import "./App.scss";
import { useState, useEffect } from "react";
import server from "./server";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const {data : {addresses}} = await server.get(`addresses`);
      setAddresses(addresses)
    };
    fetchData()
  }, [])

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        addresses = {addresses}
      />
      <Transfer setBalance={setBalance} address={address} />
      {/* <Signature/> */}
    </div>
  );
}

export default App;
