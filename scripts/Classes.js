const products = document.querySelector(".products");
const rares = ["common", "rare", "uncommon", "epic", "legendary"];
const types = [
  "wrap",
  "emote",
  "glider",
  "harvester",
  "pet",
  "backpack",
  "skin",
];

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
      this.datas.forEach((element) => {
        products.innerHTML += `
                  <div class="product ${element.rarity}">
              <img src="${element.image}" alt="" class="product--image">
              <h2 class="product-name">${element.name}</h2>
              <div class="line">
                  <h3 class="product-type">${element.type}</h3>
                  <h3 class="product-rarity">${element.rarity}</h3>
              </div>
              <div class = "line"> 
              <h3 class="product-cost">${element.cost} VB</h3>
              <button class="product--cart" onclick="addToTheCartButton(${element.id})">add to cart</button>
              </div>
          </div>`;
      });
    }
    else{
        this.carts.forEach(element => {
            products.innerHTML += `
            <div class="product ${element.rarity}">
                        <img src="${element.image}" alt="" class="product--image">
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
                </div>`
        })
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
    } else if (k == 4 || k == -1) {
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
    console.log(this.AllSum);
  }
  PlusQuantity() {
    this.quantity++;
    console.log(this.quantity);
    this.AllSumUpdate();
  }
  MinusQuantity() {
      if(this.quantity > 1){
          this.quantity--;
          this.AllSumUpdate();
      }
      else{
          alert("cannot change it below 0")
      }
  }
}