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
function getAllfetch() {
  fetch(`./api.json`, {
    //http.fortnite-api.com/endps://dashoints/banners
    method: "GET",
  })
    .then((res) => res.json())
    .then((ans) => {
      let list = [];

      for (let i = 0; i < ans.data.length / 30 - 1; i++) {
        let subList = [];
        for (let j = 0; j < 16; j++) {
          let num = i * 16 + j;

          if (ans.data[num] != undefined) {
            subList.push(
              new Product(
                num,
                ans.data[num].name != undefined
                  ? ans.data[num].name
                  : ans.data[num].title,
                ans.data[num].rarity.value,
                ans.data[num].images.icon == undefined
                  ? "./imgs/default_image.webp"
                  : ans.data[num].images.icon,
                ans.data[num].type.value
              )
            );
            subList[j].toFindTheCost();
          }
        }
        list.push(subList);
      }
      PM.datas = list;
      if (localStorage.getItem("page")) {
        let page = JSON.parse(localStorage.getItem("page"));
        PM.setPage(page);
      }
      PM.CartUpdate();
    })
    .then(() => {
      fetchStatus = true;
      PM.render(true);
    });
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
      PM.searchAndSort[PM.searchPage].forEach((element, index) => {
        if (element.id == id) {
          status = true;
          inde = index;
        }
      });
      let elem = PM.searchAndSort[PM.searchPage][inde];
      PM.addCart(
        new CartProduct(
          id,
          elem.name,
          elem.rarity,
          elem.image,
          elem.type,
          elem.cost,
          1
        )
      );
      PM.carts[PM.carts.length - 1].AllSumUpdate();
      Addedbox[boxIndex].textContent = "Успешно добавлено в корзину";
      PM.CartUpdate();
    }
    AddedBoxAnimation();
  } else {
    if (window.location.pathname.includes("index.html")) {
      let hrefList = window.location.href.split("/");
      hrefList.pop();
      window.open(hrefList.join("/") + "/pages/SignIn.html", "_self");
    } else {
      window.open(window.location.href + "pages/SignIn.html", "_self");
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

function removeCartProduct(id) {
  delw.classList.remove("none");
  selectedCartProductId = id;
  PM.render(false);
}

function searchFunc() {
  let search = document.querySelector("input.catalog-search");
  PM.searchAndSort = [];
  if (search.value.trim() == "" || search.value == "") {
    if (!window.location.pathname.includes("/Cart.html")) {
      PM.render(true);
      pageBtnRender(false);
    } else {
      PM.render(false);
    }
    
  } else {
    let value = search.value.toLowerCase();
    if (window.location.pathname.includes("Cart.html")) {
      PM.carts.forEach((element) => {
        let status = false;
        Object.keys(element).forEach((key) => {
          if (
            key != "image" &&
            `${element[`${key}`]}`.trim().toLowerCase().includes(value)
          ) {
          status = true;  
          }
        });
        if(status){
          PM.searchAndSort.push(element);
        }
      });
    } else {
      PM.datas.forEach((element) => {
        element.forEach((subElement) => {
          let stat = false;
          Object.keys(subElement).forEach((key) => {
            if (
              key != "image" &&
              `${subElement[`${key}`]}`.trim().toLowerCase().includes(value)
            ) {
              stat = true;
            }
          });
          if (stat) {
            PM.searchAndSort.push(subElement);
          }
        });
      });
    }
    console.log(PM.searchAndSort);
    PM.setSearched(PM.searchAndSort);
    pageBtnRender(true);
    if (
      document.querySelectorAll(".product.none").length == PM.carts.length &&
      document.querySelector(".message") == null &&
      window.location.pathname.includes("/Cart.html")
    ) {
      fillerShow();
    } else if (
      PM.searchAndSort[PM.searchPage] != undefined &&
      document.querySelectorAll(".product.none").length ==
        PM.searchAndSort[PM.searchPage].length &&
      !window.location.pathname.includes("/Cart.html")
    ) {
      fillerShow();
      let btnsRow = document.querySelectorAll(".page--buttons");
      btnsRow.forEach((element) => {
        element.innerHTML = ``;
        element.classList.remove("borderka");
      });
    }
  }
}
function cartCheck() {
  return localStorage.getItem("cart") == undefined ||
    localStorage.getItem("cart") == "[]"
    ? false
    : true;
}
function sortation(isCatalog) {
  let val = select.value;
  if (val == "" || val.trim() == "") {
    fillerShow();
  }
  if (isCatalog) {
    switch (val) {
      case "0":
        getAllfetch();
        break;
      case "1":
        PM.datas[PM.page].sort((a, b) => {
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
        PM.datas[PM.page].sort((a, b) => {
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
        PM.datas[PM.page].sort((a, b) => a.cost - b.cost);
        break;
      case "4":
        PM.datas[PM.page].sort((a, b) => b.cost - a.cost);
        break;
      default:
        break;
    }
    PM.render(isCatalog);
    searchFunc();
  } else if (!isCatalog && cartCheck()) {
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
        break;
    }
    PM.render(isCatalog);
    searchFunc();
  }
}
var timerStatus = false;
function buyAll() {
  PM.carts = [];
  if (localStorage.getItem("cart") != "[]" && !timerStatus) {
    PM.CartUpdate();
    $(".window--successful--purchase").text = "Успешная покупка";
    timerStatus = true;
    $(".window--successful--purchase").animate(
      {
        right: "+=100",
        opacity: 1,
      },
      500,
      () => {}
    );
    setTimeout(() => {
      $(".window--successful--purchase").animate(
        {
          right: "-=100",
          opacity: 0,
        },
        500,
        () => {}
      );
      timerStatus = false;
    }, 500);
    PM.render(false);
  } else {
    PM.CartUpdate();
    timerStatus = true;
    $(".window--successful--purchase").text = "Ничего нет";
    $(".window--successful--purchase").animate(
      {
        right: "+=100",
        opacity: 1,
      },
      500,
      () => {}
    );
    setTimeout(() => {
      $(".window--successful--purchase").animate(
        {
          right: "-=100",
          opacity: 0,
        },
        500,
        () => {}
      );
      timerStatus = false;
    }, 500);
  }
}

function fillerShow() {
  if (!document.querySelector(".message")) {
    products.innerHTML += `
    <div class="message">
            <h2 class="text-message">ничего не найдено</h2>
          </div>
    `;
  }
}

function pageBtnRender(isSearching) {
  let btnsRow = document.querySelectorAll(".page--buttons");
  if (isSearching) {
    if (
      PM.searchAndSort.length == 0
    ) {
      btnsRow.forEach(element => {
        element.innerHTML = '';
      })
      
    } else {
      let now =
        PM.searchPage <= 5 && PM.searchPage >= 0 ? 0 : PM.searchPage - 5;
      btnsRow.forEach((element) => {
        element.classList.add("borderka");
        element.innerHTML = ``;
        element.innerHTML += `<button class="nums" onclick="NextPage(${0},this,${isSearching})"><<<</button>`;
        element.innerHTML += `<button class="nums" onclick="NextPage(${
          PM.searchPage <= 12 && PM.searchPage >= 0
            ? 12 - PM.searchPage <= 5 && 12 - PM.searchPage >= 0
              ? 12 - PM.searchPage
              : PM.searchPage == 0
              ? PM.searchAndSort.length - 1
              : 0
            : PM.searchPage - 12
        },this,${isSearching})"><</button>`;
        for (let i = now; i < now + 10; i++) {
          if (i <= PM.searchAndSort.length - 1) {
            if (i == PM.searchPage) {
              element.innerHTML += `
                <button class="nums activePage" onclick="NextPage(${i},this,${isSearching})">${
                i + 1
              }</button>
                `;
            } else {
              element.innerHTML += `
                <button class="nums" onclick="NextPage(${i},this,${isSearching})">${
                i + 1
              }</button>
                `;
            }
          }
        }
        element.innerHTML += `<button class="nums" onclick="NextPage(${
          PM.searchPage <= PM.searchAndSort.length - 1 &&
          PM.searchPage >= PM.searchAndSort.length - 11
            ? PM.searchAndSort.length - 1 - PM.searchPage <= 5 &&
              PM.searchAndSort.length - 1 - PM.searchPage >= 0
              ? PM.searchAndSort.length - 1 - PM.searchPage
              : PM.searchAndSort.length - 1
            : PM.searchPage + 11
        },this,${isSearching})">></button>`;
        element.innerHTML += `<button class="nums" onclick="NextPage(${
          PM.searchAndSort.length - 1
        },this,${isSearching})">>>></button>`;
      });
    }
  } else if (!isSearching) {
    let now =
      PM.page <= 5 && PM.page >= 0
        ? 0
        : PM.page >= PM.searchAndSort.length - 11 &&
          PM.page <= PM.searchAndSort.length - 1
        ? PM.search.searchAndSort.length - 11
        : PM.page - 5;
    btnsRow.forEach((element) => {
      element.classList.add("borderka");
      element.innerHTML = ``;
      element.innerHTML += `<button class="nums" onclick="NextPage(${0},this,${isSearching})"><<<</button>`;
      element.innerHTML += `<button class="nums" onclick="NextPage(${
        PM.page <= 10 && PM.page >= 0
          ? 10 - PM.page <= 10 && 10 - PM.page >= 0
            ? 10 - PM.page
            : PM.page == 0
            ? PM.datas.length - 1
            : 0
          : PM.page - 10
      },this,${isSearching})"><</button>`;
      for (let i = now; i < now + 10; i++) {
        if (i <= PM.datas.length - 1) {
          if (i == PM.page) {
            element.innerHTML += `
                <button class="nums activePage" onclick="NextPage(${i},this,${isSearching})">${
              i + 1
            }</button>
                `;
          } else {
            element.innerHTML += `
                <button class="nums" onclick="NextPage(${i},this,${isSearching})">${
              i + 1
            }</button>
                `;
          }
        }
      }
      element.innerHTML += `<button class="nums" onclick="NextPage(${
        PM.page <= PM.datas.length - 1 && PM.page >= PM.datas.length - 10
          ? PM.datas.length - 1 - PM.page <= 3 &&
            PM.datas.length - 1 - PM.page >= 0
            ? PM.datas.length - 1 - PM.page
            : PM.datas.length - 1
          : PM.page + 10
      },this,${isSearching})">></button>`;
      element.innerHTML += `<button class="nums" onclick="NextPage(${
        PM.datas.length - 1
      },this,${isSearching})">>>></button>`;
    });
  }
}

function NextPage(pageNum, elem, isSearching) {
  if (isSearching) {
    PM.searchPage = pageNum;
    PM.searchAndSortRender();
    pageBtnRender(isSearching);
    elem.classList.add("activePage");
  } else {
    PM.setPage(pageNum);
    PM.render(true);
    pageBtnRender(isSearching);
    elem.classList.add("activePage");
    let search = document.querySelector("input.catalog-search");
    search.value = "";
  }
}
