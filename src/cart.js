let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

basket = JSON.parse(localStorage.getItem("data")) || [];
cartAmount = document.querySelector(".cart-amount");

calculation = () => {
  cartAmount.textContent = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
       
        <div class="cart-item">
          <img width="100" src="${search.img}" alt="" />
          <div class="details">
            <div class="title-price-x">
              <h4>
                <p>${search.name}</p>
                <p>$ ${search.price}</p>
              </h4>
              <p onclick="removeItem(${id})" class="x">&times;</p>
            </div>
            <div class="order-amount">
              <button onclick='decrement(${id})' class="minus">-</button>
              <h4 id=${id} class="quantity">${item}</h4>
              <button onclick='increment(${id})' class="plus">+</button>
            </div>

            <h3>~$ ${item * search.price}</h3>
          </div> 
        </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is empty</h2>
       <button class="HomeBtn"><a href="shop.html">Back to home </a></button>
    `;
  }
};
generateCartItems();

// console.log(shopItemsData);

increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
  generateCartItems();
};

decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    return;
  } else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(basket));
};

update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  console.log(basket);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
  totalAmount();
  // localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  // calculation();
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
};

let totalAmount = (id) => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
    <div class="total">
    <h3>CART SUMMARY</h3>
    <h1>Total Bill : $ ${amount}</h1>
    <div class="check-clear">
      <button class="checkout">Checkout</button>
      <button class="clear-cart">Clear Cart</button>
    </div>
  </div>
    `;
  } else {
    return;
  }
};
totalAmount();

const checkout = document.querySelector(".checkout");
const clear_Cart = document.querySelector(".clear-cart");
const overlay = document.querySelector(".overlay");
const clearAlert = document.querySelector(".clearcart-alert");
const cancelAlert = document.querySelector(".cancel-main");
const clearMainCart = document.querySelector(".clear-main");
const checkoutAlert = document.querySelector(".checkout-alert");
const checkoutOk = document.querySelector(".ok");

// Clear cart on cart summary page
clear_Cart.addEventListener("click", function (e) {
  e.preventDefault();
  overlay.classList.remove("hidden");
  clearAlert.classList.remove("hidden");
});

clearMainCart.addEventListener("click", function (e) {
  e.preventDefault();
  clearCart();
  overlay.classList.add("hidden");
});

cancelAlert.addEventListener("click", function (e) {
  e.preventDefault();
  overlay.classList.add("hidden");
  clearAlert.classList.add("hidden");
});

checkout.addEventListener("click", function (e) {
  e.preventDefault();
  checkoutAlert.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

checkoutOk.addEventListener("click", function (e) {
  e.preventDefault();
  checkoutAlert.classList.add("hidden");
  overlay.classList.add("hidden");
  clearCart();
});
