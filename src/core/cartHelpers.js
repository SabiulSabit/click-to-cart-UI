// add new item to cart
export const addItem = (item, next) => {
  let cart = [];
  if (typeof window != "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...item, count: 1 });

    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

//cart length
export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }

  return 0;
};

//get total cart item
export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }

  return [];
};

//update cart
export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count = count;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }
};


//remove item from cart
export const removeItem = (productId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return cart;
};