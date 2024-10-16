let cartLink = document.getElementById("cartLink");

let search = document.querySelector(".catalog-search");

const loading = document.querySelector(".loader");
let fetchStatus = false;
LoadingAnimation();
<<<<<<< HEAD
if(JSON.parse(localStorage.getItem("logged"))){
  document.querySelectorAll(".not-logged").forEach(element => {
    element.classList.add("none")
  })
=======
if (JSON.parse(localStorage.getItem("logged"))) {
  document.querySelectorAll(".not-logged").forEach((element) => {
    element.remove();
  });
} else {
  document.querySelectorAll(".is-logged").forEach((element) => {
    element.remove();
  });
>>>>>>> be67898246b74277f1470de707114a55ee72739d
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
            i,
            ans.data[i].name,
            ans.data[i].rarity.value,
            ans.data[i].images.icon == undefined
              ? "./imgs/default_image.webp"
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
  fetchStatus = true;
  let data = JSON.parse(localStorage.getItem("products"));
  PM = new ProductManager([...data], []);
  PM.render(true);
}

cartLink.addEventListener("click", () => {
  if (!JSON.parse(localStorage.getItem("logged"))) {
    cartLink.href = "./pages/SignIn.html";
  }
});

search.addEventListener("input", () => {
  if (search.value.trim() == "") {
    PM.render(true);
  } else {
    let value = search.value;
    document.querySelectorAll(".product").forEach((element) => {
      if (element.getAttribute("data-fullInfo").textContent.toLowerCase().includes(value)) {
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
      document.querySelector(".message") == null
    ) {
      products.innerHTML += `
      <div class="message">
              <h2 class="text-message">ничего не найдено</h2>
            </div>
      `;
    }
  }
});

let select = document.querySelector(".sort");
//default rarity- rarity+
select.addEventListener("change", () => {
  let val = select.value;
  switch (val) {
    case "0":
      PM.datas = JSON.parse(localStorage.getItem("products")).map(
        (element) =>
          new Product(
            element.id,
            element.name,
            element.rarity,
            element.image,
            element.type,
            element.cost
          )
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
  PM.render(window.location.pathname == "/");
});
