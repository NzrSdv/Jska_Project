let inputs = document.querySelectorAll(".input");

inputs.forEach((element) => {
  element.addEventListener("focus", () => {
    let label = element.parentElement.children[0];
      label.classList.remove("normal--position")
      label.classList.add("moved--position");
  });
  element.addEventListener("focusout", () => {
    let label = element.parentElement.children[0];
    if (element.value.trim() == "") {
      label.classList.add("normal--position")
      label.classList.remove("moved--position");
    }
  });
});
