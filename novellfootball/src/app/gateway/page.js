"use client"
import axios from "axios";
import md5 from "md5";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page(){

  const [amt, setAmt] = useState(100);  

  const handlePayment = async (amount) => {
    let res = await axios.post("/api/gateway", {amount})
    console.log(res);
  }

  return (
      <div>
          <h1>CarryPay Test Payment</h1>
            <input value={amt} onChange={(e)=>setAmt(e.target.value)} />
          <button className="bg-blue-300" onClick={() => handlePayment(amt)}>Pay {amt}</button>
      </div>
  );
}