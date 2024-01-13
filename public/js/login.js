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

document.addEventListener("DOMContentLoaded", function () {
  var signUpLink = document.querySelector("#signUpLink");
  var emailField = document.querySelector("#emailField");
  var passwordToggleIcon = document.querySelector("#password-toggle-icon");
  var submitButton = document.querySelector("#submitButton");

  signUpLink.addEventListener("click", function (event) {
    event.preventDefault();

    emailField.style.display =
      emailField.style.display === "none" ? "block" : "none";

    var newPosition = emailField.style.display === "none" ? "40%" : "31%";
    passwordToggleIcon.style.top = newPosition;

    var buttonText =
      emailField.style.display === "none" ? "Sign In" : "Sign Up";
    submitButton.textContent = buttonText;
  });
});
