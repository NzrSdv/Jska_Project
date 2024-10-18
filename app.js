let cartLink = document.getElementById("cartLink");

const loading = document.querySelector(".loader");
let fetchStatus = false;
LoadingAnimation();
if (JSON.parse(localStorage.getItem("logged"))) {
  document.querySelectorAll(".not-logged").forEach((element) => {
    element.remove();
  });
} else {
  document.querySelectorAll(".is-logged").forEach((element) => {
    element.remove();
  });
}
let PM;
// localStorage.clear();
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
            i,
            ans.data[i].name,
            ans.data[i].rarity.value,
            ans.data[i].images.icon == undefined
              ? "/imgs/default_image.webp"
              : ans.data[i].images.icon,
            ans.data[i].type.value
          )
        );
        list[i].toFindTheCost();
      }
      localStorage.setItem("products", JSON.stringify(list));
      PM.datas = list;
    })
    .then(() => {
      fetchStatus = true;
      PM.render(true);
    });
} else {
  let data = [...JSON.parse(localStorage.getItem("products"))];
  if(JSON.parse(localStorage.getItem("cart"))){
    let cart = JSON.parse(localStorage.getItem("cart")).map(element => {
      return new CartProduct(element.id,element.name,element.rarity,element.image,element.type,element.cost,element.quantity);
    })
    PM = new ProductManager(data,cart);
  }
  else{
    PM = new ProductManager(data, []);
  }
  PM.render(true);
  fetchStatus = true;
}

cartLink.addEventListener("click", () => {
  if (!JSON.parse(localStorage.getItem("logged"))) {
    cartLink.href = "/pages/SignIn.html";
  }
});
let search = document.querySelector(".catalog-search");
search.addEventListener("input",searchFunc);

let select = document.querySelector(".sort");
//default rarity- rarity+ cost+ cost -
select.addEventListener("change", () => {
  sortation(true);
});
