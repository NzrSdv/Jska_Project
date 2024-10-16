let cartLink = document.getElementById("cartLink");

const loading = document.querySelector(".loader");
let fetchStatus = false;
LoadingAnimation();
if(JSON.parse(localStorage.getItem("logged"))){
  document.querySelectorAll(".not-logged").forEach(element => {
    element.classList.add("none")
  })
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
      for (let i = 0; i < 40; i++) {
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

cartLink.addEventListener("click", () =>{
  if(JSON.parse(localStorage.getItem("logged"))){

  }
  else{
    cartLink.href = "./pages/SignIn.html"
  }
})
