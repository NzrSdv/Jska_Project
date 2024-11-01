let PM;
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
PM = new ProductManager([], []);
// localStorage.clear();
getAllfetch();
pageBtnRender();
if (localStorage.getItem("products")) {
  if (JSON.parse(localStorage.getItem("cart")) != undefined) {
    let cart = JSON.parse(localStorage.getItem("cart")).map((element) => {
      return new CartProduct(
        element.id,
        element.name,
        element.rarity,
        element.image,
        element.type,
        element.cost,
        element.quantity
      );
    });
    PM.carts = cart;
  }
  PM.CartUpdate();
  PM.render(true);
  fetchStatus = true;
}

cartLink.addEventListener("click", () => {
  if (!JSON.parse(localStorage.getItem("logged"))) {
    if (window.location.href.includes("index")) {
      let ist = window.location.href.split("/");
      ist.pop();
      window.open(ist.join("/") + "/pages/SignIn.html");
    } else {
      window.open(list.location.href + "/pages/SignIn.html");
    }
  }
});
let search = document.querySelector(".catalog-search");

search.addEventListener("input", (e)=>{
  console.log(e)
  if(e.inputType.includes("delete")){
    searchFunc()
    if(search.value.trim() == ""){
    pageBtnRender(false);
  }
  else{
    pageBtnRender(true);

  }
}
  else{
    searchFunc();
  }
});

let select = document.querySelector(".sort");
//default rarity- rarity+ cost+ cost -
select.addEventListener("change", () => {
  sortation(true);
});

