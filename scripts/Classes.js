let products = document.querySelector(".products");
const rares = [
  "common",
  "rare",
  "uncommon",
  "epic",
  "legendary",
  "marvel",
  "starwars",
  "slurp",
  "dc",
  "icon",
  "gaminglegends",
  "dark",
  "shadow",
  "molten",
  "forzen",
  "lava",
];
const types = [
  "wrap",
  "emote",
  "glider",
  "harvester",
  "pet",
  "backpack",
  "skin",
];

//add Box window
let Addedbox = document.querySelectorAll(".additionalInfo--message");
let boxAnimationStatus = false;
let boxIndex = 0;

class ProductManager {
  constructor(datas, carts) {
    this.datas = datas;
    this.carts = carts;
  }
  addData(element) {
    this.datas.push(element);
  }
  addCart(element) {
    this.carts.push(element);
  }
  removeCart(id) {
    this.carts = this.carts.filter((elem) => {
      if (elem.id != id) {
        return elem;
      }
    });
    if (this.carts.length == 0) {
      products.innerHTML = `
      <div class="message">
              <h2 class="text-message">ничего не найдено</h2>
            </div>
      `;
      localStorage.removeItem("cart");
    } else {
      this.CartUpdate();
      console.log(this.carts);
      this.render(false);
    }
    this.totalCost();
  }

  CartUpdate() {
    localStorage.setItem("cart", JSON.stringify(this.carts));
  }
  render(isData) {
    products.innerHTML = "";
    if (isData) {
      if (this.datas == [] || this.datas == undefined) {
        fillerShow();
      } else {
        this.datas.forEach((element) => {
          products.innerHTML += `
          <div class="product ${element.rarity}">
      <div class="search--akparat">
      <img src="${element.image}" alt="" class="product--image" loading="lazy">
      <h2 class="product-name info-important">${element.name}</h2>
      <div class="line">
          <h3 class="product-type info-important">${element.type}</h3>
          <h3 class="product-rarity info-important">${element.rarity}</h3>
      </div>
      
<h3 class="product-rarity info-important">${element.cost} VB</h3>
      </div>
      <div class = "line"> 
      <button class="product--cart" onclick="addToTheCartButton(${element.id})">add to cart</button>
      </div>
  </div>`;
        });
      }
    } else {
      if (cartCheck()) {
        this.carts.forEach((element) => {
          products.innerHTML += `
              <div class="product ${element.rarity}">
              <div class="search--akparat">
              <img src="${element.image}" loading="lazy" alt="" class="product--image">
              <h2 class="product-name">${element.name}</h2>
    <div class="line">
        <h3 class="product-type">${element.type}</h3>
        <h3 class="product-rarity">${element.rarity}</h3>
    </div>
    <div class = "line"> 
      <button class="changeQ plus-Q" onclick="plusCartProduct(${element.id})">+</button>
      <h3 class="product-Q">${element.quantity}</h3>
      <button class="changeQ minus-Q" onclick="minusCartProduct(${element.id})">-</button>
  </div>
  <h3 class="product-sum">${element.AllSum} VB</h3>
  <button class="product-delete" onclick="removeCartProduct(${element.id})">Delete</button>
      </div>
              </div>`;
        });
        this.totalCost();
      } else {
        this.totalCost();
        fillerShow();
      }
    }
  }

  totalCost() {
    let sum = 0;
    if (this.carts.length) {
      this.carts.forEach((elem) => {
        sum += elem.AllSum;
      });
      document.querySelector(".total").textContent = `total: ${sum} VB`;
    } else {
      document.querySelector(".total").textContent = `total: ${sum} VB`;
    }
  }
}
class Product {
  constructor(
    id,
    name,
    rarity,
    image = "../imgs/default_image.webp",
    type,
    cost = 100
  ) {
    this.id = id;
    this.name = name;
    this.rarity = rarity;
    this.type = type;
    this.image = image;
    this.cost = cost;
  }
  toFindTheCost() {
    let k = rares.indexOf(this.rarity);
    let kt = types.indexOf(this.type);
    if (k == 1) {
      if (kt == 0) {
        this.cost = 300;
      } else if (kt == 1) {
        this.cost = 200;
      } else if (kt == 2) {
        this.cost = 500;
      } else if (kt == 3) {
        this.cost = 500;
      } else if (kt == 4) {
        this.cost = 0;
      } else if (kt == 5) {
        this.cost = 200;
      } else if (kt == 6) {
        this.cost = 800;
      }
    } else if (k == 2) {
      if (kt == 0) {
        this.cost = 600;
      } else if (kt == 1) {
        this.cost = 500;
      } else if (kt == 2) {
        this.cost = 800;
      } else if (kt == 3) {
        this.cost = 800;
      } else if (kt == 4) {
        this.cost = 0;
      } else if (kt == 5) {
        this.cost = 400;
      } else if (kt == 6) {
        this.cost = 1200;
      }
    } else if (k == 3) {
      if (kt == 0) {
        this.cost = 900;
      } else if (kt == 1) {
        this.cost = 800;
      } else if (kt == 2) {
        this.cost = 1200;
      } else if (kt == 3) {
        this.cost = 1500;
      } else if (kt == 4) {
        this.cost = 1000;
      } else if (kt == 5) {
        this.cost = 700;
      } else if (kt == 6) {
        this.cost = 1500;
      }
    } else if (k >= 4) {
      if (kt == 0) {
        this.cost = 1200;
      } else if (kt == 1) {
        this.cost = 1100;
      } else if (kt == 2) {
        this.cost = 2000;
      } else if (kt == 3) {
        this.cost = 1500;
      } else if (kt == 4) {
        this.cost = 0;
      } else if (kt == 5) {
        this.cost = 900;
      } else if (kt == 6) {
        this.cost = 2000;
      }
    } else {
      if (kt == 0) {
        this.cost = 300;
      } else if (kt == 1) {
        this.cost = 200;
      } else if (kt == 2) {
        this.cost = 500;
      } else if (kt == 3) {
        this.cost = 500;
      } else if (kt == 4) {
        this.cost = 500;
      } else if (kt == 5) {
        this.cost = 100;
      } else if (kt == 6) {
        this.cost = 800;
      }
    }
  }
}
class CartProduct extends Product {
  constructor(id, name, rarity, type, image, cost, quantity) {
    super(id, name, rarity, type, image, cost);
    this.quantity = quantity;
    this.toFindTheCost();
    this.AllSum = 0;
    this.AllSumUpdate();
  }
  AllSumUpdate() {
    this.toFindTheCost();
    this.AllSum = this.cost * this.quantity;
  }
  PlusQuantity() {
    this.quantity++;
    this.AllSumUpdate();
  }
  MinusQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.AllSumUpdate();
    } else {
      selectedCartProductId = this.id;
      delw.classList.remove("none");
    }
  }
}

class User {
  constructor(name, login, email, password, cart = []) {
    this.name = name;
    this.login = login;
    this.email = email;
    this.password = password;
    this.cart = cart;
  }
  passwordCheck(newPassword) {
    return this.password == newPassword;
  }
  loginCheck(newLogin) {
    return this.login == newLogin;
  }
  loggedLS() {
    localStorage.setItem("logged", JSON.stringify(this));
    if (this.cart != []) {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  }
  cartWrite() {
    if (
      localStorage.getItem("cart") != undefined ||
      JSON.parse(localStorage.getItem("cart")) != null
    ) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
      console.log(this.cart);
    }
  }
}
class UserManager {
  constructor(users, lastUser) {
    this.users = users;
    this.lastUser = lastUser;
    this.localStorageUpdate();
  }
  hasLastUser() {
    return this.lastUser.name == undefined ? false : true;
  }
  localStorageUpdate() {
    localStorage.setItem("users", JSON.stringify(this.users));
    localStorage.setItem("lastUser", JSON.stringify(this.lastUser));
  }
  addUser(newUser) {
    this.users.push(newUser);
    this.localStorageUpdate();
  }
  userFind(uLogin, uPassword) {
    let state = false;
    let id = 0;
    this.users.forEach((element, index) => {
      console.log(element.passwordCheck(uPassword));
      console.log(element.loginCheck(uLogin));
      if (element.passwordCheck(uPassword) && element.loginCheck(uLogin)) {
        state = true;
        id = index;
      }
    });
    if (state) {
      return id;
    } else {
      return -1;
    }
  }
}
