let inputs = document.querySelectorAll(".input");

inputs.forEach((element) => {
  element.addEventListener("focus", () => {
    let label = element.parentElement.children[0];
      label.style.transform = "translateY(0px)";
  });
  element.addEventListener("focusout", () => {
    let label = element.parentElement.children[0];
    if (element.value.trim() == "") {
      label.style.transform = "translateY(12px)";
    }
  });
});
