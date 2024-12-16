"use client";
import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [amt, setAmt] = useState(100);
  const [productCode, setproductCode] = useState("90003");

  const handlePayment = async (amount) => {
    let res = await axios.post("/api/gateway", { amount, productCode });
    console.log(res);
  };

  return (
    <div>
      <h1>CarryPay Test Payment</h1>
      <input value={amt} onChange={(e) => setAmt(e.target.value)} />
      <input
        value={productCode}
        onChange={(e) => setproductCode(e.target.value)}
      />
      <button className="bg-blue-300" onClick={() => handlePayment(amt)}>
        Pay {amt}
      </button>
    </div>
  );
}
