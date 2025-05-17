
const API_URL = "https://script.google.com/macros/s/AKfycbw_G-_gM3MX_D1TYDjOKenFjjBa26XGcjPxTtlTyjJ36TpX1igU8qpgww5tGL0m4NLODA/exec";

async function checkOrder() {
  const orderId = document.getElementById("orderInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!orderId) {
    resultDiv.textContent = "กรุณาใส่หมายเลขคำสั่งซื้อ";
    return;
  }

  try {
    const res = await fetch(`${API_URL}?order_id=${orderId}`);
    const data = await res.json();
    if (Object.keys(data).length === 0) {
      resultDiv.textContent = "ไม่พบข้อมูลคำสั่งซื้อ";
    } else {
      let output = "";
      for (const key in data) {
        output += `${key}: ${data[key]}\n`;
      }
      resultDiv.textContent = output;
    }
  } catch (err) {
    resultDiv.textContent = "เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ";
  }
}
