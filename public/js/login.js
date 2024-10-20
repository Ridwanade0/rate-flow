const email = document.getElementById("email");
const password = document.getElementById("password");
document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Check if all fields are filled
    if (!email.value || !password.value) {
      alert("Please fill in all fields!");
      return;
    }

    // Check if the email is valid
    if (!isValidEmail(email.value)) {
      alert("Please enter a valid email address!");
      return;
    }
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
      const data = await response.json();
      if (data) {
       window.localStorage.setItem("token", data.token);
       window.location.href = "/accouunt"
      }
    } catch (error) {}
  });
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
