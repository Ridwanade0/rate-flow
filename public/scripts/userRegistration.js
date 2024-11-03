const emailInput = document.getElementById("new-user-email");
const button = document.getElementById("new-user-email-button");
const userNotification = document.getElementById("new-user-notification").value;

button.addEventListener("click", async () => {
  const email = emailInput.value;
  const response = await fetch("/auth/new-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  alert(data.message);
});
