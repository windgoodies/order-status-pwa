if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(reg => console.log("✅ Service Worker registered:", reg.scope))
    .catch(err => console.error("❌ SW registration failed:", err));
}

async function checkStatus() {
  const orderId = document.getElementById("orderId").value.trim();
  const resultDiv = document.getElementById("result");

  if (!orderId) {
    resultDiv.innerHTML = `<p class="text-red-500">⚠️ กรุณากรอกหมายเลขคำสั่งซื้อ</p>`;
    resultDiv.classList.remove("hidden");
    return;
  }

  const url = `https://script.google.com/macros/s/AKfycbw_G-_gM3MX_D1TYDjOKenFjjBa26XGcjPxTtlTyjJ36TpX1igU8qpgww5tGL0m4NLODA/exec?order_id=${orderId}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.product_name) {
      resultDiv.innerHTML = `
        <p class="text-gray-700">📦 <strong>สินค้า:</strong> ${data.product_name}</p>
        <p class="text-gray-700">📌 <strong>สถานะ:</strong> ${data.status}</p>
        <p class="text-gray-500">📅 <strong>อัปเดตล่าสุด:</strong> ${data.updated_date}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p class="text-yellow-600">❌ ไม่พบข้อมูลสำหรับหมายเลขนี้</p>`;
    }
    resultDiv.classList.remove("hidden");

  } catch (error) {
    resultDiv.innerHTML = `<p class="text-red-500">🚫 ไม่สามารถเชื่อมต่อกับระบบได้</p>`;
    resultDiv.classList.remove("hidden");
    console.error(error);
  }
}