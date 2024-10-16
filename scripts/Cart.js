let PM;
window.onload = function () {
  if (localStorage.getItem("cart")) {
    let Newdata = JSON.parse(localStorage.getItem("products")).map(
      (element) => {
        return new Product(
          element.id,
          element.name,
          element.rarity,
          element.type,
          element.image,
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
        element.type,
        element.image,
        element.cost,
        element.quantity
      );
    });
    PM = new ProductManager(Newdata, Newcart);
    PM.render(false);
  } else {
    let Newdata = JSON.parse(localStorage.getItem("products")).map(
      (element) => {
        return new Product(
          element.id,
          element.name,
          element.rarity,
          element.type,
          element.image,
          element.cost
        );
      }
    );
    PM = new ProductManager(Newdata, []);
    products.innerHTML += `
      <div class="message">
              <h2 class="text-message">ничего не найдено</h2>
            </div>
      `;
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
