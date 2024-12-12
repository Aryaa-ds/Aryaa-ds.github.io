const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  // menambahkan class active pada element shopping cart
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

// keranjang
let cart = [];
let total = 0;

// memasukan produk ke dalam keranjang
function addToCart(button) {
  const card = button.closest('.card');
  const productName = card.querySelector('.card-title').innerText;
  const productPrice = parseInt(card.getAttribute('data-price'));
  cart.push({ name: productName, price: productPrice });
  total += productPrice;
  updateCart();
}
// menghapus item
function removeFromCart(itemName) {
  const itemIndex = cart.findIndex((item) => item.name === itemName);
  if (itemIndex > -1) {
    total -= cart[itemIndex].price;
    cart.splice(itemIndex, 1);
    updateCart();
  }
}

function clearCart() {
  cart = [];
  total = 0;
  updateCart();
}
// mengupdate keranjang belanja
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  cart.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - Rp ${item.price}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'x';
    removeButton.onclick = () => removeFromCart(item.name);

    li.appendChild(removeButton);
    cartItems.appendChild(li);
  });
// menampilkan harga total
  document.getElementById('totalPrice').textContent = `Total: Rp ${total}`;
  document.getElementById('clearCartButton').onclick = clearCart;
  
}
// checkout 
  const checkout = document.querySelector('.buy');
  document.querySelector('#button1').onclick = (e) => {
      checkout.classList.toggle('active');
      document.getElementById('price').textContent = `${total}`;
    };
// pop up ketika klik tombol beli
document.addEventListener('DOMContentLoaded', () => {
  const buyElement = document.querySelector('.buy');
  const buttons = document.querySelectorAll('.btn1');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      // menambahkan class active pada element buy
      buyElement.classList.toggle('active');

      // mencari element card terdekat
      const product = e.currentTarget.closest('.card');
      if (product) {
        // mengambil data price
        const dataPrice = product.getAttribute('data-price');

        // menampilkan element price
        const priceDisplay = document.getElementById('price');
        if (priceDisplay) {
          priceDisplay.innerText = dataPrice;
        }
      } else {
        console.error('Product card not found');
      }
    });
  });
});
