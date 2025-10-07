// ฟังก์ชันเพื่อแสดงรายการในตะกร้า
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

// ฟังก์ชันเพื่อทำการชำระเงิน
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

// ฟังก์ชันเพื่อรีเซ็ตตะกร้า
function resetCart() {
    localStorage.removeItem('cart'); // เคลียร์ตะกร้าใน localStorage
    displayCart(); // แสดงรายการว่าง
    document.getElementById('money-input').value = ''; // เคลียร์ช่องกรอกเงิน
}

// เรียกใช้ฟังก์ชันเพื่อแสดงรายการสินค้าตอนโหลดหน้า
window.onload = displayCart;
