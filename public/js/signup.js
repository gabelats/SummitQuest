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

var formData = {};

$(".signin-Form").on("submit", function (event) {
  event.preventDefault();

  formData.username = document.getElementById("username-field").value;
  formData.email = document.getElementById("email-field").value;
  formData.password = document.getElementById("password-field");

  $.ajax("https://api.emailjs.com/api/v1.0/email/send-form", {
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
  })
    .done(function () {
      alert("Your mail is sent!");
    })
    .fail(function (error) {
      alert("Oops... " + JSON.stringify(error));
    });
});
//POST https://api.emailjs.com/api/v1.0/email/send-form
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#username-field").value.trim();
  const email = document.querySelector("#email-field").value.trim();
  const password = document.querySelector("#password-field").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

const signupForm = document.querySelector(".signin-form");

signupForm.addEventListener("submit", signupFormHandler);
