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
  if(JSON.parse(localStorage.getItem("logged")) != undefined){
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
        new CartProduct(id, elem.name, elem.rarity, elem.type, elem.image, 100, 1)
      );
      PM.carts[PM.carts.length - 1].AllSumUpdate();
      Addedbox[boxIndex].textContent = "Успешно добавлено в корзину";
      PM.CartUpdate();
    }
    AddedBoxAnimation();
  }
  else{
    window.open("../pages/SignIn.html","_self")
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
    alert("nod");
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
