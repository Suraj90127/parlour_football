import axios from "axios";
import md5 from "md5";
import { NextResponse } from "next/server";


export async function POST (request,res){

    const {amount} = await request.json();
    
    const merchantKey = "6c567b06cd558af505bbee0271612be0";
        const merchantId = "mer714043"; 
        const orderId = `${Date.now()}`;
  
        // Data to be signed
        const signStr = `firstName=john&lastName=tom&merchantNo=${merchantId}&orderAmt=${amount}&orderNo=${orderId}&productCode=80003`;
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
            const response = await axios.post('https://api.carry-pay.com/api/agentPay/payOrder', requestBody);
            console.warn(response);
            const result = response.data;

            return NextResponse.json({ result })
            // if (result.isValid && result.url) {
            //     // Redirect to the payment URL
            // } else {
            //     console.error("Payment initiation failed:", result.message);
            //     alert("Payment initiation failed. Check console for details.");
            // }
        } catch (error) {
            return NextResponse.json({err: error.message})
            console.error("Error making payment request:", error);
            alert("Error occurred while making payment.");
        }
}