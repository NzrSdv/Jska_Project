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
search.addEventListener("input", searchFunc);

let select = document.querySelector(".sort");
//default rarity- rarity+ cost+ cost -
select.addEventListener("change", () => {
  sortation(true);
});

function getAllfetch() {
  fetch(`./api.json`, {
    //https://dash.fortnite-api.com/endpoints/banners
    method: "GET",
  })
    .then((res) => res.json())
    .then((ans) => {
      let list = [];
      for (let i = 0; i < (ans.data.br.length / 10) - 1; i++) {
        let subList = [];
        for (let j = 0; j < 30; j++) {
          let num = i * 30 + j;

          if(
            ans.data.br[num] != undefined 
            )
            {subList.push(
              new Product(
                num,
                ans.data.br[num].name != undefined ? ans.data.br[num].name : ans.data.br[num].title,
                ans.data.br[num].rarity.value,
                ans.data.br[num].images.icon == undefined
                  ? "./imgs/default_image.webp"
                  : ans.data.br[num].images.icon,
                ans.data.br[num].type.value
              )
            );
            subList[j].toFindTheCost();}
        }
        list.push(subList);
      }
      if (localStorage.getItem("page")) {
        let page = JSON.parse(localStorage.getItem("page"));
        PM.setPage(page);
      } else {
        localStorage.setItem("products", JSON.stringify(list[0]));
        localStorage.setItem("page", 0);
      }
      PM.datas = list;
      PM.CartUpdate();
    })
    .then(() => {
      fetchStatus = true;
      PM.render(true);
    });
}
