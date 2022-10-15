const shop = document.querySelector(".shop-cards");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let cartAmount = document.querySelector(".cart-amount");

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, details, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `<div id=product-${id} class="shop-card">
        <img src="${img}" alt="" />
        <h1 class="item-name">${name}</h1>
        <p class="item-description">
          ${details}
        </p>
        <div class="pricing">
          <h3>$${price}</h3>
          <div class="switch">
            <h2 onclick='decrement(${id})' class="minus">-</h2>
            <h2 id=${id} class="item-count">${
        search.item === undefined ? 0 : search.item
      }</h2>
            <h2 onclick='increment(${id})' class="plus">+</h2>
          </div>
        </div>
        <button onclick='addToCart(${id})' class="add-to-cart">Add to cart</button>
      </div>`;
    })
    .join(""));
};
generateShop();

let increment = (id) => {
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
};

let decrement = (id) => {
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
  calculation();
  basket = basket.filter((x) => x.item !== 0);

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
};

let calculation = () => {
  cartAmount.textContent = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  // localStorage.setItem("data", JSON.stringify(basket));
};

let addToCart = (id) => {
  calculation();
};
