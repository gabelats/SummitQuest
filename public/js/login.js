var fullHeight = function () {
  var fullHeightElements = document.querySelectorAll(".js-fullheight");

  fullHeightElements.forEach(function (element) {
    element.style.height = window.innerHeight + "px";
  });

  window.addEventListener("resize", function () {
    fullHeightElements.forEach(function (element) {
      element.style.height = window.innerHeight + "px";
    });
  });
};

fullHeight();

document.querySelectorAll(".toggle-password").forEach(function (toggle) {
  toggle.addEventListener("click", function () {
    toggle.classList.toggle("fa-eye");
    toggle.classList.toggle("fa-eye-slash");

    var input = document.querySelector(toggle.getAttribute("toggle"));
    if (input.getAttribute("type") === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
  });
});
