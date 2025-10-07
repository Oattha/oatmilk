function addToCart(name, price, image) {
    // สร้างอ็อบเจ็กต์สินค้าที่จะเพิ่มในตะกร้า
    const product = { name, price, image };
    
    // รับตะกร้าปัจจุบันจาก localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // เพิ่มสินค้าลงในตะกร้า
    cart.push(product);
    
    // บันทึกตะกร้าลง localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // แสดงข้อความยืนยัน
    alert(`${name} ได้ถูกเพิ่มลงในตะกร้า`);
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    let total = 0;

    // รับตะกร้าจาก localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ล้างข้อมูลเก่าในตะกร้า
    cartItemsContainer.innerHTML = '';

    // เพิ่มรายการในตะกร้า
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        // สร้างเนื้อหาสำหรับสินค้า
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <p>${item.name} - ฿${item.price}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    // แสดงราคาสุทธิ
    document.getElementById('total-price').textContent = `รวม: ฿${total.toFixed(2)}`;
}

function checkout() {
    const money = document.getElementById('money-input').value;
    const total = JSON.parse(localStorage.getItem('cart')).reduce((sum, item) => sum + item.price, 0);
    const statusMessage = document.getElementById('status-message');

    if (money < total) {
        statusMessage.textContent = "เงินไม่พอ กรุณาใส่เงินเพิ่ม";
    } else {
        const change = money - total;
        statusMessage.textContent = `ขอบคุณที่ช้อปปิ้ง! ทอนเงิน: ฿${change.toFixed(2)}`;
        resetCart();
    }
}

function resetCart() {
    localStorage.removeItem('cart'); // เคลียร์ตะกร้าใน localStorage
    displayCart(); // แสดงรายการว่าง
    document.getElementById('money-input').value = ''; // เคลียร์ช่องกรอกเงิน
}

// เรียกใช้ฟังก์ชันเพื่อแสดงรายการสินค้าตอนโหลดหน้า
window.onload = displayCart;


// ตั้งเวลานับถอยหลัง (7 ชั่วโมง)
let countdownTime = localStorage.getItem('countdownTime') ? 
                    parseInt(localStorage.getItem('countdownTime')) : 
                    7 * 60 * 60; // 7 ชั่วโมงในวินาที

const countdownElement = document.getElementById('countdown');

// ฟังก์ชันอัปเดตนับถอยหลัง
function updateCountdown() {
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;

    // แสดงเวลาในรูปแบบ HH:MM:SS
    countdownElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // ลดเวลานับถอยหลัง
    if (countdownTime > 0) {
        countdownTime--;
        localStorage.setItem('countdownTime', countdownTime); // อัปเดตเวลาใน localStorage
    } else {
        countdownElement.textContent = "หมดเขตแล้ว!";
        clearInterval(countdownInterval);
        localStorage.removeItem('countdownTime'); // ลบเวลาเมื่อหมดเขต
    }
}

// เริ่มการนับถอยหลัง
const countdownInterval = setInterval(updateCountdown, 1000);

// เรียกใช้ฟังก์ชันเพื่อแสดงรายการสินค้าตอนโหลดหน้า
window.onload = function() {
    displayCart(); // แสดงรายการสินค้าในตะกร้า
    updateCountdown(); // เริ่มการนับถอยหลังเมื่อหน้าโหลด
};

