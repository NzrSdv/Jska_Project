let PM;
window.onload = function () {
  if (localStorage.getItem("cart")) {
    let Newdata = JSON.parse(localStorage.getItem("products")).map(element => {
      return new Product(element.id,element.name,element.rarity,element.type,element.image,element.cost);
    });
    let Newcart = JSON.parse(localStorage.getItem("cart")).map(element => {
      return new CartProduct(element.id,element.name,element.rarity,element.type,element.image,element.cost,element.quantity);
    });
    PM = new ProductManager(
      Newdata,Newcart
    );
    PM.render(false);
  }
  else{
    alert("netu tut nichego")
  }
};
