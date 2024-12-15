import axios from "axios";
import md5 from "md5";
import { NextResponse } from "next/server";

/**
 * Generates a signature from the given parameters and sign key.
 * @param {Object} paramMap - The parameters to sign as a key-value map.
 * @param {string} signKey - The key used for signing.
 * @returns {string} - The MD5 signature.
 */
function sign(paramMap, signKey) {
    try {
        // Sort the keys of the paramMap
        const sortedKeys = Object.keys(paramMap).sort();
        
        // Build the string to sign
        let sb = '';
        for (const key of sortedKeys) {
            if (key === 'sign') continue; // Skip the "sign" key
            const value = paramMap[key];
            if (value === null || value === '') continue; // Skip null or empty values
            sb += `${key}=${value}&`;
        }

        // Remove the trailing "&" if it exists
        if (sb.endsWith('&')) {
            sb = sb.slice(0, -1);
        }

        // Append the signKey
        sb += signKey;

        // Generate the MD5 hash
        const verStr = md5(sb);

        return verStr;
    } catch (error) {
        console.error('Error generating signature:', error);
        return '';
    }
}


export async function POST (request,res){

    const {amount} = await request.json();
    
    const merchantKey = "6c567b06cd558af505bbee0271612be0";
        const merchantId = "mer714043"; 
        const orderId = `${Date.now()}`;
        const productCode = '80003'
       
        let requestBody = {
          "merchantNo": merchantId,
          "orderNo": orderId,
          "orderAmt": `${amount}`,
          "productCode": productCode,
          "notifyUrl": "https://parlourfootball.online/api/callback",
        };

        const sn = sign(requestBody, merchantKey);
        requestBody.sign = sn;
        const test = md5('df552f3bc735b683e3f41ed2edb66187');
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