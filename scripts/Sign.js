let inputs = document.querySelectorAll(".input");
let signInBtn = document.querySelector(".signBtn");
let showBtn = document.querySelector(".show-btn");
const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const numbersChar = /\d/;
const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const namings = ["name", "login", "email", "password"];
inputs.forEach((element, index) => {
  element.addEventListener("focus", () => {
    let label = element.parentElement.children[0];
    label.classList.remove("normal--position");
    label.classList.add("moved--position");
  });
  element.addEventListener("input", () => {
    if (element.previousElementSibling.classList.contains("error")) {
      element.previousElementSibling.classList.remove("error");
      element.previousElementSibling.textContent = namings[index];
    }
  });
  element.addEventListener("focusout", () => {
    let label = element.parentElement.children[0];
    if (element.value.trim() == "") {
      label.classList.add("normal--position");
      label.classList.remove("moved--position");
    }
  });
});
let UM;
if (JSON.parse(localStorage.getItem("users")) != undefined) {
  UM = new UserManager(JSON.parse(localStorage.getItem("users")), {});
} else {
  UM = new UserManager([], {});
}
signInBtn.addEventListener("click", () => {
  if(signInBtn.textContent == "Sign in"){
    let name = inputs[0].value;
    let login = inputs[1].value;
    let email = inputs[2].value;
    let password = inputs[3].value;
    if (name.trim() == "") {
      inputs[0].previousElementSibling.textContent = "important field";
      inputs[0].previousElementSibling.classList.add("error");
    } else {
      if (login.trim() == "") {
        inputs[1].previousElementSibling.textContent = "important field";
        inputs[1].previousElementSibling.classList.add("error");
      } else {
        if (email.trim() == "") {
          inputs[2].previousElementSibling.textContent = "important field";
          inputs[2].previousElementSibling.classList.add("error");
        } else {
          if (password.trim() == "") {
            inputs[3].previousElementSibling.textContent = "important field";
            inputs[3].previousElementSibling.classList.add("error");
          } else {
            if (specialChar.test(name) || numbersChar.test(name)) {
              inputs[0].previousElementSibling.textContent = "invalid value";
              inputs[0].previousElementSibling.classList.add("error");
            } else {
              if (specialChar.test(login)) {
                inputs[1].previousElementSibling.textContent = "invalid value";
                inputs[1].previousElementSibling.classList.add("error");
              } else {
                if (email.match(validEmail)) {
                  inputs[2].previousElementSibling.textContent = "invalid value";
                  inputs[2].previousElementSibling.classList.add("error");
                } else {
                  let user = new User(name, login, email, password);
                  UM.addUser(user);
                  UM.lastUser = user;
                  console.log(UM);
                }
              }
            }
          }
        }
      }
    }
  }
  else{

  }
});

showBtn.addEventListener("click",() => {
  let passwordInput = showBtn.previousElementSibling.lastElementChild;
  if(passwordInput.type == "text"){
    passwordInput.type = "password"
    showBtn.firstElementChild.src = "../imgs/visible-ico.svg"
  }
  else{
    passwordInput.type = "text";
    showBtn.firstElementChild.src = "../imgs/not-visible-ico.svg"
}
})