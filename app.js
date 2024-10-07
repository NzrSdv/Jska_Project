const loading = document.querySelector(".loader");
let fetchStatus = false;
LoadingAnimation();

const products = document.querySelector(".products");
const rares = ["backpack", "rare", "uncommon", "epic", "legendary"];
const types = [
  "wrap",
  "emote",
  "glider",
  "harvester",
  "pet",
  "backpack",
  "skin",
];
class Product {
  constructor(name, rarity,image, type) {
    this.name = name;
    this.rarity = rarity;
    this.type = type;
    this.image = image;
    this.cost = 50;
  }
  toFindTheCost() {
    let k = rares.indexOf(this.rarity);
    let kt = types.indexOf(this.type);
    let list = [k,kt]
    console.log(list)
    if(k == 1){
        if(kt == 5){
            this.cost = 100
        }
    }
    else if(k == 2){
        if(kt == 5){
            this.cost = 200
        }
    }
    else if(k == 3){
        if(kt == 5){
            this.cost = 400
        }
    }
    else if(k == 4){
        if(kt == 5){
            this.cost = 700
        }
    }
    else if(k == 5){
        if(kt == 5){
            this.cost = 900
        }
    }
    else{
        if(kt == 5){
            this.cost = 500
        }
        else{
            this.cost = 1
        }
    }
  }
}

class ProductManager {
  constructor(datas, carts) {
    this.datas = datas;
    this.carts = carts;
  }
  addData(element) {
    this.datas.push(element);
  }
  render(isData) {
    products.innerHTML = "";
    if (isData) {
      this.datas.forEach((element) => {
        products.innerHTML += `
                <div class="product">
            <img src="${element.image}" alt="" class="product--image">
            <h2 class="product-name">${element.name}</h2>
            <div class="line">
                <h3 class="product-type">${element.type}</h3>
                <h3 class="product-price">${element.cost} VB</h3>
            </div>
        </div>`;
      });
    }
  }
}

let PM;
if (!localStorage.getItem("products")) {
  fetch("https://fortnite-api.com/v2/cosmetics/br/?&language=ru", {
    //https://dash.fortnite-api.com/endpoints/banners
    method: "GET",
  })
    .then((res) => res.json())
    .then((ans) => {
      let list = [];
      PM = new ProductManager(list, []);

      for (let i = 0; i < 50; i++) {
        list.push(
          new Product(
            ans.data[i].name,
            ans.data[i].rarity.value,
            ans.data[i].images.icon == undefined ? "./imgs/default_image.webp":ans.data[i].images.icon,
            ans.data[i].type.value
          )
        );
        list[i].toFindTheCost();
        PM.addData(list[i]);
      }
      localStorage.setItem("products", JSON.stringify(list));
    })
    .then(() => {
      fetchStatus = true;
      PM.render(true);
    });
} else {
    fetchStatus = true;
  let data = JSON.parse(localStorage.getItem("products"));
  PM = new ProductManager([...data], []);
  PM.render(true);
}
function LoadingAnimation() {
  setTimeout(() => {
    if (!fetchStatus) {
      loading.classList.remove("none");
      LoadingAnimation();
    } else {
      loading.classList.add("none");
    }
  }, 1000);
}
