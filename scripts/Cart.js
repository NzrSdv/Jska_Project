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
    PM = new ProductManager([], Newcart);
    getAllfetch()
    PM.render(false);
    if(!cartCheck){
      fillerShow();
    }
  } else {
    
    PM = new ProductManager([], []);
    getAllfetch()
    if(!cartCheck()){
     fillerShow();
    }
  }
};

let search = document.querySelector(".catalog-search");

search.addEventListener("input", (e) => {
  console.log(e)
  if(e.inputType.includes("delete")){
    searchFunc()
    if(search.value.trim() == ""){
    pageBtnRender(false);
  }}
  else{
    pageBtnRender(true);
  }
});

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
