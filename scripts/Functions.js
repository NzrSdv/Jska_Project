function LoadingAnimation() {
  if (!fetchStatus) {
    loading.classList.remove("none");
    setTimeout(() => {
      LoadingAnimation();
    }, 100);
  } else {
    loading.classList.add("none");
  }
  
}
function AddedBoxAnimation() {
  let initialIndex = boxIndex;
  Addedbox[boxIndex].classList.remove("none");
  boxAnimationStatus = true;
  setTimeout(() => {
    Addedbox[initialIndex].classList.add("none");
  }, 1200);
  if (boxIndex == 11) {
    boxIndex = 0;
  } else {
    boxIndex++;
  }
}
function addToTheCartButton(id) {
  if (JSON.parse(localStorage.getItem("logged")) != undefined) {
    let status = false;
    let inde;
    PM.carts.forEach((element, index) => {
      if (element.id == id) {
        status = true;
        inde = index;
      }
    });
    if (status && inde != undefined) {
      //объект есть в localstorage и
      PM.carts[inde].PlusQuantity();
      PM.CartUpdate();
      Addedbox[boxIndex].textContent = "+1 к уже имеющему товару в корзине";
    } else {
      let elem = PM.datas[id];
      PM.addCart(
        new CartProduct(
          id,
          elem.name,
          elem.rarity,
          elem.type,
          elem.image,
          100,
          1
        )
      );
      PM.carts[PM.carts.length - 1].AllSumUpdate();
      Addedbox[boxIndex].textContent = "Успешно добавлено в корзину";
      PM.CartUpdate();
    }
    AddedBoxAnimation();
  } else {
    if(window.location.pathname.includes("index.html")){
      let hrefList = window.location.href.split("/");
      hrefList.pop();
    window.open( hrefList.join("/") + "pages/SignIn.html", "_self");
    }
    else{
      window.open(window.location.href  + "pages/SignIn.html", "_self");
    }
  }
}

function plusCartProduct(id) {
  let sorted;
  PM.carts.forEach((elem, index) => {
    if (elem.id == id) {
      sorted = index;
    }
  });
  if (sorted != undefined) {
    PM.carts[sorted].PlusQuantity();
  } else {
    PM.removeCart(selectedCartProductId);
  }
  PM.CartUpdate();
  PM.render(false);
}
function minusCartProduct(id) {
  let sorted;
  PM.carts.forEach((elem, index) => {
    if (elem.id == id) {
      sorted = index;
    }
  });
  if (sorted != undefined) {
     PM.carts[sorted].MinusQuantity();
  } else {
    alert("nod");
  }
  PM.CartUpdate();
  PM.render(false);
}

function searchFunc() {
  if (search.value.trim() == "" || search.value == "") {
    PM.render(window.location.pathname.includes("/index.html"));
  } else {
    let value = search.value.toLowerCase();
    document.querySelectorAll(".product").forEach((element) => {
      if (
        element
          .querySelector(".search--akparat")
          .textContent.toLowerCase()
          .includes(value)
      ) {
        element.classList.remove("none");
      } else {
        element.classList.add("none");
        if (document.querySelector(".message") != null) {
          document.querySelector(".message").remove();
        }
      }
    });
    if (
      document.querySelectorAll(".product.none").length == PM.datas.length &&
      document.querySelector(".message") == null &&
      window.location.pathname.includes("/index.html")
    ) {
      products.innerHTML = `
      <div class="message">
              <h2 class="text-message">ничего не найдено</h2>
            </div>
      `;
    } else if (
      document.querySelectorAll(".product.none").length == PM.carts.length &&
      document.querySelector(".message") == null &&
      window.location.pathname.includes("/Cart.html")
    ) {
      products.innerHTML = `
      <div class="message">
              <h2 class="text-message">ничего не найдено</h2>
            </div>
      `;
    }
  }
}
function cartCheck() {
  return localStorage.getItem("cart") == undefined ? false : true;
}
function sortation(isCatalog) {
  let val = select.value;
  if(val == "" || val.trim() == ""){
    products.innerHTML = `
    <div class="message">
            <h2 class="text-message">ничего не найдено</h2>
          </div>
    `;
  }
  if (isCatalog) {
    switch (val) {
      case "0":
        PM.datas = JSON.parse(localStorage.getItem("products")).map(
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
        break;
      case "1":
        PM.datas.sort((a, b) => {
          if (rares.indexOf(a.rarity) > rares.indexOf(b.rarity)) {
            return -1;
          } else if (rares.indexOf(a.rarity) < rares.indexOf(b.rarity)) {
            return 1;
          } else {
            return 0;
          }
        });

        break;
      case "2":
        PM.datas.sort((a, b) => {
          if (rares.indexOf(a.rarity) > rares.indexOf(b.rarity)) {
            return 1;
          } else if (rares.indexOf(a.rarity) < rares.indexOf(b.rarity)) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case "3":
        PM.datas.sort((a, b) => a.cost - b.cost);
        break;
      case "4":
        PM.datas.sort((a, b) => b.cost - a.cost);
        break;
      default:
        console.log("def");
        break;
    }
  PM.render(isCatalog);
  searchFunc();
  } else if (!isCatalog && cartCheck()) {
    if(val == "" || val.trim() == ""){
      products.innerHTML = `
      <div class="message">
              <h2 class="text-message">ничего не найдено</h2>
            </div>
      `;
    }
    else{
      switch (val) {
        case "0":
          PM.carts = JSON.parse(localStorage.getItem("cart")).map((element) => {
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
          break;
        case "1":
          PM.carts.sort((a, b) => {
            if (rares.indexOf(a.rarity) > rares.indexOf(b.rarity)) {
              return -1;
            } else if (rares.indexOf(a.rarity) < rares.indexOf(b.rarity)) {
              return 1;
            } else {
              return 0;
            }
          });
  
          break;
        case "2":
          PM.carts.sort((a, b) => {
            if (rares.indexOf(a.rarity) > rares.indexOf(b.rarity)) {
              return 1;
            } else if (rares.indexOf(a.rarity) < rares.indexOf(b.rarity)) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case "3":
          PM.carts.sort((a, b) => a.cost - b.cost);
          break;
        case "4":
          PM.carts.sort((a, b) => b.cost - a.cost);
          break;
        default:
          console.log("def");
          break;
      }
  PM.render(isCatalog);
  searchFunc();
    }
  } else {
    products.innerHTML = `
      <div class="message">
              <h2 class="text-message">ничего не найдено</h2>
            </div>
      `;
  }
}


