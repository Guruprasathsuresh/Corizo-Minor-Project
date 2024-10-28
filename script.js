document.addEventListener("DOMContentLoaded", loadOrders);
document.getElementById("orderForm").addEventListener("submit", addOrder);

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = '';

    orders.forEach((order, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Guest Name:</strong> ${order.guestName}<br>
            <strong>Room Type:</strong> ${order.roomType}<br>
            <strong>Check-in Date:</strong> ${order.checkInDate}<br>
            <strong>Check-out Date:</strong> ${order.checkOutDate}<br>
            <strong>Special Requests:</strong> ${order.specialRequests || 'None'}<br>
            <div class="order-actions">
                <button class="delete" onclick="deleteOrder(${index})">Delete Order</button>
            </div>
        `;
        orderList.appendChild(li);
    });
}

function addOrder(event) {
    event.preventDefault();
    const guestName = document.getElementById("guestName").value;
    const roomType = document.getElementById("roomType").value;
    const checkInDate = document.getElementById("checkInDate").value;
    const checkOutDate = document.getElementById("checkOutDate").value;
    const specialRequests = document.getElementById("specialRequests").value;

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ guestName, roomType, checkInDate, checkOutDate, specialRequests });
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
    document.getElementById("orderForm").reset();
}

function deleteOrder(index) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}
