let PM;
PM = new ProductManager([], []);
window.onload = function () {
  if (cartCheck()) {
   PM.datas = JSON.parse(localStorage.getItem("products")).map(
      (element) => {
        return new Product(
          element.id,
          element.name,
          element.rarity,
          element.image,
          element.type,
          element.cost
        )
      }
    );
    PM.carts = JSON.parse(localStorage.getItem("cart")).map((element) => {
      return new CartProduct(
        element.id,
        element.name,
        element.rarity,
        element.image,
        element.type,
        element.cost,
        element.quantity
      )
    });
    PM.render(false);
  } else {
    fillerShow();
  }
};

let search = document.querySelector(".catalog-search");

search.addEventListener("input", searchFunc);

let select = document.querySelector(".sort");
select.addEventListener("input", () => {
  sortation(false);
});

var selectedCartProductId;

let delw = document.querySelector(".delete-window");
delw.addEventListener("click", () => {
  delw.classList.add("none");
});

let yes = document.querySelector(".yes");
yes.addEventListener("click", () => {
  PM.removeCart(selectedCartProductId);
});

