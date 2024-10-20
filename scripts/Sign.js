let inputs = document.querySelectorAll(".input");
let signInBtn = document.querySelector(".signBtn");
let showBtn = document.querySelector(".show-btn");
const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const numbersChar = /\d/;
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

if (JSON.parse(localStorage.getItem("users")) != null) {
  let list = [];
  let data = JSON.parse(localStorage.getItem("users"));
  data.forEach((element) => {
    let userka = new User(
      element.name,
      element.login,
      element.email,
      element.password
    );
    userka.cartWrite();
    list.push(userka);
  });
  if (JSON.parse(localStorage.getItem("lastUser")) != undefined) {
    let lastOne = JSON.parse(localStorage.getItem("lastUser"));
    UM = new UserManager(
      list,
      new User(lastOne.name, lastOne.login, lastOne.email, lastOne.password)
    );
  } else {
    UM = new UserManager(list, {});
  }
} else {
  UM = new UserManager([], {});
}
if (window.location.href.includes("/SignUp.html") && UM.hasLastUser()) {
  let user = UM.hasLastUser()
    ? UM.lastUser
    : JSON.parse(localStorage.getItem("lastUser"));
  inputs[0].value = user.login;
  inputs[1].value = user.password;
  inputs.forEach((element) => {
    let label = element.parentElement.children[0];
    label.classList.remove("normal--position");
    label.classList.add("moved--position");
  });
} else if (window.location.href.includes("/Profile.html")) {
  let user = UM.hasLastUser()
    ? UM.lastUser
    : JSON.parse(localStorage.getItem("logged"));
  console.log(user);
  inputs.forEach((element, index) => {
    element.value = user[`${namings[index]}`];
    element.setAttribute("readonly", "readonly");
    let label = element.parentElement.children[0];
    label.classList.remove("normal--position");
    label.classList.add("moved--position");
  });
}

signInBtn.addEventListener("click", () => {
  if (signInBtn.textContent == "Sign in" && inputsCheck()) {
    let name = inputs[0].value;
    let login = inputs[1].value;
    let email = inputs[2].value;
    let password = inputs[3].value;
    let user = new User(name, login, email, password);
    UM.lastUser = user;
    UM.addUser(user);
    let hrefList = window.location.pathname.split("/");
    hrefList.pop();
    window.open(
      window.location.origin + hrefList.join("/") + "/SignUp.html",
      "_self"
    );
  } else if (signInBtn.textContent == "Sign up" && inputsCheck()) {
    let login = inputs[0].value;
    let password = inputs[1].value;
    let index = UM.userFind(login, password);
    UM.users[index].loggedLS();
    let hrefList = window.location.href.split("/");
    hrefList.pop();
    hrefList.pop();
    window.open(hrefList.join("/") + "/" + "index.html", "_self");
  } else if (window.location.href.includes("/Profile.html") && inputsCheck()) {
    if (signInBtn.textContent == "Redact") {
      signInBtn.textContent = "Confirm";
      inputs.forEach((element) => {
        element.removeAttribute("readonly");
      });
    } else if (signInBtn.textContent == "Confirm") {
      signInBtn.textContent = "Redact";
      let user = new User("", "", "", "");
      inputs.forEach((element, index) => {
        element.setAttribute("readonly", "readonly");
        user[`${namings[index]}`] = element.value;
      });
      localStorage.setItem("logged", JSON.stringify(user));
    }
  }
});

showBtn.addEventListener("click", () => {
  let passwordInput = showBtn.previousElementSibling.lastElementChild;
  if (passwordInput.type == "text") {
    passwordInput.type = "password";
    showBtn.firstElementChild.src = "../imgs/visible-ico.svg";
  } else {
    passwordInput.type = "text";
    showBtn.firstElementChild.src = "../imgs/not-visible-ico.svg";
  }
});

function inputsCheck() {
  if (
    signInBtn.textContent == "Sign in" ||
    signInBtn.textContent == "Confirm"
  ) {
    let name = inputs[0].value;
    let login = inputs[1].value;
    let email = inputs[2].value;
    let password = inputs[3].value;
    if (name.trim() == "") {
      inputs[0].previousElementSibling.textContent = "important field";
      inputs[0].previousElementSibling.classList.add("error");
    }
    if (login.trim() == "") {
      inputs[1].previousElementSibling.textContent = "important field";
      inputs[1].previousElementSibling.classList.add("error");
    }
    if (email.trim() == "") {
      inputs[2].previousElementSibling.textContent = "important field";
      inputs[2].previousElementSibling.classList.add("error");
    }
    if (password.trim() == "") {
      inputs[3].previousElementSibling.textContent = "important field";
      inputs[3].previousElementSibling.classList.add("error");
    } else if (specialChar.test(name) || numbersChar.test(name)) {
      inputs[0].previousElementSibling.textContent = "invalid value";
      inputs[0].previousElementSibling.classList.add("error");
    } else if (specialChar.test(login)) {
      inputs[1].previousElementSibling.textContent = "invalid value";
      inputs[1].previousElementSibling.classList.add("error");
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      inputs[2].previousElementSibling.textContent = "invalid value";
      inputs[2].previousElementSibling.classList.add("error");
    } else if (password.length < 8) {
      inputs[3].previousElementSibling.textContent =
        "password length more than 8";
      inputs[3].previousElementSibling.classList.add("error");
    } else {
      return true;
    }
    return false;
  } else if (signInBtn.textContent == "Sign up") {
    let login = inputs[0].value;
    let password = inputs[1].value;
    if (login.trim() == "") {
      inputs[0].previousElementSibling.textContent = "important field";
      inputs[0].previousElementSibling.classList.add("error");
    }
    if (password.trim() == "") {
      inputs[1].previousElementSibling.textContent = "important field";
      inputs[1].previousElementSibling.classList.add("error");
    } else if (password.length < 8) {
      inputs[1].previousElementSibling.textContent =
        "password length more than 8";
      inputs[1].previousElementSibling.classList.add("error");
    }
    if (UM.userFind(login, password) != -1) {
      return true;
    } else {
      inputs[0].previousElementSibling.textContent = "inapropriate value";
      inputs[0].previousElementSibling.classList.add("error");
      inputs[1].previousElementSibling.textContent = "inapropriate value";
      inputs[1].previousElementSibling.classList.add("error");
    }
    console.log(UM.userFind(login, password));
    console.log(UM.userFind(login, password) != -1);
    return false;
  } else if (window.location.pathname.includes("/pages/Profile.html")) {
    return true;
  }
}
if (window.location.pathname.includes("/Profile.html")) {
  let signoutBtn = document.querySelector(".SignOut");
  signoutBtn.addEventListener("click", () => {
    let user = JSON.parse(localStorage.getItem("lastUser"));
    let id = UM.userFind(user.login, user.password);
    UM.users[id] = UM.users[id].cartWrite();
    UM.localStorageUpdate();
    localStorage.removeItem("cart");
    localStorage.removeItem("logged");
    let hrefList = window.location.href.split("/");
    hrefList.pop();
    hrefList.pop();
    window.open(hrefList.join("/") + "/" + "index.html", "_self");
  });
}
