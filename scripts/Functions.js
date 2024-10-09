function LoadingAnimation() {
  setTimeout(() => {
    if (!fetchStatus) {
      loading.classList.remove("none");
      LoadingAnimation();
    } else {
      loading.classList.add("none");
    }
  }, 1000);
}

function addToTheCartButton(id) {
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
    console.log(PM.carts[inde]);
    PM.carts[inde].PlusQuantity();
  PM.CartUpdate();

  } else {
    let elem = PM.datas[id];
    PM.addCart(
      new CartProduct(id, elem.name, elem.rarity, elem.type, elem.image, 100, 1)
    );
    PM.carts[PM.carts.length - 1].AllSumUpdate();
    PM.CartUpdate();
  }
}

function plusCartProduct(id) {
  let sorted;
  PM.carts.forEach((elem, index) => {
    if (elem.id == id) {
      sorted = index;
    }
  });
  if(sorted != undefined){
     PM.carts[sorted].PlusQuantity()
  }
  else{
      alert("nod")
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
  if(sorted != undefined){
     PM.carts[sorted].MinusQuantity()
  }
  else{
      alert("nod")
  }
  PM.CartUpdate();
  PM.render(false);
}
