import axios from "axios";
import md5 from "md5";
import { NextResponse } from "next/server";


export async function POST (request,res){

    const {amount} = await request.json();
    
    const merchantKey = "6c567b06cd558af505bbee0271612be0";
        const merchantId = "mer714043"; 
        const orderId = `${Date.now()}`;
        const productCode = '80003'
        // https://parlourfootball.online/api/callback&orderAmt=200&orderNo=1734203695370&productCode=800036c567b06cd55****ee0271612be0
        // Data to be signed
        const sn = `orderAmt=${amount}&orderNo=${orderId}&productCode=${productCode}`
        const sign = md5(`${sn}&key=${merchantKey}`);
  
        const requestBody = {
          "merchantNo": merchantId,
          "orderNo": orderId,
          "orderAmt": `${amount}`,
          "productCode": productCode,
          "notifyUrl": "https://parlourfootball.online/api/callback",
          "sign": sign,
        };
  
        try {
            const response = await axios.post('https://api.carry-pay.com/api/agentPay/payOrder', requestBody);
            console.warn(response.data);
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