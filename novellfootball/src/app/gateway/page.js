"use client"
import md5 from "md5";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page(){

  const router = useRouter();

  const handlePayment = async (amount) => {
      const merchantKey = "6c567b06cd558af505bbee0271612be0"; // Replace with your test key
      const merchantId = "mer714043"; // Replace with your test merchant ID
      const notifyUrl = "https://parlourfootball.online/api/callback"; // Replace with your callback URL
      const orderId = `${Date.now()}`; // Generate a unique test order ID
      const signType = "MD5";
      const version = "1.0";

      // Data to be signed
      const signStr = `firstName=john&lastName=tom&merchantNo=${merchantId}&orderAmt=100&orderNo=${orderId}&productCode=20001`;
      const sign = md5(`${signStr}&key=${merchantKey}`);

      const requestBody = {
        "merchantNo": merchantId,
        "orderNo": orderId,
        "orderAmt": `${amount}`,
        "productCode": "80003",
        "notifyUrl": "https://parlourfootball.online/api/callback",
        "accCode": "INR_BANK_A",
        "otherPara2": "WALLET",
        "otherPara1": "GCASH",
        "firstName": "john",
        "lastName": "tom",
        "sign": sign,
      };

      try {
          const response = await fetch("https://api.carry-pay.com/api/agentPay/payOrder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(requestBody),
          });

          const result = await response.json();
          console.warn(result);
          if (result.isValid && result.url) {
              // Redirect to the payment URL
              router.push(result.url);
          } else {
              console.error("Payment initiation failed:", result.message);
              alert("Payment initiation failed. Check console for details.");
          }
      } catch (error) {
          console.error("Error making payment request:", error);
          alert("Error occurred while making payment.");
      }
  };
  const [amt, setAmt] = useState(100);  
  return (
      <div>
          <h1>CarryPay Test Payment</h1>
            <input value={amt} onChange={(e)=>setAmt(e.target.value)} />
          <button className="bg-blue-300" onClick={() => handlePayment(amt)}>Pay {amt}</button>
      </div>
  );
}