document.addEventListener('DOMContentLoaded', function () {
  const decreaseButtons = document.querySelectorAll(".decrease");
  const increaseButtons = document.querySelectorAll(".increase");
  const quantities = document.querySelectorAll(".quantity");
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  decreaseButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      let count = parseInt(quantities[index].textContent);
      if (count > 0) {
        count--;
        quantities[index].textContent = count;
      }
    });
  });

  increaseButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      let count = parseInt(quantities[index].textContent);
      if (count < 10) {
        count++;
        quantities[index].textContent = count;
      }
    });
  });

  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
      var name = document.querySelectorAll('.name h3')[index].textContent;
      var price = document.querySelectorAll('.price h3')[index].textContent;
      var quantity = quantities[index].textContent;

      var product = {
        name: name,
        price: price,
        quantity: quantity
      };

      var cart = localStorage.getItem('cart');
      if (cart) {
        cart = JSON.parse(cart);
      } else {
        cart = [];
      }

      cart.push(product);

      localStorage.setItem('cart', JSON.stringify(cart));
    });
  });
});