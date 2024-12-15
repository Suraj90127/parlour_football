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

    const {amount, productCode} = await request.json();
    
    const merchantKey = "6c567b06cd558af505bbee0271612be0";
        const merchantId = "mer714043"; 
        const orderId = `${Date.now()}`;
       
        let requestBody = {
          "merchantNo": merchantId,
          "orderNo": orderId,
          "orderAmt": `${amount}`,
          "productCode": productCode,
          "notifyUrl": "https://parlourfootball.online/api/callback",
        };

        const sn = sign(requestBody, merchantKey);
        requestBody.sign = sn;
        // const test = md5('df552f3bc735b683e3f41ed2edb66187');
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

// The type of 80003 is: collection,
// The relevant API required parameters and descriptions are as follows:
// merchantNo:[merchant number, remarks: merchant number]
// orderNo:[order number, remarks: order number]
// orderAmt:[Transaction Funds, Remarks: Transaction Funds]
// productCode:[product code, remarks: product code]
// notifyUrl:[callback address, note: callback address]
// sign:[signature, remarks: signature]


// The type of 90001 is: payment on behalf of others,
// The relevant API required parameters and descriptions are as follows:
// merchantNo:[merchant number, remarks: merchant number]
// orderNo:[order number, remarks: order number]
// orderAmt:[Payment of funds on behalf of others, Remarks: Payment of funds on behalf of others]
// productCode:[product code, remarks: product code]
// notifyUrl:[callback address, note: callback address]
// sign:[signature, remarks: signature]

// accPhone:[Payee’s phone number, Note: The payee’s phone number is in landline format]
// transferMode: [Transfer mode, note: transfer modes include Pix, Banktransfer and UPI]
// ext1: [Special parameter 1, remarks: when transferMode=Pix, ext1=user CPF. When transferMode=Banktransfer, ext1=ifsc]
// ext2: [Special parameter 2, note: when transferMode=Pix, ext2=user pix type.EMAIL/PHONE/CPF/CNPJ/RANDOM]
// accName: [Payee’s name, Note: accName payee’s name is required when transferMode=Pix]
// accNo:[Payee Account, Remarks: Payee Account]
// ext3: [Special parameter 3, note: when transferMode=Pix, ext3 is ifsc]
// accCode: [bank code, note: accCode bank code must be transmitted when transferMode=Banktransfer]