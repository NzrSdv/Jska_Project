const products = document.querySelector(".products");
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
  CartUpdate() {
    localStorage.setItem("cart", JSON.stringify(this.carts));
  }
  render(isData) {
    products.innerHTML = "";

    if (isData) {
      for (let i = 0; i < this.datas.length / 10; i++) {
        for (let j = 0; j < 10; j++) {
          products.innerHTML += `
          <div class="product ${this.datas[i * 10 + j].rarity}">
      <div class="search--akparat">
      <img src="${
        this.datas[i * 10 + j].image
      }" alt="" class="product--image" loading="lazy">
      <h2 class="product-name info-important">${
        this.datas[i * 10 + j].name
      }</h2>
      <div class="line">
          <h3 class="product-type info-important">${
            this.datas[i * 10 + j].type
          }</h3>
          <h3 class="product-rarity info-important">${
            this.datas[i * 10 + j].rarity
          }</h3>
      </div>
      
<h3 class="product-rarity info-important">${this.datas[i * 10 + j].cost} VB</h3>
      </div>
      <div class = "line"> 
      <button class="product--cart" onclick="addToTheCartButton(${
        this.datas[i * 10 + j].id
      })">add to cart</button>
      </div>
  </div>`;
        }
      }
    } else {
      this.carts.forEach((element) => {
        products.innerHTML += `
            <div class="product ${element.rarity}">
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
                </div>`;
      });
    }
  }
}
class Product {
  constructor(id, name, rarity, image, type, cost = 100) {
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
    let list = [k, kt];
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
    super(id, name, rarity, image, type, cost);
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
      alert("cannot change it below 0");
    }
  }
}

class User {
  constructor(name, login, email, password) {
    this.name = name;
    this.login = login;
    this.email = email;
    this.password = password;
  }
  passwordCheck(newPassword) {
    return this.password == newPassword;
  }
  loginCheck(newLogin) {
    return this.login == newLogin;
  }
  loggedLS() {
    localStorage.setItem("logged", JSON.stringify(this));
  }
}
class UserManager {
  constructor(users, lastUser) {
    this.users = users;
    this.lastUser = lastUser;
    this.localStorageUpdate();
  }
  hasLastUser() {
    return this.lastUser == {} ? false : true;
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
