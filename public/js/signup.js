const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.getElementById("form");

form.addEventListener("submit", handleSignup);

async function handleSignup(event) {
  event.preventDefault();

  // Check if all fields are filled
  if (!email.value || !password.value || !confirmPassword.value) {
    alert("Please fill in all fields!");
    return;
  }

  // Check if the email is valid
  if (!isValidEmail(email.value)) {
    alert("Please enter a valid email address!");
    return;
  }

  // Check if the password is at least 8 characters
  if (password.value.length < 8) {
    alert("Password must be at least 8 characters long!");
    return;
  }

  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("/auth/signup", {
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
    // Handle server response
    if (response.ok) {
      console.log(data);
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Signup failed!");
    }
    if ((data.success = true)) {
      window.location.href = "/auth/login";
    }
  } catch (error) {
    alert("An error occurred: " + error.message);
  }
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
