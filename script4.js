window.onload = function () {
    var cart = JSON.parse(localStorage.getItem('cart') || "[]");
    var tableBody = document.querySelector('#cart-table tbody');
    var totalPriceElement = document.getElementById('total-price');
    var placeOrderButton = document.getElementById('place-order');
    var nameInput = document.getElementById('name');
    var contactNumberInput = document.getElementById('contact-number');
    var addressInput = document.getElementById('address');

    function updateTotalPrice() {
        let totalPrice = cart.reduce((total, product) => total + (parseFloat(product.price.replace('₱', '')) * product.quantity), 0);
        totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;
    }

    function renderCart() {
        tableBody.innerHTML = '';
        cart.forEach(function (product, index) {
            var cartItemHtml = `
                <tr>
                    <td>${product.name}</td>
                    <td>
                        <button class="decrease-btn" data-index="${index}">-</button>
                        ${product.quantity}
                        <button class="increase-btn" data-index="${index}">+</button>
                    </td>
                    <td>${product.price}</td>
                    <td><button class="remove-btn" data-index="${index}">Remove</button></td>
                </tr>
            `;
            tableBody.innerHTML += cartItemHtml;
        });

        var removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var index = this.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });

        var decreaseButtons = document.querySelectorAll('.decrease-btn');
        decreaseButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var index = this.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                }
            });
        });

        var increaseButtons = document.querySelectorAll('.increase-btn');
        increaseButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var index = this.getAttribute('data-index');
                cart[index].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });

        updateTotalPrice();
    }

    function placeOrder() {
        const name = nameInput.value.trim();
        const contactNumber = contactNumberInput.value.trim();
        const address = addressInput.value.trim();

        if (name && contactNumber && address) {
            alert('Order placed successfully!');
            const urlString = `receipt.html?name=${encodeURIComponent(name)}&contactNumber=${encodeURIComponent(contactNumber)}&address=${encodeURIComponent(address)}`;

            let cartQueryString = '';
            cart.forEach((product, index) => {
                cartQueryString += `&product${index}=${encodeURIComponent(product.name)}&quantity${index}=${encodeURIComponent(product.quantity)}&price${index}=${encodeURIComponent(product.price)}`;
            });

            const finalUrl = urlString + cartQueryString;
            const receiptWindow = window.open(finalUrl, '_blank');

            localStorage.removeItem('cart');
            cart = [];
            renderCart();

            nameInput.value = '';
            contactNumberInput.value = '';
            addressInput.value = '';

        } else {
            alert('Please fill out all fields.');
        }
    }

    placeOrderButton.addEventListener('click', placeOrder);

    renderCart();
}





