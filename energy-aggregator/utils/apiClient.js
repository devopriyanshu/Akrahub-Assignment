import axios from "axios";
import crypto from "crypto";

const MOCK_API_URL = "http://localhost:3000/device/real/query";
const SECRET_TOKEN = "interview_token_123";

function generateSignature(urlPath, timestamp) {
  const data = urlPath + SECRET_TOKEN + timestamp;
  return crypto.createHash("md5").update(data).digest("hex");
}

export async function fetchDeviceData(snList) {
  const timestamp = Date.now().toString();
  const urlPath = "/device/real/query"; 
  
  const signature = generateSignature(urlPath, timestamp);

  try {
    const response = await axios.post(
      MOCK_API_URL,
      { sn_list: snList },
      {
        headers: {
          "Content-Type": "application/json",
          "timestamp": timestamp,
          "signature": signature,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`API Error ${error.response.status}:`, error.response.data);
      if (error.response.status === 429) {
          throw new Error("RATE_LIMIT_EXCEEDED");
      }
    } else {
      console.error("Network Error:", error.message);
    }
    throw error;
  }
}
