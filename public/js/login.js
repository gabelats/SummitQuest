document.addEventListener("DOMContentLoaded", function () {
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
});
const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", loginFormHandler);
