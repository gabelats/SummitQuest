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
const formData = {
  username: document.querySelector("#username-signup").value.trim(),
  email: document.querySelector("#email-signup").value.trim(),
};

async function sendEmail(data) {
  console.log(data);
  await emailjs
    .send("service_wp98bib", "template_p4gya6z", data, "g6a2kNRjvcDHS5gJl")

    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  return;
}

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  const userObj = {
    username,
    email,
  };
  console.log(userObj);
  sendEmail(userObj);
  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", signupFormHandler);
