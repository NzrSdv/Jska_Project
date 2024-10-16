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

if (JSON.parse(localStorage.getItem("users")) != undefined) {
  let list = [];
  let data = JSON.parse(localStorage.getItem("users"));
  data.forEach((element) => {
    list.push(
      new User(element.name, element.login, element.email, element.password)
    );
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
if (window.location.pathname == "./pages/SignUp.html" && UM.hasLastUser()) {
  let user = JSON.parse(localStorage.getItem("lastUser"));
  inputs[0].value = user.login;
  inputs[1].value = user.password;
  inputs.forEach((element) => {
    let label = element.parentElement.children[0];
    label.classList.remove("normal--position");
    label.classList.add("moved--position");
  });
} else if (window.location.pathname == "/pages/Profile.html") {
  let user = UM.lastUser == {} ? JSON.parse(localStorage.getItem("logged")) : UM.lastUser;
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
    window.open("../pages/SignIn.html", "_self");
  } else if (signInBtn.textContent == "Sign up" && inputsCheck()) {
    
  } else if (
    window.location.pathname == "/pages/Profile.html" &&
    inputsCheck()
  ) {
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
      localStorage.setItem("logged",JSON.stringify(user));
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
      let index = UM.userFind(login, password);
      UM.users[index].loggedLS();
      window.open("../index.html", "_self");
      return true;
    } else {
      inputs[0].previousElementSibling.textContent = "inapropriate value";
      inputs[0].previousElementSibling.classList.add("error");
      inputs[1].previousElementSibling.textContent = "inapropriate value";
      inputs[1].previousElementSibling.classList.add("error");
      window.open("/pages/SignIn.html")
    }
    console.log(UM.userFind(login, password));
    console.log(UM.userFind(login, password) != -1);
    return false;
  }
  else if(window.location.pathname == "/pages/Profile.html"){
    return true;
  }
}
let signoutBtn = document.querySelector(".SignOut")
signoutBtn.addEventListener("click",() => {
  localStorage.removeItem("logged");
  window.open("../index.html","_self")
})