let PM;
$(".window--successful--purchase").animate(
  {
    right: "-=100",
    opacity: 0,
  },
  10,
  () => {}
);
window.onload = function () {
  if (JSON.parse(localStorage.getItem("cart"))) {
    let Newdata = JSON.parse(localStorage.getItem("products")).map(
      (element) => {
        return new Product(
          element.id,
          element.name,
          element.rarity,
          element.image,
          element.type,
          element.cost
        );
      }
    );
    let Newcart;
    Newcart = JSON.parse(localStorage.getItem("cart")).map((element) => {
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
    PM = new ProductManager(Newdata, Newcart);
    PM.render(false);
    if(!cartCheck){
      fillerShow();
    }
  } else {
    let Newdata = JSON.parse(localStorage.getItem("products")).map(
      (element) => {
        return new Product(
          element.id,
          element.name,
          element.rarity,
          element.image,
          element.type,
          element.cost
        );
      }
    );
    PM = new ProductManager(Newdata, []);
    if(!cartCheck()){
     fillerShow();
    }
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
